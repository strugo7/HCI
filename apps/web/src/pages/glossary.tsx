/**
 * The glossary — every concept in the vault, exactly once.
 *
 * Reads the metadata index only: 82 concepts, each one definition sentence.
 * Opening this page must not download a single concept body.
 *
 * A concept is found by any name it goes by. A student who knows the term as
 * "שמישות" and a student who knows it as "Usability" are looking for the same
 * file, so the search matches the concept's aliases — the same keys the parser
 * resolves `[[links]]` against.
 */
import { Library, Search } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';
import { Input } from '@/shared/components/ui/input';
import { conceptIndex, type ConceptMeta } from '@/shared/content/content';
import { conceptPath } from '@/router/routes';

/** Every name the concept answers to, lowercased once per concept. */
function haystack(concept: ConceptMeta): string {
  return [concept.title, concept.slug, ...concept.aliases, concept.definition]
    .join(' ')
    .toLowerCase();
}

/** Hebrew counts one thing differently from many. "נלמד ב־1 שיעורים" is not Hebrew. */
function taughtIn(lessons: number): string {
  return lessons === 1 ? 'נלמד בשיעור אחד' : `נלמד ב־${lessons} שיעורים`;
}

/**
 * Concepts under the letter they file under.
 *
 * A dictionary gives the eye somewhere to land. Without the letter rules, 82
 * rows are one undifferentiated column and the only way in is the search box.
 */
function byInitial(concepts: readonly ConceptMeta[]): [string, ConceptMeta[]][] {
  const groups = new Map<string, ConceptMeta[]>();

  for (const concept of concepts) {
    const initial = concept.title.slice(0, 1).toUpperCase();
    const group = groups.get(initial) ?? [];
    group.push(concept);
    groups.set(initial, group);
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, 'he'));
}

export default function GlossaryPage(): ReactNode {
  const concepts = conceptIndex();
  const [query, setQuery] = useState('');

  const searchable = useMemo(
    () => concepts.map((concept) => ({ concept, haystack: haystack(concept) })),
    [concepts],
  );

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle === '') return concepts;
    return searchable.filter((entry) => entry.haystack.includes(needle)).map((e) => e.concept);
  }, [concepts, searchable, query]);

  const groups = useMemo(() => byInitial(matches), [matches]);

  if (concepts.length === 0) {
    return (
      <>
        <GlossaryHeader count={0} />
        <EmptyState
          icon={Library}
          title="אין עדיין מושגים"
          description="כל קובץ תחת content/concepts הופך למושג יחיד ולצומת בגרף הידע."
          hint="content/concepts/usability.md"
        />
      </>
    );
  }

  return (
    <>
      <GlossaryHeader count={concepts.length} />

      <div className="mb-8 max-w-xl">
        <div className="relative">
          <Search
            className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="חיפוש מושג — בעברית או באנגלית"
            aria-label="חיפוש מושג"
            className="ps-9"
          />
        </div>

        {query.trim() !== '' ? (
          <p className="mt-2 text-sm text-muted-foreground" role="status">
            {matches.length === 0
              ? 'אין מושג התואם לחיפוש'
              : `${matches.length} מתוך ${concepts.length} מושגים`}
          </p>
        ) : null}
      </div>

      {matches.length === 0 ? (
        <EmptyState
          icon={Search}
          title="לא נמצא מושג"
          description="אפשר לחפש לפי השם באנגלית, לפי השם בעברית, או לפי ראשי תיבות."
        />
      ) : (
        <div className="space-y-10">
          {groups.map(([initial, group]) => (
            <section key={initial} aria-labelledby={`letter-${initial}`}>
              <div className="mb-3 flex items-center gap-3">
                <h2
                  id={`letter-${initial}`}
                  className="text-sm font-semibold text-muted-foreground tech-term"
                >
                  {initial}
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <ul className="divide-y divide-border">
                {group.map((concept) => (
                  <li key={concept.slug}>
                    <ConceptRow concept={concept} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function GlossaryHeader({ count }: { readonly count: number }): ReactNode {
  return (
    <PageHeader
      title="מילון מושגים"
      description={
        count === 0
          ? 'כל מושג קיים בדיוק פעם אחת, ומחזיק את ההגדרה שלו. שיעורים מפנים אליו ולעולם לא מגדירים אותו מחדש.'
          : `${count} מושגים. כל מושג קיים בדיוק פעם אחת, ומחזיק את ההגדרה שלו — שיעורים מפנים אליו ולעולם לא מגדירים אותו מחדש.`
      }
    />
  );
}

/**
 * One entry: what it is called, what it means, and where it is taught.
 *
 * The Hebrew alias sits beside the title because for most students it is the
 * name they actually know the concept by — it is not decoration, it is the
 * other half of the term.
 */
function ConceptRow({ concept }: { readonly concept: ConceptMeta }): ReactNode {
  const [hebrew] = concept.aliases.filter((alias) => /[֐-׿]/.test(alias));

  return (
    <Link
      to={conceptPath(concept.slug)}
      className="group flex flex-col gap-1.5 rounded-lg px-3 py-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary tech-term">
          {concept.title}
        </h3>
        {hebrew !== undefined ? (
          <span className="text-sm text-muted-foreground">{hebrew}</span>
        ) : null}
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {concept.definition}
      </p>

      {concept.appearsIn.length > 0 ? (
        <p className="text-xs text-muted-foreground/80">{taughtIn(concept.appearsIn.length)}</p>
      ) : null}
    </Link>
  );
}
