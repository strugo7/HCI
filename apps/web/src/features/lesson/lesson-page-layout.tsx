/**
 * Lesson page layout — the main 3-column layout component.
 *
 * Structure (RTL):
 *   [Notes sidebar]  [Main content]  [TOC sidebar]
 *
 * All content comes from the Lesson knowledge object; this component holds
 * NO hardcoded educational content.
 */
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Lesson } from '@cyberatlas/core';

import { unitOfLesson } from '@/shared/content/content';

import { LessonHero } from './lesson-hero';
import { LessonNotes } from './lesson-notes';
import { LessonProgressBar } from './lesson-progress-bar';
import { LessonSection } from './lesson-section';
import { LessonToc } from './lesson-toc';
import { inferSectionKind, type TocEntry } from './types';

interface LessonPageLayoutProps {
  readonly lesson: Lesson;
}

export function LessonPageLayout({ lesson }: LessonPageLayoutProps): ReactNode {
  const { frontmatter, sections } = lesson;
  const mainRef = useRef<HTMLDivElement>(null);

  /* ------------------------------------------------------------------ *
   * Build TOC entries from sections                                      *
   * ------------------------------------------------------------------ */
  const tocEntries: TocEntry[] = useMemo(
    () =>
      sections.map((section, i) => ({
        id: section.id,
        title: section.title,
        kind: inferSectionKind(
          section.blocks.map((b) => b.type),
          i === sections.length - 1,
        ),
        index: i + 1,
      })),
    [sections],
  );

  /* ------------------------------------------------------------------ *
   * Track active section via IntersectionObserver                        *
   * ------------------------------------------------------------------ */
  const [activeId, setActiveId] = useState<string | null>(
    tocEntries[0]?.id ?? null,
  );

  useEffect(() => {
    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the first section that is currently intersecting.
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    for (const el of sectionElements) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

  /* ------------------------------------------------------------------ *
   * Start button handler                                                *
   * ------------------------------------------------------------------ */
  const handleStart = useCallback(() => {
    const firstSection = sections[0];
    if (firstSection) {
      document.getElementById(firstSection.id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sections]);

  return (
    <>
      <LessonProgressBar />

      <LessonHero frontmatter={frontmatter} unit={unitOfLesson(lesson.id)} onStart={handleStart} />

      {/* 3-column layout */}
      <div className="flex gap-8">
        {/* Key terms (left in RTL). The parser's resolved slugs, not the
            frontmatter's hand-written titles — those do not key the index. */}
        <LessonNotes concepts={lesson.concepts} />

        {/* Main content */}
        <div ref={mainRef} className="min-w-0 flex-1">
          {sections.map((section, i) => (
            <LessonSection key={section.id} section={section} index={i} />
          ))}
        </div>

        {/* TOC sidebar (right in RTL) */}
        <LessonToc entries={tocEntries} activeId={activeId} />
      </div>
    </>
  );
}
