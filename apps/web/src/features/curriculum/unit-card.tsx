import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { unitPath } from '@/router/routes';
import { Card } from '@/shared/components/ui/card';
import type { UnitMeta } from '@/shared/content/content';

import { unitIcon } from './units';

interface UnitCardProps {
  unit: UnitMeta;
  /** Position in the course, 1-based. The reading order is the course order. */
  index: number;
}

/**
 * A big topic — one of the lecturer's decks — and the way into its lessons.
 *
 * The whole card is the link, not a button inside it: the target is the unit,
 * and a student should not have to aim.
 */
export function UnitCard({ unit, index }: UnitCardProps): ReactNode {
  const { id, title, description, source, weight, lessons } = unit;
  const Icon = unitIcon(id);

  return (
    <Link
      to={unitPath(id)}
      className="group h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full flex-col gap-4 p-6 transition-colors group-hover:border-primary/40 group-hover:bg-muted/40">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-secondary p-2.5">
            <Icon className="size-5 text-secondary-foreground" aria-hidden />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            יחידה {index}
          </span>
          {/* The chevron points to the start edge — in RTL that is left, which
              is "forward". `rtl:` is unnecessary: ChevronLeft is already the
              forward direction here. */}
          <ChevronLeft
            className="ms-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-snug tracking-tight">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="mt-auto space-y-3 border-t pt-4">
          <p className="text-xs text-muted-foreground">{source}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
              {lessons.length} שיעורים
            </span>
            <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
              {weight > 0 ? `${weight}% מהמבחן` : 'לכיסוי הסילבוס'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
