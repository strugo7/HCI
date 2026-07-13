/**
 * Callout block — important / warning / tip.
 *
 * Each variant gets its own semantic color from the design system
 * (learn-important, learn-warning, learn-tip).
 */
import { AlertTriangle, Info, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Block } from '@cyberatlas/core';

import { InlineRenderer } from './inline-renderer';

interface CalloutBlockProps {
  readonly block: Extract<Block, { type: 'callout' }>;
}

const CALLOUT_CONFIG = {
  important: { icon: Info, label: 'חשוב', cssClass: 'block-important bg-learn-important/5 text-learn-important' },
  warning: { icon: AlertTriangle, label: 'אזהרה', cssClass: 'block-warning bg-learn-warning/5 text-learn-warning' },
  tip: { icon: Zap, label: 'טיפ', cssClass: 'block-tip bg-learn-tip/5 text-learn-tip' },
} as const;

const DEFAULT_CONFIG = CALLOUT_CONFIG.important;

export function CalloutBlock({ block }: CalloutBlockProps): ReactNode {
  const config = CALLOUT_CONFIG[block.variant as keyof typeof CALLOUT_CONFIG] ?? DEFAULT_CONFIG;
  const Icon = config.icon;

  return (
    <div className={`my-6 rounded-lg px-5 py-4 ${config.cssClass}`}>
      <div className="mb-2 flex items-center gap-2">
        <Icon className="size-4" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wider">
          {config.label}
        </span>
      </div>
      <div className="leading-relaxed text-foreground/90">
        <InlineRenderer inlines={block.children} />
      </div>
    </div>
  );
}
