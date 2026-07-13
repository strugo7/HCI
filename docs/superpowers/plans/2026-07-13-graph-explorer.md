# Graph Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give `/graph` a camera (zoom/pan), a filter by curriculum unit that removes what the student did not ask for, and a focus mode that collapses the graph to one node's neighbourhood.

**Architecture:** Keep the existing hand-rolled SVG renderer and hand-rolled force layout — no graph library (see the spec's "Rejected: replacing the renderer"). Add a `unit` field to every graph node at build time, then split the page's concerns into four pieces: a **view model** decides what is visible, the **layout** decides where things are, a **camera** decides what is framed, and `concept-graph.tsx` draws. Filtering re-runs the layout seeded from the full-graph positions so nodes settle rather than teleport, and the camera — not the layout — reframes.

**Tech Stack:** TypeScript, React 19, Vite, Tailwind 3.4 + shadcn (new-york, RTL), zod, d3-zoom/d3-selection/d3-transition, vitest.

**Spec:** `docs/superpowers/specs/2026-07-13-graph-explorer-design.md`

## Global Constraints

- **RTL.** Logical utilities only — `ms/me`, `ps/pe`, `start/end`. Never `ml/mr`, `pl/pr`, `left/right`. (`apps/web/tailwind.config.ts:5-8`)
- **All UI copy is Hebrew.** `<html lang="he" dir="rtl">`.
- **Semantic color tokens only.** No raw hex, no `text-blue-500`. New colors get a CSS variable in `globals.css` (light *and* dark) and a Tailwind token.
- **Motion ≤ 300ms, no ambient motion.** Nothing may drift, pulse, or animate at rest. Every animation is a response to an action and it ends.
- **`prefers-reduced-motion: reduce` must skip every tween and snap.**
- **The build is byte-identical.** Same vault in, same `graph.json` out. No `Math.random`, no `Date.now`, no reliance on Map/object iteration order for anything that reaches the output. Ties break by an explicit, stated rule.
- **The graph is derived, never authored.** Nothing in `content/` gets hand-edited to make this work.
- **Tailwind class names must be statically visible.** Never build a class name by interpolation (`` `fill-graph-${i}` `` is purged at build). Use a literal lookup array.

---

## File Structure

| File | Responsibility |
|---|---|
| `packages/knowledge-graph/src/index.ts` | `unit` on `GraphNode`, `units` on the graph, `GraphUnit`, unit assignment inside `buildGraph` |
| `packages/knowledge-graph/src/index.test.ts` | **new** — unit assignment: majority, tie-break, orphan |
| `scripts/lib/graph.ts` | `compileGraph` takes units and forwards them |
| `scripts/build-content.ts` | pass units (already in scope at line 121) |
| `scripts/validate-content.ts` | read the curriculum so CI gates on the graph the app ships |
| `apps/web/src/features/concept/graph-view-model.ts` | **new** — pure. `(graph, selection) → visible subgraph` |
| `apps/web/src/features/concept/graph-view-model.test.ts` | **new** |
| `apps/web/src/features/concept/force-layout.ts` | `LayoutOptions` (seed / iterations / fit), `boundsOf`, `Bounds` |
| `apps/web/src/features/concept/force-layout.test.ts` | **new** — the seeding contract |
| `apps/web/src/features/concept/use-graph-camera.ts` | **new** — d3-zoom binding; `zoomBy`, `frame`, `reset` |
| `apps/web/src/features/concept/use-animated-layout.ts` | **new** — rAF tween between layouts |
| `apps/web/src/features/concept/graph-toolbar.tsx` | **new** — unit chips + zoom controls |
| `apps/web/src/features/concept/graph-focus-card.tsx` | **new** — the focused node, and the way to its page |
| `apps/web/src/features/concept/concept-graph.tsx` | composes the above and draws |
| `apps/web/src/styles/globals.css` | `--graph-1 … --graph-5`, light + dark |
| `apps/web/tailwind.config.ts` | expose `graph.1 … graph.5` |
| `apps/web/src/pages/graph.tsx` | page copy |

---

## Task 1: A unit on every graph node

**Files:**
- Modify: `packages/knowledge-graph/src/index.ts`
- Modify: `packages/knowledge-graph/package.json`
- Test: `packages/knowledge-graph/src/index.test.ts` (create)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `export interface GraphUnit { readonly id: string; readonly title: string; readonly lessons: readonly string[] }`
  - `GraphNode` gains `unit: string | null`
  - `KnowledgeGraph` gains `units: { id: string; title: string }[]`
  - `buildGraph(lessons, concepts, units?: readonly GraphUnit[]): KnowledgeGraph`

### Steps

- [ ] **Step 1: Add vitest to the package**

`packages/knowledge-graph/package.json` — add the script and the devDependency:

```json
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@cyberatlas/core": "workspace:*",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "vitest": "^2.1.8"
  }
```

Then:

```bash
pnpm install
```

- [ ] **Step 2: Write the failing test**

Create `packages/knowledge-graph/src/index.test.ts`.

`buildGraph` reads only four things off a lesson (`id`, `frontmatter.title`, `frontmatter.prerequisites`, `concepts`) and two off a concept (`frontmatter.slug`, `frontmatter.title`, `related`). The fixtures supply exactly those and cast — building whole `Lesson` objects here would test the fixture, not the graph.

```ts
/**
 * Unit assignment is the one part of the graph a reader cannot check by eye.
 *
 * A concept in the wrong unit does not look wrong — it just quietly lies to a
 * student filtering for it. So it is tested, and the rest of the graph (which
 * is visible the moment you open /graph) is not.
 */
import { describe, expect, it } from 'vitest';

import type { Concept, Lesson } from '@cyberatlas/core';

import { buildGraph, conceptNodeId, lessonNodeId, type GraphUnit, type KnowledgeGraph } from './index.js';

function lesson(id: string, concepts: string[] = []): Lesson {
  return {
    id,
    frontmatter: { title: `שיעור ${id}`, prerequisites: [] },
    concepts,
    sections: [],
  } as unknown as Lesson;
}

function concept(slug: string, related: string[] = []): Concept {
  return {
    frontmatter: { slug, title: slug },
    related,
  } as unknown as Concept;
}

function unitOfConcept(graph: KnowledgeGraph, slug: string): string | null | undefined {
  return graph.nodes.find((node) => node.id === conceptNodeId(slug))?.unit;
}

function unitOfLesson(graph: KnowledgeGraph, id: string): string | null | undefined {
  return graph.nodes.find((node) => node.id === lessonNodeId(id))?.unit;
}

const UNITS: GraphUnit[] = [
  { id: 'foundations', title: 'יסודות', lessons: ['cia'] },
  { id: 'malware', title: 'נוזקות', lessons: ['virus', 'worm', 'trojan-horse'] },
];

describe('unit assignment', () => {
  it('places a lesson in the unit that lists it', () => {
    const graph = buildGraph([lesson('cia'), lesson('virus')], [], UNITS);

    expect(unitOfLesson(graph, 'cia')).toBe('foundations');
    expect(unitOfLesson(graph, 'virus')).toBe('malware');
  });

  it('leaves a lesson no unit claims unplaced', () => {
    const graph = buildGraph([lesson('orphan-lesson')], [], UNITS);

    expect(unitOfLesson(graph, 'orphan-lesson')).toBeNull();
  });

  it('places a concept in the unit most of its lessons belong to', () => {
    const graph = buildGraph(
      [
        lesson('virus', ['payload']),
        lesson('worm', ['payload']),
        lesson('trojan-horse', ['payload']),
        lesson('cia', ['payload']),
      ],
      [concept('payload')],
      UNITS,
    );

    // Three malware lessons to one foundations lesson.
    expect(unitOfConcept(graph, 'payload')).toBe('malware');
  });

  it('breaks a tie by curriculum order, not by insertion order', () => {
    const lessons = [lesson('virus', ['shared']), lesson('cia', ['shared'])];
    const concepts = [concept('shared')];

    // One vote each. `foundations` comes first in the curriculum, so it wins —
    // even though the malware lesson was compiled first.
    expect(unitOfConcept(buildGraph(lessons, concepts, UNITS), 'shared')).toBe('foundations');

    // Reverse the curriculum and the answer must follow it, proving the rule is
    // curriculum order and not something incidental about the input.
    const reversed = [...UNITS].reverse();
    expect(unitOfConcept(buildGraph(lessons, concepts, reversed), 'shared')).toBe('malware');
  });

  it('leaves a concept no lesson references unplaced', () => {
    const graph = buildGraph([lesson('cia')], [concept('lonely')], UNITS);

    expect(unitOfConcept(graph, 'lonely')).toBeNull();
  });

  it('does not let a related-edge place a concept — only lessons teach', () => {
    // `lonely` is related to `taught`, which lives in foundations. Relatedness
    // is not teaching, so `lonely` stays unplaced.
    const graph = buildGraph(
      [lesson('cia', ['taught'])],
      [concept('taught'), concept('lonely', ['taught'])],
      UNITS,
    );

    expect(unitOfConcept(graph, 'taught')).toBe('foundations');
    expect(unitOfConcept(graph, 'lonely')).toBeNull();
  });

  it('carries the curriculum units onto the graph, in order', () => {
    const graph = buildGraph([], [], UNITS);

    expect(graph.units).toEqual([
      { id: 'foundations', title: 'יסודות' },
      { id: 'malware', title: 'נוזקות' },
    ]);
  });

  it('builds the same graph twice, byte for byte', () => {
    const lessons = [lesson('virus', ['payload']), lesson('cia', ['payload'])];
    const concepts = [concept('payload')];

    const a = JSON.stringify(buildGraph(lessons, concepts, UNITS));
    const b = JSON.stringify(buildGraph(lessons, concepts, UNITS));

    expect(a).toBe(b);
  });
});
```

- [ ] **Step 3: Run the test and watch it fail**

```bash
pnpm --filter @cyberatlas/knowledge-graph test
```

Expected: FAIL — `buildGraph` takes two arguments, and `graph.units` / `node.unit` do not exist.

- [ ] **Step 4: Extend the schema**

In `packages/knowledge-graph/src/index.ts`, add `unit` to `GraphNodeSchema` (after `degree`, line 35):

```ts
  /** How many edges touch this node — drives visual weight in the graph view. */
  degree: z.number().int().nonnegative().default(0),
  /**
   * The curriculum unit this node belongs to, or null when nothing places it.
   *
   * The graph itself has no opinion about topics — `[[links]]` and `related:`
   * say what connects to what, never what it is *about*. The curriculum does,
   * so the topic comes from there and is attached here.
   */
  unit: z.string().nullable().default(null),
});
```

Below `GraphEdgeSchema` (after line 71), add the unit types:

```ts
/**
 * Just enough of a curriculum unit to place a node in it.
 *
 * The package stays IO-free and knows nothing about `curriculum.yaml` — the
 * build reads the file and hands the result in. A structural type rather than
 * an import, so `scripts/lib/curriculum.ts` can keep owning `UnitMeta`.
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
```

And extend `KnowledgeGraphSchema` (line 73):

```ts
export const KnowledgeGraphSchema = z.object({
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
  /**
   * The curriculum's units, in curriculum order — the graph view renders its
   * filter chips straight from this and never loads the curriculum itself.
   */
  units: z.array(GraphUnitRefSchema).default([]),
});
```

- [ ] **Step 5: Assign units in `buildGraph`**

Set `unit: null` on both node literals, so every node has the field from birth. In the concept loop (line 118):

```ts
    nodes.set(conceptNodeId(slug), {
      id: conceptNodeId(slug),
      kind: 'concept',
      ref: slug,
      label: title,
      degree: 0,
      unit: null,
    });
```

In the lesson loop (line 128):

```ts
    nodes.set(lessonNodeId(lesson.id), {
      id: lessonNodeId(lesson.id),
      kind: 'lesson',
      ref: lesson.id,
      label: lesson.frontmatter.title,
      degree: 0,
      unit: null,
    });
```

Change the signature (line 110) and the return (line 178):

```ts
export function buildGraph(
  lessons: readonly Lesson[],
  concepts: readonly Concept[],
  units: readonly GraphUnit[] = [],
): KnowledgeGraph {
```

```ts
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
```

Add `assignUnits` immediately above `buildGraph`:

```ts
/**
 * Place every node in a curriculum unit.
 *
 * A lesson is placed by the unit that lists it — the curriculum says so
 * directly. A concept has no such statement, so it is placed by the lessons
 * that actually *teach* it: the unit holding the most lessons that reference
 * the concept wins. Relatedness does not vote; a concept is about what it is
 * taught alongside, not what an author once said it resembles.
 *
 * A tie breaks by curriculum order. It must break by *something stated*, or the
 * same vault would place a concept differently depending on the order the files
 * happened to come off the disk — and the build would stop being reproducible.
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
```

- [ ] **Step 6: Run the tests and watch them pass**

```bash
pnpm --filter @cyberatlas/knowledge-graph test
pnpm --filter @cyberatlas/knowledge-graph typecheck
```

Expected: 8 passing, typecheck clean.

- [ ] **Step 7: Commit**

```bash
git add packages/knowledge-graph pnpm-lock.yaml
git commit -m "Place every graph node in a curriculum unit

The graph knew what connects to what and nothing about what any of it
is about, so there was no field a topic filter could filter on. Lessons
are placed by the unit that lists them; a concept is placed by the unit
whose lessons actually teach it, ties broken by curriculum order so the
build stays reproducible."
```

---

## Task 2: Thread the curriculum into the build

**Files:**
- Modify: `scripts/lib/graph.ts:23-27`
- Modify: `scripts/build-content.ts:128`
- Modify: `scripts/validate-content.ts:14-22`

**Interfaces:**
- Consumes: `buildGraph(lessons, concepts, units)` and `GraphUnit` from Task 1.
- Produces: `compileGraph(lessons, concepts, units: readonly UnitMeta[])`. `apps/web/src/generated/content/graph.json` now carries `units` and a `unit` on every node.

`UnitMeta` (`scripts/lib/curriculum.ts:23`) already has `id`, `title` and `lessons`, so it satisfies `GraphUnit` structurally — no adapter, no second type.

### Steps

- [ ] **Step 1: `compileGraph` takes the units**

`scripts/lib/graph.ts` — extend the import, the signature, and the call:

```ts
import { DIAGNOSTIC_CODES, type Concept, type Diagnostic, type Lesson } from '@cyberatlas/core';

import type { UnitMeta } from './curriculum.js';

export function compileGraph(
  lessons: readonly Lesson[],
  concepts: readonly Concept[],
  units: readonly UnitMeta[],
): { graph: KnowledgeGraph; diagnostics: Diagnostic[] } {
  const graph = buildGraph(lessons, concepts, units);
  const diagnostics: Diagnostic[] = [];
```

The rest of the function is unchanged.

- [ ] **Step 2: Pass them from the build**

`scripts/build-content.ts:128` — `units` is already in scope from `readCurriculum` at line 121:

```ts
  const { graph, diagnostics: graphDiagnostics } = compileGraph(lessons, concepts, units);
```

- [ ] **Step 3: Let the CI gate see the same graph**

`scripts/validate-content.ts` reads no curriculum today, so it would have to pass `[]` — and then gate on a graph in which nothing is placed, which is not the graph the app ships. Give it the curriculum.

Add the import:

```ts
import { compileVault } from './lib/compile.js';
import { readCurriculum } from './lib/curriculum.js';
import { compileGraph } from './lib/graph.js';
```

And in `main()`, between `compileVault` and `compileGraph`:

```ts
async function main(): Promise<void> {
  const { lessons, concepts, diagnostics, failed } = await compileVault();

  // The graph is placed in the curriculum's units, so the gate has to read the
  // curriculum too — otherwise CI would check a graph the app never ships.
  const { units, diagnostics: curriculumDiagnostics } = await readCurriculum(
    lessons.map((lesson) => lesson.id),
  );
  diagnostics.push(...curriculumDiagnostics);

  // The gate checks the graph too, or a prerequisite cycle would only be
  // discovered by the build — which is to say, after review.
  const { graph, diagnostics: graphDiagnostics } = compileGraph(lessons, concepts, units);
  diagnostics.push(...graphDiagnostics);
```

- [ ] **Step 4: Build the content and read the result**

```bash
pnpm content:build
```

Then check what came out:

```bash
node -e '
const g = require("./apps/web/src/generated/content/graph.json");
const placed = g.nodes.filter((n) => n.unit !== null).length;
const byUnit = {};
for (const n of g.nodes) byUnit[n.unit ?? "—"] = (byUnit[n.unit ?? "—"] ?? 0) + 1;
console.log("units:", g.units.map((u) => u.id).join(", "));
console.log("placed:", placed, "of", g.nodes.length);
console.log(byUnit);
'
```

Expected: the nine unit ids in curriculum order; every one of the 37 lessons placed; most of the 82 concepts placed, with a small `—` bucket of concepts no lesson references. A concept count of zero, or *every* concept in one unit, means the tally is wrong — go back to Task 1.

- [ ] **Step 5: Prove the build is still reproducible**

```bash
cp apps/web/src/generated/content/graph.json /tmp/graph-a.json
pnpm content:build
diff -q /tmp/graph-a.json apps/web/src/generated/content/graph.json && echo "byte-identical"
```

Expected: `byte-identical`.

- [ ] **Step 6: Run the gate**

```bash
pnpm content:validate
```

Expected: exits 0. It now also reports curriculum diagnostics, which it did not before — warnings are fine, an error is not.

- [ ] **Step 7: Commit**

```bash
git add scripts
git commit -m "Feed the curriculum to the graph build

compileGraph now takes the units, so graph.json ships with every node
placed. validate-content reads the curriculum too — a gate that checked
an unplaced graph would be checking something the app never ships."
```

---

## Task 3: A camera

**Files:**
- Create: `apps/web/src/features/concept/use-graph-camera.ts`
- Create: `apps/web/src/features/concept/graph-toolbar.tsx`
- Modify: `apps/web/src/features/concept/force-layout.ts` (add `Bounds`, `boundsOf`)
- Modify: `apps/web/src/features/concept/concept-graph.tsx`
- Modify: `apps/web/package.json`

**Interfaces:**
- Consumes: `Layout`, `LaidOutNode` from `force-layout.ts`.
- Produces:
  - `export interface Bounds { readonly minX: number; readonly minY: number; readonly maxX: number; readonly maxY: number }` (in `force-layout.ts`)
  - `export function boundsOf(nodes: readonly LaidOutNode[]): Bounds`
  - `export interface Camera { readonly scale: number; readonly transform: string; zoomBy(factor: number): void; frame(bounds: Bounds): void; reset(): void }`
  - `export function useGraphCamera(svgRef: RefObject<SVGSVGElement | null>, width: number, height: number): Camera`
  - `export function GraphToolbar(props: GraphToolbarProps): ReactNode`

At the end of this task, zoom and pan work end to end. The filter chips land in Task 8 on the same toolbar.

### Steps

- [ ] **Step 1: Add d3**

`apps/web/package.json` — add to `dependencies`:

```json
    "d3-selection": "^3.0.0",
    "d3-transition": "^3.0.1",
    "d3-zoom": "^3.0.0",
```

and to `devDependencies`:

```json
    "@types/d3-selection": "^3.0.11",
    "@types/d3-transition": "^3.0.9",
    "@types/d3-zoom": "^3.0.8",
```

```bash
pnpm install
```

`d3-transition` is not optional and is not used directly: `selection.transition()` is a method d3-transition *installs* onto d3-selection's prototype when imported. Without the import, `select(svg).transition()` throws at runtime — and only at runtime.

- [ ] **Step 2: Give the layout a bounding box**

Append to `apps/web/src/features/concept/force-layout.ts`:

```ts
export interface Bounds {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}

/**
 * The box the nodes actually occupy.
 *
 * The camera frames this. It is deliberately not the layout's job to rescale
 * itself to the viewBox once a filter exists — see `layoutGraph`'s `fit`.
 */
export function boundsOf(nodes: readonly LaidOutNode[]): Bounds {
  if (nodes.length === 0) return { minX: 0, minY: 0, maxX: WIDTH, maxY: HEIGHT };

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const node of nodes) {
    if (node.x < minX) minX = node.x;
    if (node.x > maxX) maxX = node.x;
    if (node.y < minY) minY = node.y;
    if (node.y > maxY) maxY = node.y;
  }

  return { minX, minY, maxX, maxY };
}
```

- [ ] **Step 3: Write the camera**

Create `apps/web/src/features/concept/use-graph-camera.ts`:

```ts
/**
 * The camera over the graph.
 *
 * Zoom and pan are a *camera*, not a layout: nothing about where a node sits
 * changes when the student zooms. Keeping the two apart is what lets a filter
 * relax the subgraph in place while the view reframes to it — if the layout
 * rescaled itself to the viewBox instead, every surviving node would shift for
 * no reason a student could see.
 *
 * d3-zoom owns the wheel, drag and pinch gestures; the toolbar buttons drive
 * the same behavior, so there is exactly one source of truth for the transform.
 */
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

import { select } from 'd3-selection';
import 'd3-transition'; // installs selection.transition() — see package.json
import { zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior, type ZoomTransform } from 'd3-zoom';

import { useReducedMotion } from 'framer-motion';

import type { Bounds } from './force-layout';

const MIN_SCALE = 0.5;
const MAX_SCALE = 6;

/** Inside the design system's 300ms cap. */
const DURATION = 250;

/** Room around a framed subgraph, in layout units. */
const PADDING = 60;

export interface Camera {
  /** The current zoom factor. Drives how much of the graph names itself. */
  readonly scale: number;
  /** Ready for an SVG `transform` attribute. */
  readonly transform: string;
  zoomBy(factor: number): void;
  frame(bounds: Bounds): void;
  reset(): void;
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

    // Double-click belongs to focus mode, not to zoom.
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
```

- [ ] **Step 4: Write the toolbar (zoom controls only, for now)**

Create `apps/web/src/features/concept/graph-toolbar.tsx`:

```tsx
/**
 * The graph's controls.
 *
 * The zoom buttons are not decoration. Wheel and pinch are the fast path, but
 * neither is reachable from a keyboard — without these, a student navigating by
 * keyboard has no zoom at all.
 */
import { Maximize2, Minus, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';

export interface GraphToolbarProps {
  readonly onZoomIn: () => void;
  readonly onZoomOut: () => void;
  readonly onReset: () => void;
}

export function GraphToolbar({ onZoomIn, onZoomOut, onReset }: GraphToolbarProps): ReactNode {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-3">
      <div className="ms-auto flex items-center gap-1">
        <Button variant="outline" size="icon" onClick={onZoomIn} aria-label="התקרב">
          <Plus className="size-4" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" onClick={onZoomOut} aria-label="התרחק">
          <Minus className="size-4" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" onClick={onReset} aria-label="התאם למסך">
          <Maximize2 className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Wire the camera into the graph**

Rewrite `apps/web/src/features/concept/concept-graph.tsx`. Three things change: the content moves inside one transformed `<g>`, the label threshold becomes a function of scale, and hairlines counter-scale so they stay hairlines.

Replace the file's imports and body (keep the top doc comment, and add the paragraph about zoom):

```tsx
/**
 * The knowledge graph, drawn.
 *
 * 119 nodes and 555 edges is far past what a person can read at once, so the
 * graph is quiet until it is asked a question: edges sit at low contrast, and
 * hovering or focusing a node raises that node's neighbourhood and dims
 * everything else. The student explores one concept's connections at a time,
 * which is the only way this many edges says anything at all.
 *
 * Zooming is the second question the graph answers, and it is a *reading*
 * gesture rather than a magnifying one: the closer the student gets, the more
 * of the map names itself. Labels are rationed by scale, because 119 names at
 * once is fog and a name you cannot read is worse than no name.
 *
 * No new hue: concepts are `primary`, lessons are `muted-foreground`, edges are
 * `border`. The six learn colors belong to callouts and are not spent here.
 */
import { useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { layoutGraph, type LaidOutNode } from './force-layout';
import { GraphToolbar } from './graph-toolbar';
import { useGraphCamera } from './use-graph-camera';
import { conceptPath, lessonPath } from '@/router/routes';

interface ConceptGraphProps {
  readonly graph: KnowledgeGraph;
}

/** Node radius grows with degree, but slowly — a hub must not swallow the map. */
function radiusOf(node: LaidOutNode): number {
  return 3.5 + Math.sqrt(node.degree) * 1.6;
}

/**
 * How well-connected a concept must be before it gets a standing label.
 *
 * At rest only the landmarks are named. Zooming in spends the space that opens
 * up on more names, until at close range every concept is named — which is what
 * makes zoom worth having. Lessons are never labelled at any scale: a lesson is
 * a place concepts are taught rather than a thing to be learned, and its title
 * is a long Hebrew sentence that would overprint the concepts sitting under it.
 * Every node still names itself on hover or focus, which is when the student is
 * actually asking.
 */
function labelThreshold(scale: number): number {
  if (scale < 1.6) return 14;
  if (scale < 3) return 6;
  return 0;
}

export function ConceptGraph({ graph }: ConceptGraphProps): ReactNode {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  // The layout is deterministic and expensive-ish; it runs once per graph.
  const { nodes, edges, width, height } = useMemo(() => layoutGraph(graph), [graph]);

  const camera = useGraphCamera(svgRef, width, height);

  // Hairlines and type are measured on the *screen*, not in the layout's
  // coordinate space, so they are divided back out of the camera's scale. A
  // 0.7px edge that became 4px at 6× would stop being an edge and start being
  // a bar.
  const k = camera.scale;
  const threshold = labelThreshold(k);

  /** Every node one edge away from the active one, including itself. */
  const neighbourhood = useMemo(() => {
    if (active === null) return null;

    const near = new Set<string>([active]);
    for (const edge of edges) {
      if (edge.source.id === active) near.add(edge.target.id);
      else if (edge.target.id === active) near.add(edge.source.id);
    }
    return near;
  }, [active, edges]);

  const open = (node: LaidOutNode): void => {
    navigate(node.kind === 'concept' ? conceptPath(node.ref) : lessonPath(node.ref));
  };

  return (
    <figure className="rounded-xl border border-border bg-card">
      <GraphToolbar
        onZoomIn={() => camera.zoomBy(1.4)}
        onZoomOut={() => camera.zoomBy(1 / 1.4)}
        onReset={camera.reset}
      />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="h-[70vh] w-full cursor-grab touch-none active:cursor-grabbing"
        role="img"
        aria-label={`גרף ידע: ${nodes.length} צמתים, ${edges.length} קשתות`}
      >
        <g transform={camera.transform}>
          <g>
            {edges.map((edge, i) => {
              const dimmed = neighbourhood !== null;
              const lit =
                neighbourhood !== null &&
                (edge.source.id === active || edge.target.id === active);

              return (
                <line
                  key={i}
                  x1={edge.source.x}
                  y1={edge.source.y}
                  x2={edge.target.x}
                  y2={edge.target.y}
                  className={lit ? 'stroke-primary' : 'stroke-border'}
                  strokeWidth={(lit ? 1.4 : 0.7) / k}
                  strokeOpacity={lit ? 0.9 : dimmed ? 0.12 : 0.45}
                  // Prerequisites are a different kind of claim than a reference:
                  // one is "you must", the other "this appears". Dashing separates
                  // them without spending a color on the distinction.
                  strokeDasharray={edge.kind === 'prerequisite' ? `${4 / k} ${3 / k}` : undefined}
                />
              );
            })}
          </g>

          <g>
            {nodes.map((node) => {
              const near = neighbourhood === null || neighbourhood.has(node.id);
              const isActive = node.id === active;
              const radius = radiusOf(node);
              const named = (node.kind === 'concept' && node.degree >= threshold) || isActive;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x} ${node.y})`}
                  className="cursor-pointer focus:outline-none"
                  tabIndex={0}
                  role="link"
                  aria-label={node.label}
                  opacity={near ? 1 : 0.2}
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(node.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => open(node)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      open(node);
                    }
                  }}
                >
                  <circle
                    r={radius + (isActive ? 2.5 : 0)}
                    className={
                      node.kind === 'concept'
                        ? 'fill-primary stroke-background'
                        : 'fill-muted-foreground stroke-background'
                    }
                    strokeWidth={1.5 / k}
                  />

                  {named ? (
                    <text
                      y={-radius - 5 / k}
                      textAnchor="middle"
                      className="pointer-events-none fill-foreground font-medium"
                      fontSize={10 / k}
                      style={{ paintOrder: 'stroke' }}
                      stroke="hsl(var(--card))"
                      strokeWidth={3 / k}
                    >
                      {node.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-5 py-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary" aria-hidden />
          מושג
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-muted-foreground" aria-hidden />
          שיעור
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="18" height="2" aria-hidden>
            <line x1="0" y1="1" x2="18" y2="1" className="stroke-border" strokeWidth="2" />
          </svg>
          קישור
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="18" height="2" aria-hidden>
            <line
              x1="0"
              y1="1"
              x2="18"
              y2="1"
              className="stroke-border"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>
          דרישת קדם
        </span>
        <span className="ms-auto">גודל הצומת נגזר ממספר הקשרים שלו</span>
      </figcaption>
    </figure>
  );
}
```

Note the `text` change: the old code set the size with the Tailwind class `text-[10px]`, which cannot counter-scale. It is now the `fontSize` attribute.

- [ ] **Step 5b: `touch-none` is load-bearing**

The `touch-none` class on the `<svg>` is what lets d3-zoom handle pinch and drag on a touch device; without it the browser scrolls the page instead. Do not drop it as "unused".

- [ ] **Step 6: See it work**

```bash
pnpm --filter @cyberatlas/web dev
```

Open `http://localhost:5173/graph` and check, in order:

1. Scroll-wheel over the graph zooms; drag pans.
2. The `+` / `−` / fit buttons do the same, and are reachable by Tab.
3. Zooming in past ~1.6× makes more concept names appear; past ~3× nearly all of them do. Lesson names never appear except on hover.
4. Edges stay hairline-thin at 6× — they do not thicken into bars.
5. Labels stay ~10px at every scale.
6. "התאם למסך" returns to the starting view.

- [ ] **Step 7: Typecheck, lint, commit**

```bash
pnpm --filter @cyberatlas/web typecheck && pnpm --filter @cyberatlas/web lint
```

```bash
git add apps/web pnpm-lock.yaml
git commit -m "Give the graph a camera

Zoom is a reading gesture here, not a magnifying one: the label
threshold falls as the student gets closer, so approaching the map is
what makes it name itself. Hairlines and type counter-scale, or a 0.7px
edge becomes a 4px bar at 6x.

d3-zoom owns the gestures and the toolbar buttons drive the same
behavior, so there is one transform. The buttons are not decoration —
wheel and pinch are unreachable from a keyboard."
```

---

## Task 4: The view model

**Files:**
- Create: `apps/web/src/features/concept/graph-view-model.ts`
- Test: `apps/web/src/features/concept/graph-view-model.test.ts` (create)
- Modify: `apps/web/package.json`
- Create: `apps/web/vitest.config.ts`

**Interfaces:**
- Consumes: `KnowledgeGraph`, `GraphNode` from `@cyberatlas/knowledge-graph` (Task 1).
- Produces:
  - `export const UNASSIGNED = '__unassigned__'`
  - `export interface GraphSelection { readonly units: ReadonlySet<string>; readonly focus: string | null }`
  - `export function chipOf(node: GraphNode): string`
  - `export function allChips(graph: KnowledgeGraph): string[]`
  - `export function isFiltering(graph: KnowledgeGraph, units: ReadonlySet<string>): boolean`
  - `export function visibleGraph(graph: KnowledgeGraph, selection: GraphSelection): KnowledgeGraph`

This is the single place that decides what is on screen. The unit filter and focus mode are two predicates through one function — if they were two code paths they would disagree about their intersection, and the bug would only appear when a student did both at once.

### Steps

- [ ] **Step 1: Add vitest to the app**

`apps/web/package.json` — add the script:

```json
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "lint": "eslint .",
```

and the devDependency:

```json
    "vitest": "^2.1.8",
```

```bash
pnpm install
```

- [ ] **Step 2: Point vitest at the app's aliases**

Create `apps/web/vitest.config.ts`. The app's `vite.config.ts` loads the React plugin, which vitest does not need and which slows every run; a small dedicated config that only carries the `@/` alias is cheaper and cannot drift, because it reads the same `tsconfig` path.

```ts
import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  test: {
    // Everything tested here is pure: no DOM, no rendering. Rendering is cheap
    // to see and expensive to assert on, so it is checked by opening the page.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 3: Write the failing test**

Create `apps/web/src/features/concept/graph-view-model.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import type { GraphNode, KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { UNASSIGNED, allChips, isFiltering, visibleGraph } from './graph-view-model';

function node(id: string, unit: string | null): GraphNode {
  const [kind, ref] = id.split(':') as ['concept' | 'lesson', string];
  return { id, kind, ref, label: ref, degree: 0, unit };
}

/**
 *   lesson:virus (malware) ──references──▶ concept:payload (malware)
 *   lesson:cia (foundations) ──references──▶ concept:triad (foundations)
 *   concept:payload ──related──▶ concept:triad
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

    // payload↔triad is `related`, but triad is in foundations and is gone.
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
    // foundations selected, payload must stay hidden — focus reveals what the
    // filter already allows, it does not reach past it.
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
```

- [ ] **Step 4: Run it and watch it fail**

```bash
pnpm --filter @cyberatlas/web test
```

Expected: FAIL — `./graph-view-model` does not exist.

- [ ] **Step 5: Write the view model**

Create `apps/web/src/features/concept/graph-view-model.ts`:

```ts
/**
 * What the student is looking at.
 *
 * The unit filter and focus mode are two questions about the same thing — which
 * nodes are on screen — so they are answered in one place. Two code paths would
 * eventually disagree about their intersection, and that bug only appears to a
 * student doing both at once, which is to say to nobody who would report it.
 *
 * Pure, and deliberately unaware of layout, colour and the camera: it decides
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
  /** A node id to collapse around, or null. */
  readonly focus: string | null;
}

export function chipOf(node: GraphNode): string {
  return node.unit ?? UNASSIGNED;
}

/** Every chip the toolbar should offer, in curriculum order. */
export function allChips(graph: KnowledgeGraph): string[] {
  return [...graph.units.map((unit) => unit.id), UNASSIGNED];
}

/**
 * Is the student actually filtering, or just looking at everything?
 *
 * All-on is the default and means "show me the graph". All-off means the same
 * in practice. Only a strict subset is a filter — and colour is spent only on
 * a filter, so this is the question that decides whether the graph is coloured.
 */
export function isFiltering(graph: KnowledgeGraph, units: ReadonlySet<string>): boolean {
  return units.size > 0 && units.size < allChips(graph).length;
}

/**
 * The subgraph on screen.
 *
 * Node `degree` is left at its whole-graph value on purpose. It drives node
 * size, and a concept that shrank because the student filtered away the lessons
 * that reference it would be telling a lie about its own importance.
 */
export function visibleGraph(graph: KnowledgeGraph, selection: GraphSelection): KnowledgeGraph {
  let keep = new Set(
    graph.nodes.filter((node) => selection.units.has(chipOf(node))).map((node) => node.id),
  );

  // Focus narrows what the filter allowed; it never reaches past it. A focused
  // node the filter has hidden is not a state worth honouring, so it is ignored
  // rather than made to override the filter the student just set.
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
    nodes: graph.nodes.filter((node) => keep.has(node.id)),
    edges: graph.edges.filter((edge) => keep.has(edge.source) && keep.has(edge.target)),
    units: graph.units,
  };
}
```

- [ ] **Step 6: Run the tests and watch them pass**

```bash
pnpm --filter @cyberatlas/web test
pnpm --filter @cyberatlas/web typecheck
```

Expected: 11 passing, typecheck clean.

- [ ] **Step 7: Commit**

```bash
git add apps/web pnpm-lock.yaml
git commit -m "Decide what the graph shows in one place

The unit filter and focus mode both answer 'which nodes are on screen',
so they answer it through one function. Two code paths would disagree
about their intersection, and only a student doing both at once would
ever see it."
```

---

## Task 5: A layout that can be seeded

**Files:**
- Modify: `apps/web/src/features/concept/force-layout.ts`
- Test: `apps/web/src/features/concept/force-layout.test.ts` (create)

**Interfaces:**
- Consumes: nothing new.
- Produces:
  - `export interface LayoutOptions { readonly seed?: ReadonlyMap<string, { readonly x: number; readonly y: number }>; readonly iterations?: number; readonly fit?: boolean }`
  - `export const FILTERED_ITERATIONS = 120`
  - `layoutGraph(graph: KnowledgeGraph, options?: LayoutOptions): Layout`

### Steps

- [ ] **Step 1: Write the failing test**

Create `apps/web/src/features/concept/force-layout.test.ts`:

```ts
/**
 * The seeding contract, pinned.
 *
 * Everything the filter's feel depends on lives here: seed from where the nodes
 * already are, start cool, and do not re-fit. Get any of the three wrong and the
 * graph teleports on every chip click — which looks like a rendering bug and is
 * actually a layout one, so it is worth a test that says so out loud.
 */
import { describe, expect, it } from 'vitest';

import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { boundsOf, layoutGraph } from './force-layout';

const GRAPH: KnowledgeGraph = {
  nodes: [
    { id: 'concept:a', kind: 'concept', ref: 'a', label: 'a', degree: 1, unit: null },
    { id: 'concept:b', kind: 'concept', ref: 'b', label: 'b', degree: 1, unit: null },
  ],
  edges: [{ source: 'concept:a', target: 'concept:b', kind: 'related' }],
  units: [],
};

const at = (layout: { nodes: readonly { id: string; x: number; y: number }[] }, id: string) => {
  const node = layout.nodes.find((n) => n.id === id);
  if (node === undefined) throw new Error(`no node ${id}`);
  return { x: node.x, y: node.y };
};

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

  it('settles a seeded layout near the seed rather than throwing it across the canvas', () => {
    const seed = new Map([
      ['concept:a', { x: 480, y: 340 }],
      ['concept:b', { x: 520, y: 380 }],
    ]);

    const layout = layoutGraph(GRAPH, { seed, iterations: 120, fit: false });
    const moved = Math.hypot(at(layout, 'concept:a').x - 480, at(layout, 'concept:a').y - 340);

    // The two are already about a spring-length apart, so there is little work
    // to do. A cold start keeps it that way; a hot one would fling them.
    expect(moved).toBeLessThan(60);
  });

  it('does not rescale a seeded layout to the viewBox when fit is off', () => {
    const seed = new Map([
      ['concept:a', { x: 400, y: 340 }],
      ['concept:b', { x: 460, y: 380 }],
    ]);

    const layout = layoutGraph(GRAPH, { seed, iterations: 40, fit: false });
    const bounds = boundsOf(layout.nodes);

    // fit() would have pushed these to the padding on both sides — 40 and 960.
    expect(bounds.minX).toBeGreaterThan(200);
    expect(bounds.maxX).toBeLessThan(800);
  });

  it('lays the same graph out identically every time', () => {
    const a = layoutGraph(GRAPH);
    const b = layoutGraph(GRAPH);

    expect(a.nodes.map((n) => [n.x, n.y])).toEqual(b.nodes.map((n) => [n.x, n.y]));
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

```bash
pnpm --filter @cyberatlas/web test force-layout
```

Expected: FAIL — `layoutGraph` takes one argument.

- [ ] **Step 3: Add the options**

In `apps/web/src/features/concept/force-layout.ts`, extend the doc comment and add the options type after `Layout` (line 41):

```ts
/**
 * A seeded layout is a *continuation*, not a fresh start.
 *
 * When the student filters, the surviving nodes must stay roughly where they
 * were — the whole value of a map is that it is in the same place next time you
 * look. So the simulation begins from the positions the nodes already hold and
 * runs cool and briefly, just long enough to close the gaps the hidden nodes
 * left behind.
 *
 * `fit` is off for those runs, and that is the subtle one. Rescaling the
 * subgraph to fill the viewBox would move every surviving node — including the
 * ones the simulation never touched — for a reason the student cannot see.
 * Framing is the camera's job (`use-graph-camera.ts`); this function only
 * decides where nodes sit relative to each other.
 */
export interface LayoutOptions {
  /** Start from these coordinates instead of the golden-angle spiral. */
  readonly seed?: ReadonlyMap<string, { readonly x: number; readonly y: number }>;
  readonly iterations?: number;
  /** Rescale the settled layout to fill the viewBox. */
  readonly fit?: boolean;
}

/** Enough to close the gaps a filter opens, not enough to redraw the map. */
export const FILTERED_ITERATIONS = 120;
```

- [ ] **Step 4: Honour them in `layoutGraph`**

Replace the signature and the seeding block (lines 50-65):

```ts
export function layoutGraph(graph: KnowledgeGraph, options: LayoutOptions = {}): Layout {
  const { seed, iterations = ITERATIONS, fit: shouldFit = true } = options;

  const nodes: LaidOutNode[] = graph.nodes.map((node, i) => {
    // Deterministic seeding: no Math.random, so the map is stable across visits.
    const radius = 20 + 320 * Math.sqrt(i / Math.max(graph.nodes.length, 1));
    const angle = i * GOLDEN_ANGLE;

    // A node the seed knows resumes from where it was. A node it does not know
    // — one that a filter just revealed — has no history, so it takes its place
    // on the spiral like any other first-time node.
    const from = seed?.get(node.id);

    return {
      id: node.id,
      ref: node.ref,
      kind: node.kind,
      label: node.label,
      degree: node.degree,
      x: from?.x ?? WIDTH / 2 + radius * Math.cos(angle),
      y: from?.y ?? HEIGHT / 2 + radius * Math.sin(angle),
    };
  });
```

Replace the cooling line (lines 83-86):

```ts
  // A seeded run starts cool. The nodes are already near a solution, and full
  // temperature would fling them across the canvas on the first step — undoing
  // the very continuity the seed exists to provide.
  const heat = seed === undefined ? 1 : 0.45;

  for (let step = 0; step < iterations; step += 1) {
    // Cooling: large corrections early, fine adjustment late.
    const temperature = (1 - step / iterations) * heat;
    const damping = 0.85 * temperature + 0.05;
```

Guard the `iterations = 0` case, which would divide by zero: `1 - 0/0` is `NaN`. The loop never runs when `iterations` is 0, so `temperature` is never evaluated — but only because the loop condition `0 < 0` is false first. That is fine and needs no guard; the test at Step 1 pins it.

Replace the return (line 166):

```ts
  return shouldFit ? fit(nodes, edges) : { nodes, edges, width: WIDTH, height: HEIGHT };
```

- [ ] **Step 5: Run the tests and watch them pass**

```bash
pnpm --filter @cyberatlas/web test
pnpm --filter @cyberatlas/web typecheck
```

Expected: 15 passing (11 from Task 4, 4 here), typecheck clean. `/graph` still looks exactly as it did — the defaults preserve the old behaviour.

- [ ] **Step 6: Commit**

```bash
git add apps/web
git commit -m "Let the layout resume instead of restarting

A filtered layout seeds from where the nodes already are, starts cool,
and does not re-fit. Fit is the subtle one: rescaling the subgraph to
the viewBox would move every surviving node — including ones the
simulation never touched — for a reason the student cannot see. Framing
belongs to the camera."
```

---

## Task 6: Tween between layouts

**Files:**
- Create: `apps/web/src/features/concept/use-animated-layout.ts`

**Interfaces:**
- Consumes: `Layout`, `LaidOutNode`, `LaidOutEdge` from `force-layout.ts`.
- Produces: `export function useAnimatedLayout(target: Layout): Layout`

Not wired into anything until Task 8 — the layout only changes when a filter exists.

### Steps

- [ ] **Step 1: Write the hook**

Create `apps/web/src/features/concept/use-animated-layout.ts`:

```ts
/**
 * Carry the nodes from the layout they were in to the layout they are in now.
 *
 * The seeded layout means a filtered graph *settles* near where it was rather
 * than somewhere new — but without a tween the student never sees it settle,
 * only the before and the after, which reads as a teleport and destroys exactly
 * the continuity the seeding bought. 300ms is the design system's cap, and this
 * is not ambient motion: it is the answer to a click, and it ends.
 *
 * Edges hold references to the node objects, so tweening the nodes moves the
 * edges for free — but only if the edges are rebuilt to point at the *tweened*
 * nodes, which is what `interpolate` does.
 */
import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from 'framer-motion';

import type { LaidOutEdge, LaidOutNode, Layout } from './force-layout';

const DURATION = 300;

/** Fast, then gentle — motion that decelerates into place reads as settling. */
function easeOut(t: number): number {
  return 1 - (1 - t) ** 3;
}

type Positions = ReadonlyMap<string, { readonly x: number; readonly y: number }>;

function positionsOf(nodes: readonly LaidOutNode[]): Positions {
  return new Map(nodes.map((node) => [node.id, { x: node.x, y: node.y }]));
}

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
    const target_ = byId.get(edge.target.id);
    if (source === undefined || target_ === undefined) return [];
    return [{ source, target: target_, kind: edge.kind }];
  });

  return { nodes, edges, width: target.width, height: target.height };
}

export function useAnimatedLayout(target: Layout): Layout {
  const [frame, setFrame] = useState<Layout>(target);

  // Where the nodes were when the last tween finished. Empty on first mount,
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
```

- [ ] **Step 2: Typecheck and commit**

```bash
pnpm --filter @cyberatlas/web typecheck && pnpm --filter @cyberatlas/web lint
```

```bash
git add apps/web/src/features/concept/use-animated-layout.ts
git commit -m "Tween the graph between layouts

The seeded layout makes a filtered graph settle near where it was. This
is what lets the student see it settle — without it they get the before
and the after, which reads as a teleport and throws away the continuity
the seeding bought."
```

---

## Task 7: Five hues, spent only on a filter

**Files:**
- Modify: `apps/web/src/styles/globals.css`
- Modify: `apps/web/tailwind.config.ts`

**Interfaces:**
- Produces: `--graph-1 … --graph-5` (light and dark), and the Tailwind tokens `fill-graph-1`, `stroke-graph-1`, `bg-graph-1`, … `-5`.

### Steps

- [ ] **Step 1: Add the tokens**

In `apps/web/src/styles/globals.css`, in the `:root` block, after `--learn-tip` (line 43):

```css
    /* The knowledge graph's units.
     *
     * Spent only when the student is actually filtering — see concept-graph.tsx.
     * Nine units cannot each have a hue without turning a 119-node graph into
     * confetti, so at most five are ever on screen at once, and the graph is
     * monochrome the rest of the time.
     *
     * Blue / orange / green / purple / amber: distinguishable under the common
     * forms of colour blindness, and each legible on the card surface. */
    --graph-1: 217 91% 55%;
    --graph-2: 25 90% 52%;
    --graph-3: 160 70% 38%;
    --graph-4: 291 62% 55%;
    --graph-5: 45 93% 45%;
```

And in the `.dark` block, at the same place — lifted and desaturated, because a mid-tone hue that reads on white disappears into the navy card:

```css
    --graph-1: 217 91% 68%;
    --graph-2: 25 95% 62%;
    --graph-3: 160 60% 50%;
    --graph-4: 291 70% 70%;
    --graph-5: 45 93% 60%;
```

- [ ] **Step 2: Expose them to Tailwind**

In `apps/web/tailwind.config.ts`, inside `theme.extend.colors`, after the `learn` block:

```ts
        // The graph's unit hues. Numeric rather than named, because they mean
        // "the first unit the student selected", not "blue" — the same unit
        // gets a different hue in a different selection.
        graph: {
          1: 'hsl(var(--graph-1))',
          2: 'hsl(var(--graph-2))',
          3: 'hsl(var(--graph-3))',
          4: 'hsl(var(--graph-4))',
          5: 'hsl(var(--graph-5))',
        },
```

- [ ] **Step 3: Prove the classes survive the build**

Tailwind scans source for *literal* class names. A class assembled as `` `fill-graph-${i}` `` is invisible to that scan and gets purged, and the failure is silent — the node just renders unfilled. Task 8 uses literal lookup arrays for exactly this reason. Check the tokens compile:

```bash
pnpm --filter @cyberatlas/web build
```

Expected: build succeeds. (Nothing uses the classes yet, so nothing is emitted — this only proves the config parses.)

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/styles/globals.css apps/web/tailwind.config.ts
git commit -m "Add five graph hues, for a filter to spend

Named by position rather than by colour, because they mean 'the first
unit you selected' — the same unit takes a different hue in a different
selection. Nine units cannot each hold a hue without turning the graph
into confetti, so five is the budget and monochrome is the default."
```

---

## Task 8: The filter

**Files:**
- Modify: `apps/web/src/features/concept/graph-toolbar.tsx`
- Modify: `apps/web/src/features/concept/concept-graph.tsx`

**Interfaces:**
- Consumes: `visibleGraph`, `allChips`, `chipOf`, `isFiltering`, `UNASSIGNED` (Task 4); `layoutGraph`, `LayoutOptions`, `FILTERED_ITERATIONS`, `boundsOf` (Tasks 3, 5); `useAnimatedLayout` (Task 6); `graph-1…5` (Task 7); `useGraphCamera` (Task 3).
- Produces: `GraphToolbarProps` gains `units`, `selected`, `hues`, `onToggle`, `onAll`.

### Steps

- [ ] **Step 1: Give the toolbar its chips**

Rewrite `apps/web/src/features/concept/graph-toolbar.tsx`:

```tsx
/**
 * The graph's controls.
 *
 * The zoom buttons are not decoration. Wheel and pinch are the fast path, but
 * neither is reachable from a keyboard — without these, a student navigating by
 * keyboard has no zoom at all.
 *
 * A chip wears the hue its nodes wear, which is what makes a legend
 * unnecessary: the chip *is* the legend, and it is also the control.
 */
import { Maximize2, Minus, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

/**
 * Literal, not interpolated. Tailwind scans source for class names it can see;
 * `fill-graph-${i}` is invisible to that scan and would be purged, leaving the
 * nodes unfilled with no error anywhere.
 */
export const CHIP_HUE = [
  'border-graph-1 bg-graph-1/10 text-graph-1',
  'border-graph-2 bg-graph-2/10 text-graph-2',
  'border-graph-3 bg-graph-3/10 text-graph-3',
  'border-graph-4 bg-graph-4/10 text-graph-4',
  'border-graph-5 bg-graph-5/10 text-graph-5',
] as const;

export interface ToolbarChip {
  readonly id: string;
  readonly title: string;
}

export interface GraphToolbarProps {
  readonly chips: readonly ToolbarChip[];
  readonly selected: ReadonlySet<string>;
  /** Chip id → hue index, for the chips that have one. Empty when monochrome. */
  readonly hues: ReadonlyMap<string, number>;
  readonly onToggle: (id: string) => void;
  readonly onAll: () => void;
  readonly onZoomIn: () => void;
  readonly onZoomOut: () => void;
  readonly onReset: () => void;
}

export function GraphToolbar({
  chips,
  selected,
  hues,
  onToggle,
  onAll,
  onZoomIn,
  onZoomOut,
  onReset,
}: GraphToolbarProps): ReactNode {
  const everything = selected.size === chips.length;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-3">
      <button
        type="button"
        onClick={onAll}
        aria-pressed={everything}
        className={cn(
          'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
          everything
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border text-muted-foreground hover:bg-muted',
        )}
      >
        הכול
      </button>

      {chips.map((chip) => {
        const on = selected.has(chip.id);
        const hue = hues.get(chip.id);

        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onToggle(chip.id)}
            aria-pressed={on}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              !on && 'border-border text-muted-foreground hover:bg-muted',
              on && hue === undefined && 'border-primary bg-primary text-primary-foreground',
              on && hue !== undefined && CHIP_HUE[hue],
            )}
          >
            {chip.title}
          </button>
        );
      })}

      <div className="ms-auto flex items-center gap-1">
        <Button variant="outline" size="icon" onClick={onZoomIn} aria-label="התקרב">
          <Plus className="size-4" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" onClick={onZoomOut} aria-label="התרחק">
          <Minus className="size-4" aria-hidden />
        </Button>
        <Button variant="outline" size="icon" onClick={onReset} aria-label="התאם למסך">
          <Maximize2 className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire the filter into the graph**

In `apps/web/src/features/concept/concept-graph.tsx`, replace the imports and the top of the component. Everything below `neighbourhood` stays as Task 3 left it except the three marked spots.

New imports:

```tsx
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import {
  FILTERED_ITERATIONS,
  boundsOf,
  layoutGraph,
  type LaidOutNode,
} from './force-layout';
import { GraphToolbar } from './graph-toolbar';
import { UNASSIGNED, allChips, chipOf, isFiltering, visibleGraph } from './graph-view-model';
import { useAnimatedLayout } from './use-animated-layout';
import { useGraphCamera } from './use-graph-camera';
import { conceptPath, lessonPath } from '@/router/routes';
```

Add the hue lookup below `labelThreshold`:

```tsx
/** Literal, for the same reason `CHIP_HUE` is. See graph-toolbar.tsx. */
const NODE_FILL = [
  'fill-graph-1',
  'fill-graph-2',
  'fill-graph-3',
  'fill-graph-4',
  'fill-graph-5',
] as const;

const NODE_STROKE = [
  'stroke-graph-1',
  'stroke-graph-2',
  'stroke-graph-3',
  'stroke-graph-4',
  'stroke-graph-5',
] as const;

/** Beyond this many selected units, colour stops distinguishing and starts shouting. */
const HUE_BUDGET = NODE_FILL.length;

const CHIP_TITLE_UNASSIGNED = 'לא משויך';
```

State and derivation, replacing the `useMemo(() => layoutGraph(graph), [graph])` line:

```tsx
export function ConceptGraph({ graph }: ConceptGraphProps): ReactNode {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const chips = useMemo(
    () => [
      ...graph.units,
      { id: UNASSIGNED, title: CHIP_TITLE_UNASSIGNED },
    ],
    [graph],
  );

  const [selected, setSelected] = useState<ReadonlySet<string>>(
    () => new Set(allChips(graph)),
  );

  const selection = useMemo(() => ({ units: selected, focus: null }), [selected]);
  const visible = useMemo(() => visibleGraph(graph, selection), [graph, selection]);

  /**
   * The whole graph, laid out and fitted. This is the coordinate space, and it
   * never changes.
   */
  const base = useMemo(() => layoutGraph(graph), [graph]);

  /**
   * Every filtered layout seeds from `base`, never from the layout currently on
   * screen. That is what makes filtering reversible: turn a unit off and back
   * on and the nodes return to exactly where they started, because they were
   * always measured from the same origin. Seeding from the live positions would
   * let error accumulate, and the map would drift a little further from itself
   * with every click.
   */
  const seed = useMemo(
    () => new Map(base.nodes.map((node) => [node.id, { x: node.x, y: node.y }])),
    [base],
  );

  const target = useMemo(() => {
    if (visible.nodes.length === graph.nodes.length) return base;

    return layoutGraph(visible, {
      seed,
      iterations: FILTERED_ITERATIONS,
      fit: false,
    });
  }, [visible, graph.nodes.length, base, seed]);

  const { nodes, edges, width, height } = useAnimatedLayout(target);

  const camera = useGraphCamera(svgRef, width, height);

  // When the visible set changes, the camera goes to meet it. The layout does
  // not rescale itself (see force-layout's `fit`), so this is what keeps a
  // filtered subgraph from sitting in one corner of an otherwise empty canvas.
  const { frame } = camera;
  useEffect(() => {
    frame(boundsOf(target.nodes));
  }, [target, frame]);

  const filtering = isFiltering(graph, selected);

  /**
   * Chip id → hue index.
   *
   * A hue means "the Nth unit you selected", numbered in curriculum order — so
   * selecting `malware` alone always paints it the same colour, and the map does
   * not repaint itself just because the student added a second unit above it.
   */
  const hues = useMemo(() => {
    if (!filtering) return new Map<string, number>();

    const chosen = allChips(graph).filter((id) => selected.has(id));
    if (chosen.length > HUE_BUDGET) return new Map<string, number>();

    return new Map(chosen.map((id, i) => [id, i]));
  }, [graph, selected, filtering]);

  const toggle = (id: string): void => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showAll = (): void => setSelected(new Set(allChips(graph)));

  const k = camera.scale;
  const threshold = labelThreshold(k);

  // ... `neighbourhood` and `open` unchanged from Task 3 ...
```

- [ ] **Step 3: Colour the nodes**

Inside the node `map`, replace the `<circle>` (Task 3's version) with one that takes the unit hue when there is one:

```tsx
              const hue = hues.get(chipOf(node));
              const fill =
                hue !== undefined
                  ? NODE_FILL[hue]
                  : node.kind === 'concept'
                    ? 'fill-primary'
                    : 'fill-muted-foreground';
```

and:

```tsx
                  <circle
                    r={radius + (isActive ? 2.5 : 0)}
                    className={`${fill} stroke-background`}
                    strokeWidth={1.5 / k}
                  />
```

`chipOf` needs a `GraphNode`, and `LaidOutNode` does not carry `unit`. Add it — in `force-layout.ts`, extend `LaidOutNode`:

```ts
export interface LaidOutNode {
  readonly id: string;
  readonly ref: string;
  readonly kind: 'concept' | 'lesson';
  readonly label: string;
  readonly degree: number;
  readonly unit: string | null;
  x: number;
  y: number;
}
```

and carry it through in `layoutGraph`'s node map:

```ts
      degree: node.degree,
      unit: node.unit,
      x: from?.x ?? WIDTH / 2 + radius * Math.cos(angle),
```

`chipOf` takes a structural `{ unit: string | null }`, so widen its parameter in `graph-view-model.ts`:

```ts
export function chipOf(node: { readonly unit: string | null }): string {
  return node.unit ?? UNASSIGNED;
}
```

The `force-layout.test.ts` fixtures already set `unit: null`, so they keep compiling. `NODE_STROKE` is not used yet — it lands in Task 9 for the focus ring. If lint objects to an unused export, leave it; it is exported.

- [ ] **Step 4: Pass the toolbar its props**

```tsx
      <GraphToolbar
        chips={chips}
        selected={selected}
        hues={hues}
        onToggle={toggle}
        onAll={showAll}
        onZoomIn={() => camera.zoomBy(1.4)}
        onZoomOut={() => camera.zoomBy(1 / 1.4)}
        onReset={camera.reset}
      />
```

- [ ] **Step 5: Update the `aria-label` and the caption**

The SVG's label counts what is on screen, and when a filter is on it should say so:

```tsx
        aria-label={
          filtering
            ? `גרף ידע, מסונן: ${nodes.length} צמתים, ${edges.length} קשתות`
            : `גרף ידע: ${nodes.length} צמתים, ${edges.length} קשתות`
        }
```

In the `figcaption`, the מושג/שיעור swatches lie while a filter is colouring by unit. Hide them then, and say what is going on instead:

```tsx
      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-5 py-3 text-xs text-muted-foreground">
        {filtering ? (
          <span>הצבע מסמן את היחידה. {nodes.length} מתוך {graph.nodes.length} צמתים מוצגים.</span>
        ) : (
          <>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-primary" aria-hidden />
              מושג
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-muted-foreground" aria-hidden />
              שיעור
            </span>
          </>
        )}
        {/* קישור and דרישת קדם swatches unchanged */}
        <span className="ms-auto">גודל הצומת נגזר ממספר הקשרים שלו</span>
      </figcaption>
```

- [ ] **Step 6: See it work**

```bash
pnpm --filter @cyberatlas/web dev
```

At `http://localhost:5173/graph`:

1. Nine unit chips plus "לא משויך" plus "הכול". All on at first, and the graph is monochrome.
2. Click one chip off: that unit's nodes disappear, the rest **settle** — they drift a short distance over ~300ms, they do not jump. The camera reframes onto what is left.
3. With a strict subset on, the remaining chips and their nodes take matching hues.
4. Select six or more units: back to monochrome, chips still filter. This is the `HUE_BUDGET` rule.
5. Turn a chip off and back on: the nodes return to **exactly** where they started. This is the seed-from-base rule; if they drift, the seed is coming from the live layout.
6. "הכול" restores everything.
7. In macOS System Settings → Accessibility → Display → Reduce motion, filtering snaps instead of tweening, and the camera jumps.

- [ ] **Step 7: Test, typecheck, lint, commit**

```bash
pnpm --filter @cyberatlas/web test && pnpm --filter @cyberatlas/web typecheck && pnpm --filter @cyberatlas/web lint
```

```bash
git add apps/web
git commit -m "Filter the graph by curriculum unit

Chips hide what the student did not ask for, and the survivors settle
rather than teleport: every filtered layout seeds from the same base
layout, so turning a unit off and back on returns the nodes to exactly
where they started.

Colour is spent only on a strict subset of at most five units — the
chip wears the hue its nodes wear, which is why there is no legend."
```

---

## Task 9: Focus mode

**Files:**
- Create: `apps/web/src/features/concept/graph-focus-card.tsx`
- Modify: `apps/web/src/features/concept/concept-graph.tsx`

**Interfaces:**
- Consumes: everything from Tasks 3–8.
- Produces: `export function GraphFocusCard(props: GraphFocusCardProps): ReactNode`

Clicking a node currently navigates. Focus needs the click, so navigation moves to a card. Not double-click — undiscoverable, and unreachable from a keyboard.

### Steps

- [ ] **Step 1: Write the card**

Create `apps/web/src/features/concept/graph-focus-card.tsx`:

```tsx
/**
 * The focused node, and the way out of the graph into its page.
 *
 * Focus took the click that used to navigate, so navigation has to live
 * somewhere the student can find it and a keyboard can reach it. Double-click
 * would have been neither.
 */
import { ArrowLeft, X } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';

import type { LaidOutNode } from './force-layout';

export interface GraphFocusCardProps {
  readonly node: LaidOutNode;
  /** The node's unit, already resolved to its Hebrew title. */
  readonly unit: string | null;
  readonly onOpen: () => void;
  readonly onClear: () => void;
}

export function GraphFocusCard({ node, unit, onOpen, onClear }: GraphFocusCardProps): ReactNode {
  return (
    <div className="absolute bottom-4 end-4 w-64 rounded-lg border border-border bg-popover p-4 shadow-lg">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-popover-foreground">{node.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {node.kind === 'concept' ? 'מושג' : 'שיעור'}
            {unit === null ? '' : ` · ${unit}`}
            {` · ${node.degree} קשרים`}
          </p>
        </div>

        <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={onClear} aria-label="נקה מיקוד">
          <X className="size-4" aria-hidden />
        </Button>
      </div>

      <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={onOpen}>
        פתח דף
        <ArrowLeft className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
```

`ArrowLeft` and not `ArrowRight`: in RTL, forward points left.

- [ ] **Step 2: Hold focus in the graph**

In `concept-graph.tsx`, add the state and fold it into the selection:

```tsx
  const [focus, setFocus] = useState<string | null>(null);

  const selection = useMemo(() => ({ units: selected, focus }), [selected, focus]);
```

The focused node comes from the *whole* graph, not the visible one: it is the thing the visible subgraph was derived from.

```tsx
  const focused = useMemo(
    () => (focus === null ? null : (base.nodes.find((node) => node.id === focus) ?? null)),
    [focus, base],
  );

  const focusedUnit = useMemo(() => {
    if (focused?.unit == null) return null;
    return graph.units.find((unit) => unit.id === focused.unit)?.title ?? null;
  }, [focused, graph]);
```

A filter can hide the focused node — the view model already ignores focus in that case, but leaving it *set* means the card would describe a node that is not on screen. Clear it:

```tsx
  // A chip click can take the focused node away. The view model already ignores
  // an unreachable focus, but the card would still be sitting there describing
  // a node the student can no longer see.
  useEffect(() => {
    if (focus === null) return;
    if (selected.has(chipOf(base.nodes.find((node) => node.id === focus) ?? { unit: null }))) return;
    setFocus(null);
  }, [focus, selected, base]);
```

- [ ] **Step 3: Move the click**

Replace the node's `onClick` and `onKeyDown` (Task 3's version, which called `open`):

```tsx
                  onClick={() => setFocus(node.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setFocus(node.id);
                    }
                  }}
```

Give the focused node a ring, so it is findable inside its own neighbourhood:

```tsx
                  {node.id === focus ? (
                    <circle
                      r={radius + 4}
                      fill="none"
                      className={hue === undefined ? 'stroke-primary' : NODE_STROKE[hue]}
                      strokeWidth={2 / k}
                    />
                  ) : null}
```

Place it *before* the main `<circle>` in the same `<g>`, so the disc paints over the inner edge of the ring.

- [ ] **Step 4: Escape clears focus**

```tsx
  useEffect(() => {
    if (focus === null) return;

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setFocus(null);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focus]);
```

- [ ] **Step 5: Render the card**

The `<figure>` needs `relative` for the card's `absolute`:

```tsx
    <figure className="relative rounded-xl border border-border bg-card">
```

and after the `</svg>`:

```tsx
      {focused === null ? null : (
        <GraphFocusCard
          node={focused}
          unit={focusedUnit}
          onOpen={() => open(focused)}
          onClear={() => setFocus(null)}
        />
      )}
```

`open` is the `navigate` helper Task 3 left in place — it is now called from the card rather than from the node.

- [ ] **Step 6: See it work**

```bash
pnpm --filter @cyberatlas/web dev
```

1. Click a node: the graph collapses to it and its neighbours, the node takes a ring, the camera frames them, and the card appears at the bottom-**left** (RTL `end`).
2. The card names the node, its kind, its unit and its degree.
3. "פתח דף" navigates to the concept or lesson page.
4. `Esc` clears focus; so does the card's ✕. The graph comes back.
5. Tab to a node and press Enter: same as a click.
6. Focus inside a filter: only neighbours the filter allows appear.
7. Focus a node, then filter its unit away: the card disappears and the graph returns to the plain filtered view.
8. Hover still just highlights — it does not collapse anything.

- [ ] **Step 7: Test, typecheck, lint, commit**

```bash
pnpm --filter @cyberatlas/web test && pnpm --filter @cyberatlas/web typecheck && pnpm --filter @cyberatlas/web lint
```

```bash
git add apps/web
git commit -m "Collapse the graph to one node's neighbourhood on click

Focus took the click that used to navigate, so navigation moved to a
card the student can find and a keyboard can reach. Double-click would
have been neither.

Focus runs through the same view model as the unit filter, so the two
intersect instead of fighting: focusing inside a filter reveals only
neighbours the filter already allows."
```

---

## Task 10: Tell the student the graph does these things

**Files:**
- Modify: `apps/web/src/pages/graph.tsx`
- Modify: `apps/web/src/features/concept/index.ts`

**Interfaces:** none new.

The page's hint still says the graph does two things, and it now does four.

### Steps

- [ ] **Step 1: Rewrite the hint**

In `apps/web/src/pages/graph.tsx`, replace the `<p>` below `<ConceptGraph>`:

```tsx
          <ConceptGraph graph={graph} />
          <p className="mt-4 text-sm text-muted-foreground">
            עמדו על צומת כדי להאיר את הקשרים שלו, ולחצו כדי למקד את הגרף סביבו. סננו לפי יחידה
            כדי לראות תת-גרף אחד, והתקרבו כדי שיותר צמתים יזדהו בשמם.
          </p>
```

- [ ] **Step 2: Keep the barrel honest**

`apps/web/src/features/concept/index.ts` — nothing outside the feature needs the new pieces, so the barrel does not change. Confirm it still reads:

```ts
export { useConcept, useGraph } from './use-concept';
export { ConceptPageLayout } from './concept-page-layout';
export { ConceptGraph } from './concept-graph';
```

If anything else was added to it while implementing, take it back out — the feature's internals stay internal.

- [ ] **Step 3: Run everything**

```bash
pnpm content:build
pnpm content:validate
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Expected: all green. `pnpm test` now runs vitest in two packages.

- [ ] **Step 4: Walk the whole feature once**

```bash
pnpm --filter @cyberatlas/web dev
```

At `/graph`, in one sitting: zoom in until concepts name themselves, filter to two units and watch them take hues, click a node to focus, open its page from the card, come back, press "הכול". Then turn on Reduce Motion and do it again — everything should snap, nothing should tween, and nothing should be broken.

- [ ] **Step 5: Commit**

```bash
git add apps/web
git commit -m "Say what the graph now does

The hint described a graph that could be hovered and clicked. It can
now be zoomed, filtered and focused, and a control nobody knows about
is a control nobody uses."
```

---

## Self-Review

**Spec coverage.**

| Spec section | Task |
|---|---|
| 1 — `unit` on every node, `units` on the graph, majority + curriculum-order tie-break, `null` bucket | 1, 2 |
| 2 — d3-zoom camera, scale-dependent label threshold, counter-scaling, keyboard-reachable zoom buttons | 3 |
| 3 — unit chips, seeded re-layout, `fit: false`, camera reframes, 300ms rAF tween, reduced motion | 5, 6, 8 |
| 4 — focus mode through the same subgraph machinery, focus ∩ filter, focus card, `Esc` | 4, 9 |
| 5 — colour only on a strict subset, ≤5 hues, hue by position within the selection, chips carry the hue | 7, 8 |
| 6 — the file split | all |
| 7 — vitest on the two pure modules only | 1, 4 (plus 5, which earned a test the spec did not name — the seeding contract is the thing the whole filter's feel rests on) |
| 8 — out of scope | nothing built |

**Two decisions the spec left to the plan, recorded here:**

- **Seed from `base`, not from the live layout.** The spec said "seeded from current positions". Taken literally that accumulates error: filter, unfilter, filter again and the map drifts. Every filtered layout seeds from the *unfiltered* layout instead, which makes filtering reversible and idempotent. Task 8, Step 2.
- **A seeded run starts cool** (`heat = 0.45`). The spec did not say so, and without it the simulation's first step is at full temperature and flings the seeded nodes across the canvas — destroying the exact continuity the seed exists to provide. Task 5, Step 4.

**Type consistency.** `chipOf` is widened to a structural `{ unit: string | null }` in Task 8 so it accepts both `GraphNode` and `LaidOutNode`; `LaidOutNode` gains `unit` in the same task. `CHIP_HUE` / `NODE_FILL` / `NODE_STROKE` are three parallel literal arrays of length 5, and `HUE_BUDGET` is `NODE_FILL.length` rather than a second `5`. `Bounds` and `boundsOf` are defined in `force-layout.ts` (Task 3) and consumed by `use-graph-camera.ts` and `concept-graph.tsx`.
