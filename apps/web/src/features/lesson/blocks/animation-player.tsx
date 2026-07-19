/**
 * The player for a `:::animation` — a self-contained HTML animation, run inside
 * a sandboxed iframe so its own scripts execute but it stays a foreign origin:
 * it cannot touch the app, and the app's styles cannot leak into it.
 *
 * The engine, not the animation, owns the chrome around it: lazy loading (the
 * frame's src is empty until it scrolls into view), a loading state, a replay
 * control, and the current theme / reduced-motion preference passed in as query
 * params. The animation reads those params and honors them — see the authoring
 * contract in `.claude/skills/visual-author`.
 */
import { RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/components/ui/button';
import { useTheme } from '@/shared/hooks/use-theme';

interface AnimationPlayerProps {
  /** Already-resolved URL of the animation's HTML file. */
  readonly url: string;
  /** The author's description — the caption and the accessible label. */
  readonly description: string;
  readonly height: number | null;
  readonly width: number | null;
}

/** Default height for an animation whose author did not pick one. */
const DEFAULT_HEIGHT = 480;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function AnimationPlayer({
  url,
  description,
  height,
  width,
}: AnimationPlayerProps): ReactNode {
  const { resolved } = useTheme();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Bumping this reloads the iframe, which restarts the animation from frame 0.
  const [replayKey, setReplayKey] = useState(0);
  const reduced = prefersReducedMotion();

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

  // The animation matches the app: theme and reduced-motion travel as query
  // params, and replayKey busts the frame's cache so a replay truly restarts.
  const params = new URLSearchParams({
    theme: resolved,
    reducedMotion: reduced ? '1' : '0',
    r: String(replayKey),
  });
  const src = visible ? `${url}?${params.toString()}` : undefined;

  const replay = (): void => {
    setLoaded(false);
    setReplayKey((key) => key + 1);
  };

  return (
    <figure className="my-8">
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-lg border bg-muted/30"
        style={{ minHeight: height ?? DEFAULT_HEIGHT }}
      >
        {!loaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-muted-foreground" aria-live="polite">
              טוען אנימציה…
            </span>
          </div>
        ) : null}
        {src ? (
          <iframe
            key={replayKey}
            src={src}
            title={description}
            sandbox="allow-scripts"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="block"
            style={{
              height: height ?? DEFAULT_HEIGHT,
              width: width ? `${width}px` : '100%',
              maxWidth: '100%',
              border: '0',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          />
        ) : null}
      </div>
      <figcaption className="mt-2 flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <span className="text-center">{description}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={replay}
          disabled={!loaded}
          className="shrink-0 gap-1.5"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          הפעל שוב
        </Button>
      </figcaption>
    </figure>
  );
}
