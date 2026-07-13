# Graph Explorer — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** `/graph` — zoom, topic filtering, focus mode

## The problem

`/graph` today draws 119 nodes and 555 edges into a fixed `viewBox`, and then
offers the student exactly one way in: hover a node, see its neighbours. There
is no zoom, no pan, no way to ask "show me only the malware material". At this
density the map is a picture of the course rather than a tool for reading it —
a student who wants to know how `dmz` sits relative to `firewall` can find out,
but a student who wants to see the shape of *one unit* cannot.

Three additions fix that: a camera (zoom/pan), a topic filter that actually
removes what you did not ask for, and a focus mode that collapses the graph to
one node's neighbourhood.

## Rejected: replacing the renderer

The obvious move is to adopt a graph library — `@memgraph/orb` was the specific
suggestion. We are not doing that, for reasons that are worth writing down so
the question does not get reopened:

- Orb renders to **canvas**. The current nodes are real DOM (`tabIndex={0}`,
  `role="link"`, `aria-label`), so the graph is keyboard-navigable and screen
  readers can enumerate it. Canvas throws that away and we would have to rebuild
  it behind an offscreen DOM mirror.
- Styling would move from Tailwind semantic tokens into JS style callbacks,
  losing dark mode and the token discipline the rest of the app holds to.
- It pulls `leaflet` (~150KB) for a map view we will never use.
- The performance we would be buying is performance we do not need. Canvas earns
  its keep somewhere north of a few thousand nodes. We have 119.

For the record: the "built-in skill" in the `memgraph/memgraph` repo is
`memgraph-storage-reviewer`, a C++ code reviewer for the database's storage
engine. It has nothing to say about UI.

So: we keep the hand-rolled SVG and hand-rolled force layout, and add a camera,
a filter, and a focus mode on top.

## 1. Data — a `unit` on every node

The graph has no notion of topic. `GraphNode` is `{id, kind, ref, label, degree}`;
the `tags` on concepts and the units in `curriculum.yaml` are both dropped at
build time. A filter needs one of them, so we thread units through.

**Why units and not tags:** units are curated by hand in `content/curriculum.yaml`,
every lesson belongs to exactly one, and they are the division the student
already knows from the rest of the platform. Concept `tags` are many-per-concept
(good for filtering, useless for choosing one color per node) and lessons have
no tags at all. Lesson `category` is a dirty free-text Hebrew field with near-
duplicate values and is not used.

### Schema

`packages/knowledge-graph/src/index.ts`:

```ts
export const GraphNodeSchema = z.object({
  id: z.string().min(1),
  kind: NodeKindSchema,
  ref: z.string().min(1),
  label: z.string().min(1),
  degree: z.number().int().nonnegative().default(0),
  /** The curriculum unit this node belongs to; null when nothing places it. */
  unit: z.string().nullable().default(null),
});

/** Just enough of a curriculum unit to place a node in it. */
export interface GraphUnit {
  readonly id: string;
  readonly title: string;
  readonly lessons: readonly string[];
}

export const KnowledgeGraphSchema = z.object({
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
  /** In curriculum order — the UI renders filter chips straight from this. */
  units: z.array(z.object({ id: z.string(), title: z.string() })).default([]),
});
```

`graph.json` carrying `units` means the graph page never has to load
`index.json` just to render chip labels.

### Assignment rules

`buildGraph(lessons, concepts, units)` gains a third parameter.

- **Lesson node** → the unit whose `lessons` array lists it. A lesson in no unit
  gets `null`.
- **Concept node** → the unit that the most `references`-linked lessons belong
  to. Ties break by **curriculum order** (the index of the unit in the `units`
  array), never by object iteration order — the build must stay byte-identical.
- **Concept no lesson references** → `null`.

Unit assignment happens *after* edges are built and dropped, for the same reason
`degree` does: a node is placed by the lessons that actually reach it, not by the
lessons that hoped to.

Nodes with `unit: null` are not hidden. They get their own chip, labelled
**"לא משויך"**, so an unplaced concept is visible as a gap in the content rather
than silently absent from the map.

### Call sites

- `packages/knowledge-graph/src/index.ts` — schema, `GraphUnit`, assignment.
- `scripts/lib/graph.ts` — `compileGraph(lessons, concepts, units)`.
- `scripts/build-content.ts:128` — `units` is already in scope from
  `readCurriculum` at line 121. Pass it.
- `scripts/validate-content.ts:21` — must now read the curriculum too, so CI
  gates on the same graph the app ships.

## 2. Camera — d3-zoom, and labels that open with it

Add `d3-zoom` + `d3-selection` (~11KB gzip combined). All graph content moves
inside a single `<g transform={...}>`; the `<svg>` gets a zoom behavior with
`scaleExtent([0.5, 6])`.

**The payoff is not the zoom, it is what the zoom reveals.** Today `labelled()`
shows a name only when `degree >= 14`, because 119 labels at once is fog. With a
camera, that threshold becomes a function of scale:

| scale `k` | labelled |
|---|---|
| `k < 1.6` | `degree >= 14` — landmarks only, as today |
| `1.6 ≤ k < 3` | `degree >= 6` |
| `k ≥ 3` | everything |

Zooming in is now *reading*, not magnification. Every node still names itself on
hover or focus at any scale, as it does today.

Nodes and labels **counter-scale**: stroke widths and font sizes divide by `k`,
so a circle stays a circle and 10px text stays 10px text rather than ballooning.

**Controls.** `+` / `−` / "התאם למסך" buttons in the toolbar, because
scroll-wheel zoom is not reachable from a keyboard. The buttons drive the same
d3 zoom behavior (`zoom.scaleBy`, `zoom.transform`), so there is one source of
truth for the camera. d3's default transition is 250ms, inside the design
system's 300ms motion cap.

## 3. Filter — chips, and a layout that settles rather than jumps

A toolbar of unit chips (multi-select toggle buttons, default all-on). Selecting
a subset hides every node outside it and every edge touching a hidden node.

**The re-layout is the delicate part.** Naively re-running `layoutGraph` on the
subgraph re-seeds from the golden-angle spiral and every surviving node teleports
somewhere new — which destroys the spatial memory that made the map worth having.
So `layoutGraph` gains options:

```ts
interface LayoutOptions {
  /** Start the simulation from these coordinates instead of the spiral. */
  readonly seed?: ReadonlyMap<string, { x: number; y: number }>;
  readonly iterations?: number;
  /** Rescale to fill the viewBox when done. */
  readonly fit?: boolean;
}
```

- **Initial full-graph layout:** unchanged — spiral seed, 320 iterations,
  `fit: true`. This establishes the coordinate space.
- **Filtered re-layout:** seeded from current positions, ~120 iterations,
  **`fit: false`**.

That `fit: false` matters. If a filtered layout re-fit itself to the viewBox,
every surviving node would shift just from the rescale, even the ones the
simulation left alone. Instead layout and framing are separated: the simulation
lets the subgraph relax in place, and **the camera** transitions to the
subgraph's bounding box. That is exactly what having a camera buys us.

**Animation.** A `useAnimatedLayout` hook interpolates node positions from their
previous coordinates to the new ones over 300ms in a `requestAnimationFrame`
loop, easing out. Edges read their endpoints from the node objects, so they
follow for free — no separate edge tween. Under
`prefers-reduced-motion: reduce`, the hook skips the tween and snaps.

## 4. Focus mode — and the click it takes away

Clicking a node collapses the graph to that node and its one-hop neighbourhood.
This runs through the *same* subgraph machinery as the unit filter — focus is
just a second predicate — so there is one code path that decides what is visible.

Focus composes with filtering: focusing inside a filtered view keeps the filter.

**The conflict:** clicking a node currently *navigates* to its page. Focus needs
the click, so navigation has to move. It moves to a **focus card** — a small
panel in the corner of the `<figure>` showing the focused node's label, its kind,
its unit, and a "פתח דף ←" button. `Esc` clears focus, as does a "נקה מיקוד"
button.

Not double-click: it is undiscoverable and unreachable from a keyboard.

Hover still highlights a neighbourhood without collapsing anything, as today. So
the interaction ladder is: **hover → preview, click → focus, card → navigate.**

## 5. Color — spent only when it carries information

`concept-graph.tsx:10-11` states the rule: *"No new hue: concepts are `primary`,
lessons are `muted-foreground`, edges are `border`. The six learn colors belong
to callouts and are not spent here."*

Nine units cannot each have a hue without breaking that rule and turning a
119-node graph into confetti. There is also no categorical palette in
`globals.css` — the only non-semantic tokens are the six reserved `--learn-*`
ones.

So color is **conditional**. "A filter is active" means *some but not all* unit
chips are on; all-on (the default) and all-off are both "no filter".

- **No filter active** → the graph is monochrome, exactly as it is today.
- **1–5 units selected** → each selected unit gets a distinct hue from a new
  `--graph-1 … --graph-5` token set in `globals.css` (light + dark), assigned by
  the unit's position *within the selection*, ordered by curriculum order. So
  selecting `malware` alone always paints it `--graph-1`; selecting `malware` +
  `ids-ips` paints them `--graph-1` and `--graph-2`.
- **6+ units selected** → back to monochrome; the chips still control visibility.

Six or more selected means the student is not really filtering, and six hues on
a graph this dense is confetti. Color appears when it distinguishes, and never
when it would only decorate.

The chips carry the same hue as their nodes, which is what makes the legend
unnecessary.

## 6. Files

| File | Change |
|---|---|
| `packages/knowledge-graph/src/index.ts` | `unit` field, `GraphUnit`, `units` on the graph, assignment in `buildGraph` |
| `packages/knowledge-graph/src/unit-assignment.test.ts` | **new** — majority, tie-break, orphan |
| `scripts/lib/graph.ts` | `compileGraph` takes `units` |
| `scripts/build-content.ts` | pass `units` (already in scope) |
| `scripts/validate-content.ts` | read curriculum, pass `units` |
| `apps/web/src/styles/globals.css` | `--graph-1 … --graph-5`, light + dark |
| `apps/web/tailwind.config.ts` | expose the graph colors |
| `apps/web/src/features/concept/force-layout.ts` | `LayoutOptions` — seed, iterations, fit |
| `apps/web/src/features/concept/graph-view-model.ts` | **new** — pure: `(graph, selection, focus) → subgraph` |
| `apps/web/src/features/concept/graph-view-model.test.ts` | **new** |
| `apps/web/src/features/concept/use-graph-camera.ts` | **new** — d3-zoom binding, `zoomTo(bounds)` |
| `apps/web/src/features/concept/use-animated-layout.ts` | **new** — rAF tween, reduced-motion aware |
| `apps/web/src/features/concept/graph-toolbar.tsx` | **new** — unit chips + zoom controls |
| `apps/web/src/features/concept/graph-focus-card.tsx` | **new** — focused node + navigate |
| `apps/web/src/features/concept/concept-graph.tsx` | compose the above |

`concept-graph.tsx` is 187 lines today and would roughly triple if all of this
landed in it. The split above keeps each piece answerable: the view model decides
*what is visible*, the camera decides *what is framed*, the layout decides *where
things are*, and the component draws.

## 7. Testing

The repo has no tests and no test runner today (`turbo run test` exists; no
package defines `test`). We add **vitest to the two pure modules only**:

- **Unit assignment** — a concept referenced by 3 `malware` lessons and 1
  `foundations` lesson lands in `malware`; a 2–2 tie lands in whichever unit
  comes first in `curriculum.yaml`; a concept nothing references gets `null`; the
  build stays byte-identical across runs.
- **View model** — selecting a unit keeps exactly its nodes plus `null`-unit
  nodes if that chip is on; edges touching a hidden node are dropped; focus
  yields node + 1-hop; focus ∩ filter is the intersection.

Not tested: rendering, d3-zoom, the rAF tween. These are hard to test and cheap
to see. The bugs worth catching here are the *silent* ones — a concept placed in
the wrong unit does not look wrong, it just quietly lies.

## 8. Out of scope

Deliberately not building, though all four were considered:

- Search-by-name box
- Filter by node kind (concept / lesson)
- Filter by edge kind (`references` / `prerequisite` / `related`)
- Persisting filter state to the URL

The last one is the most likely follow-up: once filters exist, a student will
want to link someone to "the malware subgraph".
