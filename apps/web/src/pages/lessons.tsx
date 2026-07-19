/**
 * Lessons index — every compiled lesson, grouped by its unit in course order.
 *
 * A flat grid hides the course's spine; grouping by unit shows the sequence and
 * where each lesson sits in it. Reads the metadata index only — opening this
 * page downloads no lesson bodies.
 */
import { BookOpen } from 'lucide-react';
import type { ReactNode } from 'react';

import { LessonRow } from '@/features/curriculum/lesson-row';
import { EmptyState } from '@/shared/components/empty-state';
import { lessonsInUnit, unitIndex } from '@/shared/content/content';

function LessonsHeader(): ReactNode {
  return (
    <header className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        ספריית תוכן
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">שיעורים</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        כל שיעור מלמד נושא מרכזי אחד ומרכיב אותו ממושגים קיימים — מקובצים לפי נושא,
        בסדר הלימוד של הקורס.
      </p>
    </header>
  );
}

export default function LessonsPage(): ReactNode {
  const units = unitIndex();
  const hasAnyLesson = units.some((unit) => lessonsInUnit(unit).length > 0);

  if (!hasAnyLesson) {
    return (
      <>
        <LessonsHeader />
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
      <LessonsHeader />

      <div className="space-y-10">
        {units.map((unit, unitIdx) => {
          const lessons = lessonsInUnit(unit);
          const pending = unit.lessons.length - lessons.length;

          return (
            <section key={unit.id} aria-labelledby={`unit-${unit.id}`}>
              {/* Unit divider — the big gold number carries the sequence */}
              <div className="mb-4 flex items-baseline gap-3 border-b-2 border-foreground pb-3">
                <span className="text-3xl font-extrabold tabular-nums leading-none tracking-tight text-gold">
                  {String(unitIdx + 1).padStart(2, '0')}
                </span>
                <h2
                  id={`unit-${unit.id}`}
                  className="text-lg font-bold leading-tight tracking-tight"
                >
                  {unit.title}
                </h2>
                <span className="ms-auto shrink-0 text-sm font-medium text-muted-foreground">
                  {unit.weight}% מהמבחן
                </span>
              </div>

              <div className="space-y-2.5">
                {lessons.map((lesson, i) => (
                  <LessonRow key={lesson.id} lesson={lesson} step={i + 1} />
                ))}
                {pending > 0 ? (
                  <p className="px-1 pt-1 text-sm text-muted-foreground">
                    {lessons.length > 0 ? 'עוד ' : ''}
                    {pending} {pending === 1 ? 'שיעור' : 'שיעורים'} בהכנה
                  </p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
