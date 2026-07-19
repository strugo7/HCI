import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { unitPath } from '@/router/routes';
import { Card } from '@/shared/components/ui/card';
import { lessonsInUnit, type UnitMeta } from '@/shared/content/content';

interface CourseTrackProps {
  readonly units: readonly UnitMeta[];
}

/**
 * The course as a path, not a grid.
 *
 * A unit grid says "take these in any order"; the course is a sequence, so the
 * spine — an oversized number per unit, joined by a line — carries that order.
 * The whole row is the link; the target is the unit, so the student never aims.
 */
export function CourseTrack({ units }: CourseTrackProps): ReactNode {
  const maxWeight = units.reduce((max, unit) => Math.max(max, unit.weight), 1);

  return (
    <ol className="relative">
      {/* The spine — a continuous rail the numbered nodes sit on. It runs down
          the centre of the number column; RTL puts that column on the right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-block-5 start-6 w-px bg-border"
      />

      {units.map((unit, i) => {
        const lessons = lessonsInUnit(unit);
        const step = String(i + 1).padStart(2, '0');

        return (
          <li key={unit.id}>
            <Link
              to={unitPath(unit.id)}
              className="group grid grid-cols-[3rem_1fr] items-center gap-5 rounded-xl py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              {/* The number IS the node. Its paper halo masks the rail behind it,
                  so the digit sits cleanly on the spine — no overlapping dot.
                  aria-hidden: the <ol> already conveys order, and each unit
                  title carries its own "נושא N". */}
              <span
                aria-hidden
                className="relative z-10 mx-auto bg-background py-1.5 text-center text-3xl font-extrabold tabular-nums tracking-tight text-gold"
              >
                {step}
              </span>

              <Card className="flex flex-col gap-2.5 p-4 transition-all group-hover:-translate-y-0.5 group-hover:border-gold/50 group-hover:shadow-md">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold leading-snug tracking-tight">
                    {unit.title}
                  </h3>
                  <ChevronLeft
                    className="ms-auto size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-gold"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2" title={`${unit.weight}% מהמבחן`}>
                    <span
                      className="h-1.5 w-14 overflow-hidden rounded-full bg-muted"
                      aria-hidden
                    >
                      <span
                        className="block h-full rounded-full bg-gold"
                        style={{ inlineSize: `${Math.round((unit.weight / maxWeight) * 100)}%` }}
                      />
                    </span>
                    <span className="tabular-nums">{unit.weight}% מהמבחן</span>
                  </span>
                  <span className="tabular-nums">
                    {lessons.length > 0 ? `${lessons.length} שיעורים` : 'בהכנה'}
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
