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

import { formatDiagnostic, type Block, type Concept, type Inline, type Lesson } from '@cyberatlas/core';

import { compileVault, CONTENT_DIR, diagnosticsFor, ROOT } from './lib/compile.js';
import { readCurriculum } from './lib/curriculum.js';

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
const MUST_BUILD: readonly string[] = ['cyberspace'];

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

/** What a lesson list needs, without carrying any of the lesson body. */
function toMeta(lesson: Lesson) {
  const { frontmatter } = lesson;
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
  };
}

/** Every asset the compiled content actually points at. */
function embeddedAssets(lessons: readonly Lesson[], concepts: readonly Concept[]): Set<string> {
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

  return used;
}

async function main(): Promise<void> {
  const { lessons, concepts, diagnostics, failed } = await compileVault();

  // The curriculum is checked against what actually compiled, so a unit can
  // never point at a lesson that does not exist.
  const {
    course,
    units,
    diagnostics: curriculumDiagnostics,
  } = await readCurriculum(lessons.map((lesson) => lesson.id));
  diagnostics.push(...curriculumDiagnostics);

  for (const d of diagnostics) console.error(formatDiagnostic(d));

  /* ---------------------------------------------------------------- *
   * Gate                                                              *
   * ---------------------------------------------------------------- */
  const blocking = MUST_BUILD.flatMap((dir) => diagnosticsFor(diagnostics, dir)).filter(
    (d) => d.severity === 'error',
  );

  // A curriculum error is always fatal: it would ship a unit page with a row
  // that navigates nowhere.
  const curriculumErrors = curriculumDiagnostics.filter((d) => d.severity === 'error');

  if (
    blocking.length > 0 ||
    curriculumErrors.length > 0 ||
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

  await rm(PUBLIC_ASSET_DIR, { recursive: true, force: true });
  const assets = embeddedAssets(lessons, concepts);

  if (assets.size > 0) {
    await mkdir(PUBLIC_ASSET_DIR, { recursive: true });
    for (const src of assets) {
      // src is vault-relative ("media/CIA Triangle.png"); it flattens to a
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

  await writeFile(
    path.join(OUT_DIR, 'index.json'),
    JSON.stringify({
      course,
      units,
      lessons: lessons
        .map(toMeta)
        .sort((a, b) => (a.lessonNumber ?? 999) - (b.lessonNumber ?? 999)),
      concepts: concepts.map((c) => ({
        slug: c.frontmatter.slug,
        title: c.frontmatter.title,
        definition: definitionText(c),
        appearsIn: c.appearsIn,
      })),
    }),
    'utf8',
  );

  const errors = diagnostics.filter((d) => d.severity === 'error').length;
  const warnings = diagnostics.filter((d) => d.severity === 'warning').length;

  console.log(
    `\ncontent: ${lessons.length} lesson(s), ${concepts.length} concept(s), ${assets.size} asset(s) → apps/web`,
  );
  if (failed.length > 0) {
    console.log(`content: ${failed.length} bundle(s) did not compile: ${failed.join(', ')}`);
  }
  console.log(`content: ${errors} error(s), ${warnings} warning(s)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
