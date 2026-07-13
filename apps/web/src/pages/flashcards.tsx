/**
 * Flashcards index — every lesson that ships a deck.
 *
 * The counts come from the compiled index, so this page never downloads a
 * single deck in order to tell you how many cards it holds.
 */
import { Layers } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { deckPath } from '@/router/routes';
import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';
import { decksIndex } from '@/shared/content/content';

export default function FlashcardsPage(): ReactNode {
  const decks = decksIndex();

  return (
    <>
      <PageHeader
        title="כרטיסי זיכרון"
        description="חזרה על מושגי הליבה. כל חפיסה נגזרת מהשיעור שבו המושגים הוגדרו."
      />

      {decks.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="אין עדיין כרטיסי זיכרון"
          description="כל שיעור מחזיק קובץ כרטיסיות משלו, והם ייאספו לכאן."
          hint="pnpm content:build"
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {decks.map((lesson) => (
            <li key={lesson.id}>
              <Link
                to={deckPath(lesson.flashcardsRef ?? lesson.id)}
                className="flex h-full items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Layers className="mt-0.5 size-5 shrink-0 text-learn-analogy" aria-hidden />
                <div className="space-y-1">
                  <p className="font-semibold leading-snug">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground">{lesson.cardCount} כרטיסים</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
