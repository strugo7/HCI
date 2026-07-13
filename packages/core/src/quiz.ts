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
   * Four or five options. The real exam used four distractors through 2023 and
   * five from 2024 on, so both shapes must validate.
   */
  answers: z.array(AnswerSchema).min(4).max(5),
  correct: AnswerKeySchema,

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
