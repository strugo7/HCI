import type { ReactNode } from 'react';

import { UnitCard } from '@/features/curriculum/unit-card';
import { PageHeader } from '@/shared/components/page-header';
import { conceptIndex, course, lessonIndex, unitIndex } from '@/shared/content/content';

export default function DashboardPage(): ReactNode {
  const units = unitIndex();
  const { title, code } = course();

  return (
    <>
      <PageHeader
        title="ברוכים הבאים ל-CyberAtlas"
        description={`${title} · קורס ${code}. הקורס בנוי בסדר לימוד פדגוגי: קודם אוצר המילים, אחר כך התוקף, ורק בסוף ההגנה.`}
      />

      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        {units.length} יחידות · {lessonIndex().length} שיעורים · {conceptIndex().length} מושגים
      </p>

      <section aria-labelledby="units-heading">
        <h2 id="units-heading" className="mb-4 text-sm font-medium text-muted-foreground">
          יחידות הקורס
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {units.map((unit, i) => (
            <UnitCard key={unit.id} unit={unit} index={i + 1} />
          ))}
        </div>
      </section>
    </>
  );
}
