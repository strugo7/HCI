import type { Block, Lesson, Section } from '@cyberatlas/core';

/** How a concept link resolves to a destination. Injected by the app's router. */
export interface ConceptResolver {
  /** Slug → href, or null if the concept does not exist. */
  href(slug: string): string | null;
  /** Slug → hover-card summary, if one is loaded. */
  preview(slug: string): string | null;
}

/** How a described asset resolves to something drawable, if anything. */
export interface AssetResolver {
  src(path: string): string | null;
}

/** Everything the renderer needs from the host application. */
export interface RenderContext {
  readonly concepts: ConceptResolver;
  readonly assets: AssetResolver;
  /** Hebrew content renders RTL; Latin tech terms stay LTR via bidi isolation. */
  readonly dir: 'rtl' | 'ltr';
}

export interface LessonRendererProps {
  readonly lesson: Lesson;
  readonly context: RenderContext;
}

export interface SectionRendererProps {
  readonly section: Section;
  readonly context: RenderContext;
}

export interface BlocksRendererProps {
  readonly blocks: readonly Block[];
  readonly context: RenderContext;
}
