import {
  Leaf, HeartPulse, Pill, Stethoscope, FlaskConical, TrendingUp, GraduationCap,
  Scale, BookOpen, Briefcase, Wrench, type LucideIcon,
} from "lucide-react";

// Icon shown on department tiles and course cards.
export const DEPARTMENT_ICONS: Record<string, LucideIcon> = {
  medical: Leaf,
  nursing: HeartPulse,
  pharmacy: Pill,
  "paramedical-degree": Stethoscope,
  "paramedical-diploma": FlaskConical,
  "paramedical-lateral-entry": TrendingUp,
  "paramedical-pg": GraduationCap,
  law: Scale,
  education: BookOpen,
  "management-it": Briefcase,
  iti: Wrench,
};

export const departmentIcon = (slug: string): LucideIcon => DEPARTMENT_ICONS[slug] ?? GraduationCap;
