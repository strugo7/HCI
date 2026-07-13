/**
 * A `[[concept]]` reference, as the student meets it inside a lesson.
 *
 * The point of a concept reference is that the definition lives in exactly one
 * place. That is an architectural virtue and a reading problem: a student who
 * has forgotten what a DMZ is should not have to leave the sentence to find
 * out. The hover card resolves that — the definition comes to the link, and the
 * student stays where they were.
 *
 * It is a HoverCard rather than a Tooltip because it carries a paragraph, and
 * because Radix opens it on keyboard focus as well as hover — a definition
 * reachable only with a mouse is not reachable.
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/ui/hover-card';
import { conceptBySlug } from '@/shared/content/content';
import { conceptPath } from '@/router/routes';

interface ConceptLinkProps {
  /** The resolved concept slug — the parser guarantees it exists. */
  readonly target: string;
  /** The text as written in the lesson, which may be an alias. */
  readonly label: string;
}

const LINK_CLASS =
  'font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary/60 tech-term';

export function ConceptLink({ target, label }: ConceptLinkProps): ReactNode {
  const concept = conceptBySlug(target);

  // The parser rejects a link to a concept that does not exist, so this is the
  // impossible case. If it ever happens, the link still navigates — it does not
  // become a dead span, and it does not open an empty card.
  if (concept === null) {
    return (
      <Link to={conceptPath(target)} className={LINK_CLASS}>
        {label}
      </Link>
    );
  }

  const hebrew = concept.aliases.find((alias) => /[֐-׿]/.test(alias));

  return (
    <HoverCard openDelay={220} closeDelay={120}>
      <HoverCardTrigger asChild>
        <Link to={conceptPath(target)} className={LINK_CLASS}>
          {label}
        </Link>
      </HoverCardTrigger>

      <HoverCardContent className="w-80" align="start">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="font-semibold tech-term">{concept.title}</p>
          {hebrew !== undefined ? (
            <p className="text-sm text-muted-foreground">{hebrew}</p>
          ) : null}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{concept.definition}</p>

        <p className="mt-3 text-xs text-muted-foreground/80">להרחבה — לחצו על המושג</p>
      </HoverCardContent>
    </HoverCard>
  );
}
