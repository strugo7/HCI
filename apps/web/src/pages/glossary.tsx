import { Library } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function GlossaryPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="מילון מושגים"
        description="כל מושג קיים בדיוק פעם אחת, ומחזיק את ההגדרה שלו. שיעורים מפנים אליו ולעולם לא מגדירים אותו מחדש."
      />
      <EmptyState
        icon={Library}
        title="אין עדיין מושגים"
        description="כל קובץ תחת content/concepts הופך למושג יחיד ולצומת בגרף הידע."
        hint="content/concepts/firewall.md"
      />
    </>
  );
}
