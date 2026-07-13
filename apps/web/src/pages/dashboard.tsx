import { BookOpen, Library, Network, TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/router/routes';
import { PageHeader } from '@/shared/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

const ENTRY_POINTS = [
  { to: ROUTES.lessons, title: 'שיעורים', description: 'למדו לפי סדר הקורס', icon: BookOpen },
  { to: ROUTES.glossary, title: 'מילון מושגים', description: 'כל מושג מוגדר פעם אחת', icon: Library },
  { to: ROUTES.graph, title: 'גרף ידע', description: 'הקשרים בין המושגים', icon: Network },
  { to: ROUTES.progress, title: 'התקדמות', description: 'מה שלטתם ומה נותר', icon: TrendingUp },
];

export default function DashboardPage(): ReactNode {
  return (
    <>
      <PageHeader
        title="ברוכים הבאים ל-CyberAtlas"
        description="פלטפורמת למידה לאבטחת מידע. כל שיעור בנוי ממושגים לשימוש חוזר, ולא מחומר שנכתב פעם אחת ונשכח."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ENTRY_POINTS.map(({ to, title, description, icon: Icon }) => (
          <Link key={to} to={to} className="group focus-visible:outline-none">
            <Card className="h-full transition-colors group-hover:border-primary/40 group-focus-visible:ring-2 group-focus-visible:ring-ring">
              <CardHeader>
                <Icon className="mb-2 size-5 text-muted-foreground" aria-hidden />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <Card className="mt-6 border-dashed">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          מאגר התוכן ריק כרגע. הוסיפו שיעור תחת{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">content/lessons/</code>{' '}
          והוא יופיע כאן אוטומטית.
        </CardContent>
      </Card>
    </>
  );
}
