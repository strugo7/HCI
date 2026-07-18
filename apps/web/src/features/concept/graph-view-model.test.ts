import { describe, expect, it } from 'vitest';

import type { GraphNode, KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { UNASSIGNED, allChips, isFiltering, visibleGraph } from './graph-view-model';

function node(id: string, unit: string | null): GraphNode {
  const [kind, ref] = id.split(':') as ['concept' | 'lesson', string];
  return { id, kind, ref, label: ref, degree: 0, unit };
}

/**
 *   lesson:attention (cognitive-psychology)  ──references──▶ concept:cognitive-load (cognitive-psychology)
 *   lesson:what-is-hci (introduction)        ──references──▶ concept:mental-models (introduction)
 *   concept:cognitive-load                   ──related─────▶ concept:mental-models
 *   concept:loose (unplaced), connected to nothing
 */
const GRAPH: KnowledgeGraph = {
  nodes: [
    node('concept:loose', null),
    node('concept:cognitive-load', 'cognitive-psychology'),
    node('concept:mental-models', 'introduction'),
    node('lesson:what-is-hci', 'introduction'),
    node('lesson:attention', 'cognitive-psychology'),
  ],
  edges: [
    { source: 'concept:cognitive-load', target: 'concept:mental-models', kind: 'related' },
    { source: 'lesson:what-is-hci', target: 'concept:mental-models', kind: 'references' },
    { source: 'lesson:attention', target: 'concept:cognitive-load', kind: 'references' },
  ],
  units: [
    { id: 'introduction', title: 'יסודות' },
    { id: 'cognitive-psychology', title: 'פסיכולוגיה קוגניטיבית' },
  ],
};

const ALL = new Set(allChips(GRAPH));
const ids = (graph: KnowledgeGraph): string[] => graph.nodes.map((n) => n.id).sort();

describe('allChips', () => {
  it('is the curriculum units in order, with the unplaced last', () => {
    expect(allChips(GRAPH)).toEqual(['introduction', 'cognitive-psychology', UNASSIGNED]);
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
    expect(isFiltering(GRAPH, new Set(['cognitive-psychology']))).toBe(true);
  });
});

describe('visibleGraph — the unit filter', () => {
  it('keeps every node when every chip is on', () => {
    const visible = visibleGraph(GRAPH, { units: ALL, focus: null });

    expect(visible.nodes).toHaveLength(5);
    expect(visible.edges).toHaveLength(3);
  });

  it('keeps only the selected unit', () => {
    const visible = visibleGraph(GRAPH, { units: new Set(['cognitive-psychology']), focus: null });

    expect(ids(visible)).toEqual(['concept:cognitive-load', 'lesson:attention']);
  });

  it('drops an edge whose other end is hidden', () => {
    const visible = visibleGraph(GRAPH, { units: new Set(['cognitive-psychology']), focus: null });

    // cognitive-load↔mental-models is `related`, but mental-models lives in introduction and is gone.
    expect(visible.edges).toEqual([
      { source: 'lesson:attention', target: 'concept:cognitive-load', kind: 'references' },
    ]);
  });

  it('gives the unplaced their own chip rather than hiding them silently', () => {
    const visible = visibleGraph(GRAPH, { units: new Set([UNASSIGNED]), focus: null });

    expect(ids(visible)).toEqual(['concept:loose']);
  });

  it('keeps the units on the visible graph, so the chips do not vanish with the nodes', () => {
    const visible = visibleGraph(GRAPH, { units: new Set(['cognitive-psychology']), focus: null });

    expect(visible.units).toEqual(GRAPH.units);
  });
});

describe('visibleGraph — focus', () => {
  it('collapses to the node and its one-hop neighbourhood', () => {
    const visible = visibleGraph(GRAPH, { units: ALL, focus: 'concept:mental-models' });

    expect(ids(visible)).toEqual(['concept:cognitive-load', 'concept:mental-models', 'lesson:what-is-hci']);
  });

  it('intersects with the filter rather than overriding it', () => {
    // mental-models's neighbours are cognitive-load (cognitive-psychology) and
    // what-is-hci (introduction). With only introduction selected, cognitive-load
    // stays hidden — focus reveals what the filter already allows, it does not
    // reach past it.
    const visible = visibleGraph(GRAPH, {
      units: new Set(['introduction']),
      focus: 'concept:mental-models',
    });

    expect(ids(visible)).toEqual(['concept:mental-models', 'lesson:what-is-hci']);
  });

  it('ignores a focus on a node the filter has hidden', () => {
    const visible = visibleGraph(GRAPH, {
      units: new Set(['introduction']),
      focus: 'concept:cognitive-load',
    });

    expect(ids(visible)).toEqual(['concept:mental-models', 'lesson:what-is-hci']);
  });
});
