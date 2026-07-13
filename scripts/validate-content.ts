/**
 * Validate the vault without emitting anything. This is the CI gate.
 *
 * Catches exactly the class of failure that already happened to this project
 * once: content and spec drifting apart with nothing to notice. A directive
 * the schema does not know about fails here, loudly, with a file and a line.
 *
 * Status: wiring pending until the parser lands (`/build-parser`).
 */
import { formatDiagnostic, hasErrors, type Diagnostic } from '@cyberatlas/core';

async function main(): Promise<void> {
  const diagnostics: Diagnostic[] = [];

  // TODO(/build-parser): parse every lesson, concept, quiz and flashcard deck,
  // and collect diagnostics without stopping at the first failure.

  for (const d of diagnostics) console.error(formatDiagnostic(d));

  const errors = diagnostics.filter((d) => d.severity === 'error').length;
  const warnings = diagnostics.filter((d) => d.severity === 'warning').length;
  console.log(`content: ${errors} error(s), ${warnings} warning(s)`);

  if (hasErrors(diagnostics)) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
