import {
  BookOpen,
  BrainCircuit,
  GraduationCap,
  LayoutDashboard,
  Library,
  Network,
  Settings,
  Shield,
  TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '@/router/routes';
import { cn } from '@/shared/lib/utils';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const PRIMARY: NavItem[] = [
  { to: ROUTES.dashboard, label: 'סקירה', icon: LayoutDashboard, end: true },
  { to: ROUTES.lessons, label: 'שיעורים', icon: BookOpen },
  { to: ROUTES.glossary, label: 'מילון מושגים', icon: Library },
  { to: ROUTES.graph, label: 'גרף ידע', icon: Network },
];

const PRACTICE: NavItem[] = [
  { to: ROUTES.practice, label: 'תרגול', icon: BrainCircuit },
  { to: ROUTES.exams, label: 'מבחנים', icon: GraduationCap },
  { to: ROUTES.progress, label: 'התקדמות', icon: TrendingUp },
];

function NavSection({ title, items }: { title: string; items: NavItem[] }): ReactNode {
  return (
    <div className="space-y-1">
      <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end ?? false}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )
          }
        >
          <Icon className="size-4 shrink-0" aria-hidden />
          {label}
        </NavLink>
      ))}
    </div>
  );
}

export function Sidebar(): ReactNode {
  return (
    // `border-e` not `border-r`: in RTL the sidebar sits on the right, and the
    // border must follow it.
    <aside className="hidden w-64 shrink-0 flex-col gap-6 border-e bg-card p-4 lg:flex">
      <NavLink to={ROUTES.dashboard} className="flex items-center gap-2.5 px-2 py-1.5">
        <div className="rounded-lg bg-primary p-1.5">
          <Shield className="size-5 text-primary-foreground" aria-hidden />
        </div>
        <div className="leading-tight">
          <p className="font-semibold">CyberAtlas</p>
          <p className="text-xs text-muted-foreground">אבטחת מידע</p>
        </div>
      </NavLink>

      <nav className="flex flex-1 flex-col gap-4">
        <NavSection title="למידה" items={PRIMARY} />
        <NavSection title="הערכה" items={PRACTICE} />
      </nav>

      <NavLink
        to={ROUTES.settings}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          )
        }
      >
        <Settings className="size-4" aria-hidden />
        הגדרות
      </NavLink>
    </aside>
  );
}
