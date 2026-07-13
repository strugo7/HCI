/**
 * Lesson feature — shared types and helpers.
 *
 * The Lesson type comes from `@cyberatlas/core`. This module adds UI-specific
 * types the template needs for rendering the TOC, progress tracking, etc.
 */

/** TOC section type — maps to a visual badge style. */
export type SectionKind =
  | 'reading'
  | 'definition'
  | 'example'
  | 'insight'
  | 'diagram'
  | 'quiz'
  | 'summary';

export interface TocEntry {
  /** Section id for scroll targeting. */
  id: string;
  /** Section title to show in the TOC. */
  title: string;
  /** Determines badge color and label. */
  kind: SectionKind;
  /** 1-based index for the numbered circle. */
  index: number;
}

/** Hebrew labels for section kinds. */
export const SECTION_KIND_LABELS: Record<SectionKind, string> = {
  reading: 'קריאה',
  definition: 'הגדרה',
  example: 'דוגמה',
  insight: 'תובנה',
  diagram: 'תרשים',
  quiz: 'חידון',
  summary: 'סיכום',
};

/**
 * Infer the dominant section "kind" from its blocks.
 *
 * The first strong signal wins. If a section has a definition block → it's a
 * definition section. If it's the last section → summary. Otherwise → reading.
 */
export function inferSectionKind(
  blockTypes: readonly string[],
  isLast: boolean,
): SectionKind {
  if (blockTypes.includes('definition')) return 'definition';
  if (blockTypes.includes('example')) return 'example';
  if (blockTypes.includes('analogy')) return 'insight';
  if (blockTypes.includes('media')) return 'diagram';
  if (blockTypes.includes('selfcheck') || blockTypes.includes('quiz-reference')) return 'quiz';
  if (blockTypes.includes('summary') || isLast) return 'summary';
  return 'reading';
}
