import type { ReactNode } from 'react';

import { useTheme } from '@/shared/hooks/use-theme';
import { PageHeader } from '@/shared/components/page-header';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { Theme } from '@/providers/theme-provider';

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: 'בהיר' },
  { value: 'dark', label: 'כהה' },
  { value: 'system', label: 'לפי המערכת' },
];

export default function SettingsPage(): ReactNode {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <PageHeader title="הגדרות" description="העדפות תצוגה ולמידה." />
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>ערכת נושא</CardTitle>
          <CardDescription>בחרו כיצד הממשק ייראה.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          {THEMES.map(({ value, label }) => (
            <Button
              key={value}
              variant={theme === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme(value)}
              aria-pressed={theme === value}
            >
              {label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
