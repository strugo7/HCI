/**
 * Unit page — the step between a topic and a lesson.
 *
 * Everything here comes from the compiled curriculum: the unit's title, its
 * blurb, and the lessons it teaches, in the order it teaches them. The page
 * decides presentation only.
 */
import { ChevronRight, FolderX, GraduationCap } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';

import { LessonRow } from '@/features/curriculum/lesson-row';
import { unitIcon } from '@/features/curriculum/units';
import { examPath, ROUTES } from '@/router/routes';
import { EmptyState } from '@/shared/components/empty-state';
import { examsIndex, lessonsInUnit, unitById, unitIndex } from '@/shared/content/content';

export default function UnitPage(): ReactNode {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = unitById(unitId);

  if (!unit) {
    return (
      <EmptyState
        icon={FolderX}
        title="היחידה לא נמצאה"
        description="אין יחידה עם המזהה הזה בקוריקולום. ייתכן שהקישור שגוי."
        hint="content/curriculum.yaml"
      />
    );
  }

  const lessons = lessonsInUnit(unit);
  const Icon = unitIcon(unit.id);
  const index = unitIndex().findIndex((u) => u.id === unit.id) + 1;
  const exam = examsIndex().find((e) => e.unit === unit.id) ?? null;

  return (
    <>
      {/* Back points to the start edge — in RTL, that is right. */}
      <Link
        to={ROUTES.dashboard}
        className="-ms-2 mb-6 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronRight className="size-4" aria-hidden />
        כל הנושאים
      </Link>

      <header className="mb-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-lg bg-secondary p-3">
            <Icon className="size-6 text-secondary-foreground" aria-hidden />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              יחידה {index}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">{unit.title}</h1>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">{unit.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
            {lessons.length} שיעורים
          </span>
          <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
            {unit.weight > 0 ? `${unit.weight}% מהמבחן` : 'לכיסוי הסילבוס'}
          </span>
          <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
            {unit.source}
          </span>
        </div>
      </header>

      <section aria-labelledby="unit-lessons">
        <h2 id="unit-lessons" className="mb-4 text-sm font-medium text-muted-foreground">
          שיעורי היחידה, בסדר הלימוד
        </h2>

        {lessons.length === 0 ? (
          <EmptyState
            icon={FolderX}
            title="אין עדיין שיעורים ביחידה"
            description="היחידה מוגדרת בקוריקולום, אך אף שיעור שלה לא נבנה עדיין."
            hint="pnpm content:build"
          />
        ) : (
          <ol className="flex flex-col gap-3">
            {lessons.map((lesson, i) => (
              <li key={lesson.id}>
                <LessonRow lesson={lesson} step={i + 1} />
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* The unit's closing act: after the last lesson, the exam that pulls
          all of them together. Distinct from a lesson row on purpose. */}
      {exam !== null ? (
        <section aria-labelledby="unit-exam" className="mt-8">
          <h2 id="unit-exam" className="mb-4 text-sm font-medium text-muted-foreground">
            לסיום היחידה
          </h2>
          <Link
            to={examPath(exam.id)}
            className="flex items-start gap-4 rounded-lg border-2 border-primary/30 bg-card p-5 shadow-sm transition-colors hover:border-primary/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="shrink-0 rounded-lg bg-primary/10 p-3">
              <GraduationCap className="size-6 text-primary" aria-hidden />
            </div>
            <div className="space-y-1">
              <p className="font-semibold leading-snug">{exam.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                מבחן שמצליב בין כל שיעורי היחידה. התשובות מעורבלות מחדש בכל ניסיון.
              </p>
              <p className="text-sm text-muted-foreground">
                {exam.questionCount} שאלות · {exam.maxScore} נק' · כ-
                {Math.max(1, Math.round(exam.estimatedTime / 60))} דק'
              </p>
            </div>
          </Link>
        </section>
      ) : null}
    </>
  );
}
