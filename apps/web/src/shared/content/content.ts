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
import type { Difficulty, Flashcard, Lesson, Quiz } from '@cyberatlas/core';

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
  /** Null when the lesson ships without one — not the same as "not loaded yet". */
  readonly quizRef: string | null;
  readonly questionCount: number;
  readonly flashcardsRef: string | null;
  readonly cardCount: number;
}

/**
 * A lesson's cards, as the build emits them.
 *
 * The deck borrows its lesson's title rather than owning a second copy of it.
 */
export interface FlashcardDeck {
  readonly id: string;
  readonly lesson: string;
  readonly title: string;
  readonly cards: readonly Flashcard[];
}

export interface ConceptMeta {
  readonly slug: string;
  readonly title: string;
  /** The definition the concept file owns, as plain text. */
  readonly definition: string;
  readonly appearsIn: readonly string[];
}

/** A unit of the course — one of the lecturer's decks. From `curriculum.yaml`. */
export interface UnitMeta {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly source: string;
  /** Share of the exam, in percent. 0 means the topic was never examined. */
  readonly weight: number;
  /** Lesson ids, in teaching order — not in lesson-number order. */
  readonly lessons: readonly string[];
}

export interface CourseMeta {
  readonly code: string;
  readonly title: string;
}

interface ContentIndex {
  readonly course: CourseMeta;
  readonly units: readonly UnitMeta[];
  readonly lessons: readonly LessonMeta[];
  readonly concepts: readonly ConceptMeta[];
}

const contentIndex = indexJson as ContentIndex;

/** The course itself — name and code, straight from `curriculum.yaml`. */
export function course(): CourseMeta {
  return contentIndex.course;
}

/** Lesson metadata, ordered by lesson number. Cheap — no bodies attached. */
export function lessonIndex(): readonly LessonMeta[] {
  return contentIndex.lessons;
}

export function conceptIndex(): readonly ConceptMeta[] {
  return contentIndex.concepts;
}

/** The nine units, in the curriculum's pedagogical order. */
export function unitIndex(): readonly UnitMeta[] {
  return contentIndex.units;
}

export function unitById(id: string | undefined): UnitMeta | null {
  if (id === undefined) return null;
  return contentIndex.units.find((unit) => unit.id === id) ?? null;
}

const lessonsById = new Map(contentIndex.lessons.map((lesson) => [lesson.id, lesson]));

/**
 * The unit's lessons, in the order the curriculum teaches them.
 *
 * Deliberately not sorted by `lessonNumber`: the curriculum's sequence is the
 * pedagogical one, and it is the only order a unit page may present.
 */
export function lessonsInUnit(unit: UnitMeta): readonly LessonMeta[] {
  return unit.lessons
    .map((id) => lessonsById.get(id))
    .filter((lesson): lesson is LessonMeta => lesson !== undefined);
}

/**
 * Which unit a lesson belongs to.
 *
 * This is what lets a lesson offer a way back to the unit the student came
 * from — without the lesson page having to be told where it was opened from.
 */
const unitByLessonId = new Map<string, UnitMeta>(
  contentIndex.units.flatMap((unit) => unit.lessons.map((id) => [id, unit] as const)),
);

export function unitOfLesson(lessonId: string | undefined): UnitMeta | null {
  if (lessonId === undefined) return null;
  return unitByLessonId.get(lessonId) ?? null;
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

/** Quizzes and decks chunk the same way, and for the same reason. */
const quizChunks = import.meta.glob<{ default: Quiz }>('../../generated/content/quizzes/*.json');
const deckChunks = import.meta.glob<{ default: FlashcardDeck }>(
  '../../generated/content/flashcards/*.json',
);

export async function loadQuiz(id: string): Promise<Quiz | null> {
  const chunk = quizChunks[`../../generated/content/quizzes/${id}.json`];
  if (!chunk) return null;
  const module = await chunk();
  return module.default;
}

export async function loadDeck(id: string): Promise<FlashcardDeck | null> {
  const chunk = deckChunks[`../../generated/content/flashcards/${id}.json`];
  if (!chunk) return null;
  const module = await chunk();
  return module.default;
}

/** Every lesson that ships a deck, in lesson order. Drives the flashcards index. */
export function decksIndex(): readonly LessonMeta[] {
  return contentIndex.lessons.filter((lesson) => lesson.flashcardsRef !== null);
}

/** Every lesson that ships a quiz, in lesson order. Drives the practice index. */
export function quizzesIndex(): readonly LessonMeta[] {
  return contentIndex.lessons.filter((lesson) => lesson.quizRef !== null);
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
