/**
 * The knowledge graph, drawn.
 *
 * 119 nodes and 555 edges is far past what a person can read at once, so the
 * graph is quiet until it is asked a question: edges sit at low contrast, and
 * hovering or focusing a node raises that node's neighbourhood and dims
 * everything else. The student explores one concept's connections at a time,
 * which is the only way this many edges says anything at all.
 *
 * No new hue: concepts are `primary`, lessons are `muted-foreground`, edges are
 * `border`. The six learn colors belong to callouts and are not spent here.
 */
import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { layoutGraph, type LaidOutNode } from './force-layout';
import { conceptPath, lessonPath } from '@/router/routes';

interface ConceptGraphProps {
  readonly graph: KnowledgeGraph;
}

/** Node radius grows with degree, but slowly — a hub must not swallow the map. */
function radiusOf(node: LaidOutNode): number {
  return 3.5 + Math.sqrt(node.degree) * 1.6;
}

/**
 * A node is worth labelling when it is a landmark; the rest would be a fog.
 *
 * Only concepts. This is a concept map — a lesson is a place concepts are
 * taught, not a thing to be learned — and lesson titles are long Hebrew
 * sentences that overprint the concept names sitting under them. Every node
 * still names itself on hover or focus, which is when the student is actually
 * asking.
 */
function labelled(node: LaidOutNode): boolean {
  return node.kind === 'concept' && node.degree >= 14;
}

export function ConceptGraph({ graph }: ConceptGraphProps): ReactNode {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);

  // The layout is deterministic and expensive-ish; it runs once per graph.
  const { nodes, edges, width, height } = useMemo(() => layoutGraph(graph), [graph]);

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
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[70vh] w-full"
        role="img"
        aria-label={`גרף ידע: ${nodes.length} צמתים, ${edges.length} קשתות`}
      >
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
                strokeWidth={lit ? 1.4 : 0.7}
                strokeOpacity={lit ? 0.9 : dimmed ? 0.12 : 0.45}
                // Prerequisites are a different kind of claim than a reference:
                // one is "you must", the other "this appears". Dashing separates
                // them without spending a color on the distinction.
                strokeDasharray={edge.kind === 'prerequisite' ? '4 3' : undefined}
              />
            );
          })}
        </g>

        <g>
          {nodes.map((node) => {
            const near = neighbourhood === null || neighbourhood.has(node.id);
            const isActive = node.id === active;

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
                  r={radiusOf(node) + (isActive ? 2.5 : 0)}
                  className={
                    node.kind === 'concept'
                      ? 'fill-primary stroke-background'
                      : 'fill-muted-foreground stroke-background'
                  }
                  strokeWidth={1.5}
                />

                {labelled(node) || isActive ? (
                  <text
                    y={-radiusOf(node) - 5}
                    textAnchor="middle"
                    className="pointer-events-none fill-foreground text-[10px] font-medium"
                    style={{ paintOrder: 'stroke' }}
                    stroke="hsl(var(--card))"
                    strokeWidth={3}
                  >
                    {node.label}
                  </text>
                ) : null}
              </g>
            );
          })}
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
