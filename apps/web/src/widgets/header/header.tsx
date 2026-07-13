import type { ReactNode } from 'react';

import { Separator } from '@/shared/components/ui/separator';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { course } from '@/shared/content/content';
import { ThemeToggle } from '@/widgets/header/theme-toggle';

export function Header(): ReactNode {
  const { title, code } = course();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />

      <p className="truncate text-sm text-muted-foreground">
        {title} · קורס {code}
      </p>

      <div className="ms-auto flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}
