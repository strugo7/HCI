import { MousePointer2, Search } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '@/router/routes';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';

import { NAV_ITEMS } from './nav-items';

function useIsActive(): (to: string, end?: boolean) => boolean {
  const { pathname } = useLocation();
  return (to, end) => (end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`));
}

/**
 * Search lives in the sidebar rather than the header so the student's two
 * ways of reaching content — browsing and searching — sit together.
 *
 * Not wired to the search engine yet; this is the surface only.
 */
function NavSearch(): ReactNode {
  const [query, setQuery] = useState('');

  return (
    <div className="relative group-data-[collapsible=icon]:hidden">
      <Search
        className="pointer-events-none absolute inset-y-0 start-2.5 my-auto size-4 text-muted-foreground"
        aria-hidden
      />
      <SidebarInput
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="חיפוש שיעורים ומונחים…"
        aria-label="חיפוש שיעורים ומונחים"
        className="ps-8"
      />
    </div>
  );
}

/**
 * `side="left"` is logical, not physical: the component maps it to `start-0`,
 * which under `dir="rtl"` renders on the right, with `border-e` facing the
 * content. Do not "fix" this to `side="right"` — that would move it to the left.
 */
export function AppSidebar(): ReactNode {
  const isActive = useIsActive();

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader className="gap-3">
        <Link
          to={ROUTES.dashboard}
          className="flex items-center gap-2.5 rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="relative shrink-0">
            <div className="grid size-9 place-items-center rounded-lg bg-primary">
              <MousePointer2 className="size-4 text-primary-foreground" aria-hidden />
            </div>
            <span
              aria-hidden
              className="absolute -end-0.5 -top-0.5 size-2.5 rounded-full bg-gold ring-2 ring-card"
            />
          </div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <p className="font-semibold">מנשק אדם-מחשב</p>
            <p className="text-xs text-muted-foreground">הכנה למבחן · HCI</p>
          </div>
        </Link>

        <NavSearch />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton asChild isActive={isActive(to, end)} tooltip={label}>
                  <Link to={to}>
                    <Icon aria-hidden />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
