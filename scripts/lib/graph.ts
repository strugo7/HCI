/**
 * The knowledge graph, checked against the vault it was derived from.
 *
 * `buildGraph` drops any edge whose endpoint does not exist — it will not
 * invent a node to satisfy a link. That is the correct behaviour for a graph,
 * and the wrong behaviour for a build: a prerequisite naming a lesson that was
 * never written would vanish silently and the student would simply never be
 * told to read it. So the build asks the same question the graph did, and says
 * out loud what the graph quietly discarded.
 *
 * Shared by `build-content` and `validate-content`, so CI gates on exactly the
 * graph the app ships.
 */
import {
  buildGraph,
  detectCycles,
  findOrphanConcepts,
  type KnowledgeGraph,
} from '@cyberatlas/knowledge-graph';

import { DIAGNOSTIC_CODES, type Concept, type Diagnostic, type Lesson } from '@cyberatlas/core';

import type { UnitMeta } from './curriculum.js';

export function compileGraph(
  lessons: readonly Lesson[],
  concepts: readonly Concept[],
  units: readonly UnitMeta[],
): { graph: KnowledgeGraph; diagnostics: Diagnostic[] } {
  const graph = buildGraph(lessons, concepts, units);
  const diagnostics: Diagnostic[] = [];

  const lessonIds = new Set(lessons.map((lesson) => lesson.id));

  /* ---------------------------------------------------------------- *
   * A prerequisite must be a lesson that exists.                      *
   * ---------------------------------------------------------------- */
  for (const lesson of lessons) {
    for (const prerequisite of lesson.frontmatter.prerequisites) {
      if (lessonIds.has(prerequisite)) continue;

      diagnostics.push({
        severity: 'error',
        file: `content/lessons/${lesson.id}/lesson.md`,
        line: null,
        column: null,
        message: `Prerequisite "${prerequisite}" is not a lesson in the vault.`,
        code: DIAGNOSTIC_CODES.BROKEN_LINK,
      });
    }
  }

  /* ---------------------------------------------------------------- *
   * A prerequisite cycle is a course no student can start.            *
   * ---------------------------------------------------------------- */
  for (const cycle of detectCycles(graph)) {
    const [first] = cycle;

    diagnostics.push({
      severity: 'error',
      file: `content/lessons/${first ?? ''}/lesson.md`,
      line: null,
      column: null,
      message: `Prerequisite cycle: ${[...cycle, first].join(' → ')}. No lesson in it can be taken first.`,
      code: DIAGNOSTIC_CODES.CIRCULAR_DEPENDENCY,
    });
  }

  /* ---------------------------------------------------------------- *
   * A concept nothing reaches is a concept no student will ever read. *
   * ---------------------------------------------------------------- */
  for (const slug of findOrphanConcepts(graph)) {
    diagnostics.push({
      severity: 'warning',
      file: `content/concepts/${slug}.md`,
      line: null,
      column: null,
      message: `Concept "${slug}" is unreachable: no lesson links to it and no concept relates to it.`,
      code: DIAGNOSTIC_CODES.ORPHAN_CONCEPT,
    });
  }

  return { graph, diagnostics };
}
