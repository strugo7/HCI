/**
 * Sticky Table of Contents — matching the design's right-side TOC panel.
 *
 * Shows numbered circles with section-type badges (קריאה, הגדרה, דוגמה, etc.)
 * and highlights the currently visible section via IntersectionObserver.
 */
import { ChevronDown } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { cn } from '@/shared/lib/utils';

import { SECTION_KIND_LABELS, type TocEntry } from './types';

interface LessonTocProps {
  readonly entries: readonly TocEntry[];
  readonly activeId: string | null;
}

export function LessonToc({ entries, activeId }: LessonTocProps): ReactNode {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className="sticky top-20 hidden w-64 shrink-0 xl:block"
      aria-label="תוכן העניינים"
    >
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        {/* Header */}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex w-full items-center justify-between pb-3"
        >
          <h3 className="text-sm font-semibold text-foreground">תוכן העניינים</h3>
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform duration-200',
              collapsed && '-rotate-90',
            )}
            aria-hidden
          />
        </button>

        {/* Entries */}
        {!collapsed && (
          <ol className="space-y-1">
            {entries.map((entry) => {
              const isActive = entry.id === activeId;
              return (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className={cn(
                      'toc-item flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors',
                      isActive
                        ? 'toc-item--active bg-muted/70 text-foreground'
                        : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground',
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {/* Numbered circle */}
                    <span className={`toc-step toc-step--${entry.kind}`}>
                      {entry.index}
                    </span>

                    {/* Title + badge */}
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{entry.title}</span>
                      <span className={`toc-badge toc-badge--${entry.kind} mt-0.5 self-start`}>
                        {SECTION_KIND_LABELS[entry.kind]}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </nav>
  );
}
