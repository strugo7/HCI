/**
 * Graph page — the derived knowledge graph, drawn.
 *
 * Nothing here is authored: the graph is built at compile time from the
 * `[[links]]`, `related:` and `prerequisites:` the vault already contains.
 * Deleting a lesson changes this page on the next build, and no one edits it.
 */
import { Network } from 'lucide-react';
import type { ReactNode } from 'react';

import { ConceptGraph, useGraph } from '@/features/concept';
import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function GraphPage(): ReactNode {
  const { data: graph, isPending } = useGraph();

  const concepts = graph?.nodes.filter((node) => node.kind === 'concept').length ?? 0;
  const lessons = graph?.nodes.filter((node) => node.kind === 'lesson').length ?? 0;

  return (
    <>
      <PageHeader
        title="גרף ידע"
        description={
          graph === undefined
            ? 'הגרף נגזר אוטומטית מהקישורים בתוכן. הוא לעולם לא נכתב ולא מתוחזק ביד.'
            : `${concepts} מושגים ו־${lessons} שיעורים, ${graph.edges.length} קשרים. הגרף נגזר מהקישורים בתוכן — הוא לעולם לא נכתב ולא מתוחזק ביד.`
        }
      />

      {isPending ? (
        <Skeleton className="h-[70vh] w-full rounded-xl" />
      ) : !graph || graph.nodes.length === 0 ? (
        <EmptyState
          icon={Network}
          title="הגרף ריק"
          description="כל קישור [[מושג]] בתוך שיעור יוצר קשת בגרף. הוסיפו תוכן, והגרף ייבנה מעצמו."
          hint="pnpm content:build"
        />
      ) : (
        <>
          <ConceptGraph graph={graph} />
          <p className="mt-4 text-sm text-muted-foreground">
            עמדו על צומת כדי להאיר את הקשרים שלו, או לחצו כדי לפתוח אותו.
          </p>
        </>
      )}
    </>
  );
}
