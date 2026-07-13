/**
 * The score, and what to do about it.
 *
 * A number alone is not feedback. The review list names every question the
 * student got wrong, so the score is a way *back into the material* rather
 * than a verdict on them.
 */
import { Check, ChevronLeft, RotateCcw, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { Quiz, QuizResult } from '@cyberatlas/core';

import { lessonPath } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface QuizSummaryProps {
  readonly quiz: Quiz;
  readonly result: QuizResult;
  readonly onRetry: () => void;
}

export function QuizSummary({ quiz, result, onRetry }: QuizSummaryProps): ReactNode {
  const percent = Math.round(result.ratio * 100);
  const rightCount = result.results.filter((r) => r.correct).length;

  return (
    <>
      <header className="mb-8 space-y-3">
        <Link
          to={lessonPath(quiz.lesson)}
          className="-ms-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden />
          חזרה לשיעור
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">{quiz.title}</h1>
      </header>

      <section
        aria-label="התוצאה"
        className={cn(
          'max-w-[72ch] rounded-lg border-s-4 bg-card p-6 shadow-sm',
          result.passed ? 'border-s-learn-example' : 'border-s-learn-important',
        )}
      >
        <p className="text-sm font-medium text-muted-foreground">התוצאה שלך</p>

        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-4xl font-bold tabular-nums">{percent}%</span>
          <span className="text-muted-foreground">
            {result.score} מתוך {result.maxScore} נקודות
          </span>
        </p>

        <p className="mt-3 flex items-center gap-2 font-semibold">
          {result.passed ? (
            <>
              <Check className="size-5 text-learn-example" aria-hidden />
              <span className="text-learn-example">עברת</span>
            </>
          ) : (
            <>
              <X className="size-5 text-learn-important" aria-hidden />
              <span className="text-learn-important">לא עברת</span>
            </>
          )}
          <span className="font-normal text-muted-foreground">
            — {rightCount} תשובות נכונות מתוך {result.results.length}
          </span>
        </p>
      </section>

      <section aria-labelledby="quiz-review" className="mt-8 max-w-[72ch]">
        <h2 id="quiz-review" className="mb-4 text-sm font-medium text-muted-foreground">
          סקירת השאלות
        </h2>

        <ol className="flex flex-col gap-2">
          {result.results.map((r, i) => {
            const question = quiz.questions[i];
            if (!question) return null;

            return (
              <li
                key={r.questionId}
                className={cn(
                  'flex items-start gap-3 rounded-md border p-4',
                  r.correct
                    ? 'border-learn-example/40 bg-learn-example/5'
                    : 'border-learn-warning/40 bg-learn-warning/5',
                )}
              >
                {r.correct ? (
                  <Check className="mt-1 size-4 shrink-0 text-learn-example" aria-hidden />
                ) : (
                  <X className="mt-1 size-4 shrink-0 text-learn-warning" aria-hidden />
                )}

                <div className="space-y-1">
                  <p className="whitespace-pre-line leading-relaxed">{question.prompt}</p>
                  <p className="text-sm text-muted-foreground">
                    {/* A skip is not a wrong answer, and the review says so. */}
                    {r.selected === null
                      ? 'לא נענתה'
                      : r.correct
                        ? 'ענית נכון'
                        : `ענית ${r.selected} — הנכונה היא ${question.correct}`}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-8 flex max-w-[72ch] items-center gap-3">
        <Button onClick={onRetry}>
          <RotateCcw className="size-4" aria-hidden />
          לפתור שוב
        </Button>
        <Button variant="outline" asChild>
          <Link to={lessonPath(quiz.lesson)}>חזרה לשיעור</Link>
        </Button>
      </div>
    </>
  );
}
