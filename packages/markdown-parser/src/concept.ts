/**
 * concept file → Concept.
 *
 * A concept owns its definition. Lessons link to it and never restate it,
 * so this parser is also what makes `[[Firewall]]` resolvable at all.
 */
import matter from 'gray-matter';

import {
  ConceptFrontmatterSchema,
  ConceptSchema,
  DIAGNOSTIC_CODES,
  slugify,
  type Block,
  type Concept,
  type ConceptFrontmatter,
  type Definition,
  type Diagnostic,
} from '@cyberatlas/core';

import { toMdast } from './processor.js';
import { blocksFromNode, createTransformContext, resolveConcept } from './transform.js';
import type { ConceptParseResult, ParseContext } from './types.js';

/** The two explanation passes every concept makes, keyed by their headings. */
const SIMPLE_HEADINGS = ['הסבר פשוט'];
const TECHNICAL_HEADINGS = ['הסבר טכני'];

export function parseConcept(source: string, ctx: ParseContext): ConceptParseResult {
  const diagnostics: Diagnostic[] = [];
  const { data, content } = matter(source);

  const fm = ConceptFrontmatterSchema.safeParse(data);
  if (!fm.success) {
    diagnostics.push({
      severity: 'error',
      file: ctx.file,
      line: 1,
      column: 1,
      message: `Invalid frontmatter: ${fm.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`,
      code: DIAGNOSTIC_CODES.INVALID_FRONTMATTER,
    });
    return { data: null, diagnostics };
  }

  const frontmatter = fm.data;
  const tctx = createTransformContext(
    ctx.file,
    frontmatter.slug,
    ctx.concepts,
    ctx.assets,
    diagnostics,
  );

  let definition: Definition | null = null;
  const simple: Block[] = [];
  const technical: Block[] = [];
  const examples: Block[] = [];

  // Everything before "הסבר פשוט" is the definition's neighbourhood; after it,
  // prose accumulates into whichever pass is currently open.
  let bucket: Block[] = technical;

  for (const node of toMdast(content).children) {
    if (node.type === 'heading' && node.depth === 1) continue;
    if (node.type === 'thematicBreak') continue;

    if (node.type === 'heading' && node.depth === 2) {
      const title = node.children
        .map((c) => ('value' in c && typeof c.value === 'string' ? c.value : ''))
        .join('')
        .trim();

      if (SIMPLE_HEADINGS.includes(title)) bucket = simple;
      else if (TECHNICAL_HEADINGS.includes(title)) bucket = technical;
      else bucket = technical;
      continue;
    }

    for (const block of blocksFromNode(node, tctx)) {
      if (block.type === 'definition') {
        if (definition === null) {
          definition = { ...block, concept: frontmatter.title };
        } else {
          diagnostics.push({
            severity: 'warning',
            file: ctx.file,
            line: null,
            column: null,
            message: 'A concept has more than one definition; only the first is used.',
            code: DIAGNOSTIC_CODES.DUPLICATE_ID,
          });
        }
        continue;
      }

      if (block.type === 'example') {
        examples.push(block);
        continue;
      }

      bucket.push(block);
    }
  }

  if (definition === null) {
    diagnostics.push({
      severity: 'error',
      file: ctx.file,
      line: 1,
      column: 1,
      message: 'A concept must contain a :::definition block — it is what the concept owns.',
      code: DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
    });
    return { data: null, diagnostics };
  }

  const concept = ConceptSchema.safeParse({
    id: frontmatter.id,
    type: 'concept',
    frontmatter,
    definition,
    simpleExplanation: simple,
    technicalExplanation: technical,
    examples,
    related: resolveRelated(frontmatter, ctx, diagnostics),
    appearsIn: [], // computed by the build, never authored
  } satisfies Record<string, unknown> as unknown);

  if (!concept.success) {
    diagnostics.push({
      severity: 'error',
      file: ctx.file,
      line: null,
      column: null,
      message: `Concept failed schema validation: ${concept.error.issues
        .map((i) => `${i.path.join('.')} ${i.message}`)
        .join('; ')}`,
      code: DIAGNOSTIC_CODES.MISSING_REQUIRED_FIELD,
    });
    return { data: null, diagnostics };
  }

  return { data: concept.data as Concept, diagnostics };
}

/**
 * `related:` names → the slugs they actually own.
 *
 * A name is resolved against the concept index, exactly as a `[[link]]` is,
 * rather than being slugified and hoped for: `related: [Perimeter]` slugifies
 * to `perimeter` whether or not any such concept exists, and an edge to a
 * concept that does not exist is a node the graph invents. A name that resolves
 * to nothing is dropped and reported — the graph is derived from the vault, so
 * it may only contain what the vault holds.
 *
 * Self-references are dropped too. A concept related to itself is a loop in the
 * graph and tells a student nothing.
 */
function resolveRelated(
  frontmatter: ConceptFrontmatter,
  ctx: ParseContext,
  diagnostics: Diagnostic[],
): string[] {
  const slugs = new Set<string>();

  for (const name of frontmatter.related) {
    const canonical = resolveConcept(name, ctx.concepts);

    if (canonical === undefined) {
      diagnostics.push({
        severity: 'warning',
        file: ctx.file,
        line: null,
        column: null,
        message: `Related concept "${name}" does not exist in content/concepts; the edge is dropped.`,
        code: DIAGNOSTIC_CODES.MISSING_CONCEPT,
      });
      continue;
    }

    if (canonical !== frontmatter.slug) slugs.add(canonical);
  }

  return [...slugs].sort();
}

/**
 * Read a concept's frontmatter without parsing its body.
 *
 * The build needs this: concepts link to each other, so the full parse of any
 * concept already requires the index of every concept. Frontmatter alone is
 * enough to build that index, and it costs one YAML parse.
 */
export function readConceptFrontmatter(source: string): ConceptFrontmatter | null {
  const { data } = matter(source);
  const fm = ConceptFrontmatterSchema.safeParse(data);
  return fm.success ? fm.data : null;
}

/**
 * Every key that may appear inside `[[…]]` and must land on this concept:
 * its slug, its title, and each alias.
 */
export function conceptKeys(frontmatter: ConceptFrontmatter): string[] {
  const { slug, title, aliases } = frontmatter;
  return [slug, title, ...aliases].map(slugify).filter((k) => k !== '');
}
