/**
 * Diagnostics.
 *
 * Validation never halts on the first problem — every error is collected and
 * returned together, so an author fixes a whole file in one pass.
 */
import { z } from 'zod';

export const SeveritySchema = z.enum(['info', 'warning', 'error']);
export type Severity = z.infer<typeof SeveritySchema>;

export const DiagnosticSchema = z.object({
  severity: SeveritySchema,
  file: z.string(),
  line: z.number().int().nonnegative().nullable(),
  column: z.number().int().nonnegative().nullable(),
  message: z.string().min(1),
  /** Stable machine-readable code, e.g. "unknown-directive". */
  code: z.string().min(1),
});
export type Diagnostic = z.infer<typeof DiagnosticSchema>;

export const DIAGNOSTIC_CODES = {
  UNKNOWN_DIRECTIVE: 'unknown-directive',
  DUPLICATE_ID: 'duplicate-id',
  MISSING_CONCEPT: 'missing-concept',
  MISSING_ASSET: 'missing-asset',
  MISSING_REQUIRED_FIELD: 'missing-required-field',
  INVALID_FRONTMATTER: 'invalid-frontmatter',
  INVALID_NESTING: 'invalid-nesting',
  MALFORMED_QUIZ: 'malformed-quiz',
  BROKEN_LINK: 'broken-link',
  EMBEDDED_HTML: 'embedded-html',
  /** A media directive's src that cannot render as that directive, e.g. :::video pointing at an .html. */
  MEDIA_MISMATCH: 'media-mismatch',
  /** Prerequisites that loop: a course with no lesson a student can take first. */
  CIRCULAR_DEPENDENCY: 'circular-dependency',
  /** A concept no lesson links to and no concept relates to — unreachable. */
  ORPHAN_CONCEPT: 'orphan-concept',
} as const;

export type DiagnosticCode = (typeof DIAGNOSTIC_CODES)[keyof typeof DIAGNOSTIC_CODES];

/** The result of any operation that can partially fail. */
export interface ParseResult<T> {
  data: T | null;
  diagnostics: Diagnostic[];
}

export function hasErrors(diagnostics: readonly Diagnostic[]): boolean {
  return diagnostics.some((d) => d.severity === 'error');
}

export function formatDiagnostic(d: Diagnostic): string {
  const at = d.line === null ? d.file : `${d.file}:${d.line}`;
  return `${d.severity} ${at} [${d.code}] ${d.message}`;
}
