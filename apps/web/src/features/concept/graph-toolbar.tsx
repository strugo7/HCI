/**
 * The graph's controls.
 *
 * The zoom buttons are not decoration. Wheel and pinch are the fast path, but
 * neither is reachable from a keyboard — without these, a student navigating by
 * keyboard has no zoom at all.
 *
 * A chip wears the hue its nodes wear, which is what makes a legend unnecessary:
 * the chip *is* the legend, and it is also the control.
 */
import { Maximize2, Minus, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

/**
 * Literal, never interpolated.
 *
 * Tailwind scans source for class names it can *see*. A class assembled as
 * `bg-graph-${i}` is invisible to that scan and gets purged, and the failure is
 * silent — the chip simply renders unstyled with no error anywhere.
 */
const CHIP_HUE = [
  'border-graph-1 bg-graph-1/15 text-graph-1',
  'border-graph-2 bg-graph-2/15 text-graph-2',
  'border-graph-3 bg-graph-3/15 text-graph-3',
  'border-graph-4 bg-graph-4/15 text-graph-4',
  'border-graph-5 bg-graph-5/15 text-graph-5',
] as const;

/** Beyond this, colour stops distinguishing and starts shouting. */
export const HUE_BUDGET = CHIP_HUE.length;

export interface ToolbarChip {
  readonly id: string;
  readonly title: string;
}

export interface GraphToolbarProps {
  readonly chips: readonly ToolbarChip[];
  readonly selected: ReadonlySet<string>;
  /** Chip id → hue index, for the chips that have one. Empty while monochrome. */
  readonly hues: ReadonlyMap<string, number>;
  readonly onToggle: (id: string) => void;
  readonly onAll: () => void;
  readonly onZoomIn: () => void;
  readonly onZoomOut: () => void;
  readonly onReset: () => void;
}

const CHIP_BASE =
  'rounded-full border px-3 py-1 text-xs font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export function GraphToolbar({
  chips,
  selected,
  hues,
  onToggle,
  onAll,
  onZoomIn,
  onZoomOut,
  onReset,
}: GraphToolbarProps): ReactNode {
  const everything = selected.size === chips.length;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-3">
      <button
        type="button"
        onClick={onAll}
        aria-pressed={everything}
        className={cn(
          CHIP_BASE,
          everything
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border text-muted-foreground hover:bg-muted',
        )}
      >
        הכול
      </button>

      {chips.map((chip) => {
        const on = selected.has(chip.id);
        const hue = hues.get(chip.id);

        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onToggle(chip.id)}
            aria-pressed={on}
            className={cn(
              CHIP_BASE,
              !on && 'border-border text-muted-foreground hover:bg-muted',
              on && hue === undefined && 'border-primary bg-primary text-primary-foreground',
              on && hue !== undefined && CHIP_HUE[hue],
            )}
          >
            {chip.title}
          </button>
        );
      })}

      <div className="ms-auto flex items-center gap-1">
        <Button variant="outline" size="icon" onClick={onZoomIn} aria-label="התקרב">
          <Plus className="size-4" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" onClick={onZoomOut} aria-label="התרחק">
          <Minus className="size-4" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" onClick={onReset} aria-label="התאם למסך">
          <Maximize2 className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
