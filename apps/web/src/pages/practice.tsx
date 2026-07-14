/**
 * Practice — the one place to sit an assessment, in three flavours.
 *
 *   לפי שיעורים      one quiz per lesson, answers in the order they were authored
 *   לפי יחידות לימוד  our summative exam per unit, answers reshuffled every attempt
 *   מבחני מרצה        the real past papers, transcribed from the scanned originals
 *
 * All three counts come from the compiled index, so this page never downloads a
 * single question in order to say how many there are.
 */
import { ClipboardList, GraduationCap, ScrollText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { examPath, quizPath } from '@/router/routes';
import { EmptyState } from '@/shared/components/empty-state';
import { PageHeader } from '@/shared/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import {
  lecturerExamsIndex,
  quizzesIndex,
  unitById,
  unitExamsIndex,
} from '@/shared/content/content';

/** Seconds → "כ-25 דק'". An estimate never earns more precision than that. */
function minutesLabel(seconds: number): string {
  return `כ-${String(Math.max(1, Math.round(seconds / 60)))} דק'`;
}

/** Seconds → "שעתיים". The lecturer's papers declare a real, exact limit. */
function durationLabel(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes === 90) return 'שעה וחצי';
  if (minutes === 120) return 'שעתיים';
  if (minutes % 60 === 0) return `${String(minutes / 60)} שעות`;
  return `${String(minutes)} דק'`;
}

const TABS = ['lessons', 'units', 'lecturer'] as const;
type Tab = (typeof TABS)[number];

const DEFAULT_TAB: Tab = 'lessons';

function isTab(value: string | null): value is Tab {
  return value !== null && (TABS as readonly string[]).includes(value);
}

export default function PracticePage(): ReactNode {
  const quizzes = quizzesIndex();
  const unitExams = unitExamsIndex();
  const lecturerExams = lecturerExamsIndex();

  // The tab lives in the URL, so it can be linked and survives a reload.
  const [params, setParams] = useSearchParams();
  const raw = params.get('tab');
  const tab: Tab = isTab(raw) ? raw : DEFAULT_TAB;

  const select = (value: string): void => {
    setParams(value === DEFAULT_TAB ? {} : { tab: value }, { replace: true });
  };

  return (
    <>
      <PageHeader
        title="תרגול ומבחנים"
        description="חידון לכל שיעור, מבחן מסכם לכל יחידה, ומבחני המרצה עצמם."
      />

      <Tabs value={tab} onValueChange={select}>
        <TabsList>
          <TabsTrigger value="lessons">
            <ClipboardList className="size-4" aria-hidden />
            לפי שיעורים
          </TabsTrigger>
          <TabsTrigger value="units">
            <GraduationCap className="size-4" aria-hidden />
            לפי יחידות לימוד
          </TabsTrigger>
          <TabsTrigger value="lecturer">
            <ScrollText className="size-4" aria-hidden />
            מבחני מרצה
          </TabsTrigger>
        </TabsList>

        {/* ---------------------------------------------------- lessons */}
        <TabsContent value="lessons">
          <TabIntro>
            חידון לכל שיעור. כל תשובה נפתחת להסבר שמראה גם למה המסיחים האחרים שגויים.
          </TabIntro>

          {quizzes.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="אין עדיין חומר לתרגול"
              description="כל שיעור מחזיק קובץ חידון משלו, והם ייאספו לכאן."
              hint="pnpm content:build"
            />
          ) : (
            <CardGrid>
              {quizzes.map((lesson) => (
                <AssessmentCard
                  key={lesson.id}
                  to={quizPath(lesson.quizRef ?? lesson.id)}
                  icon={ClipboardList}
                  title={lesson.title}
                  meta={`${String(lesson.questionCount)} שאלות`}
                />
              ))}
            </CardGrid>
          )}
        </TabsContent>

        {/* ------------------------------------------------------ units */}
        <TabsContent value="units">
          <TabIntro>
            מבחן מסכם לכל יחידה — שאלות שמצליבות בין השיעורים, והתשובות מעורבלות מחדש בכל ניסיון.
          </TabIntro>

          {unitExams.length === 0 ? (
            <EmptyState
              icon={GraduationCap}
              title="אין עדיין מבחנים"
              description="כל יחידה מקבלת מבחן מסכם תחת content/exams, והם ייאספו לכאן."
              hint="content/exams/"
            />
          ) : (
            <CardGrid>
              {unitExams.map((exam) => {
                const unit = unitById(exam.unit ?? undefined);
                return (
                  <AssessmentCard
                    key={exam.id}
                    to={examPath(exam.id)}
                    icon={GraduationCap}
                    title={exam.title}
                    description={unit?.description}
                    meta={`${String(exam.questionCount)} שאלות · ${String(exam.maxScore)} נק' · ${minutesLabel(exam.estimatedTime)}`}
                  />
                );
              })}
            </CardGrid>
          )}
        </TabsContent>

        {/* --------------------------------------------------- lecturer */}
        <TabsContent value="lecturer">
          <TabIntro>
            מבחני העבר של ד"ר יצחק אביב, כפי שניתנו — אותן שאלות ואותם מסיחים, מילה במילה. רק סדר
            הופעת המסיחים מעורבל, ומתערבל מחדש בכל ניסיון. ההסברים נכתבו על ידינו: המרצה לא פרסם
            מפתח תשובות ולא הסברים.
          </TabIntro>

          {lecturerExams.length === 0 ? (
            <EmptyState
              icon={ScrollText}
              title="אין עדיין מבחני מרצה"
              description="מבחני העבר נמצאים תחת content/exams/lecturer, והם ייאספו לכאן."
              hint="content/exams/lecturer/"
            />
          ) : (
            <CardGrid>
              {lecturerExams.map((exam) => (
                <AssessmentCard
                  key={exam.id}
                  to={examPath(exam.id)}
                  icon={ScrollText}
                  title={exam.title}
                  meta={[
                    `${String(exam.questionCount)} שאלות`,
                    `${String(exam.maxScore)} נק'`,
                    exam.duration === null ? null : durationLabel(exam.duration),
                    'ללא חומר עזר',
                  ]
                    .filter((part): part is string => part !== null)
                    .join(' · ')}
                />
              ))}
            </CardGrid>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

function TabIntro({ children }: { readonly children: ReactNode }): ReactNode {
  return (
    <p className="mb-5 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">{children}</p>
  );
}

function CardGrid({ children }: { readonly children: ReactNode }): ReactNode {
  return <ul className="grid gap-3 sm:grid-cols-2">{children}</ul>;
}

function AssessmentCard({
  to,
  icon: Icon,
  title,
  description,
  meta,
}: {
  readonly to: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description?: string | undefined;
  readonly meta: string;
}): ReactNode {
  return (
    <li>
      <Link
        to={to}
        className="flex h-full items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
        <div className="space-y-1">
          <p className="font-semibold leading-snug">{title}</p>
          {description !== undefined ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
          <p className="text-sm text-muted-foreground">{meta}</p>
        </div>
      </Link>
    </li>
  );
}
