import { Layers } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { Block } from '@cyberatlas/core';

import { deckPath } from '@/router/routes';

interface FlashcardsRefBlockProps {
  readonly block: Extract<Block, { type: 'flashcards-reference' }>;
}

/**
 * A lesson points at its deck by its own id — see `:::flashcards{ref="usability"}`
 * — which is what the deck route is keyed by.
 */
export function FlashcardsRefBlock({ block }: FlashcardsRefBlockProps): ReactNode {
  return (
    <Link
      to={deckPath(block.ref)}
      className="my-6 flex items-center gap-3 rounded-xl border-2 border-learn-analogy/15 bg-learn-analogy/5 px-5 py-4 transition-colors hover:bg-learn-analogy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Layers className="size-6 shrink-0 text-learn-analogy" aria-hidden />
      <div>
        <p className="font-semibold text-learn-analogy">כרטיסי לימוד</p>
        <p className="text-sm text-muted-foreground">חזרה על מושגי השיעור — לחצו לתרגול</p>
      </div>
    </Link>
  );
}
