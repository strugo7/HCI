/**
 * @cyberatlas/knowledge-graph
 *
 * The graph is DERIVED, never authored. Nodes come from concepts and lessons;
 * edges come from `[[wiki-links]]`, `prerequisites`, and `related` frontmatter.
 * Hand-maintaining graph data is forbidden — it would immediately drift from
 * the content that is supposed to be the source of truth.
 *
 * Status: contracts defined, implementation pending (`/update-graph`).
 */
import { z } from 'zod';

import type { Concept, Lesson } from '@cyberatlas/core';

export const NodeKindSchema = z.enum(['concept', 'lesson']);
export type NodeKind = z.infer<typeof NodeKindSchema>;

export const GraphNodeSchema = z.object({
  id: z.string().min(1),
  kind: NodeKindSchema,
  label: z.string().min(1),
  /** How many edges touch this node — drives visual weight in the graph view. */
  degree: z.number().int().nonnegative().default(0),
});
export type GraphNode = z.infer<typeof GraphNodeSchema>;

export const EdgeKindSchema = z.enum([
  /** lesson → concept, from a `[[wiki-link]]` in the body. */
  'references',
  /** lesson → lesson, from frontmatter `prerequisites`. */
  'prerequisite',
  /** concept → concept, from frontmatter `related`. */
  'related',
  /** concept → lesson, the computed inverse of `references`. */
  'appears-in',
]);
export type EdgeKind = z.infer<typeof EdgeKindSchema>;

export const GraphEdgeSchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
  kind: EdgeKindSchema,
});
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;

export const KnowledgeGraphSchema = z.object({
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
});
export type KnowledgeGraph = z.infer<typeof KnowledgeGraphSchema>;

const NOT_IMPLEMENTED = 'Knowledge graph not implemented yet — run /update-graph.';

/** Build the whole graph from parsed content. Pure: same input, same graph. */
export function buildGraph(_lessons: readonly Lesson[], _concepts: readonly Concept[]): KnowledgeGraph {
  throw new Error(NOT_IMPLEMENTED);
}

/**
 * Lessons a student should complete before this one, in topological order.
 * Must detect and reject cycles rather than looping forever.
 */
export function resolvePrerequisites(_graph: KnowledgeGraph, _lessonId: string): string[] {
  throw new Error(NOT_IMPLEMENTED);
}

/** Concepts adjacent to this one, ranked by connection strength. */
export function recommendRelated(
  _graph: KnowledgeGraph,
  _conceptSlug: string,
  _limit?: number,
): GraphNode[] {
  throw new Error(NOT_IMPLEMENTED);
}
