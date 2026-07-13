/**
 * Unit assignment is the one part of the graph a reader cannot check by eye.
 *
 * A concept in the wrong unit does not look wrong — it just quietly lies to the
 * student who filtered for it. So it is tested. The rest of the graph is visible
 * the moment you open /graph, and is not.
 */
import { describe, expect, it } from 'vitest';

import type { Concept, Lesson } from '@cyberatlas/core';

import {
  buildGraph,
  conceptNodeId,
  lessonNodeId,
  type GraphUnit,
  type KnowledgeGraph,
} from './index.js';

/**
 * `buildGraph` reads four things off a lesson and three off a concept. The
 * fixtures supply exactly those — building whole Knowledge Objects here would
 * test the fixture rather than the graph.
 */
function lesson(id: string, concepts: string[] = []): Lesson {
  return {
    id,
    frontmatter: { title: `שיעור ${id}`, prerequisites: [] },
    concepts,
    sections: [],
  } as unknown as Lesson;
}

function concept(slug: string, related: string[] = []): Concept {
  return {
    frontmatter: { slug, title: slug },
    related,
  } as unknown as Concept;
}

function unitOfConcept(graph: KnowledgeGraph, slug: string): string | null | undefined {
  return graph.nodes.find((node) => node.id === conceptNodeId(slug))?.unit;
}

function unitOfLesson(graph: KnowledgeGraph, id: string): string | null | undefined {
  return graph.nodes.find((node) => node.id === lessonNodeId(id))?.unit;
}

const UNITS: GraphUnit[] = [
  { id: 'foundations', title: 'יסודות', lessons: ['cia'] },
  { id: 'malware', title: 'נוזקות', lessons: ['virus', 'worm', 'trojan-horse'] },
];

describe('unit assignment', () => {
  it('places a lesson in the unit that lists it', () => {
    const graph = buildGraph([lesson('cia'), lesson('virus')], [], UNITS);

    expect(unitOfLesson(graph, 'cia')).toBe('foundations');
    expect(unitOfLesson(graph, 'virus')).toBe('malware');
  });

  it('leaves a lesson no unit claims unplaced', () => {
    const graph = buildGraph([lesson('orphan-lesson')], [], UNITS);

    expect(unitOfLesson(graph, 'orphan-lesson')).toBeNull();
  });

  it('places a concept in the unit most of its lessons belong to', () => {
    const graph = buildGraph(
      [
        lesson('virus', ['payload']),
        lesson('worm', ['payload']),
        lesson('trojan-horse', ['payload']),
        lesson('cia', ['payload']),
      ],
      [concept('payload')],
      UNITS,
    );

    // Three malware lessons against one foundations lesson.
    expect(unitOfConcept(graph, 'payload')).toBe('malware');
  });

  it('breaks a tie by curriculum order, not by the order the content compiled', () => {
    const lessons = [lesson('virus', ['shared']), lesson('cia', ['shared'])];
    const concepts = [concept('shared')];

    // One vote each. `foundations` comes first in the curriculum, so it wins —
    // even though the malware lesson was compiled first.
    expect(unitOfConcept(buildGraph(lessons, concepts, UNITS), 'shared')).toBe('foundations');

    // Reverse the curriculum and the answer must follow it. This is what proves
    // the rule is curriculum order, and not something incidental about the input.
    const reversed = [...UNITS].reverse();
    expect(unitOfConcept(buildGraph(lessons, concepts, reversed), 'shared')).toBe('malware');
  });

  it('leaves a concept no lesson references unplaced', () => {
    const graph = buildGraph([lesson('cia')], [concept('lonely')], UNITS);

    expect(unitOfConcept(graph, 'lonely')).toBeNull();
  });

  it('does not let relatedness place a concept — only teaching does', () => {
    // `lonely` is related to `taught`, which lives in foundations. Being
    // related to something taught is not the same as being taught.
    const graph = buildGraph(
      [lesson('cia', ['taught'])],
      [concept('taught'), concept('lonely', ['taught'])],
      UNITS,
    );

    expect(unitOfConcept(graph, 'taught')).toBe('foundations');
    expect(unitOfConcept(graph, 'lonely')).toBeNull();
  });

  it('carries the curriculum units onto the graph, in order', () => {
    const graph = buildGraph([], [], UNITS);

    expect(graph.units).toEqual([
      { id: 'foundations', title: 'יסודות' },
      { id: 'malware', title: 'נוזקות' },
    ]);
  });

  it('builds the same graph twice, byte for byte', () => {
    const lessons = [lesson('virus', ['payload']), lesson('cia', ['payload'])];
    const concepts = [concept('payload')];

    const a = JSON.stringify(buildGraph(lessons, concepts, UNITS));
    const b = JSON.stringify(buildGraph(lessons, concepts, UNITS));

    expect(a).toBe(b);
  });
});
