/**
 * Practice index — every lesson that ships a quiz.
 *
 * The counts come from the compiled index, so this page never downloads a
 * single quiz in order to tell you how many questions it holds.
 */
import { ClipboardList } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { quizPath } from '@/router/routes';
import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';
import { quizzesIndex } from '@/shared/content/content';

export default function PracticePage(): ReactNode {
  const quizzes = quizzesIndex();

  return (
    <>
      <PageHeader
        title="תרגול"
        description="חידון לכל שיעור. כל תשובה נפתחת להסבר שמראה גם למה המסיחים האחרים שגויים."
      />

      {quizzes.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="אין עדיין חומר לתרגול"
          description="כל שיעור מחזיק קובץ חידון משלו, והם ייאספו לכאן."
          hint="pnpm content:build"
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {quizzes.map((lesson) => (
            <li key={lesson.id}>
              <Link
                to={quizPath(lesson.quizRef ?? lesson.id)}
                className="flex h-full items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ClipboardList className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div className="space-y-1">
                  <p className="font-semibold leading-snug">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground">{lesson.questionCount} שאלות</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
