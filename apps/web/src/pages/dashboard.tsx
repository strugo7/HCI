import { ChevronLeft, GraduationCap } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { CourseTrack } from '@/features/curriculum/course-track';
import { ROUTES, lessonPath } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { conceptIndex, course, lessonIndex, unitIndex } from '@/shared/content/content';

export default function DashboardPage(): ReactNode {
  const units = unitIndex();
  const lessons = lessonIndex();
  const concepts = conceptIndex();
  const { title, code } = course();

  // The way in is the first lesson of the first unit — the course's own order.
  // Resolved against the index so the card only appears if the lesson exists.
  const entryLessonId = units[0]?.lessons[0];
  const entryLesson = entryLessonId
    ? (lessons.find((lesson) => lesson.id === entryLessonId) ?? null)
    : null;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="grid items-center gap-8 py-6 lg:grid-cols-[1.4fr_1fr] lg:py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            קורס {code} · הכנה למבחן
          </p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight lg:text-5xl">
            לומדים לעצב בשביל <span className="text-gold">בני אדם</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {title} — פלטפורמת הכנה למבחן. לומדים נושא אחר נושא לפי סדר הסילבוס, וכל
            שיעור כולל הסבר, בדיקות הבנה, בוחן וכרטיסיות חזרה.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {entryLesson ? (
              <Button
                asChild
                size="lg"
                className="bg-gold text-gold-foreground shadow-md hover:bg-gold/90"
              >
                <Link to={lessonPath(entryLesson.id)}>
                  התחילו ללמוד
                  <ChevronLeft className="size-4" aria-hidden />
                </Link>
              </Button>
            ) : null}
            <Button asChild size="lg" variant="outline">
              <Link to={ROUTES.lessons}>כל השיעורים</Link>
            </Button>
          </div>
        </div>

        {/* Entry card — a concrete way in with presence, not a resume-state */}
        {entryLesson ? (
          <Card className="relative overflow-hidden p-6">
            <span aria-hidden className="absolute inset-inline-6 top-0 h-[3px] rounded-full bg-gold" />
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <GraduationCap className="size-4 text-gold" aria-hidden />
              מתחילים כאן
            </div>
            <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight">
              {entryLesson.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {units[0]?.title}
              {entryLesson.estimatedTime ? ` · כ-${entryLesson.estimatedTime} דקות` : ''}
            </p>
            <Link
              to={lessonPath(entryLesson.id)}
              className="mt-5 flex items-center justify-between border-t pt-4 text-sm font-semibold text-gold transition-opacity hover:opacity-80"
            >
              פתחו את השיעור
              <ChevronLeft className="size-4" aria-hidden />
            </Link>
          </Card>
        ) : null}
      </section>

      {/* ---------------- Stat ribbon ---------------- */}
      <dl className="flex flex-wrap gap-x-10 gap-y-4 border-y py-6">
        {[
          { n: units.length, l: 'נושאים בקורס' },
          { n: lessons.length, l: 'שיעורים פתוחים' },
          { n: concepts.length, l: 'מושגים בגרף הידע' },
        ].map((stat) => (
          <div key={stat.l}>
            <dt className="text-3xl font-extrabold tabular-nums tracking-tight">{stat.n}</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{stat.l}</dd>
          </div>
        ))}
      </dl>

      {/* ---------------- Course path ---------------- */}
      <section aria-labelledby="track-heading" className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="track-heading" className="text-2xl font-bold tracking-tight">
            מסלול הקורס
          </h2>
          <span className="text-sm text-muted-foreground">האחוזים = משקל הנושא במבחן</span>
        </div>
        <CourseTrack units={units} />
      </section>
    </>
  );
}
