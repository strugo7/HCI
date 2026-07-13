import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface ParagraphBlockProps {
  readonly block: Extract<Block, { type: 'paragraph' }>;
}

export function ParagraphBlock({ block }: ParagraphBlockProps): ReactNode {
  return (
    <p className="prose-lesson my-4 text-foreground/90">
      <InlineRenderer inlines={block.children} />
    </p>
  );
}
