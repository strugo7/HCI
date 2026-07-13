/**
 * The concept page.
 *
 * A concept owns its definition, and this is the one page in the app that
 * shows it in full. Everything here comes from the Concept knowledge object
 * or from the graph derived from it — nothing on this screen is authored in
 * React.
 *
 * Structure (RTL): the concept's own body reads down the main column; where it
 * sits in the course — what it relates to, which lessons teach it — is an aside,
 * because that is context, not the concept.
 */
import { GraduationCap, Network } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { Concept } from '@cyberatlas/core';
import { recommendRelated, type KnowledgeGraph } from '@cyberatlas/knowledge-graph';

import { BlocksRenderer } from '@/features/lesson';
import { Card } from '@/shared/components/ui/card';
import { conceptBySlug, lessonIndex } from '@/shared/content/content';
import { conceptPath, lessonPath } from '@/router/routes';

interface ConceptPageLayoutProps {
  readonly concept: Concept;
  /** Null while the graph chunk is in flight — the body does not wait for it. */
  readonly graph: KnowledgeGraph | null;
}

export function ConceptPageLayout({ concept, graph }: ConceptPageLayoutProps): ReactNode {
  const { frontmatter, definition, simpleExplanation, technicalExplanation, examples } = concept;

  return (
    <article>
      <ConceptHero concept={concept} />

      <div className="flex gap-10">
        <div className="min-w-0 flex-1 lesson-prose">
          <BlocksRenderer blocks={[definition]} />

          {simpleExplanation.length > 0 ? (
            <ConceptSection title="הסבר פשוט" blocks={simpleExplanation} />
          ) : null}

          {technicalExplanation.length > 0 ? (
            <ConceptSection title="הסבר טכני" blocks={technicalExplanation} />
          ) : null}

          {examples.length > 0 ? <ConceptSection title="דוגמאות" blocks={examples} /> : null}
        </div>

        <ConceptAside slug={frontmatter.slug} appearsIn={concept.appearsIn} graph={graph} />
      </div>
    </article>
  );
}

/**
 * The concept, named.
 *
 * Both names are the title: most students hold the English term and the Hebrew
 * one as a single unit, and the page should not make them choose. The remaining
 * aliases are what the concept is *also* called — they earn a quieter line,
 * because a student scanning for "DPI" needs to find it here and nowhere else.
 */
function ConceptHero({ concept }: { readonly concept: Concept }): ReactNode {
  const { title, aliases } = concept.frontmatter;

  const isHebrew = (value: string): boolean => /[֐-׿]/.test(value);
  const [hebrew] = aliases.filter(isHebrew);
  const others = aliases.filter((alias) => alias !== hebrew && alias !== title);

  return (
    <header className="mb-10 border-b border-border pb-8">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-3xl font-semibold tracking-tight tech-term">{title}</h1>
        {hebrew !== undefined ? (
          <p className="text-xl text-muted-foreground">{hebrew}</p>
        ) : null}
      </div>

      {others.length > 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          ידוע גם כ־
          {others.map((alias, i) => (
            <span key={alias}>
              {i > 0 ? ', ' : ''}
              <span className={isHebrew(alias) ? undefined : 'tech-term'}>{alias}</span>
            </span>
          ))}
        </p>
      ) : null}
    </header>
  );
}

function ConceptSection({
  title,
  blocks,
}: {
  readonly title: string;
  readonly blocks: Concept['simpleExplanation'];
}): ReactNode {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{title}</h2>
      <BlocksRenderer blocks={blocks} />
    </section>
  );
}

/**
 * Where the concept sits in the course.
 *
 * Both lists are derived: the related concepts come from the graph (so a
 * relation an author wrote on only one side still shows on both), and the
 * lessons come from the back-references the build computed. Neither is a list
 * anyone maintains by hand.
 */
function ConceptAside({
  slug,
  appearsIn,
  graph,
}: {
  readonly slug: string;
  readonly appearsIn: readonly string[];
  readonly graph: KnowledgeGraph | null;
}): ReactNode {
  const related = graph === null ? [] : recommendRelated(graph, slug, 8);

  // `appearsIn` is the back-reference the build computed. The page looks the
  // titles up rather than recomputing which lessons teach this concept — that
  // question already has one answer, and it is not this component's to give.
  const byId = new Map(lessonIndex().map((lesson) => [lesson.id, lesson]));
  const lessons = appearsIn
    .map((id) => byId.get(id))
    .filter((lesson): lesson is NonNullable<typeof lesson> => lesson !== undefined);

  if (related.length === 0 && lessons.length === 0) return null;

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 space-y-6">
        {related.length > 0 ? (
          <Card className="p-4">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Network className="size-3.5" aria-hidden />
              מושגים קשורים
            </h2>
            <ul className="space-y-1">
              {related.map((node) => (
                <li key={node.id}>
                  <Link
                    to={conceptPath(node.ref)}
                    className="block rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <span className="tech-term">{node.label}</span>
                    <RelatedHebrew slug={node.ref} />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        {lessons.length > 0 ? (
          <Card className="p-4">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="size-3.5" aria-hidden />
              נלמד בשיעורים
            </h2>
            <ul className="space-y-1">
              {lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={lessonPath(lesson.id)}
                    className="block rounded-md px-2 py-1.5 text-sm leading-snug text-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}
      </div>
    </aside>
  );
}

/** The Hebrew name of a related concept, when it has one. */
function RelatedHebrew({ slug }: { readonly slug: string }): ReactNode {
  const meta = conceptBySlug(slug);
  const hebrew = meta?.aliases.find((alias) => /[֐-׿]/.test(alias));

  if (hebrew === undefined) return null;
  return <span className="ms-1.5 text-xs text-muted-foreground">{hebrew}</span>;
}
