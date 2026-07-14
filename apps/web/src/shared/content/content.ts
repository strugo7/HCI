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
import type { Concept, Difficulty, Exam, Flashcard, Lesson, Quiz } from '@cyberatlas/core';
import type { KnowledgeGraph } from '@cyberatlas/knowledge-graph';

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
  /** Every other name the concept goes by — Hebrew and English both. */
  readonly aliases: readonly string[];
  readonly tags: readonly string[];
  readonly related: readonly string[];
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

/** What the exams list needs, without downloading a single question. */
export interface ExamMeta {
  readonly id: string;
  /** Ours belongs to a unit; the lecturer's ranges over the course and is null. */
  readonly unit: string | null;
  readonly kind: 'unit' | 'lecturer';
  readonly title: string;
  readonly questionCount: number;
  readonly maxScore: number;
  /** Seconds, summed over the questions. */
  readonly estimatedTime: number;
  /** Lecturer exams only — the year the paper was sat, and the time allowed. */
  readonly year: number | null;
  readonly duration: number | null;
}

interface ContentIndex {
  readonly course: CourseMeta;
  readonly units: readonly UnitMeta[];
  readonly exams: readonly ExamMeta[];
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

const conceptsBySlug = new Map(contentIndex.concepts.map((concept) => [concept.slug, concept]));

/**
 * A concept's metadata, without its body.
 *
 * This is what a link to a concept needs in order to show what it points at
 * before the student commits to opening it.
 */
export function conceptBySlug(slug: string | undefined): ConceptMeta | null {
  if (slug === undefined) return null;
  return conceptsBySlug.get(slug) ?? null;
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

/** Concepts chunk the same way: a concept page downloads one concept. */
const conceptChunks = import.meta.glob<{ default: Concept }>(
  '../../generated/content/concepts/*.json',
);

export async function loadConcept(slug: string): Promise<Concept | null> {
  const chunk = conceptChunks[`../../generated/content/concepts/${slug}.json`];
  if (!chunk) return null;
  const module = await chunk();
  return module.default;
}

/**
 * The knowledge graph, whole.
 *
 * Unlike a lesson, the graph is not divisible — every node is reachable from
 * every other, and a view of it cannot lay out a part without knowing the rest.
 * It is one lazy chunk, so a student who never opens /graph never downloads it.
 */
export async function loadGraph(): Promise<KnowledgeGraph> {
  const module = await import('@/generated/content/graph.json');
  return module.default as KnowledgeGraph;
}

/** Quizzes, exams and decks chunk the same way, and for the same reason. */
const quizChunks = import.meta.glob<{ default: Quiz }>('../../generated/content/quizzes/*.json');
const examChunks = import.meta.glob<{ default: Exam }>('../../generated/content/exams/*.json');
const deckChunks = import.meta.glob<{ default: FlashcardDeck }>(
  '../../generated/content/flashcards/*.json',
);

export async function loadQuiz(id: string): Promise<Quiz | null> {
  const chunk = quizChunks[`../../generated/content/quizzes/${id}.json`];
  if (!chunk) return null;
  const module = await chunk();
  return module.default;
}

export async function loadExam(id: string): Promise<Exam | null> {
  const chunk = examChunks[`../../generated/content/exams/${id}.json`];
  if (!chunk) return null;
  const module = await chunk();
  return module.default;
}

/** Every exam — ours and the lecturer's. */
export function examsIndex(): readonly ExamMeta[] {
  return contentIndex.exams;
}

/** Our summative exams, one per unit, in the curriculum's unit order. */
export function unitExamsIndex(): readonly ExamMeta[] {
  return contentIndex.exams.filter((exam) => exam.kind === 'unit');
}

/** The lecturer's real past papers, newest first. */
export function lecturerExamsIndex(): readonly ExamMeta[] {
  return contentIndex.exams.filter((exam) => exam.kind === 'lecturer');
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
