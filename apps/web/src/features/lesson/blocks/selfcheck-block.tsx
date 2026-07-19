/**
 * Self-check block — collapsible question/answer matching the design's
 * "בדקו את עצמכם" section.
 */
import { ChevronDown, HelpCircle } from 'lucide-react';
import { type ReactNode, useId, useState } from 'react';

import type { Block } from '@cyberatlas/core';

interface SelfCheckBlockProps {
  readonly block: Extract<Block, { type: 'selfcheck' }>;
}

export function SelfCheckBlock({ block }: SelfCheckBlockProps): ReactNode {
  const [open, setOpen] = useState(false);

  // The trigger and the answer are wired together so assistive tech knows the
  // question controls a collapsible answer, and whether it is currently open.
  const triggerId = useId();
  const answerId = useId();

  return (
    <div className="my-6 overflow-hidden rounded-xl border-2 border-primary/15 bg-card">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 px-5 py-4 text-start transition-colors hover:bg-muted/50"
      >
        <HelpCircle className="size-5 shrink-0 text-primary" aria-hidden />
        <span className="flex-1 font-medium leading-relaxed text-foreground">
          {block.question}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      <div
        id={answerId}
        role="region"
        aria-labelledby={triggerId}
        className={`selfcheck-answer ${open ? 'selfcheck-answer--open' : ''}`}
      >
        <div className="selfcheck-answer__inner">
          <div className="border-t bg-muted/30 px-5 py-4">
            <p className="text-sm font-medium text-primary mb-1.5">תשובה</p>
            <p className="leading-relaxed text-foreground/90">{block.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
