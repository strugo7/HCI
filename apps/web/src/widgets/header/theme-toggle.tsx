import { Moon, Sun } from 'lucide-react';
import type { ReactNode } from 'react';

import { useTheme } from '@/shared/hooks/use-theme';
import { Button } from '@/shared/components/ui/button';

export function ThemeToggle(): ReactNode {
  const { resolved, setTheme } = useTheme();
  const next = resolved === 'dark' ? 'light' : 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={next === 'dark' ? 'מעבר למצב כהה' : 'מעבר למצב בהיר'}
    >
      {resolved === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
