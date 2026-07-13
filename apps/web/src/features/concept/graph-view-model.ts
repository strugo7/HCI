/**
 * What the student is looking at.
 *
 * The unit filter and focus mode are two questions about the same thing — which
 * nodes are on screen — so they are answered in one place. Two code paths would
 * eventually disagree about their intersection, and that bug only shows itself
 * to a student doing both at once, which is to say to nobody who would report it.
 *
 * Pure, and deliberately ignorant of layout, colour and the camera: it decides
 * *what*, never *where* or *how*.
 */
import type { GraphNode, KnowledgeGraph } from '@cyberatlas/knowledge-graph';

/**
 * The chip standing for nodes no unit claims.
 *
 * They get a chip rather than being dropped. A concept the curriculum never
 * teaches is a hole in the content, and a filter that hid it would make the
 * hole invisible in the one view built to show the shape of things.
 */
export const UNASSIGNED = '__unassigned__';

export interface GraphSelection {
  /** Chip ids that are on. `UNASSIGNED` stands for `unit: null`. */
  readonly units: ReadonlySet<string>;
  /** A node id to collapse the graph around, or null. */
  readonly focus: string | null;
}

/** Structural, so this answers for a `GraphNode` and a `LaidOutNode` alike. */
export function chipOf(node: { readonly unit: string | null }): string {
  return node.unit ?? UNASSIGNED;
}

/** Every chip the toolbar should offer, in curriculum order, unplaced last. */
export function allChips(graph: KnowledgeGraph): string[] {
  return [...graph.units.map((unit) => unit.id), UNASSIGNED];
}

/**
 * Is the student actually filtering, or just looking at everything?
 *
 * All-on is the default and means "show me the graph". All-off means the same
 * in practice. Only a strict subset is a filter — and colour is spent only on a
 * filter, so this is the question that decides whether the graph is coloured
 * at all.
 */
export function isFiltering(graph: KnowledgeGraph, units: ReadonlySet<string>): boolean {
  return units.size > 0 && units.size < allChips(graph).length;
}

/**
 * The subgraph on screen.
 *
 * `degree` is left at its whole-graph value on purpose. It drives node size, and
 * a concept that shrank because the student filtered away the lessons teaching
 * it would be telling a lie about its own importance.
 */
export function visibleGraph(graph: KnowledgeGraph, selection: GraphSelection): KnowledgeGraph {
  let keep = new Set(
    graph.nodes.filter((node) => selection.units.has(chipOf(node))).map((node) => node.id),
  );

  // Focus narrows what the filter allowed; it never reaches past it. A focus on
  // a node the filter has hidden is not a state worth honouring, so it is
  // ignored rather than allowed to override the filter the student just set.
  if (selection.focus !== null && keep.has(selection.focus)) {
    const near = new Set<string>([selection.focus]);

    for (const edge of graph.edges) {
      if (!keep.has(edge.source) || !keep.has(edge.target)) continue;

      if (edge.source === selection.focus) near.add(edge.target);
      else if (edge.target === selection.focus) near.add(edge.source);
    }

    keep = near;
  }

  return {
    nodes: graph.nodes.filter((node: GraphNode) => keep.has(node.id)),
    edges: graph.edges.filter((edge) => keep.has(edge.source) && keep.has(edge.target)),
    units: graph.units,
  };
}
