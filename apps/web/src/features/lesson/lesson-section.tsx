/**
 * Lesson section renderer — renders one Section knowledge object.
 *
 * Each section has a title and a sequence of blocks. The section's id is
 * used as a scroll target for the TOC.
 */
import type { ReactNode } from 'react';

import type { Section } from '@cyberatlas/core';

import { BlocksRenderer } from './blocks/block-renderer';

interface LessonSectionProps {
  readonly section: Section;
  readonly index: number;
}

export function LessonSection({ section, index }: LessonSectionProps): ReactNode {
  return (
    <section id={section.id} className="scroll-mt-20">
      {/* Section divider (after first section) */}
      {index > 0 && (
        <hr className="my-10 border-t border-border/50" />
      )}

      {/* Section heading */}
      <h2 className="text-2xl font-semibold tracking-tight mb-4">
        {section.title}
      </h2>

      {/* Section blocks */}
      <BlocksRenderer blocks={section.blocks} />
    </section>
  );
}
