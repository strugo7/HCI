/**
 * Lesson hero header — matching the design's top section.
 *
 * Shows: breadcrumbs, title, description, "מתחילים" CTA, reading time badge,
 * and the Aegis logo.
 */
import { BookOpen, ChevronLeft, Clock, PlayCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { LessonFrontmatter } from '@cyberatlas/core';

import { ROUTES } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';

interface LessonHeroProps {
  readonly frontmatter: LessonFrontmatter;
  /** First meaningful paragraph text for the description. */
  readonly description?: string | undefined;
  readonly onStart?: (() => void) | undefined;
}

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'מתקדם',
};

export function LessonHero({ frontmatter, description, onStart }: LessonHeroProps): ReactNode {
  return (
    <header className="mb-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumbs">
        <Link to={ROUTES.lessons} className="transition-colors hover:text-foreground">
          שיעורים
        </Link>
        <ChevronLeft className="size-3.5" aria-hidden />
        {frontmatter.category ? (
          <>
            <span>{frontmatter.category}</span>
            <ChevronLeft className="size-3.5" aria-hidden />
          </>
        ) : null}
        <span className="font-medium text-foreground">
          שיעור {frontmatter.lessonNumber ?? ''}
        </span>
      </nav>

      {/* Hero row */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {frontmatter.title}
          </h1>

          {description ? (
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          ) : null}

          {/* Metadata pills */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button onClick={onStart} className="gap-2">
              <PlayCircle className="size-4" aria-hidden />
              מתחילים
            </Button>

            {frontmatter.estimatedTime ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
                <Clock className="size-3.5" aria-hidden />
                {frontmatter.estimatedTime} דק׳ קריאה
              </span>
            ) : null}

            <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
              <BookOpen className="size-3.5" aria-hidden />
              {DIFFICULTY_LABELS[frontmatter.difficulty] ?? frontmatter.difficulty}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
