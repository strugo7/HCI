/**
 * quiz.md → Quiz.
 *
 * The quiz DSL is line-oriented, not Markdown-structured: `Correct: A` is a
 * field and `A. …` is an answer, not an ordered list. Running it through
 * remark would turn the answer block into a list and lose the keys, so this
 * reads lines directly and uses the shared transform only for what it is
 * actually good at — resolving `[[concept]]` links against the vault.
 *
 *   ## Question
 *   id: … / type: … / concepts: …    ← field block
 *   <prompt>
 *   ### Scenario                     ← optional
 *   ### Answers
 *   A. … through E. …
 *   Correct: / Explanation: / Learning Objective: / Misconception:
 */
import {
  DIAGNOSTIC_CODES,
  QuestionSchema,
  QuizSchema,
  slugify,
  type Answer,
  type Diagnostic,
  type Quiz,
} from '@cyberatlas/core';

import { readFrontmatter } from './frontmatter.js';
import { createTransformContext, report, resolveText, type TransformContext } from './transform.js';
import type { ParseContext, QuizParseResult } from './types.js';

/** The field block that opens a question. Anything else ends it. */
const FIELD = /^(id|type|difficulty|cognitive|estimatedTime|points|concepts)\s*:\s*(.*)$/;
/** A `concepts:` entry, indented under its key. */
const LIST_ITEM = /^\s+-\s+(.+)$/;
/** `## Question` — opens one question. */
const QUESTION = /^##\s+Question\s*$/;
/** `### Scenario` / `### Answers`. */
const SECTION = /^###\s+(Scenario|Answers)\s*$/;
/** `A. …` — an answer, keyed. */
const ANSWER = /^([A-E])\.\s+(.+)$/;
/** The fields that close a question out, after the answers. */
const TAIL = /^(Correct|Explanation|Learning Objective|Misconception)\s*:\s*(.*)$/;
/** A `---` rule separates questions. It is presentation, not content. */
const RULE = /^-{3,}\s*$/;
/** `# …` — a title, used only as a fallback when frontmatter has none. */
const H1 = /^#\s+(.+)$/;

type TailKey = 'Correct' | 'Explanation' | 'Learning Objective' | 'Misconception';

/** Everything one `## Question` block yields, before it is validated. */
interface RawQuestion {
  readonly line: number;
  readonly fields: Map<string, string>;
  readonly concepts: string[];
  readonly prompt: string;
  readonly scenario: string;
  readonly answers: Answer[];
  readonly tail: Map<TailKey, string>;
}

/**
 * Lines → text, the way an author means it.
 *
 * A blank line starts a new paragraph; consecutive lines are one wrapped
 * sentence and join with a space. 34 prompts in the vault are hard-wrapped
 * mid-sentence, so joining on "\n" would put a break inside a question.
 */
function paragraphs(lines: readonly string[]): string {
  const out: string[] = [];
  let current: string[] = [];

  const flush = (): void => {
    if (current.length > 0) out.push(current.join(' '));
    current = [];
  };

  for (const line of lines) {
    if (line.trim() === '') flush();
    else current.push(line.trim());
  }
  flush();

  return out.join('\n\n');
}

/**
 * One question block → its raw parts.
 *
 * A small state machine, because the same line means different things in
 * different places: `Correct: A` is a field after the answers, but inside a
 * prompt it would be prose.
 */
function scanQuestion(lines: readonly string[], startLine: number): RawQuestion {
  const fields = new Map<string, string>();
  const concepts: string[] = [];
  const tail = new Map<TailKey, string>();
  const answers: Answer[] = [];
  const prompt: string[] = [];
  const scenario: string[] = [];

  type State = 'fields' | 'prompt' | 'scenario' | 'answers' | 'tail';
  let state: State = 'fields';
  let tailKey: TailKey | null = null;
  /** The key a `- item` continuation belongs to. Only `concepts` takes one. */
  let listKey: string | null = null;

  for (const line of lines) {
    if (RULE.test(line)) {
      // Ends whatever was open; nothing follows a rule but the next question.
      tailKey = null;
      continue;
    }

    const section = SECTION.exec(line);
    if (section) {
      state = section[1] === 'Scenario' ? 'scenario' : 'answers';
      continue;
    }

    if (state === 'fields') {
      const field = FIELD.exec(line);
      if (field) {
        const [, key = '', value = ''] = field;
        fields.set(key, value.trim());
        listKey = key;
        continue;
      }

      const item = LIST_ITEM.exec(line);
      if (item) {
        if (listKey === 'concepts') concepts.push((item[1] ?? '').trim());
        continue;
      }

      if (line.trim() === '') continue;

      // First line that is neither a field nor a list item: the prompt starts.
      state = 'prompt';
    }

    if (state === 'prompt') {
      prompt.push(line);
      continue;
    }

    if (state === 'scenario') {
      scenario.push(line);
      continue;
    }

    if (state === 'answers') {
      const answer = ANSWER.exec(line);
      if (answer) {
        const [, key = '', text = ''] = answer;
        answers.push({ key: key as Answer['key'], text: text.trim() });
        continue;
      }

      const closing = TAIL.exec(line);
      if (closing) {
        state = 'tail';
      } else {
        // A wrapped answer, not a new one: it continues the previous option.
        const last = answers.at(-1);
        if (last && line.trim() !== '') {
          answers[answers.length - 1] = { key: last.key, text: `${last.text} ${line.trim()}` };
        }
        continue;
      }
    }

    if (state === 'tail') {
      const closing = TAIL.exec(line);
      if (closing) {
        const [, key = '', value = ''] = closing;
        tailKey = key as TailKey;
        tail.set(tailKey, value.trim());
        continue;
      }
      // A wrapped field value continues the field above it.
      if (line.trim() !== '' && tailKey !== null) {
        tail.set(tailKey, `${tail.get(tailKey) ?? ''} ${line.trim()}`.trim());
      }
    }
  }

  return {
    line: startLine,
    fields,
    concepts,
    prompt: paragraphs(prompt),
    scenario: paragraphs(scenario),
    answers,
    tail,
  };
}

/**
 * A concept named in a `concepts:` list → its canonical slug.
 *
 * Unknown names warn rather than fail. A `[[link]]` is a thing a student can
 * click, so a broken one is an error; this list is metadata that feeds the
 * graph, and failing the whole vault gate over an unindexed name would block
 * content that is otherwise correct.
 */
function resolveConceptName(name: string, ctx: TransformContext, line: number): string {
  const key = slugify(name);
  const canonical = ctx.concepts.get(key);

  if (canonical === undefined) {
    report(ctx, 'warning', DIAGNOSTIC_CODES.MISSING_CONCEPT, `Question lists concept "${name}", which is not in content/concepts.`, {
      position: { start: { line, column: 1 } },
    });
    return key;
  }
  return canonical;
}

function number(value: string | undefined): number | undefined {
  if (value === undefined || value.trim() === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * `exactOptionalPropertyTypes` forbids writing `undefined` into an optional
 * field, so an absent value is *omitted* and the schema default applies.
 */
function withDefault<T>(key: string, value: T | undefined): Record<string, T> {
  return value === undefined ? {} : { [key]: value };
}

export function parseQuiz(
  source: string,
  ctx: ParseContext,
  /** Used only when the file declares no title of its own. */
  fallbackTitle?: string,
): QuizParseResult {
  const diagnostics: Diagnostic[] = [];
  const file = ctx.file;

  const { data, content, error } = readFrontmatter(source);

  if (error !== null) {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: `Invalid frontmatter: ${error}. A value containing ": " must be quoted.`,
      code: DIAGNOSTIC_CODES.INVALID_FRONTMATTER,
    });
    return { data: null, diagnostics };
  }

  const id = typeof data['id'] === 'string' ? data['id'] : '';
  const lesson = typeof data['lesson'] === 'string' ? data['lesson'] : '';

  if (id === '' || lesson === '') {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: 'Quiz frontmatter must declare an "id" and a "lesson".',
      code: DIAGNOSTIC_CODES.INVALID_FRONTMATTER,
    });
    return { data: null, diagnostics };
  }

  /* ---------------------------------------------------------------- *
   * Split into questions, keeping real line numbers for diagnostics.  *
   * ---------------------------------------------------------------- */
  const lines = content.split('\n');
  // gray-matter hands back the body only; add the frontmatter back so a
  // diagnostic points at the line the author actually has open.
  const offset = source.split('\n').length - lines.length;

  const starts: number[] = [];
  let heading = '';

  lines.forEach((line, i) => {
    if (QUESTION.test(line)) starts.push(i);
    else if (heading === '' && starts.length === 0) {
      const title = H1.exec(line);
      if (title) heading = (title[1] ?? '').trim();
    }
  });

  /* ---------------------------------------------------------------- *
   * A title is required by the schema, and 9 files do not carry one.  *
   * ---------------------------------------------------------------- */
  const declared = typeof data['title'] === 'string' ? data['title'].trim() : '';
  const title = declared || heading || fallbackTitle?.trim() || id;

  const questions: unknown[] = [];
  const referenced = new Set<string>();

  starts.forEach((start, i) => {
    const end = starts[i + 1] ?? lines.length;
    const startLine = start + offset + 1;
    const raw = scanQuestion(lines.slice(start + 1, end), startLine);

    // One transform context per question, so `referenced` is naturally scoped
    // to the question that did the referencing.
    const qid = raw.fields.get('id') ?? `${id}/question-${String(i + 1).padStart(3, '0')}`;
    const tctx = createTransformContext(file, qid, ctx.concepts, ctx.assets, diagnostics);
    const at = { position: { start: { line: startLine, column: 1 } } };

    const text = (value: string): string => resolveText(value, tctx, at);

    const prompt = text(raw.prompt);
    const scenario = text(raw.scenario);

    // The one authoring mistake this DSL invites: writing the question at the
    // end of the "### Scenario" block. The schema would just say "prompt is
    // empty", which does not tell the author where to put it.
    if (prompt === '' && scenario !== '') {
      diagnostics.push({
        severity: 'error',
        file,
        line: startLine,
        column: 1,
        message: `Question "${qid}" has no prompt. The question text goes above "### Scenario", not inside it.`,
        code: DIAGNOSTIC_CODES.MALFORMED_QUIZ,
      });
      return;
    }
    const explanation = text(raw.tail.get('Explanation') ?? '');
    const objective = text(raw.tail.get('Learning Objective') ?? '');
    const misconception = text(raw.tail.get('Misconception') ?? '');
    const correct = raw.tail.get('Correct') ?? '';

    const concepts = new Set(raw.concepts.map((name) => resolveConceptName(name, tctx, startLine)));
    // A `[[link]]` in the prompt or the explanation is an edge too — the graph
    // must not lose it just because the rendered text is flat.
    for (const slug of tctx.referenced) concepts.add(slug);
    for (const slug of concepts) referenced.add(slug);

    const candidate = {
      id: qid,
      type: 'question',
      lesson,
      prompt,
      scenario: scenario === '' ? null : scenario,
      diagram: null,
      answers: raw.answers.map((a) => ({ key: a.key, text: text(a.text) })),
      correct,
      explanation,
      objective,
      misconception: misconception === '' ? null : misconception,
      concepts: [...concepts].sort(),
      tags: [],
      ...withDefault('questionType', raw.fields.get('type')),
      ...withDefault('difficulty', raw.fields.get('difficulty')),
      ...withDefault('cognitive', raw.fields.get('cognitive')),
      ...withDefault('estimatedTime', number(raw.fields.get('estimatedTime'))),
      ...withDefault('points', number(raw.fields.get('points'))),
    };

    const parsed = QuestionSchema.safeParse(candidate);

    if (!parsed.success) {
      diagnostics.push({
        severity: 'error',
        file,
        line: startLine,
        column: 1,
        message: `Question "${qid}" is malformed: ${parsed.error.issues
          .map((issue) => `${issue.path.join('.')} ${issue.message}`)
          .join('; ')}`,
        code: DIAGNOSTIC_CODES.MALFORMED_QUIZ,
      });
      return;
    }

    // The answer key must name an option that exists — a quiz whose correct
    // answer is not on the page is worse than a quiz that fails to build.
    if (!parsed.data.answers.some((a) => a.key === parsed.data.correct)) {
      diagnostics.push({
        severity: 'error',
        file,
        line: startLine,
        column: 1,
        message: `Question "${qid}" marks "${parsed.data.correct}" correct, but has no answer "${parsed.data.correct}".`,
        code: DIAGNOSTIC_CODES.MALFORMED_QUIZ,
      });
      return;
    }

    questions.push(parsed.data);
  });

  if (questions.length === 0) {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: 'Quiz has no questions.',
      code: DIAGNOSTIC_CODES.MALFORMED_QUIZ,
    });
    return { data: null, diagnostics };
  }

  const quiz = QuizSchema.safeParse({ id, type: 'quiz', lesson, title, questions });

  if (!quiz.success) {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: `Quiz failed schema validation: ${quiz.error.issues
        .map((issue) => `${issue.path.join('.')} ${issue.message}`)
        .join('; ')}`,
      code: DIAGNOSTIC_CODES.MALFORMED_QUIZ,
    });
    return { data: null, diagnostics };
  }

  return { data: quiz.data as Quiz, diagnostics };
}
