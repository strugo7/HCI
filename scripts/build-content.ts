/**
 * Compile the content vault into data the app can load.
 *
 *   content/  →  parse  →  validate  →  apps/web/src/content-index.json
 *
 * Runs at build time, never in the browser. Two reasons:
 *   1. students never pay to parse Markdown on page load
 *   2. content that fails validation cannot ship — the build fails first
 *
 * Status: wiring pending until the parser lands (`/build-parser`).
 */
import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { formatDiagnostic, hasErrors, type Diagnostic } from '@cyberatlas/core';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const LESSONS_DIR = path.join(CONTENT_DIR, 'lessons');

async function listLessonDirs(): Promise<string[]> {
  const entries = await readdir(LESSONS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort();
}

async function main(): Promise<void> {
  const diagnostics: Diagnostic[] = [];
  const lessonDirs = await listLessonDirs();

  console.log(`content: found ${lessonDirs.length} lesson bundle(s)`);

  // TODO(/build-parser): read each bundle, parseLesson(), parseConcept(),
  // buildGraph(), buildIndex(), then write the compiled index to disk.

  for (const d of diagnostics) console.error(formatDiagnostic(d));

  if (hasErrors(diagnostics)) {
    console.error('\ncontent: build failed — fix the errors above');
    process.exit(1);
  }

  console.log('content: ok');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
