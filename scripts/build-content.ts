/**
 * Compile the content vault into data the app can load.
 *
 *   content/  →  parse  →  validate  →  apps/web/src/generated/content/
 *
 * Runs at build time, never in the browser. Two reasons:
 *   1. students never pay to parse Markdown on page load
 *   2. content that fails validation cannot ship — the build fails first
 *
 * The output is one JSON file per lesson plus a metadata-only index, so
 * opening one lesson never downloads the other thirty-six.
 */
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  formatDiagnostic,
  type Block,
  type Concept,
  type Exam,
  type Inline,
  type Lesson,
  type Quiz,
} from '@cyberatlas/core';

import {
  compileVault,
  CONTENT_DIR,
  diagnosticsFor,
  ROOT,
  type FlashcardDeck,
} from './lib/compile.js';
import { readCurriculum } from './lib/curriculum.js';
import { compileGraph } from './lib/graph.js';

const OUT_DIR = path.join(ROOT, 'apps/web/src/generated/content');

/**
 * Assets are served, not bundled: they are large, and a lesson body should not
 * carry a megabyte of PNG through the JS graph. Only files a lesson actually
 * embeds are copied — an unused image in the vault ships nothing.
 */
const PUBLIC_ASSET_DIR = path.join(ROOT, 'apps/web/public/content-media');

/**
 * Lessons the app actually ships today. An error anywhere in the vault is
 * printed; an error in one of *these* fails the build.
 */
const MUST_BUILD: readonly string[] = ['what-is-hci'];

/**
 * A concept's definition as plain text.
 *
 * The key-terms sidebar needs a sentence, not a block tree — and it must be
 * the sentence the concept file actually owns, never a copy kept in React.
 */
function definitionText(concept: Concept): string {
  return concept.definition.children
    .map((inline: Inline) => ('label' in inline ? inline.label : inline.value))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * What a lesson list needs, without carrying any of the lesson body.
 *
 * The quiz and card *counts* travel with the metadata so a listing page can
 * say "5 questions" without downloading five quizzes to count them.
 */
function toMeta(lesson: Lesson, quizzes: readonly Quiz[], decks: readonly FlashcardDeck[]) {
  const { frontmatter } = lesson;
  const quiz = quizzes.find((q) => q.id === lesson.quizRef);
  const deck = decks.find((d) => d.id === lesson.flashcardsRef);

  return {
    id: lesson.id,
    title: frontmatter.title,
    lessonNumber: frontmatter.lessonNumber ?? null,
    category: frontmatter.category ?? null,
    difficulty: frontmatter.difficulty,
    estimatedTime: frontmatter.estimatedTime ?? null,
    tags: frontmatter.tags,
    prerequisites: frontmatter.prerequisites,
    sectionCount: lesson.sections.length,
    concepts: lesson.concepts,
    // Null, not absent, when the lesson ships without one — the UI has to be
    // able to tell "no quiz" from "quiz I failed to look up".
    quizRef: quiz ? quiz.id : null,
    questionCount: quiz ? quiz.questions.length : 0,
    flashcardsRef: deck ? deck.id : null,
    cardCount: deck ? deck.cards.length : 0,
  };
}

/** Every asset the compiled content actually points at. */
function embeddedAssets(
  lessons: readonly Lesson[],
  concepts: readonly Concept[],
  quizzes: readonly Quiz[],
  exams: readonly Exam[],
): Set<string> {
  const used = new Set<string>();

  const scan = (blocks: readonly Block[]): void => {
    for (const block of blocks) {
      if (block.type === 'media' && block.src !== null) used.add(block.src);
    }
  };

  for (const lesson of lessons) for (const section of lesson.sections) scan(section.blocks);
  for (const concept of concepts) {
    scan(concept.simpleExplanation);
    scan(concept.technicalExplanation);
  }

  // A question's drawing ships the same way a lesson's does.
  for (const holder of [...quizzes, ...exams]) {
    for (const question of holder.questions) {
      for (const src of question.images) used.add(src);
    }
  }

  return used;
}

async function main(): Promise<void> {
  const { lessons, concepts, quizzes, exams, decks, diagnostics, failed } = await compileVault();

  // The curriculum is checked against what actually compiled, so a unit can
  // never point at a lesson that does not exist.
  const {
    course,
    units,
    diagnostics: curriculumDiagnostics,
  } = await readCurriculum(lessons.map((lesson) => lesson.id));
  diagnostics.push(...curriculumDiagnostics);

  // The graph is derived from what compiled, for the same reason: it may only
  // contain concepts and lessons that actually exist.
  const { graph, diagnostics: graphDiagnostics } = compileGraph(lessons, concepts, units);
  diagnostics.push(...graphDiagnostics);

  // A unit exam belongs to a unit the same way a curriculum row belongs to a
  // lesson: pointing at a unit that does not exist is fatal, because the exams
  // page would render a row that navigates nowhere. A lecturer exam belongs to
  // no unit — it ranges over the whole course — so there is nothing to check.
  const unitIds = new Set(units.map((unit) => unit.id));
  const examDiagnostics = exams
    .filter((exam) => exam.kind === 'unit' && !unitIds.has(exam.unit ?? ''))
    .map((exam) => ({
      severity: 'error' as const,
      file: `content/exams/${exam.unit}.md`,
      line: null,
      column: null,
      message: `Exam "${exam.id}" claims unit "${exam.unit}", which is not in curriculum.yaml.`,
      code: 'missing-required-field',
    }));
  diagnostics.push(...examDiagnostics);

  for (const d of diagnostics) console.error(formatDiagnostic(d));

  /* ---------------------------------------------------------------- *
   * Gate                                                              *
   * ---------------------------------------------------------------- */
  const blocking = MUST_BUILD.flatMap((dir) => diagnosticsFor(diagnostics, dir)).filter(
    (d) => d.severity === 'error',
  );

  // A curriculum error is always fatal: it would ship a unit page with a row
  // that navigates nowhere. A graph error is fatal for the same reason — a
  // prerequisite cycle is a study plan a student can never start. An exam
  // error is fatal too: a shuffled exam whose explanation names option
  // letters, or one the longest-answer trick passes, teaches wrong.
  const structuralErrors = [
    ...curriculumDiagnostics,
    ...graphDiagnostics,
    ...diagnostics.filter((d) => d.file.startsWith('content/exams/')),
  ].filter((d) => d.severity === 'error');

  if (
    blocking.length > 0 ||
    structuralErrors.length > 0 ||
    MUST_BUILD.some((id) => failed.includes(id))
  ) {
    console.error(`\ncontent: build failed — ${MUST_BUILD.join(', ')} must parse cleanly`);
    process.exit(1);
  }

  /* ---------------------------------------------------------------- *
   * Emit                                                              *
   * ---------------------------------------------------------------- */
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(path.join(OUT_DIR, 'lessons'), { recursive: true });
  await mkdir(path.join(OUT_DIR, 'concepts'), { recursive: true });
  await mkdir(path.join(OUT_DIR, 'quizzes'), { recursive: true });
  await mkdir(path.join(OUT_DIR, 'exams'), { recursive: true });
  await mkdir(path.join(OUT_DIR, 'flashcards'), { recursive: true });

  await rm(PUBLIC_ASSET_DIR, { recursive: true, force: true });
  const assets = embeddedAssets(lessons, concepts, quizzes, exams);

  if (assets.size > 0) {
    await mkdir(PUBLIC_ASSET_DIR, { recursive: true });
    for (const src of assets) {
      // src is vault-relative ("media/Mental Model Diagram.png"); it flattens to a
      // single served directory, which is why asset names must be unique.
      await copyFile(path.join(CONTENT_DIR, src), path.join(PUBLIC_ASSET_DIR, path.basename(src)));
    }
  }

  for (const lesson of lessons) {
    await writeFile(
      path.join(OUT_DIR, 'lessons', `${lesson.id}.json`),
      JSON.stringify(lesson),
      'utf8',
    );
  }

  // A concept page shows the concept's full body, so a concept is a chunk too.
  // The glossary index carries only its definition sentence, and the eighty-one
  // other concepts stay on disk until one of them is opened.
  for (const concept of concepts) {
    await writeFile(
      path.join(OUT_DIR, 'concepts', `${concept.frontmatter.slug}.json`),
      JSON.stringify(concept),
      'utf8',
    );
  }

  // The graph ships whole: it is small, every node is a link away from every
  // other, and the graph view needs all of it at once to lay anything out.
  await writeFile(path.join(OUT_DIR, 'graph.json'), JSON.stringify(graph), 'utf8');

  // One file per quiz and per deck, for the same reason lessons get one each:
  // opening the usability quiz must not download the other thirty-six.
  for (const quiz of quizzes) {
    await writeFile(path.join(OUT_DIR, 'quizzes', `${quiz.id}.json`), JSON.stringify(quiz), 'utf8');
  }

  for (const exam of exams) {
    await writeFile(path.join(OUT_DIR, 'exams', `${exam.id}.json`), JSON.stringify(exam), 'utf8');
  }

  for (const deck of decks) {
    await writeFile(
      path.join(OUT_DIR, 'flashcards', `${deck.id}.json`),
      JSON.stringify(deck),
      'utf8',
    );
  }

  await writeFile(
    path.join(OUT_DIR, 'index.json'),
    JSON.stringify({
      course,
      units,
      // Exam *metadata* only — the questions stay in their own chunk, for the
      // same reason a lesson's body does.
      //
      // Our unit exams come first, in curriculum order. The lecturer's papers
      // follow, newest first: they belong to no unit, so ordering them by the
      // curriculum would have dropped them from the index entirely.
      exams: [
        ...units
          .map((unit) => exams.find((exam) => exam.kind === 'unit' && exam.unit === unit.id))
          .filter((exam): exam is Exam => exam !== undefined),
        ...exams
          .filter((exam) => exam.kind === 'lecturer')
          .sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
      ].map((exam) => ({
        id: exam.id,
        unit: exam.unit,
        kind: exam.kind,
        title: exam.title,
        questionCount: exam.questions.length,
        maxScore: exam.questions.reduce((n, q) => n + q.points, 0),
        estimatedTime: exam.questions.reduce((n, q) => n + q.estimatedTime, 0),
        year: exam.year,
        duration: exam.duration,
      })),
      lessons: lessons
        .map((lesson) => toMeta(lesson, quizzes, decks))
        .sort((a, b) => (a.lessonNumber ?? 999) - (b.lessonNumber ?? 999)),
      concepts: concepts
        .map((c) => ({
          slug: c.frontmatter.slug,
          title: c.frontmatter.title,
          definition: definitionText(c),
          appearsIn: c.appearsIn,
          // The glossary must be findable by every name the concept goes by —
          // a student searching "שמישות" is looking for Usability. These are
          // the same keys the parser resolves `[[links]]` against.
          aliases: c.frontmatter.aliases,
          tags: c.frontmatter.tags,
          related: c.related,
        }))
        .sort((a, b) => a.title.localeCompare(b.title, 'he')),
    }),
    'utf8',
  );

  const errors = diagnostics.filter((d) => d.severity === 'error').length;
  const warnings = diagnostics.filter((d) => d.severity === 'warning').length;

  const questions = quizzes.reduce((n, q) => n + q.questions.length, 0);
  const cards = decks.reduce((n, d) => n + d.cards.length, 0);

  console.log(
    `\ncontent: ${lessons.length} lesson(s), ${concepts.length} concept(s), ${assets.size} asset(s) → apps/web`,
  );
  console.log(
    `content: ${quizzes.length} quiz(zes) / ${questions} question(s), ${decks.length} deck(s) / ${cards} card(s)`,
  );
  const examQuestions = exams.reduce((n, e) => n + e.questions.length, 0);
  console.log(`content: ${exams.length} exam(s) / ${examQuestions} question(s)`);
  console.log(`content: graph — ${graph.nodes.length} node(s), ${graph.edges.length} edge(s)`);
  if (failed.length > 0) {
    console.log(`content: ${failed.length} bundle(s) did not compile: ${failed.join(', ')}`);
  }
  console.log(`content: ${errors} error(s), ${warnings} warning(s)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
