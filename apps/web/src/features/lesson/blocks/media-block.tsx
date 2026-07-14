import { Image } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { assetUrl } from '@/shared/content/content';

interface MediaBlockProps {
  readonly block: Extract<Block, { type: 'media' }>;
}

/** Default height for an animation whose author did not pick one. */
const ANIMATION_DEFAULT_HEIGHT = 480;

export function MediaBlock({ block }: MediaBlockProps): ReactNode {
  // A media block either points at a real asset in the vault, or describes one
  // that does not exist yet. Both are legitimate states of the content.
  if (block.src) {
    // An image captions only when the author wrote one; an animation or video
    // captions with its description — the frame does not speak for itself.
    const fromDescription = block.variant === 'animation' || block.variant === 'video';
    const caption = block.alt ?? (fromDescription ? block.description : null);
    return <MediaFigure block={block} caption={caption} />;
  }

  return (
    <div className="my-8 flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 px-6 py-10">
      <Image className="size-8 text-muted-foreground/50" aria-hidden />
      <p className="max-w-md text-center text-sm text-muted-foreground">
        <span className="font-medium">{block.variant}</span>
        {' — '}
        {block.description}
      </p>
    </div>
  );
}

interface MediaFigureProps {
  readonly block: Extract<Block, { type: 'media' }>;
  readonly caption: string | null;
}

function MediaFigure({ block, caption }: MediaFigureProps): ReactNode {
  const url = assetUrl(block.src ?? '');

  return (
    <figure className="my-8">
      {block.variant === 'animation' ? (
        // A self-contained HTML animation. The sandbox lets its own scripts
        // run but keeps it a foreign origin: it cannot touch the app, and the
        // app's styles cannot leak into it.
        <iframe
          src={url}
          title={block.description}
          sandbox="allow-scripts"
          loading="lazy"
          className="mx-auto rounded-lg border bg-muted/30"
          style={{
            height: block.height ?? ANIMATION_DEFAULT_HEIGHT,
            width: block.width ? `${block.width}px` : '100%',
            maxWidth: '100%',
            display: 'block',
          }}
        />
      ) : block.variant === 'video' ? (
        <video
          src={url}
          controls
          preload="metadata"
          className="w-full rounded-lg border bg-muted/30"
        >
          {block.description}
        </video>
      ) : (
        <img
          src={url}
          alt={block.alt ?? block.description}
          loading="lazy"
          className="w-full rounded-lg border bg-muted/30"
        />
      )}
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
