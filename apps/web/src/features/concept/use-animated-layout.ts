/**
 * Carry the nodes from the layout they were in to the layout they are in now.
 *
 * The seeded layout means a filtered graph *settles* near where it was rather
 * than somewhere new — but without a tween the student never sees it settle,
 * only the before and the after, which reads as a teleport and throws away
 * exactly the continuity the seeding bought.
 *
 * 300ms is the design system's cap, and this is not ambient motion: it is the
 * answer to a click, and it ends.
 */
import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from 'framer-motion';

import type { LaidOutEdge, LaidOutNode, Layout } from './force-layout';

const DURATION = 300;

/** Fast, then gentle. Motion that decelerates into place reads as settling. */
function easeOut(t: number): number {
  return 1 - (1 - t) ** 3;
}

type Positions = ReadonlyMap<string, { readonly x: number; readonly y: number }>;

function positionsOf(nodes: readonly LaidOutNode[]): Positions {
  return new Map(nodes.map((node) => [node.id, { x: node.x, y: node.y }]));
}

/**
 * Edges hold references to node objects, so moving the nodes moves the edges —
 * but only if the edges are rebuilt to point at the *tweened* nodes rather than
 * the ones the layout returned.
 */
function interpolate(target: Layout, from: Positions, t: number): Layout {
  const nodes: LaidOutNode[] = target.nodes.map((node) => {
    const was = from.get(node.id);

    // A node the filter has just revealed was nowhere a moment ago, so it has
    // nowhere to travel from: it simply appears where it belongs.
    if (was === undefined) return { ...node };

    return {
      ...node,
      x: was.x + (node.x - was.x) * t,
      y: was.y + (node.y - was.y) * t,
    };
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));

  const edges: LaidOutEdge[] = target.edges.flatMap((edge) => {
    const source = byId.get(edge.source.id);
    const endpoint = byId.get(edge.target.id);
    if (source === undefined || endpoint === undefined) return [];
    return [{ source, target: endpoint, kind: edge.kind }];
  });

  return { nodes, edges, width: target.width, height: target.height };
}

export function useAnimatedLayout(target: Layout): Layout {
  const [frame, setFrame] = useState<Layout>(target);

  // Where the nodes stood when the last tween finished. Empty on first mount,
  // which is what makes the graph appear settled rather than fly in.
  const from = useRef<Positions>(new Map());

  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reducedMotion) {
      setFrame(target);
      from.current = positionsOf(target.nodes);
      return;
    }

    const origin = from.current;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / DURATION);
      setFrame(interpolate(target, origin, easeOut(t)));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        from.current = positionsOf(target.nodes);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reducedMotion]);

  return frame;
}
