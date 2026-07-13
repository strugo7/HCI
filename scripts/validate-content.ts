/**
 * Validate the vault without emitting anything. This is the CI gate.
 *
 * Catches exactly the class of failure that already happened to this project
 * once: content and spec drifting apart with nothing to notice. A directive
 * the schema does not know about fails here, loudly, with a file and a line.
 *
 * Unlike the build, this reports on the *whole* vault and exits non-zero on
 * any error — that is the point of a gate.
 */
import { formatDiagnostic, hasErrors } from '@cyberatlas/core';

import { compileVault } from './lib/compile.js';

async function main(): Promise<void> {
  const { lessons, concepts, diagnostics, failed } = await compileVault();

  for (const d of diagnostics) console.error(formatDiagnostic(d));

  const errors = diagnostics.filter((d) => d.severity === 'error').length;
  const warnings = diagnostics.filter((d) => d.severity === 'warning').length;

  console.log(`\ncontent: ${lessons.length} lesson(s), ${concepts.length} concept(s) parsed`);
  if (failed.length > 0) {
    console.log(`content: ${failed.length} bundle(s) did not compile: ${failed.join(', ')}`);
  }
  console.log(`content: ${errors} error(s), ${warnings} warning(s)`);

  if (hasErrors(diagnostics)) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
