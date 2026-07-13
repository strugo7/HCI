/**
 * @cyberatlas/quiz-engine
 *
 * Assessment logic, with zero UI. Takes Quiz objects and a student's
 * submission, returns results. Framework-independent by design: the same
 * engine must work for web, CLI, and future clients.
 *
 * Everything here is pure. No storage, no side effects, and no clock — a
 * function that reads the time cannot be tested, and a grade that depends on
 * when it was computed is not a grade.
 */
import type { AnswerKey, Gradeable, Question, QuizResult, QuestionResult } from '@cyberatlas/core';

/** What the student picked. `null` means skipped — which is not the same as wrong. */
export type Submission = ReadonlyMap<string, AnswerKey | null>;

export interface GradingOptions {
  /** Fraction of maxScore needed to pass. */
  readonly passThreshold: number;
}

export const DEFAULT_GRADING: GradingOptions = { passThreshold: 0.7 };

/**
 * Grade a submission. Pure — no storage, no side effects.
 *
 * A skipped question and a wrong question both score zero, but they are not
 * the same event and the result keeps them apart: `selected` is `null` for one
 * and an answer key for the other. Only the student's own review can tell them
 * apart, and it should be able to.
 */
export function gradeQuiz(
  quiz: Gradeable,
  submission: Submission,
  options: GradingOptions = DEFAULT_GRADING,
): QuizResult {
  const results: QuestionResult[] = quiz.questions.map((question) => {
    const selected = submission.get(question.id) ?? null;
    const correct = selected !== null && selected === question.correct;

    return {
      questionId: question.id,
      selected,
      correct,
      pointsAwarded: correct ? question.points : 0,
    };
  });

  const score = results.reduce((sum, r) => sum + r.pointsAwarded, 0);
  const maxScore = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  // An empty quiz is worth nothing and passes nothing — never divide by zero.
  const ratio = maxScore === 0 ? 0 : score / maxScore;

  return {
    quizId: quiz.id,
    results,
    score,
    maxScore,
    ratio,
    passed: maxScore > 0 && ratio >= options.passThreshold,
  };
}

/**
 * The misconception a wrong answer reveals, if the question declares one.
 * This is what turns a wrong answer into teaching rather than a red X.
 *
 * Returns `null` when the answer was right (there is no trap to name) or when
 * the question declares no misconception. The full explanation — which says
 * why *every* distractor is wrong — is on the Question itself; this is the one
 * sentence that names the trap the student actually fell into.
 */
export function explainDistractor(question: Question, selected: AnswerKey): string | null {
  if (selected === question.correct) return null;
  return question.misconception;
}

/* ------------------------------------------------------------------ *
 * Spaced repetition
 * ------------------------------------------------------------------ */

/** Beyond a year, "review later" stops meaning anything. */
const MAX_INTERVAL_DAYS = 365;
/** The SM-2 ladder: first success in a day, second in six, then it stretches. */
const FIRST_INTERVAL = 1;
const SECOND_INTERVAL = 6;
const GROWTH = 2.5;

/**
 * How many days until this card should come back.
 *
 * Returns an *interval*, not a date: the signature takes no clock, so it
 * cannot know what today is — and that is deliberate. The caller adds the
 * interval to whatever day it considers now, which is what keeps this
 * testable and keeps the engine free of a dependency on the time.
 *
 * `repetition` is the number of times the card was already answered correctly
 * in a row. A wrong answer resets the ladder: the card comes back tomorrow,
 * because a thing you just got wrong is not a thing you know.
 */
export function scheduleReview(correct: boolean, repetition: number): number {
  if (!correct) return FIRST_INTERVAL;

  // A caller that has never tracked this card, or tracked it badly, still gets
  // a sane answer rather than NaN.
  const streak = Number.isFinite(repetition) ? Math.max(0, Math.floor(repetition)) : 0;

  if (streak === 0) return FIRST_INTERVAL;
  if (streak === 1) return SECOND_INTERVAL;

  const interval = Math.round(SECOND_INTERVAL * GROWTH ** (streak - 1));
  return Math.min(MAX_INTERVAL_DAYS, interval);
}
