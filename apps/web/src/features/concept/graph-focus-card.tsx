/**
 * The focused node, and the way out of the graph into its page.
 *
 * Focus took the click that used to navigate, so navigation has to live
 * somewhere a student can find it and a keyboard can reach it. Double-click
 * would have been neither.
 */
import { ArrowLeft, X } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';

import type { LaidOutNode } from './force-layout';

export interface GraphFocusCardProps {
  readonly node: LaidOutNode;
  /** The node's unit, already resolved to its Hebrew title. */
  readonly unit: string | null;
  readonly onOpen: () => void;
  readonly onClear: () => void;
}

export function GraphFocusCard({ node, unit, onOpen, onClear }: GraphFocusCardProps): ReactNode {
  return (
    <div className="absolute bottom-4 end-4 w-64 rounded-lg border border-border bg-popover p-4 shadow-lg">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-popover-foreground">{node.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {node.kind === 'concept' ? 'מושג' : 'שיעור'}
            {unit === null ? '' : ` · ${unit}`}
            {` · ${node.degree} קשרים`}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0"
          onClick={onClear}
          aria-label="נקה מיקוד"
        >
          <X className="size-4" aria-hidden />
        </Button>
      </div>

      {/* ArrowLeft, not ArrowRight: in RTL, forward points left. */}
      <Button variant="secondary" size="sm" className="mt-3 w-full gap-1" onClick={onOpen}>
        פתח דף
        <ArrowLeft className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
