import {
  Bug,
  Crosshair,
  Fingerprint,
  Radar,
  Server,
  Shield,
  ShieldCheck,
  Siren,
  Swords,
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
  foundations: Shield,
  malware: Bug,
  'attack-anatomy': Crosshair,
  'applied-attack': Swords,
  'defense-principles': ShieldCheck,
  'identity-access': Fingerprint,
  'ids-ips': Radar,
  'perimeter-dmz': Server,
  'incident-response-unit': Siren,
};

export function unitIcon(unitId: string): LucideIcon {
  return UNIT_ICONS[unitId] ?? Shield;
}
