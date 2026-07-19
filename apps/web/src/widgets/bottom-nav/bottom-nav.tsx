import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/shared/lib/utils';
import { NAV_ITEMS } from '@/widgets/sidebar/nav-items';

/**
 * Mobile primary navigation. On phones the side drawer is replaced by a fixed
 * bottom tab bar (`md:hidden`) — thumb-reachable and always visible, the
 * expected pattern for a mobile app. On `md`+ this renders nothing and the
 * sidebar takes over.
 *
 * The bar sits above content via a fixed position; `RootLayout` pads the main
 * scroll area so nothing hides behind it. `env(safe-area-inset-bottom)` keeps
 * the tappable row clear of the iOS home indicator.
 */
export function BottomNav(): ReactNode {
  const { pathname } = useLocation();

  const isActive = (to: string, end?: boolean): boolean =>
    end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <nav
      aria-label="ניווט ראשי"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex h-16 items-stretch">
        {NAV_ITEMS.map(({ to, label, shortLabel, icon: Icon, end }) => {
          const active = isActive(to, end);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex h-full flex-col items-center justify-center gap-1 px-1 transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {/* Gold indicator on the active tab — the design-system accent. */}
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-3 top-0 h-0.5 rounded-full bg-gold transition-opacity',
                    active ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="max-w-full truncate text-[10px] font-medium leading-none">
                  {shortLabel ?? label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
