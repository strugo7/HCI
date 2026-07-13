import { Library } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function ConceptPage(): ReactNode {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <PageHeader title={slug ?? 'מושג'} description="הגדרה, הסבר, דוגמאות ומושגים קשורים." />
      <EmptyState
        icon={Library}
        title="המושג לא נמצא"
        description="מושג נוצר על ידי הוספת קובץ Markdown תחת content/concepts."
        hint={`content/concepts/${slug ?? 'concept'}.md`}
      />
    </>
  );
}
