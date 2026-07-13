import { describe, expect, it } from 'vitest';

import type { GraphNode, KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { UNASSIGNED, allChips, isFiltering, visibleGraph } from './graph-view-model';

function node(id: string, unit: string | null): GraphNode {
  const [kind, ref] = id.split(':') as ['concept' | 'lesson', string];
  return { id, kind, ref, label: ref, degree: 0, unit };
}

/**
 *   lesson:virus (malware)     ──references──▶ concept:payload (malware)
 *   lesson:cia (foundations)   ──references──▶ concept:triad (foundations)
 *   concept:payload            ──related─────▶ concept:triad
 *   concept:loose (unplaced), connected to nothing
 */
const GRAPH: KnowledgeGraph = {
  nodes: [
    node('concept:loose', null),
    node('concept:payload', 'malware'),
    node('concept:triad', 'foundations'),
    node('lesson:cia', 'foundations'),
    node('lesson:virus', 'malware'),
  ],
  edges: [
    { source: 'concept:payload', target: 'concept:triad', kind: 'related' },
    { source: 'lesson:cia', target: 'concept:triad', kind: 'references' },
    { source: 'lesson:virus', target: 'concept:payload', kind: 'references' },
  ],
  units: [
    { id: 'foundations', title: 'יסודות' },
    { id: 'malware', title: 'נוזקות' },
  ],
};

const ALL = new Set(allChips(GRAPH));
const ids = (graph: KnowledgeGraph): string[] => graph.nodes.map((n) => n.id).sort();

describe('allChips', () => {
  it('is the curriculum units in order, with the unplaced last', () => {
    expect(allChips(GRAPH)).toEqual(['foundations', 'malware', UNASSIGNED]);
  });
});

describe('isFiltering', () => {
  it('is false when every chip is on — that is not a filter, that is the graph', () => {
    expect(isFiltering(GRAPH, ALL)).toBe(false);
  });

  it('is false when no chip is on', () => {
    expect(isFiltering(GRAPH, new Set())).toBe(false);
  });

  it('is true for a strict subset', () => {
    expect(isFiltering(GRAPH, new Set(['malware']))).toBe(true);
  });
});

describe('visibleGraph — the unit filter', () => {
  it('keeps every node when every chip is on', () => {
    const visible = visibleGraph(GRAPH, { units: ALL, focus: null });

    expect(visible.nodes).toHaveLength(5);
    expect(visible.edges).toHaveLength(3);
  });

  it('keeps only the selected unit', () => {
    const visible = visibleGraph(GRAPH, { units: new Set(['malware']), focus: null });

    expect(ids(visible)).toEqual(['concept:payload', 'lesson:virus']);
  });

  it('drops an edge whose other end is hidden', () => {
    const visible = visibleGraph(GRAPH, { units: new Set(['malware']), focus: null });

    // payload↔triad is `related`, but triad lives in foundations and is gone.
    expect(visible.edges).toEqual([
      { source: 'lesson:virus', target: 'concept:payload', kind: 'references' },
    ]);
  });

  it('gives the unplaced their own chip rather than hiding them silently', () => {
    const visible = visibleGraph(GRAPH, { units: new Set([UNASSIGNED]), focus: null });

    expect(ids(visible)).toEqual(['concept:loose']);
  });

  it('keeps the units on the visible graph, so the chips do not vanish with the nodes', () => {
    const visible = visibleGraph(GRAPH, { units: new Set(['malware']), focus: null });

    expect(visible.units).toEqual(GRAPH.units);
  });
});

describe('visibleGraph — focus', () => {
  it('collapses to the node and its one-hop neighbourhood', () => {
    const visible = visibleGraph(GRAPH, { units: ALL, focus: 'concept:triad' });

    expect(ids(visible)).toEqual(['concept:payload', 'concept:triad', 'lesson:cia']);
  });

  it('intersects with the filter rather than overriding it', () => {
    // triad's neighbours are payload (malware) and cia (foundations). With only
    // foundations selected, payload stays hidden — focus reveals what the filter
    // already allows, it does not reach past it.
    const visible = visibleGraph(GRAPH, {
      units: new Set(['foundations']),
      focus: 'concept:triad',
    });

    expect(ids(visible)).toEqual(['concept:triad', 'lesson:cia']);
  });

  it('ignores a focus on a node the filter has hidden', () => {
    const visible = visibleGraph(GRAPH, {
      units: new Set(['foundations']),
      focus: 'concept:payload',
    });

    expect(ids(visible)).toEqual(['concept:triad', 'lesson:cia']);
  });
});
