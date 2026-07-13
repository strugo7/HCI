/**
 * Exams index — one summative exam per curriculum unit.
 *
 * An exam is not a quiz: its answers are shuffled on every attempt, its
 * questions cut across the unit's lessons, and its pass bar mirrors the real
 * exam. The metadata comes from the compiled index — no exam is downloaded
 * until it is opened.
 */
import { GraduationCap } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { examPath } from '@/router/routes';
import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';
import { examsIndex, unitById } from '@/shared/content/content';

/** Seconds → "כ-25 דק'". An estimate never earns more precision than that. */
function minutesLabel(seconds: number): string {
  return `כ-${String(Math.max(1, Math.round(seconds / 60)))} דק'`;
}

export default function ExamsPage(): ReactNode {
  const exams = examsIndex();

  return (
    <>
      <PageHeader
        title="מבחנים מסכמים"
        description="מבחן מסכם לכל יחידה — שאלות שמצליבות בין השיעורים, והתשובות מעורבלות מחדש בכל ניסיון."
      />

      {exams.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="אין עדיין מבחנים"
          description="כל יחידה מקבלת מבחן מסכם תחת content/exams, והם ייאספו לכאן."
          hint="content/exams/"
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {exams.map((exam) => {
            const unit = unitById(exam.unit);
            return (
              <li key={exam.id}>
                <Link
                  to={examPath(exam.id)}
                  className="flex h-full items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div className="space-y-1">
                    <p className="font-semibold leading-snug">{exam.title}</p>
                    {unit ? (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {unit.description}
                      </p>
                    ) : null}
                    <p className="text-sm text-muted-foreground">
                      {exam.questionCount} שאלות · {exam.maxScore} נק' ·{' '}
                      {minutesLabel(exam.estimatedTime)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
