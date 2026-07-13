/**
 * Lessons index — every lesson the vault compiled, in course order.
 *
 * Reads the metadata index only: opening this page must not download a single
 * lesson body.
 */
import { BookOpen, Clock } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';
import { Card } from '@/shared/components/ui/card';
import { lessonIndex } from '@/shared/content/content';
import { lessonPath } from '@/router/routes';

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'מתקדם',
};

export default function LessonsPage(): ReactNode {
  const lessons = lessonIndex();

  if (lessons.length === 0) {
    return (
      <>
        <PageHeader
          title="שיעורים"
          description="כל שיעור מלמד נושא מרכזי אחד, ומרכיב אותו ממושגים קיימים."
        />
        <EmptyState
          icon={BookOpen}
          title="אין עדיין שיעורים"
          description="השיעורים נטענים מהמאגר בזמן בנייה. הריצו את קימפול התוכן כדי לייצר אותם."
          hint="pnpm content:build"
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="שיעורים"
        description="כל שיעור מלמד נושא מרכזי אחד, ומרכיב אותו ממושגים קיימים."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={lessonPath(lesson.id)} className="block h-full">
              <Card className="flex h-full flex-col gap-3 p-5 transition-colors hover:border-primary/40 hover:bg-muted/40">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {lesson.lessonNumber !== null ? (
                    <span className="rounded-md bg-muted px-1.5 py-0.5 font-medium">
                      שיעור {lesson.lessonNumber}
                    </span>
                  ) : null}
                  {lesson.category !== null ? <span>{lesson.category}</span> : null}
                </div>

                <h2 className="text-lg font-semibold leading-snug">{lesson.title}</h2>

                <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                  {lesson.estimatedTime !== null ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" aria-hidden />
                      {lesson.estimatedTime} דק׳
                    </span>
                  ) : null}
                  <span>{DIFFICULTY_LABELS[lesson.difficulty] ?? lesson.difficulty}</span>
                  <span>{lesson.sectionCount} פרקים</span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
