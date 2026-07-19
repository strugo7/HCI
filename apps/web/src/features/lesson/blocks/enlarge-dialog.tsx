/**
 * The "enlarge" affordance shared by every visual that reads too small inline —
 * Mermaid diagrams and infographic images alike.
 *
 * A button opens the visual in a large modal with zoom. Zoom is width-based, not
 * a CSS `transform: scale()`: a transform does not grow the scroll area, so a
 * scaled-up diagram could not be panned. Growing the element's width does, so the
 * overflow container gets real scrollbars once the visual is bigger than the modal.
 */
import { Maximize2, Minus, Plus, RotateCcw } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

interface EnlargeDialogProps {
  /** Announced as the dialog title. The enlarged content should carry its own
   *  aria-label, so this is the human caption. */
  readonly title: string;
  /** The enlarged visual — an <img> or an SVG host. Give it `w-full` so it fills
   *  the zoom wrapper (which is what actually grows). */
  readonly children: ReactNode;
  /** Positioning for the trigger button inside the visual's frame. */
  readonly triggerClassName?: string;
}

export function EnlargeDialog({ title, children, triggerClassName }: EnlargeDialogProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Always reopen fit-to-width.
  useEffect(() => {
    if (open) setZoom(1);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="הגדלת התצוגה"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md border bg-background/90 px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            triggerClassName,
          )}
        >
          <Maximize2 className="size-3.5" aria-hidden />
          הגדלה
        </button>
      </DialogTrigger>

      <DialogContent className="flex h-[92vh] max-w-[95vw] flex-col gap-0 p-0">
        <div className="flex items-center gap-3 border-b p-4 pe-14">
          <DialogTitle className="line-clamp-2 text-sm font-medium text-muted-foreground">
            {title}
          </DialogTitle>
        </div>

        <div className="relative min-h-0 flex-1 overflow-auto p-6">
          {/* Width, not transform, so overflow scrolls when zoomed past the modal. */}
          <div className="mx-auto" style={{ width: `${Math.round(zoom * 100)}%` }}>
            {children}
          </div>
        </div>

        {/* Zoom toolbar — centred with mx-auto (no translate) so RTL is safe. */}
        <div className="pointer-events-none absolute inset-inline-0 bottom-5 mx-auto flex w-fit items-center gap-1 rounded-lg border bg-background/95 p-1 shadow-md backdrop-blur">
          <button
            type="button"
            aria-label="הקטנה"
            disabled={zoom <= MIN_ZOOM}
            onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
            className="pointer-events-auto grid size-9 place-items-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <span
            className="w-12 text-center text-sm font-medium tabular-nums text-muted-foreground"
            aria-live="polite"
          >
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="הגדלה"
            disabled={zoom >= MAX_ZOOM}
            onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
            className="pointer-events-auto grid size-9 place-items-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <Plus className="size-4" aria-hidden />
          </button>
          <span className="mx-0.5 h-5 w-px bg-border" aria-hidden />
          <button
            type="button"
            aria-label="איפוס התצוגה"
            disabled={zoom === 1}
            onClick={() => setZoom(1)}
            className="pointer-events-auto grid size-9 place-items-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <RotateCcw className="size-4" aria-hidden />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
