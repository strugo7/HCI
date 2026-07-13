/**
 * Loading one concept, and the graph it sits in.
 *
 * Content is immutable once built, so both are cached indefinitely — the graph
 * in particular is derived at build time and cannot change inside a session.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { Concept } from '@cyberatlas/core';
import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { loadConcept, loadGraph } from '@/shared/content/content';

export function useConcept(slug: string | undefined): UseQueryResult<Concept | null> {
  return useQuery({
    queryKey: ['concept', slug],
    queryFn: () => loadConcept(slug ?? ''),
    enabled: slug !== undefined,
    staleTime: Infinity,
  });
}

export function useGraph(): UseQueryResult<KnowledgeGraph> {
  return useQuery({
    queryKey: ['graph'],
    queryFn: loadGraph,
    staleTime: Infinity,
  });
}
