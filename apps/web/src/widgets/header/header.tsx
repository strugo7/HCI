import type { ReactNode } from 'react';

import { COURSE } from '@/features/curriculum/units';
import { Separator } from '@/shared/components/ui/separator';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { ThemeToggle } from '@/widgets/header/theme-toggle';

export function Header(): ReactNode {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />

      <p className="truncate text-sm text-muted-foreground">
        {COURSE.title} · קורס {COURSE.code}
      </p>

      <div className="ms-auto flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}
