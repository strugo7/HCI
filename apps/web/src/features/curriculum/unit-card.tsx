import type { ReactNode } from 'react';

import { Card } from '@/shared/components/ui/card';

import type { CurriculumUnit } from './units';

interface UnitCardProps {
  unit: CurriculumUnit;
  /** Position in the course, 1-based. Shown so the reading order is explicit. */
  index: number;
}

/**
 * A single big topic — one of the lecturer's decks.
 *
 * The card is deliberately not a link yet: nothing behind it is wired up, and a
 * card that looks clickable but goes nowhere teaches the student to distrust
 * the interface.
 */
export function UnitCard({ unit, index }: UnitCardProps): ReactNode {
  const { title, description, source, lessonCount, examWeight, icon: Icon } = unit;

  return (
    <Card className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-secondary p-2.5">
          <Icon className="size-5 text-secondary-foreground" aria-hidden />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          יחידה {index}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-snug tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <div className="mt-auto space-y-3 border-t pt-4">
        <p className="text-xs text-muted-foreground">{source}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
            {lessonCount} שיעורים
          </span>
          <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
            {examWeight > 0 ? `${examWeight}% מהמבחן` : 'לכיסוי הסילבוס'}
          </span>
        </div>
      </div>
    </Card>
  );
}
