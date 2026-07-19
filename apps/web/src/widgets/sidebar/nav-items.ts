import { BookOpen, GraduationCap, Home, Layers, Library, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ROUTES } from '@/router/routes';

export interface NavItem {
  to: string;
  label: string;
  /** Compact label for the mobile bottom bar, where each cell is narrow. */
  shortLabel?: string;
  icon: LucideIcon;
  /** Only the home route needs exact matching — everything else nests. */
  end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.dashboard, label: 'מסך הבית', shortLabel: 'בית', icon: Home, end: true },
  { to: ROUTES.lessons, label: 'שיעורים', icon: BookOpen },
  { to: ROUTES.glossary, label: 'מונחים', icon: Library },
  { to: ROUTES.flashcards, label: 'כרטיסי זיכרון', shortLabel: 'כרטיסים', icon: Layers },
  { to: ROUTES.practice, label: 'תרגול ומבחנים', shortLabel: 'תרגול', icon: GraduationCap },
  { to: ROUTES.graph, label: 'גרף הידע', shortLabel: 'גרף', icon: Network },
];
