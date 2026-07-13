/**
 * Lesson page — renders a single lesson using the lesson page layout.
 *
 * Currently loads mock data for the CIA lesson. Once the parser is
 * operational, this will load real Lesson objects via the content pipeline.
 */
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { CIA_LESSON_MOCK } from '@/features/lesson/__mock__/cia-lesson';
import { LessonPageLayout } from '@/features/lesson';

import '@/features/lesson/lesson.css';

export default function LessonPage(): ReactNode {
  const { lessonId } = useParams<{ lessonId: string }>();

  // TODO: Replace with real data loading once the parser is operational.
  // For now, we serve the CIA mock for any lessonId.
  const lesson = lessonId === 'cia' ? CIA_LESSON_MOCK : CIA_LESSON_MOCK;

  return <LessonPageLayout lesson={lesson} />;
}
