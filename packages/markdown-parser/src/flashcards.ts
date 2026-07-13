/**
 * flashcards.md → Flashcard[].
 *
 * A far smaller DSL than the quiz: `## Card` opens one card, and the body is
 * three fields. Cards carry no author-supplied id, so ids are generated —
 * deterministically, scoped by the deck, because a card's id is what progress
 * is tracked against and it must survive a rebuild unchanged.
 *
 *   ## Card
 *   front: …
 *   back: …
 *   concepts:
 *     - Cyberspace
 */
import {
  DIAGNOSTIC_CODES,
  FlashcardSchema,
  slugify,
  type Diagnostic,
  type Flashcard,
} from '@cyberatlas/core';

import { readFrontmatter } from './frontmatter.js';
import { createTransformContext, report, resolveText } from './transform.js';
import type { FlashcardsParseResult, ParseContext } from './types.js';

const CARD = /^##\s+Card\s*$/;
const FIELD = /^(front|back|concepts)\s*:\s*(.*)$/;
const LIST_ITEM = /^\s+-\s+(.+)$/;

export function parseFlashcards(source: string, ctx: ParseContext): FlashcardsParseResult {
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

  if (id === '') {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: 'Flashcards frontmatter must declare an "id".',
      code: DIAGNOSTIC_CODES.INVALID_FRONTMATTER,
    });
    return { data: null, diagnostics };
  }

  const lines = content.split('\n');
  const offset = source.split('\n').length - lines.length;

  const tctx = createTransformContext(file, id, ctx.concepts, ctx.assets, diagnostics);

  const starts: number[] = [];
  lines.forEach((line, i) => {
    if (CARD.test(line)) starts.push(i);
  });

  const cards: Flashcard[] = [];

  starts.forEach((start, i) => {
    const end = starts[i + 1] ?? lines.length;
    const line = start + offset + 1;
    const at = { position: { start: { line, column: 1 } } };

    const fields = new Map<string, string>();
    const concepts: string[] = [];
    let listKey: string | null = null;

    for (const raw of lines.slice(start + 1, end)) {
      const field = FIELD.exec(raw);
      if (field) {
        const [, key = '', value = ''] = field;
        fields.set(key, value.trim());
        listKey = key;
        continue;
      }

      const item = LIST_ITEM.exec(raw);
      if (item && listKey === 'concepts') {
        concepts.push((item[1] ?? '').trim());
        continue;
      }

      // A wrapped `front:`/`back:` value continues the field above it.
      if (raw.trim() !== '' && listKey !== null && listKey !== 'concepts') {
        fields.set(listKey, `${fields.get(listKey) ?? ''} ${raw.trim()}`.trim());
      }
    }

    const candidate = {
      // Positional, and stable across rebuilds: `cyberspace-flashcards/card-001`.
      id: tctx.ids.next('card'),
      type: 'flashcard',
      front: resolveText(fields.get('front') ?? '', tctx, at),
      back: resolveText(fields.get('back') ?? '', tctx, at),
      concepts: [...new Set(concepts.map((name) => resolveConceptName(name, tctx, line)))].sort(),
    };

    const parsed = FlashcardSchema.safeParse(candidate);

    if (!parsed.success) {
      diagnostics.push({
        severity: 'error',
        file,
        line,
        column: 1,
        message: `Card ${i + 1} is malformed: ${parsed.error.issues
          .map((issue) => `${issue.path.join('.')} ${issue.message}`)
          .join('; ')}`,
        code: DIAGNOSTIC_CODES.MALFORMED_QUIZ,
      });
      return;
    }

    cards.push(parsed.data as Flashcard);
  });

  if (cards.length === 0) {
    diagnostics.push({
      severity: 'error',
      file,
      line: 1,
      column: 1,
      message: 'Flashcards file has no cards.',
      code: DIAGNOSTIC_CODES.MALFORMED_QUIZ,
    });
    return { data: null, diagnostics };
  }

  return { data: cards, diagnostics };
}

/** Same rule as the quiz: an unindexed name warns, it does not fail the vault. */
function resolveConceptName(
  name: string,
  ctx: ReturnType<typeof createTransformContext>,
  line: number,
): string {
  const key = slugify(name);
  const canonical = ctx.concepts.get(key);

  if (canonical === undefined) {
    report(ctx, 'warning', DIAGNOSTIC_CODES.MISSING_CONCEPT, `Card lists concept "${name}", which is not in content/concepts.`, {
      position: { start: { line, column: 1 } },
    });
    return key;
  }
  return canonical;
}
