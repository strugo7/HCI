import { Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/router/routes';
import { Button } from '@/shared/components/ui/button';
import { ThemeToggle } from '@/widgets/header/theme-toggle';

export function Header(): ReactNode {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
      <Button
        variant="outline"
        className="h-9 flex-1 justify-start gap-2 text-muted-foreground sm:max-w-xs"
        onClick={() => navigate(ROUTES.search)}
      >
        <Search className="size-4" aria-hidden />
        <span>חיפוש מושגים ושיעורים…</span>
      </Button>

      <div className="ms-auto flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}
