import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Card, CardContent } from './ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  hint?: string;
}

/**
 * Every screen is content-driven, and the vault is currently empty. Rather
 * than fake data, each page says plainly what it is waiting for.
 */
export function EmptyState({ icon: Icon, title, description, hint }: EmptyStateProps): ReactNode {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <div className="rounded-full bg-muted p-3">
          <Icon className="size-6 text-muted-foreground" aria-hidden />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
        {hint ? (
          <p className="mt-2 rounded-md bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
