/**
 * Reviewing one deck.
 *
 * The card shows its front; the back is behind a deliberate act. That is the
 * whole pedagogy of a flashcard — retrieval, then confirmation. Revealing both
 * at once would make it a list of facts, which is a different (and worse) thing.
 *
 * The flip is a transform, not a navigation: the answer is the *same card*,
 * turned over. Under `prefers-reduced-motion` it becomes a cross-fade rather
 * than a faster spin, because the motion carries meaning and a 10ms spin
 * carries none.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { Flashcard } from '@cyberatlas/core';

import { lessonPath } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';
import type { FlashcardDeck } from '@/shared/content/content';

export function FlashcardReview({ deck }: { readonly deck: FlashcardDeck }): ReactNode {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = deck.cards[index];
  const total = deck.cards.length;

  if (!card) return null;

  const go = (next: number): void => {
    setFlipped(false);
    setIndex(next);
  };

  return (
    <>
      <header className="mb-8 space-y-3">
        <Link
          to={lessonPath(deck.lesson)}
          className="-ms-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden />
          חזרה לשיעור
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">{deck.title}</h1>

        <p className="text-sm text-muted-foreground">
          כרטיס {index + 1} מתוך {total}
        </p>
      </header>

      <CardFace card={card} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />

      <div className="mt-6 flex max-w-[72ch] items-center gap-3">
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          {/* Mirrors: "previous" points toward the start edge. */}
          <ChevronRight className="size-4 rtl:-scale-x-100" aria-hidden />
          הקודם
        </Button>

        <Button disabled={index === total - 1} onClick={() => go(index + 1)}>
          הבא
          <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden />
        </Button>

        {index === total - 1 ? (
          <Button variant="ghost" onClick={() => go(0)}>
            <RotateCcw className="size-4" aria-hidden />
            מהתחלה
          </Button>
        ) : null}
      </div>
    </>
  );
}

const FLIP = { duration: 0.3, ease: 'easeInOut' } as const;

function CardFace({
  card,
  flipped,
  onFlip,
}: {
  readonly card: Flashcard;
  readonly flipped: boolean;
  readonly onFlip: () => void;
}): ReactNode {
  const reduce = useReducedMotion();

  // Space and Enter come free with <button>; the whole card is the target,
  // because "click the small link to flip" is not how a flashcard works.
  const shell =
    'block w-full max-w-[72ch] cursor-pointer rounded-lg border border-border bg-card p-8 text-start shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  if (reduce) {
    return (
      <button type="button" onClick={onFlip} aria-pressed={flipped} className={shell}>
        <motion.div key={flipped ? 'back' : 'front'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <Face card={card} side={flipped ? 'back' : 'front'} />
        </motion.div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onFlip}
      aria-pressed={flipped}
      className={`${shell} [perspective:1200px]`}
    >
      <motion.div
        className="grid [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={FLIP}
      >
        {/* Both faces occupy the same grid cell, so the card is as tall as its
            longest side and never resizes mid-flip.

            `backface-visibility` hides the far face from the eye but NOT from a
            screen reader — without aria-hidden, the answer is announced before
            the student has tried to recall it, which is the one thing a
            flashcard must not do. The hidden face is hidden from everyone. */}
        <div
          className="col-start-1 row-start-1 [backface-visibility:hidden]"
          aria-hidden={flipped}
        >
          <Face card={card} side="front" />
        </div>
        <div
          className="col-start-1 row-start-1 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          aria-hidden={!flipped}
        >
          <Face card={card} side="back" />
        </div>
      </motion.div>
    </button>
  );
}

function Face({
  card,
  side,
}: {
  readonly card: Flashcard;
  readonly side: 'front' | 'back';
}): ReactNode {
  const isFront = side === 'front';

  return (
    <div className="flex min-h-[12rem] flex-col justify-center gap-3">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {isFront ? 'שאלה' : 'תשובה'}
      </p>
      <p
        className={
          isFront
            ? 'text-xl font-semibold leading-relaxed'
            : 'text-[1.0625rem] leading-[1.85] text-card-foreground'
        }
      >
        {isFront ? card.front : card.back}
      </p>
      {isFront ? (
        <p className="mt-2 text-sm text-muted-foreground">לחצו על הכרטיס כדי לחשוף את התשובה</p>
      ) : null}
    </div>
  );
}
