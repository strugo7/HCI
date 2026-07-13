import type { ReactNode } from 'react';

import { UnitCard } from '@/features/curriculum/unit-card';
import { COURSE, CURRICULUM_UNITS } from '@/features/curriculum/units';
import { PageHeader } from '@/shared/components/page-header';

export default function DashboardPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="ברוכים הבאים ל-CyberAtlas"
        description={`${COURSE.title} · קורס ${COURSE.code}. הקורס בנוי בסדר לימוד פדגוגי: קודם אוצר המילים, אחר כך התוקף, ורק בסוף ההגנה.`}
      />

      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        {COURSE.unitCount} יחידות · {COURSE.lessonCount} שיעורים · {COURSE.conceptCount} מושגי ליבה
      </p>

      <section aria-labelledby="units-heading">
        <h2 id="units-heading" className="mb-4 text-sm font-medium text-muted-foreground">
          יחידות הקורס
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {CURRICULUM_UNITS.map((unit, i) => (
            <UnitCard key={unit.id} unit={unit} index={i + 1} />
          ))}
        </div>
      </section>
    </>
  );
}
