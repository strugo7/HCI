/**
 * The exam gate — what makes the unit-exam standard enforced rather than
 * aspirational.
 *
 * Three rules, matching the "Unit Exam Standard" in the quiz-generator skill:
 *
 * 1. Shuffle safety. Exam answers are shuffled on every attempt, so an
 *    explanation that says "תשובה C שגויה" would point at a different option
 *    for every student. Standalone A–E tokens in explanations are an error.
 *
 * 2. Distractor parity. Students learn that the longest option is the right
 *    one. A single conspicuously-long correct answer is a warning; an exam
 *    where the correct answer is the strictly longest option in more than 35%
 *    of questions has the tell baked in, and that is an error.
 *
 * 3. Integration. A summative exam must be more than its lesson quizzes
 *    reshuffled: at least 40% of questions should span concepts from two or
 *    more lessons. Below that is a warning — the mapping from concepts to
 *    lessons is honest but not exact, so it flags rather than blocks.
 */
import type { Diagnostic, Exam, Lesson, Question } from '@cyberatlas/core';

/**
 * A standalone A–E token, in the sense a student would read as an option
 * letter. Letters inside words (WAF), compounds (C&C, E-mail) and numbers'
 * neighbors are not references.
 */
const LETTER_REF = /(?<![A-Za-z0-9&])[A-E](?![A-Za-z0-9&]|-[A-Za-z])/;

/** The share of questions allowed to have a strictly-longest correct answer. */
const LONGEST_CORRECT_MAX_RATIO = 0.35;
/** A correct answer this much longer than the mean distractor stands out. */
const CONSPICUOUS_RATIO = 1.35;
/** The share of questions that must span two or more lessons. */
const INTEGRATIVE_MIN_RATIO = 0.4;

function examFile(exam: Exam): string {
  return `content/exams/${exam.unit}.md`;
}

/** Is the correct answer the strictly longest option of its question? */
function correctIsLongest(question: Question): boolean {
  const correct = question.answers.find((a) => a.key === question.correct);
  if (!correct) return false;
  return question.answers.every(
    (a) => a.key === question.correct || a.text.length < correct.text.length,
  );
}

export function lintExams(
  exams: readonly Exam[],
  lessons: readonly Lesson[],
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  // Which lesson owns each concept — the *most specific* claimant, i.e. the
  // lesson with the fewest concepts that lists it. Survey lessons
  // (defense-in-depth lists nearly every defensive concept) would otherwise
  // swallow ownership of everything they mention, and a question spanning
  // firewall + DMZ + WAF would look single-lesson. The owner's identity is
  // internal to this check; what matters is that two concepts held by two
  // *focused* lessons register as breadth.
  const conceptCount = new Map(lessons.map((lesson) => [lesson.id, lesson.concepts.length]));
  const lessonOfConcept = new Map<string, string>();
  for (const lesson of lessons) {
    for (const slug of lesson.concepts) {
      const current = lessonOfConcept.get(slug);
      if (
        current === undefined ||
        (conceptCount.get(lesson.id) ?? Infinity) < (conceptCount.get(current) ?? Infinity)
      ) {
        lessonOfConcept.set(slug, lesson.id);
      }
    }
  }

  for (const exam of exams) {
    const file = examFile(exam);
    let longestCorrect = 0;
    let integrative = 0;

    for (const question of exam.questions) {
      /* Rule 1 — shuffle safety. */
      for (const [field, text] of [
        ['explanation', question.explanation],
        ['misconception', question.misconception ?? ''],
      ] as const) {
        if (LETTER_REF.test(text)) {
          diagnostics.push({
            severity: 'error',
            file,
            line: null,
            column: null,
            message:
              `Question "${question.id}": ${field} references an option letter. ` +
              'Exam answers are shuffled at runtime — refer to answers by content, never by letter.',
            code: 'malformed-quiz',
          });
        }
      }

      /* Rule 2 — distractor parity, per question. */
      const correct = question.answers.find((a) => a.key === question.correct);
      const others = question.answers.filter((a) => a.key !== question.correct);
      if (correct && others.length > 0) {
        const mean = others.reduce((n, a) => n + a.text.length, 0) / others.length;
        if (correctIsLongest(question)) {
          longestCorrect += 1;
          if (correct.text.length > mean * CONSPICUOUS_RATIO) {
            diagnostics.push({
              severity: 'warning',
              file,
              line: null,
              column: null,
              message:
                `Question "${question.id}": the correct answer is conspicuously the longest option ` +
                `(${correct.text.length} chars vs. a mean of ${Math.round(mean)}). ` +
                'Give the distractors the same specificity.',
              code: 'malformed-quiz',
            });
          }
        }
      }

      /* Rule 3 — integration, per question. */
      const spanned = new Set<string>();
      for (const slug of question.concepts) {
        const owner = lessonOfConcept.get(slug);
        if (owner !== undefined) spanned.add(owner);
      }
      if (spanned.size >= 2) integrative += 1;
    }

    /* Rule 2 — the exam-wide tell. */
    const total = exam.questions.length;
    if (total > 0 && longestCorrect / total > LONGEST_CORRECT_MAX_RATIO) {
      diagnostics.push({
        severity: 'error',
        file,
        line: null,
        column: null,
        message:
          `Exam "${exam.id}": the correct answer is the longest option in ${longestCorrect} of ` +
          `${total} questions (max allowed: ${Math.floor(total * LONGEST_CORRECT_MAX_RATIO)}). ` +
          'A student who always picks the longest answer would pass — rebalance the distractors.',
        code: 'malformed-quiz',
      });
    }

    /* Rule 3 — the exam-wide floor. */
    if (total > 0 && integrative / total < INTEGRATIVE_MIN_RATIO) {
      diagnostics.push({
        severity: 'warning',
        file,
        line: null,
        column: null,
        message:
          `Exam "${exam.id}": only ${integrative} of ${total} questions span concepts from two or ` +
          'more lessons. A summative exam should integrate — target at least 40%.',
        code: 'malformed-quiz',
      });
    }
  }

  return diagnostics;
}
