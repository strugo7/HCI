/**
 * Concept page — renders one compiled Concept knowledge object.
 *
 * The concept body and the graph load independently: the definition is the
 * reason the student is here, and it must not wait on the graph chunk to
 * discover what the concept is related to.
 */
import { Library } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { ConceptPageLayout, useConcept, useGraph } from '@/features/concept';
import { EmptyState } from '@/shared/components/empty-state';
import { PageSkeleton } from '@/shared/components/page-skeleton';

import '@/features/lesson/lesson.css';

export default function ConceptPage(): ReactNode {
  const { slug } = useParams<{ slug: string }>();
  const { data: concept, isPending } = useConcept(slug);
  const { data: graph } = useGraph();

  if (isPending) return <PageSkeleton />;

  if (!concept) {
    return (
      <EmptyState
        icon={Library}
        title="המושג לא נמצא"
        description="אין מושג עם המזהה הזה במאגר. מושג נוצר על ידי הוספת קובץ Markdown תחת content/concepts."
        hint={`content/concepts/${slug ?? 'concept'}.md`}
      />
    );
  }

  return <ConceptPageLayout concept={concept} graph={graph ?? null} />;
}
