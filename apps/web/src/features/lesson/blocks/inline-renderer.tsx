/**
 * Renders an array of Inline knowledge objects to React elements.
 *
 * Handles: text, strong, emphasis, inline-code, concept-reference.
 * Concept references render as links to /glossary/:slug.
 */
import type { ReactNode } from 'react';

import type { Inline } from '@cyberatlas/core';

// Imported by module path, not through the feature barrel: the concept barrel
// pulls in the lesson renderer, and going through it would close a cycle.
import { ConceptLink } from '@/features/concept/concept-link';

interface InlineRendererProps {
  readonly inlines: readonly Inline[];
}

export function InlineRenderer({ inlines }: InlineRendererProps): ReactNode {
  return (
    <>
      {inlines.map((node, i) => {
        switch (node.type) {
          case 'text':
            return <span key={i}>{node.value}</span>;

          case 'strong':
            return (
              <strong key={i} className="font-semibold">
                {node.value}
              </strong>
            );

          case 'emphasis':
            return (
              <em key={i} className="italic">
                {node.value}
              </em>
            );

          case 'inline-code':
            return (
              <code
                key={i}
                className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em] tech-term"
              >
                {node.value}
              </code>
            );

          case 'concept-reference':
            return <ConceptLink key={i} target={node.target} label={node.label} />;

          default:
            return null;
        }
      })}
    </>
  );
}
