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
 */
import type { FlashcardsParseResult, ParseContext, QuizParseResult } from './types.js';

export * from './types.js';
export { parseLesson } from './lesson.js';
export { parseConcept, conceptKeys, readConceptFrontmatter } from './concept.js';

/**
 * Quiz and flashcard files use a DSL of their own (`## Question`, `## Card`)
 * and belong to the quiz-engine, not to the lesson pipeline. A lesson carries
 * only a *reference* to them — which is why a lesson page renders fully
 * without either being parsed.
 */
const NOT_IMPLEMENTED = 'Quiz and flashcard parsing is not implemented yet.';

export function parseQuiz(_source: string, _ctx: ParseContext): QuizParseResult {
  throw new Error(NOT_IMPLEMENTED);
}

export function parseFlashcards(_source: string, _ctx: ParseContext): FlashcardsParseResult {
  throw new Error(NOT_IMPLEMENTED);
}
