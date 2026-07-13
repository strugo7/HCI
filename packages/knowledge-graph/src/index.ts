/**
 * @cyberatlas/knowledge-graph
 *
 * The graph is DERIVED, never authored. Nodes come from concepts and lessons;
 * edges come from `[[wiki-links]]`, `prerequisites`, and `related` frontmatter.
 * Hand-maintaining graph data is forbidden — it would immediately drift from
 * the content that is supposed to be the source of truth.
 *
 * Pure and IO-free: same content in, same graph out, byte for byte. It reads
 * Knowledge Objects and nothing else — no Markdown, no vault, no React.
 */
import { z } from 'zod';

import type { Concept, Lesson } from '@cyberatlas/core';

export const NodeKindSchema = z.enum(['concept', 'lesson']);
export type NodeKind = z.infer<typeof NodeKindSchema>;

export const GraphNodeSchema = z.object({
  /**
   * Unique across the whole graph: `concept:firewall`, `lesson:firewall`.
   *
   * A concept slug and a lesson id are drawn from the same alphabet and
   * routinely collide — twenty-one of them do today, because a lesson is
   * usually named after the concept it teaches. They are different nodes, so
   * they need different identities; keying a node by the bare slug silently
   * merged the two and pointed every `[[Firewall]]` edge at the *lesson*.
   */
  id: z.string().min(1),
  kind: NodeKindSchema,
  /** The concept slug or lesson id — what routes and content actually use. */
  ref: z.string().min(1),
  label: z.string().min(1),
  /** How many edges touch this node — drives visual weight in the graph view. */
  degree: z.number().int().nonnegative().default(0),
  /**
   * The curriculum unit this node belongs to, or null when nothing places it.
   *
   * The graph itself has no opinion about topics: `[[links]]` and `related:`
   * say what connects to what, never what any of it is *about*. The curriculum
   * does say that, so the topic is imported from there and attached here.
   */
  unit: z.string().nullable().default(null),
});
export type GraphNode = z.infer<typeof GraphNodeSchema>;

/** The two id spaces, kept apart. Every node id in the graph comes from here. */
export function conceptNodeId(slug: string): string {
  return `concept:${slug}`;
}

export function lessonNodeId(id: string): string {
  return `lesson:${id}`;
}

/**
 * Every edge is one fact, stored once.
 *
 * `appears-in` is deliberately absent. It is the exact inverse of `references`,
 * and storing both would put two edges between every lesson and every concept
 * it teaches — doubling `degree`, and drawing each line twice in the graph
 * view. The inverse is a question, not a fact: ask `appearsIn()`.
 */
export const EdgeKindSchema = z.enum([
  /** lesson → concept, from a `[[wiki-link]]` in the body. */
  'references',
  /** lesson → lesson, from frontmatter `prerequisites`. */
  'prerequisite',
  /** concept ↔ concept, from frontmatter `related`. Undirected. */
  'related',
]);
export type EdgeKind = z.infer<typeof EdgeKindSchema>;

export const GraphEdgeSchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
  kind: EdgeKindSchema,
});
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;

/**
 * Just enough of a curriculum unit to place a node in it.
 *
 * A structural type rather than an import: this package stays IO-free and knows
 * nothing about `curriculum.yaml`. The build reads the file and hands the result
 * in, so `scripts/lib/curriculum.ts` keeps owning `UnitMeta`.
 */
export interface GraphUnit {
  readonly id: string;
  readonly title: string;
  /** Lesson ids, in teaching order. */
  readonly lessons: readonly string[];
}

export const GraphUnitRefSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
});
export type GraphUnitRef = z.infer<typeof GraphUnitRefSchema>;

export const KnowledgeGraphSchema = z.object({
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
  /**
   * The curriculum's units, in curriculum order. The graph view builds its
   * filter chips straight from this and never loads the curriculum itself.
   */
  units: z.array(GraphUnitRefSchema).default([]),
});
export type KnowledgeGraph = z.infer<typeof KnowledgeGraphSchema>;

/* ------------------------------------------------------------------ *
 * Build
 * ------------------------------------------------------------------ */

/** An edge's two endpoints, in the one order that identifies it. */
function edgeKey(edge: GraphEdge): string {
  return `${edge.kind}:${edge.source}→${edge.target}`;
}

/**
 * `related` is symmetric, so it is stored once in a canonical direction.
 *
 * Authors write relatedness from whichever side they happened to be editing:
 * `firewall.md` lists DMZ, but `dmz.md` may not list Firewall. Treating the
 * pair as undirected means the student sees the relation from both concepts
 * and the author cannot forget a direction — which is the whole reason the
 * graph is derived rather than typed.
 */
function relatedEdge(a: string, b: string): GraphEdge {
  return a < b
    ? { source: a, target: b, kind: 'related' }
    : { source: b, target: a, kind: 'related' };
}

/**
 * Place every node in a curriculum unit.
 *
 * A lesson is placed by the unit that lists it — the curriculum says so
 * outright. A concept has no such statement anywhere, so it is placed by the
 * lessons that actually *teach* it: the unit holding the most lessons that
 * reference the concept wins. Relatedness does not get a vote. A concept is
 * about what it is taught alongside, not about what an author once said it
 * resembles.
 *
 * A tie breaks by curriculum order. It has to break by something *stated*, or
 * the same vault would place a concept differently depending on the order the
 * files happened to come off the disk, and the build would stop being
 * reproducible.
 *
 * Runs after edges are dropped, for the same reason `degree` does: a concept
 * belongs to the unit that reaches it, not to the unit that meant to.
 */
function assignUnits(
  nodes: Map<string, GraphNode>,
  edges: Map<string, GraphEdge>,
  units: readonly GraphUnit[],
): void {
  const rank = new Map(units.map((unit, i) => [unit.id, i]));

  const unitOf = new Map<string, string>();
  for (const unit of units) {
    for (const lessonId of unit.lessons) unitOf.set(lessonNodeId(lessonId), unit.id);
  }

  for (const node of nodes.values()) {
    if (node.kind === 'lesson') node.unit = unitOf.get(node.id) ?? null;
  }

  // One vote per lesson that teaches the concept, tallied by that lesson's unit.
  const votes = new Map<string, Map<string, number>>();

  for (const edge of edges.values()) {
    if (edge.kind !== 'references') continue;

    const unit = unitOf.get(edge.source);
    if (unit === undefined) continue;

    const tally = votes.get(edge.target) ?? new Map<string, number>();
    tally.set(unit, (tally.get(unit) ?? 0) + 1);
    votes.set(edge.target, tally);
  }

  for (const node of nodes.values()) {
    if (node.kind !== 'concept') continue;

    const tally = votes.get(node.id);
    if (tally === undefined) {
      node.unit = null;
      continue;
    }

    let best: string | null = null;
    let bestVotes = 0;
    let bestRank = Number.POSITIVE_INFINITY;

    for (const [unit, count] of tally) {
      const unitRank = rank.get(unit) ?? Number.POSITIVE_INFINITY;
      const wins = count > bestVotes || (count === bestVotes && unitRank < bestRank);
      if (!wins) continue;

      best = unit;
      bestVotes = count;
      bestRank = unitRank;
    }

    node.unit = best;
  }
}

/**
 * Build the whole graph from parsed content.
 *
 * Only what the vault holds becomes a node: an edge pointing at a concept or a
 * lesson that does not exist is dropped, not invented. The parser already
 * reports those as diagnostics, so silence here is not silence overall.
 */
export function buildGraph(
  lessons: readonly Lesson[],
  concepts: readonly Concept[],
  units: readonly GraphUnit[] = [],
): KnowledgeGraph {
  const nodes = new Map<string, GraphNode>();

  for (const concept of concepts) {
    const { slug, title } = concept.frontmatter;
    nodes.set(conceptNodeId(slug), {
      id: conceptNodeId(slug),
      kind: 'concept',
      ref: slug,
      label: title,
      degree: 0,
      unit: null,
    });
  }

  for (const lesson of lessons) {
    nodes.set(lessonNodeId(lesson.id), {
      id: lessonNodeId(lesson.id),
      kind: 'lesson',
      ref: lesson.id,
      label: lesson.frontmatter.title,
      degree: 0,
      unit: null,
    });
  }

  const edges = new Map<string, GraphEdge>();

  const connect = (edge: GraphEdge): void => {
    if (edge.source === edge.target) return; // a self-loop teaches nothing
    if (!nodes.has(edge.source) || !nodes.has(edge.target)) return;
    edges.set(edgeKey(edge), edge);
  };

  for (const lesson of lessons) {
    for (const slug of lesson.concepts) {
      connect({
        source: lessonNodeId(lesson.id),
        target: conceptNodeId(slug),
        kind: 'references',
      });
    }
    for (const prerequisite of lesson.frontmatter.prerequisites) {
      connect({
        source: lessonNodeId(prerequisite),
        target: lessonNodeId(lesson.id),
        kind: 'prerequisite',
      });
    }
  }

  for (const concept of concepts) {
    for (const slug of concept.related) {
      connect(relatedEdge(conceptNodeId(concept.frontmatter.slug), conceptNodeId(slug)));
    }
  }

  // Degree is computed last, from the edges that survived — a node's weight is
  // what it is actually connected to, not what content hoped to connect it to.
  for (const edge of edges.values()) {
    const source = nodes.get(edge.source);
    const target = nodes.get(edge.target);
    if (source) source.degree += 1;
    if (target) target.degree += 1;
  }

  assignUnits(nodes, edges, units);

  // Sorted, so the same vault produces a byte-identical graph on every build.
  return {
    nodes: [...nodes.values()].sort((a, b) => a.id.localeCompare(b.id)),
    edges: [...edges.values()].sort((a, b) => edgeKey(a).localeCompare(edgeKey(b))),
    units: units.map((unit) => ({ id: unit.id, title: unit.title })),
  };
}

/* ------------------------------------------------------------------ *
 * Queries
 * ------------------------------------------------------------------ */

/**
 * Queries speak slugs and lesson ids, never node ids.
 *
 * The `concept:` / `lesson:` prefix exists so the two id spaces cannot collide
 * inside the graph. It is an implementation detail of identity, and it stops
 * at this boundary — a caller asks about "firewall" and gets back "firewall".
 */
function refOf(nodeId: string): string {
  return nodeId.slice(nodeId.indexOf(':') + 1);
}

/** Lessons that teach this concept — the inverse of `references`. */
export function appearsIn(graph: KnowledgeGraph, conceptSlug: string): string[] {
  const target = conceptNodeId(conceptSlug);

  return graph.edges
    .filter((edge) => edge.kind === 'references' && edge.target === target)
    .map((edge) => refOf(edge.source))
    .sort();
}

/** The concepts a lesson teaches. */
export function conceptsOf(graph: KnowledgeGraph, lessonId: string): string[] {
  const source = lessonNodeId(lessonId);

  return graph.edges
    .filter((edge) => edge.kind === 'references' && edge.source === source)
    .map((edge) => refOf(edge.target))
    .sort();
}

/** The concepts directly related to this one, in either stored direction. */
export function relatedTo(graph: KnowledgeGraph, conceptSlug: string): string[] {
  const self = conceptNodeId(conceptSlug);
  const out: string[] = [];

  for (const edge of graph.edges) {
    if (edge.kind !== 'related') continue;
    if (edge.source === self) out.push(refOf(edge.target));
    else if (edge.target === self) out.push(refOf(edge.source));
  }

  return out.sort();
}

/**
 * Lessons a student should complete before this one, in the order to take them.
 *
 * Depth-first post-order, so a prerequisite's own prerequisites come first: a
 * list that told a student to read lesson B before lesson A, while B itself
 * needed C, would not be a study plan.
 *
 * A cycle is unsatisfiable — no lesson in it can ever be "first" — so this
 * refuses rather than looping or silently dropping an edge. Call `detectCycles`
 * at build time and the vault never reaches a student in that state.
 */
export function resolvePrerequisites(graph: KnowledgeGraph, lessonId: string): string[] {
  const direct = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (edge.kind !== 'prerequisite') continue;
    const list = direct.get(edge.target) ?? [];
    list.push(edge.source);
    direct.set(edge.target, list);
  }

  const start = lessonNodeId(lessonId);
  const order: string[] = [];
  const done = new Set<string>();
  const path = new Set<string>();

  const visit = (id: string): void => {
    if (done.has(id)) return;

    if (path.has(id)) {
      throw new Error(
        `Prerequisite cycle through "${refOf(id)}" — a lesson cannot be its own prerequisite.`,
      );
    }

    path.add(id);
    for (const prerequisite of (direct.get(id) ?? []).slice().sort()) visit(prerequisite);
    path.delete(id);

    done.add(id);
    // The lesson itself is the destination, not one of its own prerequisites.
    if (id !== start) order.push(refOf(id));
  };

  visit(start);
  return order;
}

/**
 * Concepts adjacent to this one, strongest connection first.
 *
 * "Strength" is how many ways the vault connects the two: an explicit `related`
 * edge, plus every lesson that teaches both. A concept taught alongside this one
 * in four lessons is a better thing to read next than one an author once listed.
 */
export function recommendRelated(
  graph: KnowledgeGraph,
  conceptSlug: string,
  limit = 8,
): GraphNode[] {
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  if (byId.get(conceptNodeId(conceptSlug))?.kind !== 'concept') return [];

  const strength = new Map<string, number>();
  const add = (slug: string, weight: number): void => {
    if (slug === conceptSlug) return;
    if (!byId.has(conceptNodeId(slug))) return;
    strength.set(slug, (strength.get(slug) ?? 0) + weight);
  };

  // An authored relation is a deliberate statement, so it outweighs one
  // incidental co-appearance — but not several.
  for (const slug of relatedTo(graph, conceptSlug)) add(slug, 3);

  for (const lessonId of appearsIn(graph, conceptSlug)) {
    for (const sibling of conceptsOf(graph, lessonId)) add(sibling, 1);
  }

  return [...strength.entries()]
    .sort(([aSlug, aWeight], [bSlug, bWeight]) => bWeight - aWeight || aSlug.localeCompare(bSlug))
    .slice(0, limit)
    .map(([slug]) => byId.get(conceptNodeId(slug)))
    .filter((node): node is GraphNode => node !== undefined);
}

/* ------------------------------------------------------------------ *
 * Integrity
 * ------------------------------------------------------------------ */

/**
 * Every prerequisite cycle, each as the lessons that form it.
 *
 * A cycle is a curriculum that cannot be taken: every lesson in it waits on
 * another. It is found here so the build fails, rather than in the UI as a
 * student who can never start.
 */
export function detectCycles(graph: KnowledgeGraph): string[][] {
  const next = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (edge.kind !== 'prerequisite') continue;
    const list = next.get(edge.source) ?? [];
    list.push(edge.target);
    next.set(edge.source, list);
  }

  const cycles: string[][] = [];
  const seen = new Set<string>();
  const stack: string[] = [];
  const onStack = new Set<string>();

  const walk = (id: string): void => {
    seen.add(id);
    stack.push(id);
    onStack.add(id);

    for (const target of (next.get(id) ?? []).slice().sort()) {
      if (onStack.has(target)) {
        // The cycle is the part of the current path from `target` onward.
        cycles.push(stack.slice(stack.indexOf(target)).map(refOf));
      } else if (!seen.has(target)) {
        walk(target);
      }
    }

    stack.pop();
    onStack.delete(id);
  };

  for (const node of graph.nodes) {
    if (node.kind === 'lesson' && !seen.has(node.id)) walk(node.id);
  }

  return cycles;
}

/**
 * Concepts nothing connects to: no lesson teaches them, no concept relates
 * to them.
 *
 * Not an error — a concept may legitimately land before the lesson that will
 * use it. It is a warning that a student has no path to reach it.
 */
export function findOrphanConcepts(graph: KnowledgeGraph): string[] {
  return graph.nodes
    .filter((node) => node.kind === 'concept' && node.degree === 0)
    .map((node) => node.ref)
    .sort();
}
