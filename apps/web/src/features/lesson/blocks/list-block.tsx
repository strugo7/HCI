import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface ListBlockProps {
  readonly block: Extract<Block, { type: 'list' }>;
}

export function ListBlock({ block }: ListBlockProps): ReactNode {
  const Tag = block.ordered ? 'ol' : 'ul';
  const listClass = block.ordered
    ? 'list-decimal space-y-1.5 ps-6 my-4'
    : 'list-disc space-y-1.5 ps-6 my-4';

  return (
    <Tag className={listClass}>
      {block.items.map((item, i) => (
        <li key={i} className="text-foreground/90 leading-relaxed">
          <InlineRenderer inlines={item} />
        </li>
      ))}
    </Tag>
  );
}
