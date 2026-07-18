import {
  BookOpen,
  Brain,
  ClipboardCheck,
  Eye,
  Gauge,
  Lightbulb,
  MessageSquareText,
  Network,
  Palette,
  PencilRuler,
  Users,
  type LucideIcon,
} from 'lucide-react';

/**
 * The one thing about a unit that is presentation, not content: its icon.
 *
 * Everything else — title, description, lesson list, exam weight, the course
 * name itself — comes from `content/curriculum.yaml` through the compiled
 * index. This file must never grow a second copy of any of it.
 */
const UNIT_ICONS: Record<string, LucideIcon> = {
  introduction: BookOpen,
  'cognitive-psychology': Brain,
  'ethnographic-research': Eye,
  'personas-and-scenarios': Users,
  'information-architecture': Network,
  'design-rules': Palette,
  'examine-concept': PencilRuler,
  'design-thinking': Lightbulb,
  usability: Gauge,
  'usability-testing': ClipboardCheck,
  'micro-copy': MessageSquareText,
};

export function unitIcon(unitId: string): LucideIcon {
  return UNIT_ICONS[unitId] ?? BookOpen;
}
