import type { Concept, Lesson, ParseResult, Quiz, Flashcard } from '@cyberatlas/core';

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
  /** Concept slugs known to exist, so `[[Firewall]]` can be checked. */
  readonly knownConcepts: ReadonlySet<string>;
  /** Asset paths known to exist, so `![[firewall.png]]` can be checked. */
  readonly knownAssets: ReadonlySet<string>;
  /** Path reported in diagnostics. */
  readonly file: string;
}

export type LessonParseResult = ParseResult<Lesson>;
export type ConceptParseResult = ParseResult<Concept>;
export type QuizParseResult = ParseResult<Quiz>;
export type FlashcardsParseResult = ParseResult<Flashcard[]>;
