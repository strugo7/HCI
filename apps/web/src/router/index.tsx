import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { RootLayout } from '@/layouts/root-layout';

import { ROUTES } from './routes';

// Route-level code splitting: a student opening one lesson should not download
// the graph view or the exam engine.
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const UnitPage = lazy(() => import('@/pages/unit'));
const LessonsPage = lazy(() => import('@/pages/lessons'));
const LessonPage = lazy(() => import('@/pages/lesson'));
const GlossaryPage = lazy(() => import('@/pages/glossary'));
const ConceptPage = lazy(() => import('@/pages/concept'));
const FlashcardsPage = lazy(() => import('@/pages/flashcards'));
const PracticePage = lazy(() => import('@/pages/practice'));
const ExamsPage = lazy(() => import('@/pages/exams'));
const GraphPage = lazy(() => import('@/pages/graph'));
const ProgressPage = lazy(() => import('@/pages/progress'));
const SearchPage = lazy(() => import('@/pages/search'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.unit, element: <UnitPage /> },
      { path: ROUTES.lessons, element: <LessonsPage /> },
      { path: ROUTES.lesson, element: <LessonPage /> },
      { path: ROUTES.glossary, element: <GlossaryPage /> },
      { path: ROUTES.concept, element: <ConceptPage /> },
      { path: ROUTES.flashcards, element: <FlashcardsPage /> },
      { path: ROUTES.practice, element: <PracticePage /> },
      { path: ROUTES.exams, element: <ExamsPage /> },
      { path: ROUTES.graph, element: <GraphPage /> },
      { path: ROUTES.progress, element: <ProgressPage /> },
      { path: ROUTES.search, element: <SearchPage /> },
      { path: ROUTES.settings, element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

export { ROUTES, unitPath, lessonPath, conceptPath } from './routes';
