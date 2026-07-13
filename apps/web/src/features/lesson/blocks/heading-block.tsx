import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface HeadingBlockProps {
  readonly block: Extract<Block, { type: 'heading' }>;
}

export function HeadingBlock({ block }: HeadingBlockProps): ReactNode {
  const Tag = `h${block.depth}` as const;
  const styles: Record<number, string> = {
    1: 'text-3xl font-bold tracking-tight mt-12 mb-6',
    2: 'text-2xl font-semibold tracking-tight mt-10 mb-4',
    3: 'text-xl font-semibold mt-8 mb-3',
    4: 'text-lg font-medium mt-6 mb-2',
  };

  return (
    <Tag id={block.id} className={styles[block.depth] ?? styles[2]}>
      <InlineRenderer inlines={block.children} />
    </Tag>
  );
}
