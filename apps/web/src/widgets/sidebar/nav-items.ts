import { BookOpen, GraduationCap, Home, Layers, Library, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ROUTES } from '@/router/routes';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Only the home route needs exact matching — everything else nests. */
  end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.dashboard, label: 'מסך הבית', icon: Home, end: true },
  { to: ROUTES.lessons, label: 'שיעורים', icon: BookOpen },
  { to: ROUTES.glossary, label: 'מונחים', icon: Library },
  { to: ROUTES.flashcards, label: 'כרטיסי זיכרון', icon: Layers },
  { to: ROUTES.practice, label: 'תרגול ומבחנים', icon: GraduationCap },
  { to: ROUTES.graph, label: 'גרף הידע', icon: Network },
];
