/**
 * Loading compiled content.
 *
 * The vault is parsed at build time by `pnpm content:build`, which writes
 * Knowledge Objects to `src/generated/content`. The app only *loads* them —
 * it never parses Markdown, and it never owns educational content.
 *
 * Each lesson is its own chunk, so opening one lesson does not download the
 * other thirty-six.
 */
import type { Difficulty, Lesson } from '@cyberatlas/core';

import indexJson from '@/generated/content/index.json';

/** What a lesson list needs, without any of the lesson body. */
export interface LessonMeta {
  readonly id: string;
  readonly title: string;
  readonly lessonNumber: number | null;
  readonly category: string | null;
  readonly difficulty: Difficulty;
  readonly estimatedTime: number | null;
  readonly tags: readonly string[];
  readonly prerequisites: readonly string[];
  readonly sectionCount: number;
  readonly concepts: readonly string[];
}

export interface ConceptMeta {
  readonly slug: string;
  readonly title: string;
  /** The definition the concept file owns, as plain text. */
  readonly definition: string;
  readonly appearsIn: readonly string[];
}

interface ContentIndex {
  readonly lessons: readonly LessonMeta[];
  readonly concepts: readonly ConceptMeta[];
}

const contentIndex = indexJson as ContentIndex;

/** Lesson metadata, ordered by lesson number. Cheap — no bodies attached. */
export function lessonIndex(): readonly LessonMeta[] {
  return contentIndex.lessons;
}

export function conceptIndex(): readonly ConceptMeta[] {
  return contentIndex.concepts;
}

/**
 * One chunk per lesson. Vite turns each match into its own dynamic import,
 * so the bundle a student downloads is the lesson they opened.
 */
const lessonChunks = import.meta.glob<{ default: Lesson }>(
  '../../generated/content/lessons/*.json',
);

export async function loadLesson(id: string): Promise<Lesson | null> {
  const chunk = lessonChunks[`../../generated/content/lessons/${id}.json`];
  if (!chunk) return null;
  const module = await chunk();
  return module.default;
}

/**
 * A vault-relative asset path → the URL the app serves it from.
 *
 * Content names files ("media/CIA Triangle.png"); it does not know how this
 * app happens to serve them. That translation belongs here, and nowhere in
 * the parser or in the content itself.
 */
export function assetUrl(src: string): string {
  const file = src.slice(src.lastIndexOf('/') + 1);
  return `/content-media/${encodeURIComponent(file)}`;
}
