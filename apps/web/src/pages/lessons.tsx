import { BookOpen } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function LessonsPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="שיעורים"
        description="כל שיעור מלמד נושא מרכזי אחד, ומרכיב אותו ממושגים קיימים."
      />
      <EmptyState
        icon={BookOpen}
        title="אין עדיין שיעורים"
        description="שיעורים נטענים מהמאגר בזמן בנייה. כל תיקיית שיעור מכילה lesson.md, quiz.md, summary.md ו-flashcards.md."
        hint="content/lessons/lesson-01/"
      />
    </>
  );
}
