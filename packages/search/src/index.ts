/**
 * @cyberatlas/search
 *
 * Discovery across every Knowledge Object.
 *
 * The index is built at compile time and shipped as data, so search does not
 * pay a parse cost in the browser. Must handle Hebrew (no stemmer, RTL) and
 * Latin technical terms in the same query — a student will type "פיירוול"
 * and "Firewall" interchangeably.
 *
 * Status: contracts defined, implementation pending.
 */
import type { Concept, Lesson } from '@cyberatlas/core';

export type SearchKind = 'lesson' | 'concept' | 'definition' | 'question' | 'flashcard';

export interface SearchDocument {
  readonly id: string;
  readonly kind: SearchKind;
  readonly title: string;
  readonly body: string;
  readonly href: string;
}

export interface SearchHit {
  readonly document: SearchDocument;
  /** 0..1, higher is better. */
  readonly score: number;
  /** Matched ranges in `body`, for highlighting. */
  readonly matches: readonly (readonly [start: number, end: number])[];
}

export interface SearchIndex {
  readonly documents: readonly SearchDocument[];
}

const NOT_IMPLEMENTED = 'Search not implemented yet.';

/** Build the index at compile time. */
export function buildIndex(
  _lessons: readonly Lesson[],
  _concepts: readonly Concept[],
): SearchIndex {
  throw new Error(NOT_IMPLEMENTED);
}

export function search(_index: SearchIndex, _query: string, _limit?: number): SearchHit[] {
  throw new Error(NOT_IMPLEMENTED);
}
