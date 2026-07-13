import { CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

interface KeyPointsBlockProps {
  readonly block: Extract<Block, { type: 'keypoints' }>;
}

export function KeyPointsBlock({ block }: KeyPointsBlockProps): ReactNode {
  return (
    <div className="my-8 rounded-xl border-2 border-learn-example/20 bg-learn-example/5 px-6 py-5">
      <div className="mb-3 flex items-center gap-2">
        <CheckCircle2 className="size-5 text-learn-example" aria-hidden />
        <h3 className="text-lg font-semibold text-learn-example">נקודות מפתח</h3>
      </div>
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-learn-example/60" />
            <span className="leading-relaxed text-foreground/90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
