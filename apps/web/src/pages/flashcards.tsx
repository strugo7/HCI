import { Layers } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function FlashcardsPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="כרטיסי זיכרון"
        description="חזרה מרווחת על מושגי הליבה. כל כרטיס נגזר מהשיעור שבו המושג הוגדר."
      />
      <EmptyState
        icon={Layers}
        title="אין עדיין כרטיסי זיכרון"
        description="כל שיעור מחזיק קובץ כרטיסיות משלו, והם ייאספו לכאן."
        hint="content/lessons/<lesson>/flashcards.md"
      />
    </>
  );
}
