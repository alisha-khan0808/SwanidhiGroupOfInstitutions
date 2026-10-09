import { GraduationCap } from "lucide-react";
import { DEPARTMENT_ICONS } from "@/lib/departmentIcons";

// Renders the icon for a department slug (see src/lib/departmentIcons.ts).
export default function DepartmentIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = DEPARTMENT_ICONS[slug] ?? GraduationCap;
  return <Icon className={className} />;
}
