/**
 * Quiz page — runs one compiled Quiz knowledge object.
 *
 * The Quiz arrives fully parsed from `src/generated/content`. This page decides
 * nothing about the content: only what to show while the chunk is in flight,
 * and what to say when the id does not exist.
 */
import { ClipboardX } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { QuizRunner, useQuiz } from '@/features/quiz';
import { EmptyState } from '@/shared/components/empty-state';
import { PageSkeleton } from '@/shared/components/page-skeleton';

export default function QuizPage(): ReactNode {
  const { quizId } = useParams<{ quizId: string }>();
  const { data: quiz, isPending } = useQuiz(quizId);

  if (isPending) return <PageSkeleton />;

  if (!quiz) {
    return (
      <EmptyState
        icon={ClipboardX}
        title="החידון לא נמצא"
        description="אין חידון עם המזהה הזה במאגר. ייתכן שהקישור שגוי, או שהחידון עדיין לא נבנה."
        hint={`content/lessons/<lesson>/quiz.md → ${quizId ?? ''}`}
      />
    );
  }

  return <QuizRunner quiz={quiz} />;
}
