/**
 * Lesson page — renders one compiled Lesson knowledge object.
 *
 * The Lesson arrives fully parsed from `src/generated/content`. This page
 * decides nothing about the content: only what to show while the chunk is in
 * flight, and what to say when the id does not exist.
 */
import { BookX } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { LessonPageLayout, useLesson } from '@/features/lesson';
import { EmptyState } from '@/shared/components/empty-state';
import { PageSkeleton } from '@/shared/components/page-skeleton';

import '@/features/lesson/lesson.css';

export default function LessonPage(): ReactNode {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { data: lesson, isPending } = useLesson(lessonId);

  if (isPending) return <PageSkeleton />;

  if (!lesson) {
    return (
      <EmptyState
        icon={BookX}
        title="השיעור לא נמצא"
        description="אין שיעור עם המזהה הזה במאגר. ייתכן שהקישור שגוי, או שהשיעור עדיין לא נבנה."
        hint={`content/lessons/${lessonId ?? ''}/`}
      />
    );
  }

  return <LessonPageLayout lesson={lesson} />;
}
