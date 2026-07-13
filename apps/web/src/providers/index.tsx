import type { ReactNode } from 'react';

import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

export function AppProviders({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}

export { ThemeContext, ThemeProvider, type Theme } from './theme-provider';
export { QueryProvider } from './query-provider';
