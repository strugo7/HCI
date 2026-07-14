/**
 * Quiz Knowledge Objects.
 *
 * Quizzes are independent objects. Lessons reference them; they are never
 * inlined into a lesson. Mirrors content/templates/quiz.template.md.
 */
import { z } from 'zod';

import { DifficultySchema, KnowledgeObjectBaseSchema } from './knowledge-objects.js';

/** Bloom's taxonomy level the question targets. */
export const CognitiveSkillSchema = z.enum([
  'remember',
  'understand',
  'apply',
  'analyze',
  'evaluate',
]);
export type CognitiveSkill = z.infer<typeof CognitiveSkillSchema>;

export const QuestionTypeSchema = z.enum([
  'multiple-choice',
  'scenario',
  'diagram',
  'architecture',
  'comparison',
  'incident-response',
  'attack-analysis',
  'best-practice',
]);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export const AnswerKeySchema = z.enum(['A', 'B', 'C', 'D', 'E']);
export type AnswerKey = z.infer<typeof AnswerKeySchema>;

export const AnswerSchema = z.object({
  key: AnswerKeySchema,
  text: z.string().min(1),
});
export type Answer = z.infer<typeof AnswerSchema>;

export const QuestionSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('question'),
  lesson: z.string().min(1),
  questionType: QuestionTypeSchema.default('multiple-choice'),
  difficulty: DifficultySchema.default('medium'),
  cognitive: CognitiveSkillSchema.default('understand'),
  /** Seconds. */
  estimatedTime: z.number().int().positive().default(60),
  points: z.number().int().positive().default(5),

  prompt: z.string().min(1),
  /** Optional situational context that precedes the answers. */
  scenario: z.string().nullable().default(null),
  /** Slug of a diagram this question is asked about. */
  diagram: z.string().nullable().default(null),
  /**
   * Vault-relative image paths (`media/…`), embedded with `![[file.png]]`
   * inside the prompt or the scenario. A question about a drawing must show
   * the drawing.
   */
  images: z.array(z.string()).default([]),

  /**
   * Four or five options. The real exam used four distractors through 2023 and
   * five from 2024 on, so both shapes must validate.
   */
  answers: z.array(AnswerSchema).min(4).max(5),
  correct: AnswerKeySchema,

  /**
   * Pin the options to their authored order — never shuffle them.
   *
   * Only one thing earns this: an option that names *other options by letter*
   * ("תשובות ב' ו-ג' אפשריות"). Shuffle it and the reference points at whatever
   * happens to land in those slots, so the question becomes wrong rather than
   * merely reordered. Two of the lecturer's 2023 questions do this.
   *
   * "כל התשובות נכונות" needs no pin: it refers to the set, not to positions.
   */
  lockAnswerOrder: z.boolean().default(false),

  /** Why the right answer is right AND why each distractor is wrong. */
  explanation: z.string().min(1),
  objective: z.string().min(1),
  /** The trap this question is designed to expose. */
  misconception: z.string().nullable().default(null),

  concepts: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});
export type Question = z.infer<typeof QuestionSchema>;

export const QuizSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('quiz'),
  lesson: z.string().min(1),
  title: z.string().min(1),
  questions: z.array(QuestionSchema),
});
export type Quiz = z.infer<typeof QuizSchema>;

/**
 * Who wrote the exam.
 *
 * `unit` — ours. One summative exam per curriculum unit, authored to the Golden
 * Exam standard and held to it by the exam lint.
 *
 * `lecturer` — the real thing (מבחן מרצה), transcribed from the scanned past
 * papers in `content/quizzes/`. It is an *archive*, not an exam we designed, so
 * the two lint rules that judge authoring quality do not apply to it: we cannot
 * rewrite another person's distractors to be the same length, and we do not get
 * to decide how many of his questions span two lessons.
 */
export const ExamKindSchema = z.enum(['unit', 'lecturer']);
export type ExamKind = z.infer<typeof ExamKindSchema>;

/**
 * A summative exam — ours (מבחן מסכם) or the lecturer's (מבחן מרצה).
 *
 * Same question DSL as a quiz. Answers are shuffled at render time, which is
 * why exam explanations must never name option letters — a rule the lint
 * enforces in both alphabets, since the questions are Hebrew and the option
 * keys are Latin.
 *
 * A unit exam belongs to a curriculum unit and its questions carry that unit id
 * in their `lesson` field. A lecturer exam belongs to no unit — it ranges over
 * the whole course — so `unit` is null and the questions carry the exam's own
 * id. Topic mapping for those lives in `concepts`, as it does everywhere else.
 */
export const ExamSchema = KnowledgeObjectBaseSchema.extend({
  type: z.literal('exam'),
  /** Defaulting to `unit` keeps every exam authored before this field valid. */
  kind: ExamKindSchema.default('unit'),
  unit: z.string().nullable().default(null),
  title: z.string().min(1),
  questions: z.array(QuestionSchema),

  /* Provenance — a lecturer exam is someone else's work, and says so. */
  year: z.number().int().nullable().default(null),
  /** Seconds. The 2023 paper allowed two hours; 2024 and 2025 allow 90 minutes. */
  duration: z.number().int().positive().nullable().default(null),
  /** The original PDF this was transcribed from. */
  source: z.string().nullable().default(null),
}).superRefine((exam, ctx) => {
  if (exam.kind === 'unit' && exam.unit === null) {
    ctx.addIssue({
      code: 'custom',
      path: ['unit'],
      message: 'a unit exam must name the unit it examines',
    });
  }
});
export type Exam = z.infer<typeof ExamSchema>;

/** What grading actually needs — satisfied by both a Quiz and an Exam. */
export type Gradeable = Pick<Quiz, 'id' | 'questions'>;

/* ------------------------------------------------------------------ *
 * Assessment results — produced by the quiz-engine, never authored
 * ------------------------------------------------------------------ */

export const QuestionResultSchema = z.object({
  questionId: z.string(),
  selected: AnswerKeySchema.nullable(),
  correct: z.boolean(),
  pointsAwarded: z.number().nonnegative(),
});
export type QuestionResult = z.infer<typeof QuestionResultSchema>;

export const QuizResultSchema = z.object({
  quizId: z.string(),
  results: z.array(QuestionResultSchema),
  score: z.number().nonnegative(),
  maxScore: z.number().nonnegative(),
  /** 0..1 */
  ratio: z.number().min(0).max(1),
  passed: z.boolean(),
});
export type QuizResult = z.infer<typeof QuizResultSchema>;
