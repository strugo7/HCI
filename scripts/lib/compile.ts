/**
 * Compile the vault.
 *
 * Two passes, and the order matters: concepts first, because a lesson cannot
 * be validated until we know which `[[links]]` are real. Neither pass stops
 * at the first failure — an author fixes a file in one go.
 *
 * Shared by `build-content` (which writes) and `validate-content` (which
 * doesn't), so CI checks exactly what the build ships.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import type { Concept, Diagnostic, Lesson } from '@cyberatlas/core';
import {
  conceptKeys,
  parseConcept,
  parseLesson,
  readConceptFrontmatter,
  type LessonBundle,
} from '@cyberatlas/markdown-parser';

export const ROOT = path.resolve(import.meta.dirname, '../..');
export const CONTENT_DIR = path.join(ROOT, 'content');

const LESSONS_DIR = path.join(CONTENT_DIR, 'lessons');
const CONCEPTS_DIR = path.join(CONTENT_DIR, 'concepts');
/** Directories an `![[embed]]` may name a file from, in search order. */
const ASSET_DIRS = ['media', 'assets'] as const;

export interface CompiledVault {
  readonly lessons: Lesson[];
  readonly concepts: Concept[];
  readonly diagnostics: Diagnostic[];
  /** Lesson directories that produced no Lesson at all. */
  readonly failed: string[];
  /** File name → vault-relative path, for every asset the vault holds. */
  readonly assets: ReadonlyMap<string, string>;
}

/**
 * Index the vault's assets by bare file name.
 *
 * Authors write `![[CIA Triangle.png]]`, never a path — the vault's directory
 * layout is not something educational content should have to know.
 */
async function indexAssets(): Promise<Map<string, string>> {
  const assets = new Map<string, string>();

  for (const dir of ASSET_DIRS) {
    let entries;
    try {
      entries = await readdir(path.join(CONTENT_DIR, dir), { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (!entry.isFile() || entry.name.startsWith('.')) continue;
      if (!assets.has(entry.name)) assets.set(entry.name, `${dir}/${entry.name}`);
    }
  }

  return assets;
}

async function readIfPresent(file: string): Promise<string | undefined> {
  try {
    return await readFile(file, 'utf8');
  } catch {
    return undefined;
  }
}

async function listDirs(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort();
}

async function listMarkdown(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)
    .sort();
}

export async function compileVault(): Promise<CompiledVault> {
  const diagnostics: Diagnostic[] = [];
  const assets = await indexAssets();

  /* ---------------------------------------------------------------- *
   * Pass 1 — the concept index, from frontmatter alone.               *
   *                                                                    *
   * Concepts link to one another, so nothing can be fully parsed until *
   * every concept is *known*. Frontmatter is enough to know them.      *
   * ---------------------------------------------------------------- */
  const conceptFiles = await listMarkdown(CONCEPTS_DIR);
  const sources = new Map<string, string>();

  /** Every writable form of a concept → the one slug that owns it. */
  const index = new Map<string, string>();

  for (const name of conceptFiles) {
    const file = path.join('content/concepts', name);
    const source = await readFile(path.join(CONCEPTS_DIR, name), 'utf8');
    sources.set(name, source);

    const frontmatter = readConceptFrontmatter(source);
    if (!frontmatter) continue; // parseConcept reports the reason in pass 2

    for (const key of conceptKeys(frontmatter)) {
      const existing = index.get(key);
      if (existing !== undefined && existing !== frontmatter.slug) {
        diagnostics.push({
          severity: 'warning',
          file,
          line: null,
          column: null,
          message: `Alias "${key}" is claimed by both "${existing}" and "${frontmatter.slug}".`,
          code: 'duplicate-id',
        });
        continue;
      }
      index.set(key, frontmatter.slug);
    }
  }

  /* ---------------------------------------------------------------- *
   * Pass 2 — concepts. Definitions live here and nowhere else.        *
   * ---------------------------------------------------------------- */
  const concepts: Concept[] = [];

  for (const name of conceptFiles) {
    const result = parseConcept(sources.get(name) ?? '', {
      concepts: index,
      assets,
      file: path.join('content/concepts', name),
    });
    diagnostics.push(...result.diagnostics);
    if (result.data) concepts.push(result.data);
  }

  /* ---------------------------------------------------------------- *
   * Pass 3 — lessons, resolved against the same index.                *
   * ---------------------------------------------------------------- */
  const lessons: Lesson[] = [];
  const failed: string[] = [];

  for (const dir of await listDirs(LESSONS_DIR)) {
    const base = path.join(LESSONS_DIR, dir);
    const lesson = await readIfPresent(path.join(base, 'lesson.md'));

    if (lesson === undefined) {
      diagnostics.push({
        severity: 'error',
        file: `content/lessons/${dir}`,
        line: null,
        column: null,
        message: 'Lesson bundle has no lesson.md.',
        code: 'missing-required-field',
      });
      failed.push(dir);
      continue;
    }

    const bundle: LessonBundle = {
      dir,
      lesson,
      ...optional('summary', await readIfPresent(path.join(base, 'summary.md'))),
    };

    const result = parseLesson(bundle, {
      concepts: index,
      assets,
      file: `content/lessons/${dir}`,
    });

    diagnostics.push(...result.diagnostics);
    if (result.data) lessons.push(result.data);
    else failed.push(dir);
  }

  /* ---------------------------------------------------------------- *
   * Back-references. Derived, never authored.                         *
   * ---------------------------------------------------------------- */
  const appearsIn = new Map<string, string[]>();
  for (const lesson of lessons) {
    for (const slug of lesson.concepts) {
      const list = appearsIn.get(slug) ?? [];
      list.push(lesson.id);
      appearsIn.set(slug, list);
    }
  }

  const withBackrefs = concepts.map((concept) => ({
    ...concept,
    appearsIn: (appearsIn.get(concept.frontmatter.slug) ?? []).sort(),
  }));

  return { lessons, concepts: withBackrefs, diagnostics, failed, assets };
}

/** `exactOptionalPropertyTypes` forbids assigning `undefined` to `summary?`. */
function optional(key: 'summary', value: string | undefined): { summary?: string } {
  return value === undefined ? {} : { [key]: value };
}

/** Diagnostics for one lesson bundle, by file path prefix. */
export function diagnosticsFor(diagnostics: readonly Diagnostic[], dir: string): Diagnostic[] {
  return diagnostics.filter((d) => d.file.startsWith(`content/lessons/${dir}`));
}
