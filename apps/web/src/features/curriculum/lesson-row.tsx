import { ChevronLeft, Clock, Layers } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { lessonPath } from '@/router/routes';
import { Card } from '@/shared/components/ui/card';
import type { LessonMeta } from '@/shared/content/content';

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'מתקדם',
};

interface LessonRowProps {
  lesson: LessonMeta;
  /** Position within the unit — the curriculum's teaching order, 1-based. */
  step: number;
}

/**
 * One lesson inside a unit.
 *
 * A row rather than a card grid: the unit's lessons are a *sequence*, and a
 * grid would suggest they can be taken in any order. The number carries that.
 */
export function LessonRow({ lesson, step }: LessonRowProps): ReactNode {
  const { id, title, difficulty, estimatedTime, sectionCount, concepts } = lesson;

  return (
    <Link
      to={lessonPath(id)}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex items-center gap-4 p-4 transition-colors group-hover:border-primary/40 group-hover:bg-muted/40">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground"
          aria-hidden
        >
          {step}
        </span>

        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="font-semibold leading-snug">{title}</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {estimatedTime !== null ? (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden />
                {estimatedTime} דק׳
              </span>
            ) : null}
            <span>{DIFFICULTY_LABELS[difficulty] ?? difficulty}</span>
            <span>{sectionCount} פרקים</span>
            {concepts.length > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Layers className="size-3.5" aria-hidden />
                {concepts.length} מושגים
              </span>
            ) : null}
          </div>
        </div>

        <ChevronLeft
          className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </Card>
    </Link>
  );
}
