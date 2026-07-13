/**
 * @cyberatlas/quiz-engine
 *
 * Assessment logic, with zero UI. Takes Quiz objects and a student's
 * submission, returns results. Framework-independent by design: the same
 * engine must work for web, CLI, and future clients.
 *
 * Status: contracts defined, implementation pending.
 */
import type { AnswerKey, Question, Quiz, QuizResult } from '@cyberatlas/core';

/** What the student picked. `null` means skipped — which is not the same as wrong. */
export type Submission = ReadonlyMap<string, AnswerKey | null>;

export interface GradingOptions {
  /** Fraction of maxScore needed to pass. */
  readonly passThreshold: number;
}

export const DEFAULT_GRADING: GradingOptions = { passThreshold: 0.7 };

const NOT_IMPLEMENTED = 'Quiz engine not implemented yet.';

/** Grade a submission. Pure — no storage, no side effects. */
export function gradeQuiz(
  _quiz: Quiz,
  _submission: Submission,
  _options?: GradingOptions,
): QuizResult {
  throw new Error(NOT_IMPLEMENTED);
}

/**
 * The misconception a wrong answer reveals, if the question declares one.
 * This is what turns a wrong answer into teaching rather than a red X.
 */
export function explainDistractor(_question: Question, _selected: AnswerKey): string | null {
  throw new Error(NOT_IMPLEMENTED);
}

/**
 * Next review date under spaced repetition, given past performance.
 * Days since epoch, so the caller owns the clock and this stays pure.
 */
export function scheduleReview(_correct: boolean, _repetition: number): number {
  throw new Error(NOT_IMPLEMENTED);
}
