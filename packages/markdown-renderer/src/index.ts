/**
 * @cyberatlas/markdown-renderer
 *
 * Knowledge Objects → React. Stateless, and holds no educational logic:
 * it decides HOW content looks, never WHAT it says.
 *
 * It consumes Knowledge Objects only. It never reads Markdown and never
 * imports the parser — see the dependency rules in docs/ARCHITECTURE.md.
 *
 * Status: contracts defined, components pending (`/build-renderer`).
 */
export * from './registry.js';
export * from './types.js';
