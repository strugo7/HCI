/**
 * lesson bundle → Lesson.
 *
 * `##` opens a section. Everything from the first closing directive onward
 * (`keypoints`, `quiz`, `flashcards`, `references`) belongs to no section of
 * its own in the source — every lesson in the vault is written that way — so
 * the parser gathers it into a final "סיכום" section, together with the
 * blocks from summary.md.
 */
import matter from 'gray-matter';

import {
  DIAGNOSTIC_CODES,
  LessonSchema,
  LessonFrontmatterSchema,
  slugify,
  type Block,
  type Diagnostic,
  type Lesson,
  type Section,
} from '@cyberatlas/core';

import { toMdast } from './processor.js';
import { blocksFromNode, createTransformContext, report, type TransformContext } from './transform.js';
import type { LessonBundle, LessonParseResult, ParseContext } from './types.js';

/** Blocks that close a lesson out. Their appearance ends the last section. */
const CLOSING_BLOCKS: ReadonlySet<string> = new Set([
  'keypoints',
  'quiz-reference',
  'flashcards-reference',
  'references',
  'summary',
]);

const SUMMARY_TITLE = 'סיכום';

interface OpenSection {
  title: string;
  blocks: Block[];
}

export function parseLesson(bundle: LessonBundle, ctx: ParseContext): LessonParseResult {
  const diagnostics: Diagnostic[] = [];
  const file = `${ctx.file}/lesson.md`;

  const { data, content } = matter(bundle.lesson);
  const fm = LessonFrontmatterSchema.safeParse(data);

  if (!fm.success) {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: `Invalid frontmatter: ${fm.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`,
      code: DIAGNOSTIC_CODES.INVALID_FRONTMATTER,
    });
    return { data: null, diagnostics };
  }

  const frontmatter = fm.data;
  const scope = frontmatter.id;
  const tctx = createTransformContext(file, scope, ctx.concepts, ctx.assets, diagnostics);

  /* ---------------------------------------------------------------- *
   * Walk the document, splitting on `##`                              *
   * ---------------------------------------------------------------- */
  const root = toMdast(content);
  const sections: OpenSection[] = [];
  const closing: Block[] = [];

  let current: OpenSection | null = null;
  let inClosing = false;

  for (const node of root.children) {
    if (node.type === 'heading' && node.depth === 1) continue; // the title, already in frontmatter
    if (node.type === 'thematicBreak') continue;

    if (node.type === 'heading' && node.depth === 2) {
      if (inClosing) {
        report(
          tctx,
          'warning',
          DIAGNOSTIC_CODES.INVALID_NESTING,
          'A section heading appears after the lesson\'s closing blocks; it will render inside "סיכום".',
          node,
        );
      } else {
        current = { title: headingText(node.children), blocks: [] };
        sections.push(current);
        continue;
      }
    }

    for (const block of blocksFromNode(node, tctx)) {
      if (!inClosing && CLOSING_BLOCKS.has(block.type)) inClosing = true;

      if (inClosing) {
        closing.push(block);
      } else if (current) {
        current.blocks.push(block);
      } else {
        // Prose before the first `##` — open an implicit section under the title.
        current = { title: frontmatter.title, blocks: [block] };
        sections.push(current);
      }
    }
  }

  /* ---------------------------------------------------------------- *
   * summary.md                                                        *
   * ---------------------------------------------------------------- */
  const summary = bundle.summary
    ? parseSummary(bundle.summary, `${ctx.file}/summary.md`, scope, ctx, diagnostics)
    : [];

  for (const slug of summaryConcepts(summary)) tctx.referenced.add(slug);

  /* ---------------------------------------------------------------- *
   * Assemble                                                          *
   * ---------------------------------------------------------------- */
  const closingBlocks = [...summary, ...closing];

  const assembled: Section[] = sections.map((s, i) => ({
    id: sectionId(scope, i + 1),
    type: 'section',
    title: s.title,
    slug: slugify(s.title) || `section-${i + 1}`,
    blocks: s.blocks,
  }));

  if (closingBlocks.length > 0) {
    assembled.push({
      id: sectionId(scope, assembled.length + 1),
      type: 'section',
      title: SUMMARY_TITLE,
      slug: 'summary',
      blocks: closingBlocks,
    });
  }

  if (assembled.length === 0) {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: 'Lesson has no sections.',
      code: DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
    });
    return { data: null, diagnostics };
  }

  const lesson = LessonSchema.safeParse({
    id: frontmatter.id,
    type: 'lesson',
    frontmatter,
    sections: assembled,
    // The same Block objects the closing section renders — one knowledge
    // object, addressed from two places, never two copies of the text.
    summary,
    quizRef: refOf(closing, 'quiz-reference'),
    flashcardsRef: refOf(closing, 'flashcards-reference'),
    concepts: [...tctx.referenced].sort(),
  } satisfies Record<string, unknown> as unknown);

  if (!lesson.success) {
    diagnostics.push({
      severity: 'error',
      file,
      line: null,
      column: null,
      message: `Lesson failed schema validation: ${lesson.error.issues
        .map((i) => `${i.path.join('.')} ${i.message}`)
        .join('; ')}`,
      code: DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
    });
    return { data: null, diagnostics };
  }

  return { data: lesson.data as Lesson, diagnostics };
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** Stable, ASCII, and usable as a DOM scroll target. */
function sectionId(scope: string, index: number): string {
  return `${scope}--section-${String(index).padStart(2, '0')}`;
}

function headingText(children: readonly { type: string }[]): string {
  // Section titles are plain text by convention; anything richer flattens.
  return children
    .map((c) => ('value' in c && typeof c.value === 'string' ? c.value : ''))
    .join('')
    .trim();
}

function refOf(blocks: readonly Block[], type: 'quiz-reference' | 'flashcards-reference'): string | null {
  const found = blocks.find((b) => b.type === type);
  return found && 'ref' in found ? found.ref : null;
}

function summaryConcepts(blocks: readonly Block[]): string[] {
  const out: string[] = [];
  for (const block of blocks) {
    if ('children' in block) {
      for (const inline of block.children) {
        if (inline.type === 'concept-reference') out.push(inline.target);
      }
    }
  }
  return out;
}

function parseSummary(
  source: string,
  file: string,
  scope: string,
  ctx: ParseContext,
  diagnostics: Diagnostic[],
): Block[] {
  const { content } = matter(source);
  // A separate id scope keeps summary.md's ids from colliding with lesson.md's.
  const tctx: TransformContext = createTransformContext(
    file,
    `${scope}/summary`,
    ctx.concepts,
    ctx.assets,
    diagnostics,
  );

  const out: Block[] = [];
  for (const node of toMdast(content).children) {
    if (node.type === 'heading' && node.depth === 1) continue;
    out.push(...blocksFromNode(node, tctx));
  }
  return out;
}
