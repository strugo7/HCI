import { GraduationCap } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function ExamsPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="מבחנים"
        description="שאלות ברמת מבחן אוניברסיטאי. כל שאלה בודקת הבנה, לא שינון."
      />
      <EmptyState
        icon={GraduationCap}
        title="אין עדיין מבחנים"
        description="מבחנים מורכבים משאלות שמוגדרות כאובייקטים עצמאיים תחת content/quizzes, ונבדקים על ידי quiz-engine."
        hint="content/quizzes/"
      />
    </>
  );
}
