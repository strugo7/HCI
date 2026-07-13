/**
 * The seeding contract, pinned.
 *
 * Everything the filter's *feel* rests on lives here: seed from where the nodes
 * already are, start cool, do not re-fit. Get any of the three wrong and the
 * graph teleports on every chip click — which looks like a rendering bug and is
 * actually a layout one, so it is worth a test that says so out loud.
 */
import { describe, expect, it } from 'vitest';

import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { boundsOf, layoutGraph, type Layout } from './force-layout';

const GRAPH: KnowledgeGraph = {
  nodes: [
    { id: 'concept:a', kind: 'concept', ref: 'a', label: 'a', degree: 1, unit: null },
    { id: 'concept:b', kind: 'concept', ref: 'b', label: 'b', degree: 1, unit: null },
  ],
  edges: [{ source: 'concept:a', target: 'concept:b', kind: 'related' }],
  units: [],
};

function at(layout: Layout, id: string): { x: number; y: number } {
  const node = layout.nodes.find((n) => n.id === id);
  if (node === undefined) throw new Error(`no node ${id}`);
  return { x: node.x, y: node.y };
}

describe('layoutGraph', () => {
  it('starts a seeded layout exactly where the seed put it', () => {
    const seed = new Map([
      ['concept:a', { x: 100, y: 200 }],
      ['concept:b', { x: 300, y: 400 }],
    ]);

    const layout = layoutGraph(GRAPH, { seed, iterations: 0, fit: false });

    expect(at(layout, 'concept:a')).toEqual({ x: 100, y: 200 });
    expect(at(layout, 'concept:b')).toEqual({ x: 300, y: 400 });
  });

  it('settles a seeded layout near the seed rather than flinging it across the canvas', () => {
    const seed = new Map([
      ['concept:a', { x: 480, y: 340 }],
      ['concept:b', { x: 520, y: 380 }],
    ]);

    const layout = layoutGraph(GRAPH, { seed, iterations: 120, fit: false });
    const { x, y } = at(layout, 'concept:a');

    // The two already sit about a spring-length apart, so there is little work
    // to do. A cold start keeps it that way; a hot one would throw them.
    expect(Math.hypot(x - 480, y - 340)).toBeLessThan(60);
  });

  it('does not rescale a seeded layout to the viewBox when fit is off', () => {
    const seed = new Map([
      ['concept:a', { x: 400, y: 340 }],
      ['concept:b', { x: 460, y: 380 }],
    ]);

    const bounds = boundsOf(layoutGraph(GRAPH, { seed, iterations: 40, fit: false }).nodes);

    // fit() would have pushed these out to the padding on both sides — 40 and 960.
    expect(bounds.minX).toBeGreaterThan(200);
    expect(bounds.maxX).toBeLessThan(800);
  });

  it('carries the unit through, so the graph can be coloured by it', () => {
    const graph: KnowledgeGraph = {
      ...GRAPH,
      nodes: [{ ...GRAPH.nodes[0]!, unit: 'malware' }],
      edges: [],
    };

    expect(layoutGraph(graph).nodes[0]?.unit).toBe('malware');
  });

  it('lays the same graph out identically every time', () => {
    const a = layoutGraph(GRAPH);
    const b = layoutGraph(GRAPH);

    expect(a.nodes.map((n) => [n.x, n.y])).toEqual(b.nodes.map((n) => [n.x, n.y]));
  });
});
