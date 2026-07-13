/**
 * The quiz, running.
 *
 * This is the only stateful piece: it holds what the student picked and which
 * questions they have already checked. It does not decide what is *correct* —
 * `gradeQuiz` does, and it is called on the whole submission so that the same
 * engine that produces the final score also produces the per-question verdict.
 * There is no second copy of "is this answer right" living in React.
 *
 * One question at a time, checked one at a time. A score at the end teaches
 * nothing; an explanation the moment you are wrong is the entire point.
 *
 * It runs two kinds of assessment. A lesson quiz keeps its authored answer
 * order — its explanations may reference it. A unit exam shuffles the answers
 * on every attempt, so the material is the only thing a retake can rehearse;
 * exam content is written (and lint-enforced) to never name option letters.
 */
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { AnswerKey, Exam, Quiz } from '@cyberatlas/core';
import { gradeQuiz } from '@cyberatlas/quiz-engine';

import { lessonPath, ROUTES } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import { QuestionCard } from './question-card';
import { QuizSummary } from './quiz-summary';
import { shuffleAnswers, type AnswerOrder } from './shuffle';

/** The real exam passes at 60; a practice quiz asks a little more of you. */
const EXAM_PASS = 0.6;
const QUIZ_PASS = 0.7;

export function QuizRunner({ quiz }: { readonly quiz: Quiz | Exam }): ReactNode {
  const isExam = quiz.type === 'exam';

  const [answers, setAnswers] = useState<ReadonlyMap<string, AnswerKey | null>>(new Map());
  const [checked, setChecked] = useState<ReadonlySet<string>>(new Set());
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  // One display order per attempt. `null` means "as authored" — lesson quizzes.
  const [order, setOrder] = useState<AnswerOrder | null>(() =>
    isExam ? shuffleAnswers(quiz.questions) : null,
  );

  // The engine grades. The UI only reads the verdict it produced.
  const result = useMemo(
    () => gradeQuiz(quiz, answers, { passThreshold: isExam ? EXAM_PASS : QUIZ_PASS }),
    [quiz, answers, isExam],
  );

  const question = quiz.questions[index];
  const total = quiz.questions.length;

  const back = isExam
    ? { to: ROUTES.exams, label: 'חזרה למבחנים' }
    : { to: lessonPath(quiz.lesson), label: 'חזרה לשיעור' };

  const restart = (): void => {
    setAnswers(new Map());
    setChecked(new Set());
    setIndex(0);
    setFinished(false);
    // A fresh attempt gets a fresh order — this is what makes the shuffle real.
    if (isExam) setOrder(shuffleAnswers(quiz.questions));
  };

  if (!question) return null;

  if (finished) {
    return <QuizSummary quiz={quiz} result={result} backTo={back} onRetry={restart} />;
  }

  const selected = answers.get(question.id) ?? null;
  const isChecked = checked.has(question.id);
  const verdict = result.results[index];
  const isLast = index === total - 1;

  const allChecked = quiz.questions.every((q) => checked.has(q.id));

  /**
   * The nearest question still unchecked, looking forward and wrapping — the
   * place "דלג" goes to, and the place "הבאה" falls back to from the end.
   */
  const nextUnchecked = (from: number): number | null => {
    for (let step = 1; step <= total; step += 1) {
      const i = (from + step) % total;
      const candidate = quiz.questions[i];
      if (candidate && !checked.has(candidate.id)) return i;
    }
    return null;
  };
  const skipTarget = nextUnchecked(index);

  return (
    <>
      <header className="mb-8 space-y-3">
        <Link
          to={back.to}
          className="-ms-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {/* Mirrors: "back" points to the start edge, which in RTL is right. */}
          <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden />
          {back.label}
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">{quiz.title}</h1>

        <p className="text-sm text-muted-foreground">
          שאלה {index + 1} מתוך {total} · נבדקו {checked.size}
        </p>
      </header>

      {/* Every question is one tap away, in both directions — skipping a
          question is only useful if there is a way back to it. */}
      <nav aria-label="ניווט בין השאלות" className="mb-6 flex max-w-[72ch] flex-wrap gap-1.5">
        {quiz.questions.map((q, i) => {
          const isCurrent = i === index;
          const isDone = checked.has(q.id);
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`שאלה ${i + 1}${isDone ? ' — נבדקה' : isCurrent ? ' — נוכחית' : ''}`}
              className={cn(
                'size-8 rounded-md border text-sm font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isCurrent
                  ? 'border-primary bg-primary text-primary-foreground'
                  : isDone
                    ? 'border-border bg-muted text-muted-foreground hover:bg-accent'
                    : 'border-border bg-card hover:bg-accent',
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </nav>

      <QuestionCard
        question={question}
        answers={order?.get(question.id) ?? question.answers}
        selected={selected}
        checked={isChecked}
        correct={verdict?.correct ?? false}
        onSelect={(key) => setAnswers((prev) => new Map(prev).set(question.id, key))}
      />

      <div className="mt-8 flex max-w-[72ch] flex-wrap items-center gap-3">
        {!isChecked ? (
          <>
            <Button
              // A student cannot check nothing — the control tells the truth about
              // whether it will do anything.
              disabled={selected === null}
              onClick={() => setChecked((prev) => new Set(prev).add(question.id))}
            >
              בדיקה
            </Button>
            {/* Skipping goes to the nearest question still open — and the
                navigator above is the way back. */}
            {skipTarget !== null && skipTarget !== index ? (
              <Button variant="outline" onClick={() => setIndex(skipTarget)}>
                דלג לבינתיים
              </Button>
            ) : null}
          </>
        ) : allChecked ? (
          <Button onClick={() => setFinished(true)}>סיום</Button>
        ) : !isLast ? (
          <Button onClick={() => setIndex((i) => i + 1)}>לשאלה הבאה</Button>
        ) : skipTarget !== null ? (
          <Button onClick={() => setIndex(skipTarget)}>לשאלה שדילגת עליה</Button>
        ) : (
          <Button onClick={() => setFinished(true)}>סיום</Button>
        )}

        {/* The exam never traps you: questions can stay unanswered, and the
            summary will call them skipped rather than wrong. */}
        {isChecked && !allChecked ? (
          <Button variant="ghost" onClick={() => setFinished(true)}>
            סיום בלי לענות על הכל
          </Button>
        ) : null}

        {isChecked ? (
          <Button variant="ghost" onClick={restart}>
            <RotateCcw className="size-4" aria-hidden />
            התחלה מחדש
          </Button>
        ) : null}
      </div>
    </>
  );
}
