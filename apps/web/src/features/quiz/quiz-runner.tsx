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
 */
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { AnswerKey, Quiz } from '@cyberatlas/core';
import { gradeQuiz } from '@cyberatlas/quiz-engine';

import { lessonPath } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';

import { QuestionCard } from './question-card';
import { QuizSummary } from './quiz-summary';

export function QuizRunner({ quiz }: { readonly quiz: Quiz }): ReactNode {
  const [answers, setAnswers] = useState<ReadonlyMap<string, AnswerKey | null>>(new Map());
  const [checked, setChecked] = useState<ReadonlySet<string>>(new Set());
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // The engine grades. The UI only reads the verdict it produced.
  const result = useMemo(() => gradeQuiz(quiz, answers), [quiz, answers]);

  const question = quiz.questions[index];
  const total = quiz.questions.length;

  if (!question) return null;

  if (finished) {
    return (
      <QuizSummary
        quiz={quiz}
        result={result}
        onRetry={() => {
          setAnswers(new Map());
          setChecked(new Set());
          setIndex(0);
          setFinished(false);
        }}
      />
    );
  }

  const selected = answers.get(question.id) ?? null;
  const isChecked = checked.has(question.id);
  const verdict = result.results[index];
  const isLast = index === total - 1;

  return (
    <>
      <header className="mb-8 space-y-3">
        <Link
          to={lessonPath(quiz.lesson)}
          className="-ms-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {/* Mirrors: "back" points to the start edge, which in RTL is right. */}
          <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden />
          חזרה לשיעור
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">{quiz.title}</h1>

        <p className="text-sm text-muted-foreground">
          שאלה {index + 1} מתוך {total}
        </p>
      </header>

      <QuestionCard
        question={question}
        selected={selected}
        checked={isChecked}
        correct={verdict?.correct ?? false}
        onSelect={(key) => setAnswers((prev) => new Map(prev).set(question.id, key))}
      />

      <div className="mt-8 flex max-w-[72ch] items-center gap-3">
        {!isChecked ? (
          <Button
            // A student cannot check nothing — the control tells the truth about
            // whether it will do anything.
            disabled={selected === null}
            onClick={() => setChecked((prev) => new Set(prev).add(question.id))}
          >
            בדיקה
          </Button>
        ) : isLast ? (
          <Button onClick={() => setFinished(true)}>סיום</Button>
        ) : (
          <Button onClick={() => setIndex((i) => i + 1)}>לשאלה הבאה</Button>
        )}

        {isChecked ? (
          <Button
            variant="ghost"
            onClick={() => {
              setAnswers(new Map());
              setChecked(new Set());
              setIndex(0);
            }}
          >
            <RotateCcw className="size-4" aria-hidden />
            התחלה מחדש
          </Button>
        ) : null}
      </div>
    </>
  );
}
