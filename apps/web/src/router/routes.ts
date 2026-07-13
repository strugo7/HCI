/**
 * Route paths, defined once.
 *
 * Every link and every nav item reads from here, so a URL change is a
 * one-line edit rather than a hunt through JSX.
 */
export const ROUTES = {
  dashboard: '/',
  unit: '/units/:unitId',
  lessons: '/lessons',
  lesson: '/lessons/:lessonId',
  glossary: '/glossary',
  concept: '/glossary/:slug',
  flashcards: '/flashcards',
  practice: '/practice',
  exams: '/exams',
  graph: '/graph',
  progress: '/progress',
  search: '/search',
  settings: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;

export function unitPath(unitId: string): string {
  return ROUTES.unit.replace(':unitId', unitId);
}

export function lessonPath(lessonId: string): string {
  return ROUTES.lesson.replace(':lessonId', lessonId);
}

export function conceptPath(slug: string): string {
  return ROUTES.concept.replace(':slug', slug);
}
