/**
 * The curriculum — the vault's own answer to "which lessons, in what order".
 *
 * `content/curriculum.yaml` is the single source of that structure. The app
 * must never keep a second copy of it in TypeScript: a unit list that drifts
 * from the vault is a lesson a student cannot reach.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { Diagnostic } from '@cyberatlas/core';
import { parse } from 'yaml';

import { CONTENT_DIR } from './compile.js';

const CURRICULUM_FILE = path.join(CONTENT_DIR, 'curriculum.yaml');

export interface CourseMeta {
  readonly code: string;
  readonly title: string;
}

export interface UnitMeta {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** The lecturer's deck this unit is drawn from. */
  readonly source: string;
  /** Share of the exam, in percent. 0 means the topic was never examined. */
  readonly weight: number;
  /** Lesson ids, in teaching order. */
  readonly lessons: readonly string[];
}

interface RawUnit {
  id?: unknown;
  title?: unknown;
  description?: unknown;
  source?: unknown;
  weight?: unknown;
  lessons?: unknown;
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

/**
 * Read the curriculum and check it against the lessons that actually compiled.
 *
 * A lesson id in the curriculum with no bundle in the vault is an **error**:
 * it would render as a dead row on the unit page. A compiled lesson that no
 * unit claims is a **warning** — it exists, but nothing navigates to it.
 */
export async function readCurriculum(
  compiledLessonIds: readonly string[],
): Promise<{ course: CourseMeta; units: UnitMeta[]; diagnostics: Diagnostic[] }> {
  const diagnostics: Diagnostic[] = [];
  const raw = parse(await readFile(CURRICULUM_FILE, 'utf8')) as {
    courseCode?: unknown;
    courseTitle?: unknown;
    units?: RawUnit[];
  };

  const course: CourseMeta = {
    code: str(raw.courseCode),
    title: str(raw.courseTitle),
  };

  const compiled = new Set(compiledLessonIds);
  const claimed = new Set<string>();
  const units: UnitMeta[] = [];

  for (const unit of raw.units ?? []) {
    const id = str(unit.id);
    if (id === '') continue;

    const lessons = Array.isArray(unit.lessons)
      ? unit.lessons.filter((l): l is string => typeof l === 'string')
      : [];

    const present: string[] = [];
    for (const lessonId of lessons) {
      if (!compiled.has(lessonId)) {
        diagnostics.push({
          severity: 'error',
          file: 'content/curriculum.yaml',
          message: `unit "${id}" lists lesson "${lessonId}", which has no compiled bundle`,
        });
        continue;
      }
      claimed.add(lessonId);
      present.push(lessonId);
    }

    units.push({
      id,
      title: str(unit.title, id),
      description: str(unit.description),
      source: str(unit.source),
      weight: typeof unit.weight === 'number' ? unit.weight : 0,
      lessons: present,
    });
  }

  for (const lessonId of compiledLessonIds) {
    if (!claimed.has(lessonId)) {
      diagnostics.push({
        severity: 'warning',
        file: 'content/curriculum.yaml',
        message: `lesson "${lessonId}" compiled but belongs to no unit — nothing links to it`,
      });
    }
  }

  return { course, units, diagnostics };
}
