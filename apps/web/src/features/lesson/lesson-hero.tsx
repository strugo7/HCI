/**
 * Lesson hero header — the top section of a lesson.
 *
 * Shows: breadcrumb trail, title, description, "מתחילים" CTA, reading-time
 * badge, and difficulty badge.
 */
import { BookOpen, ChevronLeft, Clock, PlayCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { LessonFrontmatter } from '@cyberatlas/core';

import { ROUTES, unitPath } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';
import type { UnitMeta } from '@/shared/content/content';

interface LessonHeroProps {
  readonly frontmatter: LessonFrontmatter;
  /** The unit this lesson belongs to — the student's way back. */
  readonly unit: UnitMeta | null;
  readonly onStart?: (() => void) | undefined;
}

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'מתקדם',
};

export function LessonHero({ frontmatter, unit, onStart }: LessonHeroProps): ReactNode {
  const { description } = frontmatter;

  return (
    <header className="mb-10">
      {/*
        The trail is the way back. It walks the curriculum — topics → unit →
        this lesson — so returning from a lesson lands on the unit the student
        opened it from, not on the flat lesson list.

        ChevronLeft is the separator: in RTL, left is "deeper".
      */}
      <nav
        className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
        aria-label="מסלול ניווט"
      >
        <Link to={ROUTES.dashboard} className="transition-colors hover:text-foreground">
          כל הנושאים
        </Link>
        <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
        {unit ? (
          <>
            <Link
              to={unitPath(unit.id)}
              className="transition-colors hover:text-foreground"
            >
              {unit.title}
            </Link>
            <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
          </>
        ) : null}
        <span className="font-medium text-foreground" aria-current="page">
          {frontmatter.title}
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
