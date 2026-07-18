/**
 * Knowledge Objects — the canonical representation of educational content.
 *
 * Every downstream system (renderer, quiz-engine, knowledge-graph, search)
 * consumes these and only these. Types are inferred from the schemas so the
 * runtime contract and the compile-time contract can never drift apart.
 */
import { z } from 'zod';

import { CALLOUT_DIRECTIVES, MEDIA_DIRECTIVES } from './directives.js';

/** Every Knowledge Object is addressable. */
export const KnowledgeObjectBaseSchema = z.object({
  id: z.string().min(1),
});

/** Where an object came from, so diagnostics can point at a line. */
export const SourceLocationSchema = z.object({
  file: z.string(),
  line: z.number().int().nonnegative(),
  column: z.number().int().nonnegative(),
});
export type SourceLocation = z.infer<typeof SourceLocationSchema>;

/* ------------------------------------------------------------------ *
 * Inline content
 * ------------------------------------------------------------------ */

/** `[[Affordances]]` — resolved to a concept slug at parse time. */
export const ConceptReferenceSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('concept-reference'),
  /** Slug of the target concept, e.g. "affordances". */
  target: z.string().min(1),
  /** The text as written, which may differ from the slug. */
  label: z.string().min(1),
});
export type ConceptReference = z.infer<typeof ConceptReferenceSchema>;

export const TextSchema = z.object({
  type: z.literal('text'),
  value: z.string(),
});

export const StrongSchema = z.object({
  type: z.literal('strong'),
  value: z.string(),
});

export const EmphasisSchema = z.object({
  type: z.literal('emphasis'),
  value: z.string(),
});

export const InlineCodeSchema = z.object({
  type: z.literal('inline-code'),
  value: z.string(),
});

export const InlineSchema = z.discriminatedUnion('type', [
  TextSchema,
  StrongSchema,
  EmphasisSchema,
  InlineCodeSchema,
  ConceptReferenceSchema,
]);
export type Inline = z.infer<typeof InlineSchema>;

/* ------------------------------------------------------------------ *
 * Structural blocks — plain Markdown
 * ------------------------------------------------------------------ */

export const HeadingSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('heading'),
  depth: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  children: z.array(InlineSchema),
});

export const ParagraphSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('paragraph'),
  children: z.array(InlineSchema),
});

export const ListSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('list'),
  ordered: z.boolean(),
  items: z.array(z.array(InlineSchema)),
});

export const TableSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('table'),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

export const CodeSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('code'),
  lang: z.string().nullable(),
  value: z.string(),
});

/* ------------------------------------------------------------------ *
 * DSL blocks
 * ------------------------------------------------------------------ */

export const DefinitionSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('definition'),
  /** The concept this definition belongs to. Definitions are owned by concepts. */
  concept: z.string().min(1).nullable(),
  children: z.array(InlineSchema),
});
export type Definition = z.infer<typeof DefinitionSchema>;

export const ExampleSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('example'),
  children: z.array(InlineSchema),
});

export const AnalogySchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('analogy'),
  children: z.array(InlineSchema),
});

/** important | warning | tip — same shape, different intent. */
export const CalloutSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('callout'),
  variant: z.enum(CALLOUT_DIRECTIVES),
  children: z.array(InlineSchema),
});
export type Callout = z.infer<typeof CalloutSchema>;

/**
 * diagram | image | animation | video.
 * `description` is what the author wants drawn. `src` stays null until an
 * asset is produced for it; once the asset exists in the vault, the directive
 * names it (`:::animation{src="think-aloud.html"}`) or the author embeds it
 * (`![[think-aloud.html]]`) and `src` carries its vault-relative path.
 */
export const MediaSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('media'),
  variant: z.enum(MEDIA_DIRECTIVES),
  description: z.string().min(1),
  src: z.string().nullable(),
  alt: z.string().nullable(),
  /** Rendered height in px for framed media (animations). null → renderer default. */
  height: z.number().int().positive().nullable(),
  /** Rendered width in px for framed media (animations). null → renderer default (100%). */
  width: z.number().int().positive().nullable(),
});
export type Media = z.infer<typeof MediaSchema>;

export const ObjectivesSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('objectives'),
  items: z.array(z.string().min(1)),
});

export const KeyPointsSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('keypoints'),
  items: z.array(z.string().min(1)),
});

export const SelfCheckSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('selfcheck'),
  question: z.string().min(1),
  answer: z.string().min(1),
});
export type SelfCheck = z.infer<typeof SelfCheckSchema>;

export const SummarySchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('summary'),
  children: z.array(InlineSchema),
});

export const ReferencesSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('references'),
  items: z.array(z.string().min(1)),
});

/** `:::quiz{ref="lesson-01-quiz"}` — a pointer, never an inlined quiz. */
export const QuizReferenceSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('quiz-reference'),
  ref: z.string().min(1),
});

export const FlashcardsReferenceSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('flashcards-reference'),
  ref: z.string().min(1),
});

/* ------------------------------------------------------------------ *
 * Block union
 * ------------------------------------------------------------------ */

export const BlockSchema = z.discriminatedUnion('type', [
  HeadingSchema,
  ParagraphSchema,
  ListSchema,
  TableSchema,
  CodeSchema,
  DefinitionSchema,
  ExampleSchema,
  AnalogySchema,
  CalloutSchema,
  MediaSchema,
  ObjectivesSchema,
  KeyPointsSchema,
  SelfCheckSchema,
  SummarySchema,
  ReferencesSchema,
  QuizReferenceSchema,
  FlashcardsReferenceSchema,
]);
export type Block = z.infer<typeof BlockSchema>;
export type BlockType = Block['type'];

/* ------------------------------------------------------------------ *
 * Composite objects
 * ------------------------------------------------------------------ */

/** A section teaches exactly one concept. */
export const SectionSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('section'),
  title: z.string().min(1),
  slug: z.string().min(1),
  blocks: z.array(BlockSchema),
});
export type Section = z.infer<typeof SectionSchema>;

export const DifficultySchema = z.enum(['easy', 'medium', 'hard']);
export type Difficulty = z.infer<typeof DifficultySchema>;

export const LessonFrontmatterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  /**
   * One sentence, written for the lesson card and the page header.
   * It exists so a header never has to reach into the body and repeat the
   * lesson's first paragraph back to the reader.
   */
  description: z.string().optional(),
  lessonNumber: z.number().int().positive().optional(),
  course: z.string().default('hci-course'),
  category: z.string().optional(),
  difficulty: DifficultySchema.default('medium'),
  /** Minutes. */
  estimatedTime: z.number().int().positive().optional(),
  tags: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  relatedLessons: z.array(z.string()).default([]),
  relatedConcepts: z.array(z.string()).default([]),
  /** Published lessons are immutable; edits ship as a new version. */
  version: z.number().int().positive().default(1),
});
export type LessonFrontmatter = z.infer<typeof LessonFrontmatterSchema>;

/**
 * A lesson is a *bundle* on disk, not a single file:
 *
 *   content/lessons/lesson-01/
 *     lesson.md      → sections
 *     summary.md     → summary
 *     quiz.md        → quiz     (parsed by quiz-engine)
 *     flashcards.md  → flashcards
 *     mindmap.md     → mindmap
 *     assets.md      → asset manifest
 *
 * The parser composes these into one Lesson.
 */
export const LessonSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('lesson'),
  frontmatter: LessonFrontmatterSchema,
  sections: z.array(SectionSchema),
  summary: z.array(BlockSchema).default([]),
  quizRef: z.string().nullable().default(null),
  flashcardsRef: z.string().nullable().default(null),
  /** Every concept slug this lesson links to. Feeds the knowledge graph. */
  concepts: z.array(z.string()).default([]),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const ConceptFrontmatterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
});
export type ConceptFrontmatter = z.infer<typeof ConceptFrontmatterSchema>;

/** A concept exists exactly once and owns its definition. */
export const ConceptSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('concept'),
  frontmatter: ConceptFrontmatterSchema,
  definition: DefinitionSchema,
  /** The plain-language pass. */
  simpleExplanation: z.array(BlockSchema).default([]),
  /** The rigorous pass. */
  technicalExplanation: z.array(BlockSchema).default([]),
  examples: z.array(ExampleSchema).default([]),
  related: z.array(z.string()).default([]),
  /** Back-references, computed — never authored by hand. */
  appearsIn: z.array(z.string()).default([]),
});
export type Concept = z.infer<typeof ConceptSchema>;

export const FlashcardSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('flashcard'),
  front: z.string().min(1),
  back: z.string().min(1),
  concepts: z.array(z.string()).default([]),
});
export type Flashcard = z.infer<typeof FlashcardSchema>;
