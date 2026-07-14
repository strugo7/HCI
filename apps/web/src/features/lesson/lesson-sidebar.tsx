/**
 * Lesson sidebar component.
 *
 * Replaces the separate left (TOC) and right (Key Terms) sidebars with a single,
 * unified sidebar that uses tabs to switch between the Table of Contents and
 * Key Terms.
 *
 * If a lesson has no key terms, only the Table of Contents is shown (without tabs).
 */
import { ChevronDown } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';
import { conceptPath } from '@/router/routes';
import { conceptIndex } from '@/shared/content/content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { SECTION_KIND_LABELS, type TocEntry } from './types';

interface LessonSidebarProps {
  readonly entries: readonly TocEntry[];
  readonly activeId: string | null;
  readonly concepts: readonly string[];
}

const MAX_TERMS = 5;

export function LessonSidebar({ entries, activeId, concepts }: LessonSidebarProps): ReactNode {
  const [collapsed, setCollapsed] = useState(false);

  // Look up terms in the global index
  const bySlug = new Map(conceptIndex().map((c) => [c.slug, c]));
  const terms = concepts
    .map((slug) => bySlug.get(slug))
    .filter((c) => c !== undefined)
    .slice(0, MAX_TERMS);

  const showTabs = terms.length > 0;

  // Render Table of Contents items
  const renderTocEntries = () => (
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
  );

  return (
    <aside className="sticky top-20 hidden w-80 shrink-0 lg:block">
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        {showTabs ? (
          <Tabs defaultValue="toc" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="toc" className="text-xs font-semibold">
                תוכן העניינים
              </TabsTrigger>
              <TabsTrigger value="concepts" className="text-xs font-semibold">
                מונחי מפתח
              </TabsTrigger>
            </TabsList>

            <TabsContent value="toc" className="mt-0">
              {renderTocEntries()}
            </TabsContent>

            <TabsContent value="concepts" className="mt-0">
              <ul className="flex flex-col gap-4">
                {terms.map((term, index) => (
                  <li key={term.slug} className="flex flex-col">
                    {index > 0 ? <hr className="mb-4 border-muted/50" /> : null}
                    <Link
                      to={conceptPath(term.slug)}
                      className="mb-1.5 font-bold text-foreground transition-colors hover:text-primary"
                    >
                      {term.title}
                    </Link>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {term.definition}
                    </p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        ) : (
          // If no terms, render simple TOC without tabs
          <>
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

            {!collapsed && renderTocEntries()}
          </>
        )}
      </div>
    </aside>
  );
}
