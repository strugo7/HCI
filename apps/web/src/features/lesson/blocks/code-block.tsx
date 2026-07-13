import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

interface CodeBlockProps {
  readonly block: Extract<Block, { type: 'code' }>;
}

export function CodeBlock({ block }: CodeBlockProps): ReactNode {
  return (
    <div className="my-6 overflow-hidden rounded-lg border bg-muted/30">
      {block.lang ? (
        <div className="border-b bg-muted/50 px-4 py-1.5">
          <span className="font-mono text-xs text-muted-foreground tech-term">
            {block.lang}
          </span>
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4" dir="ltr">
        <code className="font-mono text-sm leading-relaxed text-foreground/90">
          {block.value}
        </code>
      </pre>
    </div>
  );
}
