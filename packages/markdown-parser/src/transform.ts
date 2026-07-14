/**
 * MDAST → Knowledge Objects.
 *
 * The one place where a Markdown node becomes an educational object. Both
 * lessons and concepts run through it, so a directive behaves identically
 * wherever it is written.
 *
 * Nothing here renders, styles, or decides what content *means* — it decides
 * only what shape the content has.
 */
import type { List, Paragraph, PhrasingContent, RootContent, Table } from 'mdast';
import { toString as mdastToString } from 'mdast-util-to-string';

import {
  conceptLookupKeys,
  DIAGNOSTIC_CODES,
  IdGenerator,
  isDirective,
  type Block,
  type Diagnostic,
  type Inline,
  type Severity,
} from '@cyberatlas/core';

/** Everything the transform needs to turn one file into blocks. */
export interface TransformContext {
  /** Path reported in diagnostics. */
  readonly file: string;
  /** Scopes generated block ids, so they are stable across rebuilds. */
  readonly ids: IdGenerator;
  /**
   * Slugified concept title or alias → canonical concept slug.
   * `[[מרחב הסייבר]]` and `[[Cyberspace]]` must land on the same concept.
   */
  readonly concepts: ReadonlyMap<string, string>;
  /** File name → vault-relative path, e.g. "CIA Triangle.png" → "media/CIA Triangle.png". */
  readonly assets: ReadonlyMap<string, string>;
  /** Collected, never thrown. One pass fixes a whole file. */
  readonly diagnostics: Diagnostic[];
  /** Concept slugs this file links to, accumulated as we go. */
  readonly referenced: Set<string>;
}

export function createTransformContext(
  file: string,
  scope: string,
  concepts: ReadonlyMap<string, string>,
  assets: ReadonlyMap<string, string>,
  diagnostics: Diagnostic[],
): TransformContext {
  return {
    file,
    ids: new IdGenerator(scope),
    concepts,
    assets,
    diagnostics,
    referenced: new Set<string>(),
  };
}

/* ------------------------------------------------------------------ *
 * Diagnostics
 * ------------------------------------------------------------------ */

interface Positioned {
  readonly position?: { readonly start: { line: number; column: number } } | undefined;
}

export function report(
  ctx: TransformContext,
  severity: Severity,
  code: string,
  message: string,
  node?: Positioned,
): void {
  ctx.diagnostics.push({
    severity,
    file: ctx.file,
    line: node?.position?.start.line ?? null,
    column: node?.position?.start.column ?? null,
    message,
    code,
  });
}

/* ------------------------------------------------------------------ *
 * Concept resolution
 * ------------------------------------------------------------------ */

/**
 * A concept as written → the one slug that owns it, or undefined if the vault
 * holds no such concept.
 *
 * Every path that turns a written name into a concept goes through here —
 * `[[wiki-links]]`, a quiz's `concepts:` list, a card's, and a concept's own
 * `related:`. They must agree: a name that resolves in a lesson and fails in a
 * quiz would put an edge in the graph that the lesson page cannot show.
 */
export function resolveConcept(
  name: string,
  concepts: ReadonlyMap<string, string>,
): string | undefined {
  for (const key of conceptLookupKeys(name)) {
    const canonical = concepts.get(key);
    if (canonical !== undefined) return canonical;
  }
  return undefined;
}

/* ------------------------------------------------------------------ *
 * Inline content
 * ------------------------------------------------------------------ */

/** `[[Firewall]]` or `[[Firewall|חומת אש]]`. */
const WIKI_LINK = /(?<!!)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/**
 * `![[CIA Triangle.png]]` or `![[CIA Triangle.png|כיתוב]]` — an asset that
 * lives in the vault. This is the only way content points at a real file:
 * the author names something `content/media` already holds, and the build
 * fails if it does not.
 */
const ASSET_EMBED = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/**
 * Split raw text into plain runs and concept references.
 *
 * A link to a concept that does not exist is an error, not a dead link a
 * student discovers by clicking it.
 */
function splitWikiLinks(value: string, ctx: TransformContext, node: Positioned): Inline[] {
  const out: Inline[] = [];
  let cursor = 0;

  for (const match of value.matchAll(WIKI_LINK)) {
    const [raw, target = '', alias] = match;
    const start = match.index;

    if (start > cursor) {
      out.push({ type: 'text', value: value.slice(cursor, start) });
    }
    cursor = start + raw.length;

    const canonical = resolveConcept(target, ctx.concepts);

    if (canonical === undefined) {
      report(
        ctx,
        'error',
        DIAGNOSTIC_CODES.MISSING_CONCEPT,
        `Concept "${target}" does not exist in content/concepts.`,
        node,
      );
      // Degrade to plain text rather than emitting a reference that points nowhere.
      out.push({ type: 'text', value: alias ?? target });
      continue;
    }

    ctx.referenced.add(canonical);
    out.push({
      id: ctx.ids.next('concept-reference'),
      type: 'concept-reference',
      target: canonical,
      label: alias ?? target,
    });
  }

  if (cursor < value.length) {
    out.push({ type: 'text', value: value.slice(cursor) });
  }
  return out;
}

/**
 * Phrasing content → Inline objects.
 *
 * `strong`, `emphasis` and `inlineCode` flatten to their text: the Inline
 * schema is deliberately shallow, because a bold concept link inside an
 * italic caption is presentation, not knowledge.
 */
export function inlinesFrom(
  nodes: readonly PhrasingContent[],
  ctx: TransformContext,
): Inline[] {
  const out: Inline[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case 'text':
        out.push(...splitWikiLinks(node.value, ctx, node));
        break;
      case 'strong':
        out.push({ type: 'strong', value: mdastToString(node) });
        break;
      case 'emphasis':
        out.push({ type: 'emphasis', value: mdastToString(node) });
        break;
      case 'inlineCode':
        out.push({ type: 'inline-code', value: node.value });
        break;
      case 'break':
        out.push({ type: 'text', value: '\n' });
        break;
      case 'link':
        // Markdown links are not concept links. They carry no graph meaning,
        // so only their text survives into the Knowledge Object.
        out.push(...inlinesFrom(node.children, ctx));
        break;
      case 'html':
        report(
          ctx,
          'error',
          DIAGNOSTIC_CODES.EMBEDDED_HTML,
          'Educational content may not contain HTML.',
          node,
        );
        break;
      default:
        out.push({ type: 'text', value: mdastToString(node) });
    }
  }

  return out;
}

/**
 * `**bold**` / `*italic*` → the words themselves.
 *
 * These fields are `string` by schema, so whatever comes out of here is what a
 * student literally sees. Leaving the markers in would print asterisks on the
 * screen — and 132 of the vault's 218 explanations use them. Emphasis is a
 * presentational claim about text, and a plain-text field cannot carry one;
 * the sentence reads correctly without it.
 */
function stripEmphasis(value: string): string {
  return value
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1');
}

/**
 * Raw text → plain text, with `[[links]]` resolved.
 *
 * A quiz prompt and a flashcard face are `string` by schema, not `Inline[]`:
 * a question is *read*, not walked as a block tree. The links inside still
 * have to mean something, though — so they resolve exactly as they do in a
 * lesson (a link to a concept that does not exist is still an error, not a
 * dead link a student finds), and the graph edge is still recorded. Only the
 * rendered form flattens, down to the label the author wrote.
 */
export function resolveText(value: string, ctx: TransformContext, node?: Positioned): string {
  const resolved = splitWikiLinks(value, ctx, node ?? {})
    .map((inline) => (inline.type === 'concept-reference' ? inline.label : inline.value))
    .join('');

  return stripEmphasis(resolved);
}

/**
 * Collect the inline content of a directive body.
 *
 * A body with several paragraphs keeps its breaks: the paragraphs are joined
 * by a blank-line text run, which the renderer honours with `pre-line`. A
 * definition and a three-paragraph summary are both one Knowledge Object.
 */
function bodyInlines(nodes: readonly RootContent[], ctx: TransformContext): Inline[] {
  const out: Inline[] = [];

  for (const node of nodes) {
    if (node.type !== 'paragraph') continue;
    if (out.length > 0) out.push({ type: 'text', value: '\n\n' });
    out.push(...inlinesFrom(node.children, ctx));
  }

  return out;
}

/** The list items of an `objectives` / `keypoints` / `references` body. */
function bodyItems(nodes: readonly RootContent[], ctx: TransformContext): string[] {
  const list = nodes.find((n): n is List => n.type === 'list');
  if (!list) return [];

  // Items are plain strings by schema, so any `[[link]]` inside one is text.
  // Record the reference anyway — the graph must not lose an edge to layout.
  return list.children.map((item) => {
    const text = mdastToString(item).trim();
    for (const match of text.matchAll(WIKI_LINK)) {
      const canonical = resolveConcept(match[1] ?? '', ctx.concepts);
      if (canonical !== undefined) ctx.referenced.add(canonical);
    }
    return text.replaceAll(WIKI_LINK, (_m, target: string, alias?: string) => alias ?? target);
  });
}

/* ------------------------------------------------------------------ *
 * Directives
 * ------------------------------------------------------------------ */

/** The shape remark-directive produces. Narrowed structurally, not by import. */
interface DirectiveNode {
  readonly type: 'containerDirective' | 'leafDirective' | 'textDirective';
  readonly name: string;
  readonly attributes?: Record<string, string | null | undefined> | null | undefined;
  readonly children: RootContent[];
  readonly position?: { readonly start: { line: number; column: number } } | undefined;
}

function isDirectiveNode(node: RootContent): node is RootContent & DirectiveNode {
  return (
    node.type === 'containerDirective' ||
    node.type === 'leafDirective' ||
    node.type === 'textDirective'
  );
}

/** `question: … / answer: …`, the body shape of a selfcheck. */
const SELFCHECK = /question:\s*([\s\S]*?)\n\s*answer:\s*([\s\S]*)/i;

/* ------------------------------------------------------------------ *
 * Media assets
 * ------------------------------------------------------------------ */

/** A self-contained HTML page, rendered inside a sandboxed iframe. */
const HTML_EXTENSIONS = new Set(['html', 'htm']);
/** A video file the browser plays natively. */
const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'mov', 'm4v']);

/** The media variant a vault file renders as, decided by its extension. */
function variantOfFile(file: string): 'animation' | 'video' | 'image' {
  const ext = file.slice(file.lastIndexOf('.') + 1).toLowerCase();
  if (HTML_EXTENSIONS.has(ext)) return 'animation';
  if (VIDEO_EXTENSIONS.has(ext)) return 'video';
  return 'image';
}

/** Which src files each media directive may name. `diagram` and `image` share image files. */
function directiveAcceptsFile(directive: string, file: string): boolean {
  const variant = variantOfFile(file);
  if (variant === 'image') return directive === 'image' || directive === 'diagram';
  return directive === variant;
}

/**
 * Resolve a media directive's `src` attribute to a vault-relative path.
 *
 * The author names a file, never a path — same contract as `![[embeds]]`.
 * A file the vault does not hold is an error, and so is a file the directive
 * cannot render (`:::video` pointing at an .html): both would ship a frame
 * that shows nothing.
 */
function resolveMediaSrc(
  node: DirectiveNode,
  ctx: TransformContext,
): { src: string | null; height: number | null; width: number | null } | null {
  const file = node.attributes?.src?.trim();
  const rawHeight = node.attributes?.height?.trim();
  const rawWidth = node.attributes?.width?.trim();

  let height: number | null = null;
  if (rawHeight) {
    height = Number.parseInt(rawHeight, 10);
    if (Number.isNaN(height) || height <= 0) {
      report(
        ctx,
        'error',
        DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
        `":::${node.name}" height must be a positive number of pixels, got "${rawHeight}".`,
        node,
      );
      return null;
    }
  }

  let width: number | null = null;
  if (rawWidth) {
    width = Number.parseInt(rawWidth, 10);
    if (Number.isNaN(width) || width <= 0) {
      report(
        ctx,
        'error',
        DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
        `":::${node.name}" width must be a positive number of pixels, got "${rawWidth}".`,
        node,
      );
      return null;
    }
  }

  if (!file) return { src: null, height, width };

  const path = ctx.assets.get(file);
  if (path === undefined) {
    report(
      ctx,
      'error',
      DIAGNOSTIC_CODES.MISSING_ASSET,
      `Asset "${file}" is not in the vault. Put it in content/media.`,
      node,
    );
    return null;
  }

  if (!directiveAcceptsFile(node.name, file)) {
    report(
      ctx,
      'error',
      DIAGNOSTIC_CODES.MEDIA_MISMATCH,
      `":::${node.name}" cannot render "${file}" — use ":::${variantOfFile(file)}" for this file type.`,
      node,
    );
    return null;
  }

  return { src: path, height, width };
}

function directiveToBlock(node: DirectiveNode, ctx: TransformContext): Block | null {
  const { name } = node;

  if (!isDirective(name)) {
    report(
      ctx,
      'error',
      DIAGNOSTIC_CODES.UNKNOWN_DIRECTIVE,
      `Unknown directive ":::${name}". See packages/core/src/directives.ts.`,
      node,
    );
    return null;
  }

  switch (name) {
    case 'definition':
      return {
        id: ctx.ids.next('definition'),
        type: 'definition',
        concept: node.attributes?.concept ?? null,
        children: bodyInlines(node.children, ctx),
      };

    case 'example':
      return {
        id: ctx.ids.next('example'),
        type: 'example',
        children: bodyInlines(node.children, ctx),
      };

    case 'analogy':
      return {
        id: ctx.ids.next('analogy'),
        type: 'analogy',
        children: bodyInlines(node.children, ctx),
      };

    case 'important':
    case 'warning':
    case 'tip':
      return {
        id: ctx.ids.next('callout'),
        type: 'callout',
        variant: name,
        children: bodyInlines(node.children, ctx),
      };

    case 'diagram':
    case 'image':
    case 'animation':
    case 'video': {
      const description = mdastToString(node as unknown as RootContent).trim();
      if (description === '') {
        report(
          ctx,
          'error',
          DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
          `":::${name}" must describe what should be shown.`,
          node,
        );
        return null;
      }
      const resolved = resolveMediaSrc(node, ctx);
      if (resolved === null) return null;
      return {
        id: ctx.ids.next('media'),
        type: 'media',
        variant: name,
        description,
        // Without src, the content only describes — an asset may be produced
        // later. With src, it names a file the vault already holds.
        src: resolved.src,
        alt: null,
        height: resolved.height,
        width: resolved.width,
      };
    }

    case 'objectives':
      return {
        id: ctx.ids.next('objectives'),
        type: 'objectives',
        items: bodyItems(node.children, ctx),
      };

    case 'keypoints':
      return {
        id: ctx.ids.next('keypoints'),
        type: 'keypoints',
        items: bodyItems(node.children, ctx),
      };

    case 'references':
      return {
        id: ctx.ids.next('references'),
        type: 'references',
        items: bodyItems(node.children, ctx),
      };

    case 'selfcheck': {
      const raw = mdastToString(node as unknown as RootContent).trim();
      const match = SELFCHECK.exec(raw);
      if (!match) {
        report(
          ctx,
          'error',
          DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
          '":::selfcheck" must contain a "question:" line and an "answer:" line.',
          node,
        );
        return null;
      }
      return {
        id: ctx.ids.next('selfcheck'),
        type: 'selfcheck',
        question: (match[1] ?? '').trim(),
        answer: (match[2] ?? '').trim(),
      };
    }

    case 'summary':
      return {
        id: ctx.ids.next('summary'),
        type: 'summary',
        children: bodyInlines(node.children, ctx),
      };

    case 'quiz':
    case 'flashcards': {
      const ref = node.attributes?.ref;
      if (!ref) {
        report(
          ctx,
          'error',
          DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
          `":::${name}" requires a ref attribute, e.g. :::${name}{ref="cyberspace-quiz"}.`,
          node,
        );
        return null;
      }
      return name === 'quiz'
        ? { id: ctx.ids.next('quiz-reference'), type: 'quiz-reference', ref }
        : { id: ctx.ids.next('flashcards-reference'), type: 'flashcards-reference', ref };
    }
  }
}

/* ------------------------------------------------------------------ *
 * Blocks
 * ------------------------------------------------------------------ */

function tableToBlock(node: Table, ctx: TransformContext): Block {
  const [head, ...body] = node.children;
  return {
    id: ctx.ids.next('table'),
    type: 'table',
    headers: (head?.children ?? []).map((cell) => mdastToString(cell).trim()),
    rows: body.map((row) => row.children.map((cell) => mdastToString(cell).trim())),
  };
}

/**
 * Pull every `![[asset]]` embed out of a paragraph.
 *
 * An embed is a *block* — a figure the reader looks at — even when it was
 * written on the same line as prose. It is lifted out and the surrounding
 * text stays a paragraph, so the Knowledge Object tree never has to hold an
 * image inside a sentence.
 */
function extractEmbeds(node: Paragraph, ctx: TransformContext): { media: Block[]; prose: Paragraph } {
  const media: Block[] = [];

  const children = node.children.map((child) => {
    if (child.type !== 'text') return child;

    const stripped = child.value.replaceAll(ASSET_EMBED, (_m, file: string, caption?: string) => {
      const path = ctx.assets.get(file.trim());

      if (path === undefined) {
        report(
          ctx,
          'error',
          DIAGNOSTIC_CODES.MISSING_ASSET,
          `Asset "${file.trim()}" is not in the vault. Put it in content/media.`,
          node,
        );
        return '';
      }

      media.push({
        id: ctx.ids.next('media'),
        type: 'media',
        variant: variantOfFile(file.trim()),
        description: caption?.trim() ?? file.trim(),
        src: path,
        alt: caption?.trim() ?? null,
        height: null,
        width: null,
      });
      return '';
    });

    return { ...child, value: stripped };
  });

  return { media, prose: { ...node, children } };
}

/** One Markdown node → the Knowledge Objects it produces, in order. */
export function blocksFromNode(node: RootContent, ctx: TransformContext): Block[] {
  if (node.type === 'paragraph') {
    const { media, prose } = extractEmbeds(node, ctx);
    const inlines = inlinesFrom(prose.children, ctx);
    const hasProse = inlines.some((i) => i.type !== 'text' || i.value.trim() !== '');

    const out: Block[] = [];
    if (hasProse) {
      out.push({ id: ctx.ids.next('paragraph'), type: 'paragraph', children: inlines });
    }
    out.push(...media);
    return out;
  }

  const block = blockFrom(node, ctx);
  return block ? [block] : [];
}

/** One Markdown node → zero or one Knowledge Object. */
export function blockFrom(node: RootContent, ctx: TransformContext): Block | null {
  if (isDirectiveNode(node)) return directiveToBlock(node, ctx);

  switch (node.type) {
    case 'paragraph':
      return {
        id: ctx.ids.next('paragraph'),
        type: 'paragraph',
        children: inlinesFrom(node.children, ctx),
      };

    case 'heading': {
      // `#` is the lesson title and `##` opens a section — both are consumed
      // by the caller. Only `###`/`####` survive as blocks inside a section.
      const depth = node.depth <= 4 ? node.depth : 4;
      return {
        id: ctx.ids.next('heading'),
        type: 'heading',
        depth: depth as 1 | 2 | 3 | 4,
        children: inlinesFrom(node.children, ctx),
      };
    }

    case 'list':
      return {
        id: ctx.ids.next('list'),
        type: 'list',
        ordered: node.ordered ?? false,
        items: node.children.map((item) => {
          const inlines: Inline[] = [];
          for (const child of item.children) {
            if (child.type === 'paragraph') inlines.push(...inlinesFrom(child.children, ctx));
          }
          return inlines;
        }),
      };

    case 'table':
      return tableToBlock(node, ctx);

    case 'code':
      return {
        id: ctx.ids.next('code'),
        type: 'code',
        lang: node.lang ?? null,
        value: node.value,
      };

    case 'html':
      report(
        ctx,
        'error',
        DIAGNOSTIC_CODES.EMBEDDED_HTML,
        'Educational content may not contain HTML.',
        node,
      );
      return null;

    // A rule is a visual separator. Presentation is not the content's business.
    case 'thematicBreak':
      return null;

    case 'blockquote':
      return {
        id: ctx.ids.next('paragraph'),
        type: 'paragraph',
        children: blockquoteInlines(node.children, ctx),
      };

    default:
      return null;
  }
}

function blockquoteInlines(nodes: readonly RootContent[], ctx: TransformContext): Inline[] {
  const out: Inline[] = [];
  for (const node of nodes) {
    if (node.type === 'paragraph') out.push(...inlinesFrom(node.children, ctx));
  }
  return out;
}

export function blocksFrom(nodes: readonly RootContent[], ctx: TransformContext): Block[] {
  return nodes.flatMap((node) => blocksFromNode(node, ctx));
}
