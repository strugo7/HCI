import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { PageSkeleton } from '@/shared/components/page-skeleton';
import { Header } from '@/widgets/header/header';
import { Sidebar } from '@/widgets/sidebar/sidebar';

export function RootLayout(): ReactNode {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
