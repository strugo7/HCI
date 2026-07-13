import { DirectionProvider } from '@radix-ui/react-direction';
import type { ReactNode } from 'react';

import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

/**
 * `dir` is on <html>, but Radix does not read the DOM for it — it reads this
 * provider, and defaults to LTR without it. Without this, the arrow keys in a
 * RadioGroup move the *opposite* way from the options a student is looking at.
 */
export function AppProviders({ children }: { children: ReactNode }): ReactNode {
  return (
    <DirectionProvider dir="rtl">
      <ThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </DirectionProvider>
  );
}

export { ThemeContext, ThemeProvider, type Theme } from './theme-provider';
export { QueryProvider } from './query-provider';
