import { Image } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

interface MediaBlockProps {
  readonly block: Extract<Block, { type: 'media' }>;
}

export function MediaBlock({ block }: MediaBlockProps): ReactNode {
  // If a generated asset exists, show it. Otherwise show a placeholder
  // describing what needs to be created.
  if (block.src) {
    return (
      <figure className="my-8">
        <img
          src={block.src}
          alt={block.alt ?? block.description}
          className="w-full rounded-lg border"
        />
        {block.alt ? (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {block.alt}
          </figcaption>
        ) : null}
      </figure>
    );
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
