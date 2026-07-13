/**
 * The camera over the graph.
 *
 * Zoom and pan are a *camera*, not a layout: nothing about where a node sits
 * changes when the student zooms. Keeping the two apart is what lets a filter
 * relax the subgraph in place while the view moves to meet it. Were the layout
 * to rescale itself to the viewBox instead, every surviving node would shift for
 * a reason the student could not see.
 *
 * d3-zoom owns the wheel, drag and pinch gestures; the toolbar buttons drive the
 * same behavior. There is one transform, and this is where it lives.
 */
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

import { select } from 'd3-selection';
import { zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior, type ZoomTransform } from 'd3-zoom';
import { useReducedMotion } from 'framer-motion';

// Imported for its side effect: d3-transition installs `.transition()` onto
// d3-selection's prototype. Without this line `select(svg).transition()` throws,
// and only at runtime.
import 'd3-transition';

import type { Bounds } from './force-layout';

const MIN_SCALE = 0.5;
const MAX_SCALE = 6;

/** Inside the design system's 300ms cap. */
const DURATION = 250;

/** Room to leave around a framed subgraph, in layout units. */
const PADDING = 60;

export interface Camera {
  /** The current zoom factor. Decides how much of the graph names itself. */
  readonly scale: number;
  /** Ready for an SVG `transform` attribute. */
  readonly transform: string;
  zoomBy: (factor: number) => void;
  frame: (bounds: Bounds) => void;
  reset: () => void;
}

export function useGraphCamera(
  svgRef: RefObject<SVGSVGElement | null>,
  width: number,
  height: number,
): Camera {
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity);
  const behaviour = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const reducedMotion = useReducedMotion() ?? false;
  const duration = reducedMotion ? 0 : DURATION;

  useEffect(() => {
    const svg = svgRef.current;
    if (svg === null) return;

    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([MIN_SCALE, MAX_SCALE])
      .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
        setTransform(event.transform);
      });

    // Double-click belongs to nothing here — d3 would otherwise zoom on it, and
    // a student double-clicking a node means to click it twice.
    select(svg).call(behavior).on('dblclick.zoom', null);
    behaviour.current = behavior;

    return () => {
      select(svg).on('.zoom', null);
      behaviour.current = null;
    };
  }, [svgRef]);

  const zoomBy = useCallback(
    (factor: number): void => {
      const svg = svgRef.current;
      const behavior = behaviour.current;
      if (svg === null || behavior === null) return;

      select(svg).transition().duration(duration).call(behavior.scaleBy, factor);
    },
    [svgRef, duration],
  );

  const frame = useCallback(
    (bounds: Bounds): void => {
      const svg = svgRef.current;
      const behavior = behaviour.current;
      if (svg === null || behavior === null) return;

      const spanX = Math.max(bounds.maxX - bounds.minX, 1);
      const spanY = Math.max(bounds.maxY - bounds.minY, 1);

      const scale = Math.min(
        MAX_SCALE,
        Math.max(
          MIN_SCALE,
          Math.min((width - PADDING * 2) / spanX, (height - PADDING * 2) / spanY),
        ),
      );

      const centreX = (bounds.minX + bounds.maxX) / 2;
      const centreY = (bounds.minY + bounds.maxY) / 2;

      const next = zoomIdentity
        .translate(width / 2, height / 2)
        .scale(scale)
        .translate(-centreX, -centreY);

      select(svg).transition().duration(duration).call(behavior.transform, next);
    },
    [svgRef, width, height, duration],
  );

  const reset = useCallback((): void => {
    const svg = svgRef.current;
    const behavior = behaviour.current;
    if (svg === null || behavior === null) return;

    select(svg).transition().duration(duration).call(behavior.transform, zoomIdentity);
  }, [svgRef, duration]);

  return {
    scale: transform.k,
    transform: `translate(${transform.x},${transform.y}) scale(${transform.k})`,
    zoomBy,
    frame,
    reset,
  };
}
