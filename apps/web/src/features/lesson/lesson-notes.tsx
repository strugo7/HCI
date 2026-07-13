/**
 * Key terms sidebar.
 *
 * The definitions shown here are the ones the concept files own — the same
 * text the glossary shows, loaded from the compiled index. A definition is
 * never restated in React: there is exactly one of each in the system.
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { conceptPath } from '@/router/routes';
import { conceptIndex } from '@/shared/content/content';

interface LessonNotesProps {
  /** Concept slugs this lesson links to, in the order the parser found them. */
  readonly concepts: readonly string[];
}

/** Enough to orient a reader without turning the sidebar into a second lesson. */
const MAX_TERMS = 5;

export function LessonNotes({ concepts }: LessonNotesProps): ReactNode {
  const bySlug = new Map(conceptIndex().map((c) => [c.slug, c]));

  const terms = concepts
    .map((slug) => bySlug.get(slug))
    .filter((c) => c !== undefined)
    .slice(0, MAX_TERMS);

  if (terms.length === 0) return null;

  return (
    <aside className="sticky top-20 hidden w-64 shrink-0 lg:block">
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <h3 className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground">
          מונחי מפתח
        </h3>

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
              <p className="text-sm leading-relaxed text-muted-foreground">{term.definition}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
