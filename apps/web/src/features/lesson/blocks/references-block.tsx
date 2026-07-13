import { BookMarked } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

interface ReferencesBlockProps {
  readonly block: Extract<Block, { type: 'references' }>;
}

export function ReferencesBlock({ block }: ReferencesBlockProps): ReactNode {
  return (
    <div className="my-8 rounded-lg border bg-muted/20 px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <BookMarked className="size-4 text-muted-foreground" aria-hidden />
        <h4 className="text-sm font-semibold text-muted-foreground">מקורות</h4>
      </div>
      <ul className="space-y-1.5">
        {block.items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
