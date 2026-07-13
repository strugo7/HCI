/**
 * @cyberatlas/markdown-parser
 *
 * Learning DSL Markdown → Knowledge Objects.
 *
 * The parser never renders UI, never styles, and never makes educational
 * decisions. It transforms content into a normalized representation and
 * reports every problem it finds without stopping at the first one.
 *
 * Pipeline (see docs/PARSER_SPEC.md):
 *   Markdown → MDAST → DSL directives → Knowledge Objects → diagnostics
 *
 * Status: contracts defined, implementation pending (`/build-parser`).
 */
import type {
  ConceptParseResult,
  FlashcardsParseResult,
  LessonBundle,
  LessonParseResult,
  ParseContext,
  QuizParseResult,
} from './types.js';

export * from './types.js';

const NOT_IMPLEMENTED = 'Parser not implemented yet — run /build-parser.';

/**
 * Compose a lesson directory into a single Lesson object.
 * Sections come from lesson.md; summary, quiz and flashcards are merged in
 * from their sibling files.
 */
export function parseLesson(_bundle: LessonBundle, _ctx: ParseContext): LessonParseResult {
  throw new Error(NOT_IMPLEMENTED);
}

/** Parse one concept file. A concept owns its definition. */
export function parseConcept(_source: string, _ctx: ParseContext): ConceptParseResult {
  throw new Error(NOT_IMPLEMENTED);
}

/** Parse a quiz file into independently-addressable Question objects. */
export function parseQuiz(_source: string, _ctx: ParseContext): QuizParseResult {
  throw new Error(NOT_IMPLEMENTED);
}

export function parseFlashcards(
  _source: string,
  _ctx: ParseContext,
): FlashcardsParseResult {
  throw new Error(NOT_IMPLEMENTED);
}
