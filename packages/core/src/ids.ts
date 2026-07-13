/**
 * Deterministic identity.
 *
 * Parsing the same file twice must produce byte-identical IDs, or content
 * diffs become unreadable and progress tracking breaks across rebuilds.
 * Nothing here may use randomness, time, or mutable module state.
 */

/**
 * Slugify a concept title into its canonical lookup key.
 *
 * Hebrew is preserved as-is — only Latin text is case-folded, since Hebrew
 * has no case. `[[Firewall]]` and `[[firewall]]` must resolve to one concept.
 */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_/]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Positional ID for a block that carries no author-supplied id.
 * Deterministic in (scope, type, index): `lesson-01/definition-003`.
 */
export function generateBlockId(scope: string, type: string, index: number): string {
  const n = String(index).padStart(3, '0');
  return `${scope}/${type}-${n}`;
}

/** Counts occurrences per type so repeated blocks get stable ordinals. */
export class IdGenerator {
  readonly #scope: string;
  readonly #counts = new Map<string, number>();

  constructor(scope: string) {
    this.#scope = scope;
  }

  next(type: string): string {
    const seen = this.#counts.get(type) ?? 0;
    const index = seen + 1;
    this.#counts.set(type, index);
    return generateBlockId(this.#scope, type, index);
  }
}
