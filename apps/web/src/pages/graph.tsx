import { Network } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function GraphPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="גרף ידע"
        description="הגרף נגזר אוטומטית מהקישורים בתוכן. הוא לעולם לא נכתב ולא מתוחזק ביד."
      />
      <EmptyState
        icon={Network}
        title="הגרף ריק"
        description="כל קישור [[מושג]] בתוך שיעור יוצר קשת בגרף. הוסיפו תוכן, והגרף ייבנה מעצמו."
        hint="pnpm content:build"
      />
    </>
  );
}
