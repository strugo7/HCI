/**
 * Loading one lesson.
 *
 * Content is immutable once built, so it is cached indefinitely — a lesson
 * never goes stale inside a session.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { Lesson } from '@cyberatlas/core';

import { loadLesson } from '@/shared/content/content';

export function useLesson(lessonId: string | undefined): UseQueryResult<Lesson | null> {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => loadLesson(lessonId ?? ''),
    enabled: lessonId !== undefined,
    staleTime: Infinity,
  });
}
