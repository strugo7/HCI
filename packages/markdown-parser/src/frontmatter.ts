/**
 * Frontmatter, read without ever throwing.
 *
 * gray-matter throws a YAMLException on malformed frontmatter, which would
 * take the whole build down with a stack trace instead of a file and a line.
 * The parser's contract is the opposite: collect every problem, report it
 * against the file that caused it, and let the run finish.
 */
import matter from 'gray-matter';

export interface Frontmatter {
  readonly data: Record<string, unknown>;
  readonly content: string;
  /** The YAML error, if the block did not parse. */
  readonly error: string | null;
}

export function readFrontmatter(source: string): Frontmatter {
  try {
    const { data, content } = matter(source);
    return { data, content, error: null };
  } catch (error: unknown) {
    // A title like `title: שאלון — Dropper: הנשא` is the usual cause: an
    // unquoted scalar that contains ": " is not valid YAML.
    const message = error instanceof Error ? error.message.split('\n')[0] ?? 'invalid YAML' : 'invalid YAML';
    return { data: {}, content: stripFrontmatter(source), error: message };
  }
}

/** Drop the frontmatter block so the body can still be scanned for diagnostics. */
function stripFrontmatter(source: string): string {
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(source);
  return match ? source.slice(match[0].length) : source;
}
