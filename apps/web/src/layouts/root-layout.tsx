import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { PageSkeleton } from '@/shared/components/page-skeleton';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { BottomNav } from '@/widgets/bottom-nav/bottom-nav';
import { Header } from '@/widgets/header/header';
import { AppSidebar } from '@/widgets/sidebar/sidebar';

export function RootLayout(): ReactNode {
  return (
    // SidebarProvider owns the open/collapsed state, persists it to a cookie,
    // and binds Cmd/Ctrl+B. On desktop AppSidebar is the nav; on mobile it's
    // BottomNav (a fixed bottom tab bar), so the main area gets bottom padding
    // there to clear it.
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-8 md:pb-8 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
        <BottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
