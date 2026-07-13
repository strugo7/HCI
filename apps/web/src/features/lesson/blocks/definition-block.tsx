/**
 * Definition block — accented card with a blue left border and a "הגדרה" badge.
 */
import { BookOpen } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface DefinitionBlockProps {
  readonly block: Extract<Block, { type: 'definition' }>;
}

export function DefinitionBlock({ block }: DefinitionBlockProps): ReactNode {
  return (
    <div className="block-definition my-6 rounded-lg bg-learn-definition/5 px-5 py-4">
      <div className="mb-2 flex items-center gap-2">
        <BookOpen className="size-4 text-learn-definition" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wider text-learn-definition">
          הגדרה{block.concept ? ` · ${block.concept}` : ''}
        </span>
      </div>
      <div className="text-[1.0625rem] font-medium leading-relaxed text-foreground">
        <InlineRenderer inlines={block.children} />
      </div>
    </div>
  );
}
