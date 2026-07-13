import type { ReactNode } from 'react';

/** Shown while a lazily-loaded route chunk is in flight. */
export function PageSkeleton(): ReactNode {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="טוען">
      <div className="h-9 w-64 rounded-md bg-muted" />
      <div className="h-4 w-96 rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-36 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
