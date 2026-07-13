/**
 * Loading one quiz, and one deck.
 *
 * Content is immutable once built, so it is cached indefinitely — a quiz never
 * goes stale inside a session.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { Exam, Quiz } from '@cyberatlas/core';

import { loadDeck, loadExam, loadQuiz, type FlashcardDeck } from '@/shared/content/content';

export function useQuiz(quizId: string | undefined): UseQueryResult<Quiz | null> {
  return useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => loadQuiz(quizId ?? ''),
    enabled: quizId !== undefined,
    staleTime: Infinity,
  });
}

export function useExam(examId: string | undefined): UseQueryResult<Exam | null> {
  return useQuery({
    queryKey: ['exam', examId],
    queryFn: () => loadExam(examId ?? ''),
    enabled: examId !== undefined,
    staleTime: Infinity,
  });
}

export function useDeck(deckId: string | undefined): UseQueryResult<FlashcardDeck | null> {
  return useQuery({
    queryKey: ['deck', deckId],
    queryFn: () => loadDeck(deckId ?? ''),
    enabled: deckId !== undefined,
    staleTime: Infinity,
  });
}
