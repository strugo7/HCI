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
 * The badge answers "what kind of work is this section?", so it keys off the
 * rarest signal present. A `selfcheck` is deliberately NOT one: every section
 * in every lesson ends with one, so it distinguishes nothing — reading it as a
 * signal would label the whole table of contents "חידון".
 */
export function inferSectionKind(
  blockTypes: readonly string[],
  isLast: boolean,
): SectionKind {
  const has = (type: string): boolean => blockTypes.includes(type);

  if (has('summary') || has('keypoints')) return 'summary';
  if (has('definition')) return 'definition';
  if (has('example')) return 'example';
  if (has('analogy')) return 'insight';
  if (has('media') || has('table')) return 'diagram';
  if (has('quiz-reference')) return 'quiz';
  if (isLast) return 'summary';
  return 'reading';
}
