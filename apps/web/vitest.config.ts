import path from 'node:path';

import { defineConfig } from 'vitest/config';

/**
 * Separate from vite.config.ts on purpose: the tests need the `@/` alias and
 * nothing else. Loading the React plugin to run pure functions would cost every
 * run for nothing.
 */
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  test: {
    // Everything tested here is pure — no DOM, no rendering. Rendering is cheap
    // to look at and expensive to assert on, so it is checked by opening the page.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
