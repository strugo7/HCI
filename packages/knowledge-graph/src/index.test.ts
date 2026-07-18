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
  { id: 'introduction', title: 'יסודות', lessons: ['what-is-hci'] },
  { id: 'cognitive-psychology', title: 'פסיכולוגיה קוגניטיבית', lessons: ['attention', 'memory', 'perception'] },
];

describe('unit assignment', () => {
  it('places a lesson in the unit that lists it', () => {
    const graph = buildGraph([lesson('what-is-hci'), lesson('attention')], [], UNITS);

    expect(unitOfLesson(graph, 'what-is-hci')).toBe('introduction');
    expect(unitOfLesson(graph, 'attention')).toBe('cognitive-psychology');
  });

  it('leaves a lesson no unit claims unplaced', () => {
    const graph = buildGraph([lesson('orphan-lesson')], [], UNITS);

    expect(unitOfLesson(graph, 'orphan-lesson')).toBeNull();
  });

  it('places a concept in the unit most of its lessons belong to', () => {
    const graph = buildGraph(
      [
        lesson('attention', ['cognitive-load']),
        lesson('memory', ['cognitive-load']),
        lesson('perception', ['cognitive-load']),
        lesson('what-is-hci', ['cognitive-load']),
      ],
      [concept('cognitive-load')],
      UNITS,
    );

    // Three cognitive-psychology lessons against one introduction lesson.
    expect(unitOfConcept(graph, 'cognitive-load')).toBe('cognitive-psychology');
  });

  it('breaks a tie by curriculum order, not by the order the content compiled', () => {
    const lessons = [lesson('attention', ['shared']), lesson('what-is-hci', ['shared'])];
    const concepts = [concept('shared')];

    // One vote each. `introduction` comes first in the curriculum, so it wins —
    // even though the cognitive-psychology lesson was compiled first.
    expect(unitOfConcept(buildGraph(lessons, concepts, UNITS), 'shared')).toBe('introduction');

    // Reverse the curriculum and the answer must follow it. This is what proves
    // the rule is curriculum order, and not something incidental about the input.
    const reversed = [...UNITS].reverse();
    expect(unitOfConcept(buildGraph(lessons, concepts, reversed), 'shared')).toBe('cognitive-psychology');
  });

  it('leaves a concept no lesson references unplaced', () => {
    const graph = buildGraph([lesson('what-is-hci')], [concept('lonely')], UNITS);

    expect(unitOfConcept(graph, 'lonely')).toBeNull();
  });

  it('does not let relatedness place a concept — only teaching does', () => {
    // `lonely` is related to `taught`, which lives in introduction. Being
    // related to something taught is not the same as being taught.
    const graph = buildGraph(
      [lesson('what-is-hci', ['taught'])],
      [concept('taught'), concept('lonely', ['taught'])],
      UNITS,
    );

    expect(unitOfConcept(graph, 'taught')).toBe('introduction');
    expect(unitOfConcept(graph, 'lonely')).toBeNull();
  });

  it('carries the curriculum units onto the graph, in order', () => {
    const graph = buildGraph([], [], UNITS);

    expect(graph.units).toEqual([
      { id: 'introduction', title: 'יסודות' },
      { id: 'cognitive-psychology', title: 'פסיכולוגיה קוגניטיבית' },
    ]);
  });

  it('builds the same graph twice, byte for byte', () => {
    const lessons = [lesson('attention', ['cognitive-load']), lesson('what-is-hci', ['cognitive-load'])];
    const concepts = [concept('cognitive-load')];

    const a = JSON.stringify(buildGraph(lessons, concepts, UNITS));
    const b = JSON.stringify(buildGraph(lessons, concepts, UNITS));

    expect(a).toBe(b);
  });
});
