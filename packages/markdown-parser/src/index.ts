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
export * from './types.js';
export { parseLesson } from './lesson.js';
export { parseConcept, conceptKeys, readConceptFrontmatter } from './concept.js';

/**
 * Quiz and flashcard files use a DSL of their own (`## Question`, `## Card`).
 * A lesson carries only a *reference* to them, never their content — which is
 * why a lesson page renders fully whether or not either was parsed.
 */
export { parseQuiz } from './quiz.js';
export { parseFlashcards } from './flashcards.js';
