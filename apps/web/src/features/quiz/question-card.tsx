/**
 * One question, and the teaching that follows an answer.
 *
 * Stateless by contract: it is handed a Question, what the student picked, and
 * whether that pick has been checked. It decides nothing about correctness —
 * the quiz-engine already did — and it authors no content. Every sentence on
 * screen comes from `content/lessons/<lesson>/quiz.md`.
 *
 * The explanation is the point of the whole screen. A red X teaches nothing;
 * the paragraph saying *why the distractor you chose is wrong* is what turns a
 * wrong answer into a lesson, so it is revealed in full, not summarized.
 */
import { Check, Lightbulb, TriangleAlert, X } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Answer, AnswerKey, Question } from '@cyberatlas/core';
import { explainDistractor } from '@cyberatlas/quiz-engine';

import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { assetUrl } from '@/shared/content/content';
import { cn } from '@/shared/lib/utils';

interface QuestionCardProps {
  readonly question: Question;
  /**
   * The answers in *display* order — shuffled for an exam, authored for a
   * quiz. Selection still travels by canonical key; only the labels follow
   * the position on screen.
   */
  readonly answers: readonly Answer[];
  readonly selected: AnswerKey | null;
  /** Once checked, the answers lock and the explanation opens. */
  readonly checked: boolean;
  readonly correct: boolean;
  readonly onSelect: (key: AnswerKey) => void;
}

/**
 * The label a student sees is the position, never the canonical key.
 *
 * Hebrew, because the exam is Hebrew and the lecturer's papers letter their
 * options א–ה. The canonical key stays Latin (`correct: C`) — it is what the
 * grader matches on and what every content file is written in, and it is never
 * shown. Position, not key, is what the student reads.
 */
const POSITION_LABELS = ['א', 'ב', 'ג', 'ד', 'ה'] as const;

/** Enum → label. UI chrome, not content: it names a field, it does not teach. */
const DIFFICULTY: Record<Question['difficulty'], string> = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'קשה',
};

export function QuestionCard({
  question,
  answers,
  selected,
  checked,
  correct,
  onSelect,
}: QuestionCardProps): ReactNode {
  const misconception = selected !== null ? explainDistractor(question, selected) : null;

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-sm bg-muted px-2 py-1 font-medium text-muted-foreground">
          {DIFFICULTY[question.difficulty]}
        </span>
        <span className="rounded-sm bg-muted px-2 py-1 font-medium text-muted-foreground">
          {question.points} נקודות
        </span>
      </div>

      <h2 className="max-w-[72ch] whitespace-pre-line text-left text-xl font-semibold leading-relaxed" dir="ltr">
        {question.prompt}
      </h2>

      {/* A question about a drawing shows the drawing. Light background even
          in dark mode — diagrams are authored on white. */}
      {question.images.length > 0 ? (
        <div className="max-w-[72ch] space-y-3">
          {question.images.map((src) => (
            <img
              key={src}
              src={assetUrl(src)}
              alt="תרשים המצורף לשאלה"
              className="max-w-full rounded-lg border border-border bg-white p-2"
              loading="lazy"
            />
          ))}
        </div>
      ) : null}

      {question.scenario !== null ? (
        <section
          aria-label="Scenario"
          className="max-w-[72ch] rounded-lg border-s-4 border-s-learn-definition bg-learn-definition/5 p-5"
          dir="ltr"
        >
          <p className="mb-2 text-left text-sm font-semibold text-learn-definition">Scenario</p>
          <p className="whitespace-pre-line text-left text-[1.0625rem] leading-[1.85] text-card-foreground">
            {question.scenario}
          </p>
        </section>
      ) : null}

      <RadioGroup
        value={selected ?? ''}
        onValueChange={(value) => onSelect(value as AnswerKey)}
        disabled={checked}
        aria-label="אפשרויות התשובה"
        // Answers are text-base, the prompt above is text-xl. At an equal `ch`
        // cap the boxes would render narrower than the prompt and, right-aligned
        // in the RTL page, leave a gap on the left. 90ch here ≈ 72ch at text-xl,
        // so the option boxes line up with the prompt's width.
        className="max-w-[90ch] gap-3"
        dir="ltr"
      >
        {answers.map((answer, position) => (
          <AnswerOption
            key={answer.key}
            questionId={question.id}
            answerKey={answer.key}
            label={POSITION_LABELS[position] ?? answer.key}
            text={answer.text}
            isSelected={selected === answer.key}
            isCorrect={question.correct === answer.key}
            checked={checked}
          />
        ))}
      </RadioGroup>

      {checked ? (
        <div className="max-w-[72ch] space-y-4">
          <Verdict correct={correct} />

          <section
            aria-label="הסבר"
            className="rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Lightbulb className="size-4" aria-hidden />
              הסבר
            </p>
            <p className="whitespace-pre-line text-[1.0625rem] leading-[1.85] text-card-foreground">
              {question.explanation}
            </p>
          </section>

          {/* Only shown when the student actually fell into the trap. */}
          {!correct && misconception !== null ? (
            <section
              aria-label="המלכודת"
              className="rounded-lg border-s-4 border-s-learn-warning bg-learn-warning/5 p-5"
              dir="ltr"
            >
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-learn-warning" dir="rtl">
                <TriangleAlert className="size-4" aria-hidden />
                המלכודת שנפלת בה
              </p>
              <p className="whitespace-pre-line text-left text-[1.0625rem] leading-[1.85] text-card-foreground">
                {misconception}
              </p>
            </section>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

/**
 * State is never signalled by color alone: every marked option carries an icon
 * and a written label, so it survives both colour-blindness and a screen reader.
 */
function AnswerOption({
  questionId,
  answerKey,
  label,
  text,
  isSelected,
  isCorrect,
  checked,
}: {
  readonly questionId: string;
  readonly answerKey: AnswerKey;
  /** The position letter shown to the student — not the canonical key. */
  readonly label: string;
  readonly text: string;
  readonly isSelected: boolean;
  readonly isCorrect: boolean;
  readonly checked: boolean;
}): ReactNode {
  const id = `${questionId}-${answerKey}`;

  const showCorrect = checked && isCorrect;
  const showWrong = checked && isSelected && !isCorrect;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md border p-4 transition-colors',
        !checked && 'cursor-pointer border-border hover:bg-accent',
        !checked && isSelected && 'border-primary bg-accent',
        showCorrect && 'border-learn-example bg-learn-example/5',
        showWrong && 'border-learn-warning bg-learn-warning/5',
        checked && !showCorrect && !showWrong && 'border-border opacity-60',
      )}
      dir="ltr"
    >
      <RadioGroupItem value={answerKey} id={id} className="mt-1.5" />

      <label htmlFor={id} className={cn('flex-1 text-left leading-[1.85]', !checked && 'cursor-pointer')}>
        <span className="me-2 font-semibold text-muted-foreground">{label}.</span>
        {text}

        {showCorrect ? (
          <span className="ms-2 inline-flex items-center gap-1 whitespace-nowrap align-middle text-sm font-semibold text-learn-example" dir="rtl">
            <Check className="size-4" aria-hidden />
            התשובה הנכונה
          </span>
        ) : null}

        {showWrong ? (
          <span className="ms-2 inline-flex items-center gap-1 whitespace-nowrap align-middle text-sm font-semibold text-learn-warning" dir="rtl">
            <X className="size-4" aria-hidden />
            בחרת בזו
          </span>
        ) : null}
      </label>
    </div>
  );
}

function Verdict({ correct }: { readonly correct: boolean }): ReactNode {
  return (
    <p
      role="status"
      className={cn(
        'flex items-center gap-2 text-base font-semibold',
        correct ? 'text-learn-example' : 'text-learn-warning',
      )}
    >
      {correct ? (
        <>
          <Check className="size-5" aria-hidden />
          תשובה נכונה
        </>
      ) : (
        <>
          <X className="size-5" aria-hidden />
          תשובה שגויה
        </>
      )}
    </p>
  );
}
