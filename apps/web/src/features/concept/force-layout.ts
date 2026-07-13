/**
 * A force-directed layout for the knowledge graph.
 *
 * Deterministic by construction: nodes start on a golden-angle spiral keyed by
 * their index, and the simulation runs a fixed number of iterations. The same
 * graph therefore lays out identically on every visit — a student who returns
 * to /graph finds the map where they left it, which is the whole reason a map
 * is useful.
 *
 * It runs to completion *before* the first paint rather than animating toward
 * a solution. The design system caps motion at 300ms and bans ambient movement;
 * a graph that drifts for ten seconds is decoration, and it makes the thing
 * harder to read while it settles.
 *
 * Hand-written rather than pulled from d3: it is sixty lines, it has to be
 * deterministic, and 119 nodes do not justify a layout engine.
 */
import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

export interface LaidOutNode {
  readonly id: string;
  readonly ref: string;
  readonly kind: 'concept' | 'lesson';
  readonly label: string;
  readonly degree: number;
  x: number;
  y: number;
}

export interface LaidOutEdge {
  readonly source: LaidOutNode;
  readonly target: LaidOutNode;
  readonly kind: string;
}

export interface Layout {
  readonly nodes: readonly LaidOutNode[];
  readonly edges: readonly LaidOutEdge[];
  readonly width: number;
  readonly height: number;
}

const WIDTH = 1000;
const HEIGHT = 720;
const ITERATIONS = 320;

/** The angle that spaces points on a spiral as evenly as points can be spaced. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export function layoutGraph(graph: KnowledgeGraph): Layout {
  const nodes: LaidOutNode[] = graph.nodes.map((node, i) => {
    // Deterministic seeding: no Math.random, so the map is stable across visits.
    const radius = 20 + 320 * Math.sqrt(i / Math.max(graph.nodes.length, 1));
    const angle = i * GOLDEN_ANGLE;

    return {
      id: node.id,
      ref: node.ref,
      kind: node.kind,
      label: node.label,
      degree: node.degree,
      x: WIDTH / 2 + radius * Math.cos(angle),
      y: HEIGHT / 2 + radius * Math.sin(angle),
    };
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));

  const edges: LaidOutEdge[] = graph.edges.flatMap((edge) => {
    const source = byId.get(edge.source);
    const target = byId.get(edge.target);
    if (!source || !target) return [];
    return [{ source, target, kind: edge.kind }];
  });

  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;

  const repulsion = 5200;
  const springLength = 62;
  const springStrength = 0.035;

  for (let step = 0; step < ITERATIONS; step += 1) {
    // Cooling: large corrections early, fine adjustment late.
    const temperature = 1 - step / ITERATIONS;
    const damping = 0.85 * temperature + 0.05;

    const fx = new Float64Array(nodes.length);
    const fy = new Float64Array(nodes.length);

    // Every node pushes every other away, or the graph collapses to a point.
    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      if (!a) continue;

      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        if (!b) continue;

        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let distanceSquared = dx * dx + dy * dy;

        // Two nodes exactly on top of each other have no direction to separate
        // in. Nudge them apart deterministically by index rather than randomly.
        if (distanceSquared < 0.01) {
          dx = (i % 7) - 3 || 1;
          dy = (j % 5) - 2 || 1;
          distanceSquared = dx * dx + dy * dy;
        }

        const distance = Math.sqrt(distanceSquared);
        const force = repulsion / distanceSquared;
        const ux = (dx / distance) * force;
        const uy = (dy / distance) * force;

        fx[i] = (fx[i] ?? 0) + ux;
        fy[i] = (fy[i] ?? 0) + uy;
        fx[j] = (fx[j] ?? 0) - ux;
        fy[j] = (fy[j] ?? 0) - uy;
      }
    }

    // Edges pull their endpoints together, so what is connected reads as near.
    const index = new Map(nodes.map((node, i) => [node.id, i]));

    for (const edge of edges) {
      const i = index.get(edge.source.id);
      const j = index.get(edge.target.id);
      if (i === undefined || j === undefined) continue;

      const dx = edge.target.x - edge.source.x;
      const dy = edge.target.y - edge.source.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      const force = (distance - springLength) * springStrength;
      const ux = (dx / distance) * force;
      const uy = (dy / distance) * force;

      fx[i] = (fx[i] ?? 0) + ux;
      fy[i] = (fy[i] ?? 0) + uy;
      fx[j] = (fx[j] ?? 0) - ux;
      fy[j] = (fy[j] ?? 0) - uy;
    }

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (!node) continue;

      // A gentle pull to the middle keeps loosely-attached nodes from drifting
      // off the canvas entirely.
      const gravity = 0.012;
      const dx = (fx[i] ?? 0) + (centerX - node.x) * gravity;
      const dy = (fy[i] ?? 0) + (centerY - node.y) * gravity;

      // Cap the step, or a node with a hundred neighbours flings itself away.
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      const limit = 18;
      const scale = magnitude > limit ? limit / magnitude : 1;

      node.x += dx * scale * damping;
      node.y += dy * scale * damping;
    }
  }

  return fit(nodes, edges);
}

/** Scale the settled layout to fill the viewBox, whatever size it converged to. */
function fit(nodes: LaidOutNode[], edges: LaidOutEdge[]): Layout {
  const padding = 40;

  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;

  const scale = Math.min((WIDTH - padding * 2) / spanX, (HEIGHT - padding * 2) / spanY);

  for (const node of nodes) {
    node.x = padding + (node.x - minX) * scale;
    node.y = padding + (node.y - minY) * scale;
  }

  return { nodes, edges, width: WIDTH, height: HEIGHT };
}
