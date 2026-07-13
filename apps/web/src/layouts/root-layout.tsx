import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { PageSkeleton } from '@/shared/components/page-skeleton';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { Header } from '@/widgets/header/header';
import { AppSidebar } from '@/widgets/sidebar/sidebar';

export function RootLayout(): ReactNode {
  return (
    // SidebarProvider owns the open/collapsed state, persists it to a cookie,
    // and binds Cmd/Ctrl+B. The mobile drawer is a Sheet, handled internally.
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
