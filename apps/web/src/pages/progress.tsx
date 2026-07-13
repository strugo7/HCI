import { TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function ProgressPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="התקדמות"
        description="שליטה במושגים לאורך זמן — מה נלמד, מה נשכח, ומה כדאי לחזור עליו."
      />
      <EmptyState
        icon={TrendingUp}
        title="אין עדיין נתוני התקדמות"
        description="ההתקדמות נמדדת מול המושגים שבגרף הידע, ולא מול מספר השיעורים שנפתחו."
      />
    </>
  );
}
