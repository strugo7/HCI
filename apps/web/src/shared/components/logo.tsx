import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

/**
 * HCI · Beyond Pixels logo, per the "Logo Design System" spec.
 *
 * The mark is a navy square (always opaque, so it reads on any allowed
 * background) carrying three gold dots joined by a rising line — a minimal
 * knowledge map, the "atlas" at the platform's core. Only two colours are ever
 * used: navy ink and gold. The gold is bound to the `--gold` token, so it
 * brightens automatically in dark mode; the navy square stays constant.
 *
 * `simplified` drops the connecting lines and enlarges the dots — the form used
 * at favicon / tiny-avatar sizes where the thin lines would disappear.
 */
export function LogoMark({
  size = 36,
  simplified = false,
  className,
}: {
  size?: number;
  simplified?: boolean;
  className?: string | undefined;
}): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      className={cn('shrink-0', className)}
      role="img"
      aria-label="HCI · Beyond Pixels"
    >
      <rect width="56" height="56" rx="12" fill="hsl(222 47% 11%)" />
      {simplified ? (
        <>
          <circle cx="16" cy="40" r="6" fill="hsl(var(--gold))" />
          <circle cx="29" cy="27" r="6" fill="hsl(var(--gold))" />
          <circle cx="42" cy="16" r="6" fill="hsl(var(--gold))" />
        </>
      ) : (
        <>
          <line x1="16" y1="40" x2="29" y2="27" stroke="hsl(var(--gold))" strokeWidth="2" opacity="0.55" />
          <line x1="29" y1="27" x2="42" y2="16" stroke="hsl(var(--gold))" strokeWidth="2" opacity="0.55" />
          <circle cx="16" cy="40" r="4.4" fill="hsl(var(--gold))" />
          <circle cx="29" cy="27" r="4.4" fill="hsl(var(--gold))" />
          <circle cx="42" cy="16" r="4.4" fill="hsl(var(--gold))" />
        </>
      )}
    </svg>
  );
}

type LogoVariant = 'full' | 'horizontal' | 'mark';

/**
 * The full lockup. `variant`:
 * - `full` — mark + "HCI" over the "Beyond Pixels" tagline (default).
 * - `horizontal` — mark + "HCI", no tagline (nav / page headers).
 * - `mark` — the symbol alone (favicon / small avatar; uses the simplified form).
 *
 * The wordmark is Heebo throughout (inherited from the app font); the tagline
 * is the only gold text and is never given an outline or shadow.
 */
export function Logo({
  variant = 'full',
  size = 36,
  className,
}: {
  variant?: LogoVariant;
  size?: number;
  className?: string | undefined;
}): ReactNode {
  if (variant === 'mark') {
    return <LogoMark size={size} simplified className={className} />;
  }

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-foreground">HCI</span>
        {variant === 'full' && (
          <span className="mt-1 text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-gold">
            Beyond Pixels
          </span>
        )}
      </span>
    </span>
  );
}
