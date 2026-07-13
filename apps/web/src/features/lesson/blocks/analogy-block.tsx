/**
 * Analogy block — purple-bordered card with a תובנה badge.
 */
import { Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface AnalogyBlockProps {
  readonly block: Extract<Block, { type: 'analogy' }>;
}

export function AnalogyBlock({ block }: AnalogyBlockProps): ReactNode {
  return (
    <div className="block-analogy my-6 rounded-lg bg-learn-analogy/5 px-5 py-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="size-4 text-learn-analogy" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wider text-learn-analogy">
          אנלוגיה
        </span>
      </div>
      <div className="leading-relaxed text-foreground/90 italic">
        <InlineRenderer inlines={block.children} />
      </div>
    </div>
  );
}
