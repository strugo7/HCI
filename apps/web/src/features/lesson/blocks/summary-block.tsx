import { FileText } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface SummaryBlockProps {
  readonly block: Extract<Block, { type: 'summary' }>;
}

export function SummaryBlock({ block }: SummaryBlockProps): ReactNode {
  return (
    <div className="my-8 rounded-xl border bg-gradient-to-b from-muted/50 to-transparent px-6 py-5">
      <div className="mb-3 flex items-center gap-2">
        <FileText className="size-5 text-muted-foreground" aria-hidden />
        <h3 className="text-lg font-semibold">סיכום</h3>
      </div>
      <div className="leading-relaxed text-foreground/90">
        <InlineRenderer inlines={block.children} />
      </div>
    </div>
  );
}
