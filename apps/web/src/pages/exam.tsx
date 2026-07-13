/**
 * Exam page — runs one compiled unit exam.
 *
 * The Exam arrives fully parsed from `src/generated/content`. The runner does
 * the shuffling; this page decides nothing about the content — only what to
 * show while the chunk is in flight, and what to say when the id is unknown.
 */
import { ClipboardX } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { QuizRunner, useExam } from '@/features/quiz';
import { EmptyState } from '@/shared/components/empty-state';
import { PageSkeleton } from '@/shared/components/page-skeleton';

export default function ExamPage(): ReactNode {
  const { examId } = useParams<{ examId: string }>();
  const { data: exam, isPending } = useExam(examId);

  if (isPending) return <PageSkeleton />;

  if (!exam) {
    return (
      <EmptyState
        icon={ClipboardX}
        title="המבחן לא נמצא"
        description="אין מבחן עם המזהה הזה במאגר. ייתכן שהקישור שגוי, או שהמבחן עדיין לא נבנה."
        hint={`content/exams/<unit>.md → ${examId ?? ''}`}
      />
    );
  }

  return <QuizRunner quiz={exam} />;
}
