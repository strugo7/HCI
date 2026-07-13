/**
 * Deck page — reviews one lesson's flashcards.
 */
import { Layers } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { FlashcardReview, useDeck } from '@/features/quiz';
import { EmptyState } from '@/shared/components/empty-state';
import { PageSkeleton } from '@/shared/components/page-skeleton';

export default function DeckPage(): ReactNode {
  const { deckId } = useParams<{ deckId: string }>();
  const { data: deck, isPending } = useDeck(deckId);

  if (isPending) return <PageSkeleton />;

  if (!deck) {
    return (
      <EmptyState
        icon={Layers}
        title="הכרטיסיות לא נמצאו"
        description="אין חפיסת כרטיסיות עם המזהה הזה במאגר. ייתכן שהקישור שגוי, או שהיא עדיין לא נבנתה."
        hint={`content/lessons/${deckId ?? ''}/flashcards.md`}
      />
    );
  }

  return <FlashcardReview deck={deck} />;
}
