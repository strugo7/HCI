/**
 * A `:::diagram` whose body carried a ```mermaid fence, drawn at runtime.
 *
 * Mermaid is heavy (~500 KB), so it is never in the app's initial bundle: the
 * library is dynamically imported, and only once the diagram scrolls into view.
 * The parsed `description` is the accessible fallback — it is what a screen
 * reader announces, and what shows if the source ever fails to render.
 *
 * Diagrams read small inline, so every rendered one carries an "enlarge"
 * control that opens it in a modal with zoom.
 */
import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { useTheme } from '@/shared/hooks/use-theme';

import { EnlargeDialog } from './enlarge-dialog';

interface MermaidDiagramProps {
  /** Mermaid source, already extracted from the fence by the parser. */
  readonly source: string;
  /** Prose the author wrote around the diagram — the accessible description. */
  readonly description: string;
}

type Status = 'idle' | 'loading' | 'ready' | 'error';

export function MermaidDiagram({ source, description }: MermaidDiagramProps): ReactNode {
  const { resolved } = useTheme();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [visible, setVisible] = useState(false);
  const [svg, setSvg] = useState('');

  // Mermaid ids must be valid CSS identifiers; React's useId() carries colons.
  const renderId = `mermaid-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;

  // Only start doing work once the diagram is near the viewport.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
      },
      { rootMargin: '200px' },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [visible]);

  // Render (and re-render on theme change) once visible.
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    setStatus('loading');

    void (async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({
          startOnLoad: false,
          theme: resolved === 'dark' ? 'dark' : 'default',
          // Content is authored in-repo, but strict keeps any stray HTML in a
          // label from becoming markup on a student's screen.
          securityLevel: 'strict',
          fontFamily: 'inherit',
        });
        const { svg: rendered } = await mermaid.render(renderId, source);
        if (cancelled) return;
        setSvg(rendered);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [visible, resolved, source, renderId]);

  // Mermaid namespaces its internal ids (markers, gradients) with renderId. The
  // modal shows a second copy of the same SVG, so re-scope those ids or the two
  // copies collide and arrowheads point at the wrong defs.
  const zoomSvg = svg.split(renderId).join(`${renderId}z`);

  const ready = status === 'ready';

  return (
    <figure className="my-8">
      <div
        ref={frameRef}
        className="relative flex min-h-24 items-center justify-center overflow-x-auto rounded-lg border bg-muted/30 p-4"
      >
        {status === 'error' ? (
          <p className="max-w-prose text-center text-sm text-muted-foreground">{description}</p>
        ) : (
          <>
            {!ready ? (
              <span className="text-sm text-muted-foreground" aria-live="polite">
                טוען תרשים…
              </span>
            ) : null}
            {/* Mermaid injects an <svg> here; dir=ltr keeps arrow geometry intact
                while the Hebrew labels inside still render right-to-left. */}
            <div
              dir="ltr"
              role="img"
              aria-label={description}
              className={
                ready ? '[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full' : 'sr-only'
              }
              dangerouslySetInnerHTML={{ __html: svg }}
            />

            {ready ? (
              <EnlargeDialog title={description} triggerClassName="absolute end-3 top-3">
                <div
                  dir="ltr"
                  role="img"
                  aria-label={description}
                  className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full"
                  dangerouslySetInnerHTML={{ __html: zoomSvg }}
                />
              </EnlargeDialog>
            ) : null}
          </>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        {description}
      </figcaption>
    </figure>
  );
}
