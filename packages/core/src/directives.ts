/**
 * The Learning DSL directive vocabulary.
 *
 * This is the ONLY place the directive set is defined. The parser validates
 * against it, the renderer switches on it, the authoring skills document it.
 * Nothing else in the repo may declare what a directive is.
 *
 * Adding a directive is a three-step change, in this order:
 *   1. add it here
 *   2. teach the parser to build its Knowledge Object
 *   3. teach the renderer to render it
 */

/** Blocks that introduce or explain knowledge. */
export const SEMANTIC_DIRECTIVES = [
  'objectives',
  'definition',
  'example',
  'analogy',
] as const;

/** Blocks that call out something the student must notice. */
export const CALLOUT_DIRECTIVES = ['important', 'warning', 'tip'] as const;

/**
 * Blocks that *describe* a visual rather than embedding one.
 * Content never ships binary assets or ASCII art — it describes intent,
 * and the renderer decides how (or whether) to draw it.
 */
export const MEDIA_DIRECTIVES = ['diagram', 'image', 'animation', 'video'] as const;

/** Blocks that point at a Knowledge Object owned by another file. */
export const REFERENCE_DIRECTIVES = ['quiz', 'flashcards'] as const;

/** Blocks that close out a section or lesson. */
export const CLOSING_DIRECTIVES = [
  'selfcheck',
  'summary',
  'keypoints',
  'references',
] as const;

/** Every directive the parser will accept. Anything else is a hard error. */
export const DIRECTIVES = [
  ...SEMANTIC_DIRECTIVES,
  ...CALLOUT_DIRECTIVES,
  ...MEDIA_DIRECTIVES,
  ...REFERENCE_DIRECTIVES,
  ...CLOSING_DIRECTIVES,
] as const;

export type Directive = (typeof DIRECTIVES)[number];

const DIRECTIVE_SET: ReadonlySet<string> = new Set<string>(DIRECTIVES);

export function isDirective(name: string): name is Directive {
  return DIRECTIVE_SET.has(name);
}

/**
 * Directives whose body is a reference key, not prose.
 * `:::quiz{ref="lesson-01-quiz"}` carries no teaching content of its own.
 */
export function isReferenceDirective(name: Directive): boolean {
  return (REFERENCE_DIRECTIVES as readonly string[]).includes(name);
}

/**
 * Directives that describe a visual instead of embedding one.
 * The renderer is free to draw, stub, or omit these.
 */
export function isMediaDirective(name: Directive): boolean {
  return (MEDIA_DIRECTIVES as readonly string[]).includes(name);
}
