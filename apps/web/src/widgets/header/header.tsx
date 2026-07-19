import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '@/shared/components/logo';
import { Separator } from '@/shared/components/ui/separator';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { course } from '@/shared/content/content';
import { ROUTES } from '@/router/routes';
import { ThemeToggle } from '@/widgets/header/theme-toggle';

export function Header(): ReactNode {
  const { title, code } = course();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
      {/* Desktop: drawer/collapse trigger. Mobile: nav lives in BottomNav, so
          the trigger is hidden and the logo carries the branding instead. */}
      <SidebarTrigger className="hidden md:inline-flex" />
      <Separator orientation="vertical" className="hidden h-5 md:block" />

      <Link to={ROUTES.dashboard} aria-label="HCI · Beyond Pixels — לדף הבית" className="md:hidden">
        <Logo variant="horizontal" size={28} />
      </Link>

      <p className="hidden truncate text-sm text-muted-foreground md:block">
        {title} · קורס {code}
      </p>

      <div className="ms-auto flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}
