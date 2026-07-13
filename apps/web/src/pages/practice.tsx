import { BrainCircuit } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function PracticePage(): ReactNode {
  return (
    <>
      <PageHeader
        title="תרגול"
        description="כרטיסיות וחזרה מרווחת (Spaced Repetition), מבוססות על המושגים שכבר נלמדו."
      />
      <EmptyState
        icon={BrainCircuit}
        title="אין עדיין חומר לתרגול"
        description="התרגול נבנה מכרטיסיות ומשאלות שמפנות למושגים. מנוע התרגול מחשב מתי כדאי לחזור על כל פריט."
        hint="content/flashcards/"
      />
    </>
  );
}
