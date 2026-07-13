/**
 * Answer shuffling — the reason an exam cannot be memorized by position.
 *
 * The shuffle happens at render time, once per attempt: two students see two
 * orders, and the same student sees a new order on every retry. Keys stay
 * canonical — grading never learns the display order existed. This is also
 * why exam explanations must never name option letters, which the content
 * build enforces.
 *
 * Lesson quizzes are NOT shuffled: their explanations were written against
 * the authored order and may reference it.
 */
import type { Answer, Question } from '@cyberatlas/core';

/** Display order per question id, for one attempt. */
export type AnswerOrder = ReadonlyMap<string, readonly Answer[]>;

/** Unbiased Fisher–Yates. */
function shuffled(answers: readonly Answer[]): readonly Answer[] {
  const out = [...answers];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = out[i];
    const b = out[j];
    if (a !== undefined && b !== undefined) {
      out[i] = b;
      out[j] = a;
    }
  }
  return out;
}

export function shuffleAnswers(questions: readonly Question[]): AnswerOrder {
  return new Map(questions.map((question) => [question.id, shuffled(question.answers)]));
}
