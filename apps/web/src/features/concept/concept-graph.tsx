/**
 * The knowledge graph, drawn.
 *
 * 119 nodes and 555 edges is far past what a person can read at once, so the
 * graph answers questions rather than presenting itself: edges sit at low
 * contrast, hovering raises a node's neighbourhood, filtering removes the units
 * the student did not ask about, and clicking collapses everything to one
 * concept and what touches it.
 *
 * Zooming is a *reading* gesture here, not a magnifying one. The closer the
 * student gets, the more of the map names itself — labels are rationed by scale,
 * because 119 names at once is fog and a name too small to read is worse than
 * no name.
 *
 * The work is split four ways and this file is only the last of them:
 * `graph-view-model` decides what is visible, `force-layout` decides where it
 * sits, `use-graph-camera` decides what is framed, and this draws.
 *
 * Colour is spent only on a filter. At rest concepts are `primary`, lessons are
 * `muted-foreground`, edges are `border` — the six learn colors belong to
 * callouts and are not spent here.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { FILTERED_ITERATIONS, boundsOf, layoutGraph, type LaidOutNode } from './force-layout';
import { GraphFocusCard } from './graph-focus-card';
import { GraphToolbar, HUE_BUDGET } from './graph-toolbar';
import { UNASSIGNED, allChips, chipOf, isFiltering, visibleGraph } from './graph-view-model';
import { useAnimatedLayout } from './use-animated-layout';
import { useGraphCamera } from './use-graph-camera';
import { conceptPath, lessonPath } from '@/router/routes';

interface ConceptGraphProps {
  readonly graph: KnowledgeGraph;
}

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

const UNASSIGNED_TITLE = 'לא משויך';

/** Node radius grows with degree, but slowly — a hub must not swallow the map. */
function radiusOf(node: LaidOutNode): number {
  return 3.5 + Math.sqrt(node.degree) * 1.6;
}

/**
 * How well-connected a concept must be before it earns a standing label.
 *
 * At rest only the landmarks are named. Zooming in spends the space that opens
 * up on more names, until at close range every concept is named — which is what
 * makes zoom worth having at all.
 *
 * Lessons are never labelled at any scale. A lesson is a place concepts are
 * taught rather than a thing to be learned, and its title is a long Hebrew
 * sentence that would overprint the concepts sitting under it. Every node still
 * names itself on hover or focus, which is when the student is actually asking.
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
  const [focus, setFocus] = useState<string | null>(null);
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set(allChips(graph)));

  const chips = useMemo(
    () => [...graph.units, { id: UNASSIGNED, title: UNASSIGNED_TITLE }],
    [graph],
  );

  const selection = useMemo(() => ({ units: selected, focus }), [selected, focus]);
  const visible = useMemo(() => visibleGraph(graph, selection), [graph, selection]);

  /** The whole graph, laid out and fitted. This is the coordinate space. */
  const base = useMemo(() => layoutGraph(graph), [graph]);

  /**
   * Every filtered layout seeds from `base`, never from the layout currently on
   * screen. That is what makes filtering reversible: turn a unit off and back on
   * and the nodes return to exactly where they started, because they were always
   * measured from the same origin. Seeding from the live positions would let
   * error accumulate, and the map would drift a little further from itself with
   * every click.
   */
  const seed = useMemo(
    () => new Map(base.nodes.map((node) => [node.id, { x: node.x, y: node.y }])),
    [base],
  );

  const target = useMemo(() => {
    if (visible.nodes.length === graph.nodes.length) return base;

    return layoutGraph(visible, { seed, iterations: FILTERED_ITERATIONS, fit: false });
  }, [visible, graph.nodes.length, base, seed]);

  const { nodes, edges, width, height } = useAnimatedLayout(target);

  const camera = useGraphCamera(svgRef, width, height);
  const { frame } = camera;

  // When the visible set changes the camera goes to meet it. The layout does not
  // rescale itself (see force-layout's `fit`), so this is what keeps a filtered
  // subgraph from sitting in one corner of an otherwise empty canvas.
  useEffect(() => {
    frame(boundsOf(target.nodes));
  }, [target, frame]);

  const filtering = isFiltering(graph, selected);

  /**
   * Chip id → hue index.
   *
   * A hue means "the Nth unit you selected", numbered in curriculum order — so
   * selecting `cognitive-load` alone always paints it the same colour, and the map does
   * not repaint itself just because the student added a second unit above it.
   */
  const hues = useMemo(() => {
    if (!filtering) return new Map<string, number>();

    const chosen = allChips(graph).filter((id) => selected.has(id));
    if (chosen.length > HUE_BUDGET) return new Map<string, number>();

    return new Map(chosen.map((id, i) => [id, i]));
  }, [graph, selected, filtering]);

  const focused = useMemo(
    () => (focus === null ? null : (base.nodes.find((node) => node.id === focus) ?? null)),
    [focus, base],
  );

  const focusedUnit = useMemo(() => {
    const unit = focused?.unit;
    if (unit === undefined || unit === null) return null;
    return graph.units.find((candidate) => candidate.id === unit)?.title ?? null;
  }, [focused, graph]);

  // A chip click can take the focused node away. The view model already ignores
  // an unreachable focus, but the card would otherwise sit there describing a
  // node the student can no longer see.
  useEffect(() => {
    if (focused === null) return;
    if (selected.has(chipOf(focused))) return;
    setFocus(null);
  }, [focused, selected]);

  useEffect(() => {
    if (focus === null) return;

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setFocus(null);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focus]);

  /** Every node one edge away from the hovered one, including itself. */
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

  const toggle = (id: string): void => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Hairlines and type are measured on the *screen*, not in the layout's
  // coordinate space, so the camera's scale is divided back out of them. A 0.7px
  // edge that became 4px at 6× would stop being an edge and start being a bar.
  const k = camera.scale;
  const threshold = labelThreshold(k);

  return (
    <figure className="rounded-xl border border-border bg-card">
      <GraphToolbar
        chips={chips}
        selected={selected}
        hues={hues}
        onToggle={toggle}
        onAll={() => setSelected(new Set(allChips(graph)))}
        onZoomIn={() => camera.zoomBy(1.4)}
        onZoomOut={() => camera.zoomBy(1 / 1.4)}
        onReset={camera.reset}
      />

      {/*
        The plot area, and the positioning context for the focus card. The card
        anchors to *this*, not to the <figure> — the figure includes the caption
        below, and a card measured from its bottom edge sits on top of the legend.
      */}
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="h-[70vh] w-full cursor-grab touch-none active:cursor-grabbing"
          role="img"
          aria-label={
            filtering
              ? `גרף ידע, מסונן: ${nodes.length} צמתים, ${edges.length} קשתות`
              : `גרף ידע: ${nodes.length} צמתים, ${edges.length} קשתות`
          }
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
                const isFocus = node.id === focus;

                const radius = radiusOf(node);
                const named = (node.kind === 'concept' && node.degree >= threshold) || isActive;

                const hue = hues.get(chipOf(node));
                const fill =
                  hue !== undefined
                    ? NODE_FILL[hue]
                    : node.kind === 'concept'
                      ? 'fill-primary'
                      : 'fill-muted-foreground';

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x} ${node.y})`}
                    className="cursor-pointer focus:outline-none"
                    tabIndex={0}
                    role="button"
                    aria-label={node.label}
                    aria-pressed={isFocus}
                    opacity={near ? 1 : 0.2}
                    onMouseEnter={() => setActive(node.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(node.id)}
                    onBlur={() => setActive(null)}
                    onClick={() => setFocus(node.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setFocus(node.id);
                      }
                    }}
                  >
                    {isFocus ? (
                      <circle
                        r={radius + 4}
                        fill="none"
                        className={hue === undefined ? 'stroke-primary' : NODE_STROKE[hue]}
                        strokeWidth={2 / k}
                      />
                    ) : null}

                    <circle
                      r={radius + (isActive ? 2.5 : 0)}
                      className={`${fill} stroke-background`}
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

        {focused === null ? null : (
          <GraphFocusCard
            node={focused}
            unit={focusedUnit}
            onOpen={() => open(focused)}
            onClear={() => setFocus(null)}
          />
        )}
      </div>

      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-5 py-3 text-xs text-muted-foreground">
        {filtering ? (
          <span>
            הצבע מסמן את היחידה. {nodes.length} מתוך {graph.nodes.length} צמתים מוצגים.
          </span>
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
