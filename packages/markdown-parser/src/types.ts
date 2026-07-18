import type { Concept, Exam, Lesson, ParseResult, Quiz, Flashcard } from '@cyberatlas/core';

/**
 * The raw files that make up one lesson directory, read off disk.
 * Only `lesson` is required; a lesson may ship without a quiz or mindmap.
 */
export interface LessonBundle {
  /** Directory name, e.g. "lesson-01". Becomes the lesson id scope. */
  readonly dir: string;
  readonly lesson: string;
  readonly summary?: string;
  readonly quiz?: string;
  readonly flashcards?: string;
  readonly mindmap?: string;
  readonly assets?: string;
}

/** Everything the parser resolves links against. */
export interface ParseContext {
  /**
   * Every writable form of a concept → its canonical slug.
   * Keys are slugified, so `[[Usability]]`, `[[usability]]` and the alias
   * `[[שמישות]]` all resolve to the one concept that owns the definition.
   */
  readonly concepts: ReadonlyMap<string, string>;
  /**
   * File name → vault-relative path, so `![[Mental Model Diagram.png]]` can be both
   * checked and resolved. An embed of a file the vault does not hold is a
   * build error, not a broken image a student finds.
   */
  readonly assets: ReadonlyMap<string, string>;
  /** Path reported in diagnostics. For a lesson, the bundle directory. */
  readonly file: string;
}

export type LessonParseResult = ParseResult<Lesson>;
export type ConceptParseResult = ParseResult<Concept>;
export type QuizParseResult = ParseResult<Quiz>;
export type ExamParseResult = ParseResult<Exam>;
export type FlashcardsParseResult = ParseResult<Flashcard[]>;
