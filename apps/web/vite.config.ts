import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      // The vault lives outside the app. The app reads it; it never owns it.
      '@content': path.resolve(import.meta.dirname, '../../content'),
    },
  },
  server: {
    port: 5173,
    // The content vault is outside the app root, so Vite must be allowed to
    // serve from it during dev.
    fs: { allow: [path.resolve(import.meta.dirname, '../..')] },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
