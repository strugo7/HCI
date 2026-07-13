/**
 * Example block — green-bordered card with a דוגמה badge.
 */
import { Lightbulb } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface ExampleBlockProps {
  readonly block: Extract<Block, { type: 'example' }>;
}

export function ExampleBlock({ block }: ExampleBlockProps): ReactNode {
  return (
    <div className="block-example my-6 rounded-lg bg-learn-example/5 px-5 py-4">
      <div className="mb-2 flex items-center gap-2">
        <Lightbulb className="size-4 text-learn-example" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wider text-learn-example">
          דוגמה
        </span>
      </div>
      <div className="leading-relaxed text-foreground/90">
        <InlineRenderer inlines={block.children} />
      </div>
    </div>
  );
}
