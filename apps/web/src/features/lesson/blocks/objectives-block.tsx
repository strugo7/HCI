/**
 * Objectives block — rendered as a prominent card matching the design's
 * purple objectives box with checkboxes.
 */
import { Check, Target } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import type { Block } from '@cyberatlas/core';

interface ObjectivesBlockProps {
  readonly block: Extract<Block, { type: 'objectives' }>;
}

export function ObjectivesBlock({ block }: ObjectivesBlockProps): ReactNode {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="flex items-center gap-2.5 border-b border-primary/10 bg-primary/5 px-5 py-3.5">
        <Target className="size-5 text-primary" aria-hidden />
        <h3 className="text-lg font-semibold text-primary">מטרות הפרק</h3>
      </div>
      <ul className="space-y-3 px-5 py-4">
        {block.items.map((item, i) => {
          const isChecked = checked.has(i);
          return (
            <li key={i} className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggle(i)}
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                  isChecked
                    ? 'border-learn-example bg-learn-example/10 objective-check--checked'
                    : 'border-muted-foreground/30 hover:border-primary/50'
                }`}
                aria-label={isChecked ? 'בוצע' : 'סמן כבוצע'}
              >
                {isChecked ? (
                  <Check className="size-3.5 text-learn-example objective-check" />
                ) : null}
              </button>
              <span
                className={`leading-relaxed transition-colors ${
                  isChecked ? 'text-muted-foreground line-through' : 'text-foreground/90'
                }`}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
