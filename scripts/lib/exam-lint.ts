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

/**
 * The same rule, in the alphabet the explanations are actually written in.
 *
 * The Latin check above has only ever fired because our own exams happen to
 * name options in Latin ("תשובה C שגויה" — the case its own comment cites). But
 * the option letters a student *sees* are Hebrew, and the natural way to write
 * a Hebrew explanation is "תשובה א׳ נכונה". That sailed straight past the Latin
 * regex, which means the one rule protecting a shuffled exam was not actually
 * checking the thing it exists to check.
 *
 * Two shapes, because Hebrew writes the reference two ways:
 *
 *   1. A letter carrying a geresh — "א׳", "ב'" — which is only ever an ordinal.
 *   2. A letter after the word that introduces it — "תשובה א", "מסיח ב".
 *
 * A bare letter with no geresh and no introducing word is *not* matched: ב, ו,
 * ה and ל are ordinary Hebrew prefixes, and flagging them would bury the real
 * hits under noise until authors learned to ignore the rule.
 *
 * Two exclusions, both learned the hard way from real content:
 *
 *   - The trailing `-[A-Za-z]` guard, which the Latin rule needs for the same
 *     reason. "אפשרות ה-True Negative" is the definite article bolted onto a
 *     foreign term, not a fifth option — and our IDS exam says exactly that.
 *
 *   - The second pattern stops at ד and does not accept a bare ה, because ה
 *     after an introducing word is nearly always the definite article:
 *     "המסיחים ה'פאסיביים'", "אפשרות ה'כוללת'". A genuine reference to option ה
 *     carries a geresh — "תשובה ה'" — and the first pattern already has it.
 */
const HEBREW_LETTER_REFS = [
  /(?<![֐-׿])[א-ה][׳'](?![֐-׿])/,
  /(?:תשוב(?:ה|ות)|מסיח(?:ים)?|סעיף|אפשרות)\s+[א-ד](?![֐-׿]|-[A-Za-z0-9])/,
] as const;

/** Does this text name an option by its letter, in either alphabet? */
function namesAnOptionLetter(text: string): boolean {
  return LETTER_REF.test(text) || HEBREW_LETTER_REFS.some((re) => re.test(text));
}

/** The share of questions allowed to have a strictly-longest correct answer. */
const LONGEST_CORRECT_MAX_RATIO = 0.35;
/** A correct answer this much longer than the mean distractor stands out. */
const CONSPICUOUS_RATIO = 1.35;
/** The share of questions that must span two or more lessons. */
const INTEGRATIVE_MIN_RATIO = 0.4;

/**
 * A lecturer exam has no unit, so the old `content/exams/${exam.unit}.md` would
 * point every one of its diagnostics at `content/exams/null.md`.
 */
function examFile(exam: Exam): string {
  return exam.kind === 'lecturer'
    ? `content/exams/lecturer/${exam.id}.md`
    : `content/exams/${exam.unit ?? exam.id}.md`;
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

    /*
     * A lecturer exam is an archive of someone else's paper, not an exam we
     * designed. Rules 2 and 3 judge *authoring* quality — we cannot rewrite his
     * distractors to be the same length, and we do not get to decide how many
     * of his questions span two lessons. Rule 1 stays on: the explanations are
     * ours, and they are shown against shuffled answers.
     */
    const authored = exam.kind !== 'lecturer';

    for (const question of exam.questions) {
      /* Rule 1 — shuffle safety. Applies to every exam, in both alphabets. */
      for (const [field, text] of [
        ['explanation', question.explanation],
        ['misconception', question.misconception ?? ''],
      ] as const) {
        // A question whose options are pinned is exempt: nothing is reordered,
        // so a letter still points where the author meant it to.
        if (!question.lockAnswerOrder && namesAnOptionLetter(text)) {
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

      if (!authored) continue;

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

    if (!authored) continue;

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
