/**
 * @module features/lesson
 *
 * Lesson page feature — renders a Lesson knowledge object as a full page
 * with hero, TOC, content sections, notes sidebar, and progress bar.
 *
 * All content is pulled from the Lesson type (`@cyberatlas/core`).
 * This module contains NO hardcoded educational content.
 */
export { useLesson } from './use-lesson';
export { LessonPageLayout } from './lesson-page-layout';
export { LessonHero } from './lesson-hero';
export { LessonToc } from './lesson-toc';
export { LessonSection } from './lesson-section';
export { LessonNotes } from './lesson-notes';
export { LessonProgressBar } from './lesson-progress-bar';
export { BlockRenderer, BlocksRenderer } from './blocks/block-renderer';
export type { TocEntry, SectionKind } from './types';
