import { Image } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { assetUrl } from '@/shared/content/content';

import { AnimationPlayer } from './animation-player';
import { EnlargeDialog } from './enlarge-dialog';
import { MermaidDiagram } from './mermaid-diagram';

interface MediaBlockProps {
  readonly block: Extract<Block, { type: 'media' }>;
}

export function MediaBlock({ block }: MediaBlockProps): ReactNode {
  // A diagram authored with a ```mermaid fence is drawn at runtime — no asset,
  // no placeholder. Its prose stays the caption and the accessible description.
  if (block.variant === 'diagram' && block.source) {
    return <MermaidDiagram source={block.source} description={block.description} />;
  }

  // A self-contained HTML animation gets the full player (lazy, replay, theme).
  if (block.variant === 'animation' && block.src) {
    return (
      <AnimationPlayer
        url={assetUrl(block.src)}
        description={block.description}
        height={block.height}
        width={block.width}
      />
    );
  }

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
  const alt = block.alt ?? block.description;

  return (
    <figure className="my-8">
      {block.variant === 'video' ? (
        <video
          src={url}
          controls
          preload="metadata"
          className="w-full rounded-lg border bg-muted/30"
        >
          {block.description}
        </video>
      ) : (
        // Infographics read small in the reading column, so each carries the same
        // enlarge-with-zoom affordance as a diagram.
        <div className="relative">
          <img
            src={url}
            alt={alt}
            loading="lazy"
            className="w-full rounded-lg border bg-muted/30"
          />
          <EnlargeDialog title={caption ?? alt} triggerClassName="absolute end-3 top-3">
            <img src={url} alt={alt} className="block w-full rounded-lg" />
          </EnlargeDialog>
        </div>
      )}
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
