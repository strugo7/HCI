import { Search } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';

export default function SearchPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="חיפוש"
        description="חיפוש חוצה שיעורים, מושגים, הגדרות, שאלות וכרטיסיות."
      />
      <EmptyState
        icon={Search}
        title="אינדקס החיפוש ריק"
        description="האינדקס נבנה בזמן קומפילציה ונשלח כנתונים, כדי שהחיפוש לא ישלם על פענוח Markdown בדפדפן."
        hint="pnpm content:build"
      />
    </>
  );
}
