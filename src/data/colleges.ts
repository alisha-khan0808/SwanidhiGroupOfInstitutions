// Colleges of the group — one per department. DEMO names for now:
// edit them from the website admin panel (/admin/colleges) once Supabase
// has the `colleges` table (supabase/colleges.sql). This file is the
// local fallback / seed.
import { departments } from "./courses";

export interface College {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  department: string; // department slug whose courses this college offers
  location: string;
  image: string; // banner photo ("" = use the department photo)
  logo: string; // logo image URL ("" = department icon)
  badge: string; // e.g. "Verified", "Admissions Open"
  established: number | null;
  description: string;
  sortOrder: number;
}

const DEMO: [department: string, name: string, shortName: string][] = [
  ["medical", "Swanidhi Ayurvedic Medical College & Hospital", "Swanidhi Ayurveda"],
  ["nursing", "Swanidhi College of Nursing", "Swanidhi Nursing"],
  ["pharmacy", "Swanidhi College of Pharmacy", "Swanidhi Pharmacy"],
  ["paramedical-degree", "Swanidhi Institute of Paramedical Sciences", "SIPS"],
  ["paramedical-diploma", "Swanidhi Paramedical Training Institute", "SPTI"],
  ["paramedical-lateral-entry", "Swanidhi Institute of Allied Health — Lateral Entry", "SIAH Lateral"],
  ["paramedical-pg", "Swanidhi Institute of Advanced Allied Health Studies", "SIAAHS"],
  ["law", "Swanidhi Law College", "Swanidhi Law"],
  ["education", "Swanidhi College of Education", "Swanidhi B.Ed College"],
  ["management-it", "Swanidhi Institute of Management & Technology", "SIMT"],
  ["iti", "Swanidhi Private ITI", "Swanidhi ITI"],
];

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600&q=80`;

// Default campus photo per college (used when no photo is uploaded in admin).
const CAMPUS: Record<string, string> = {
  medical: u("1626315869436-d6781ba69d6e"),
  nursing: u("1607237138185-eedd9c632b0b"),
  pharmacy: u("1562774053-701939374585"),
  "paramedical-degree": u("1592280771190-3e2e4d571952"),
  "paramedical-diploma": u("1568792923760-d70635a89fdc"),
  "paramedical-lateral-entry": "/hero-bg.png",
  "paramedical-pg": u("1626315869436-d6781ba69d6e"),
  law: u("1568792923760-d70635a89fdc"),
  education: u("1562774053-701939374585"),
  "management-it": u("1592280771190-3e2e4d571952"),
  iti: u("1607237138185-eedd9c632b0b"),
};

/** Campus photo for a college: uploaded image, else the default for its department. */
export const campusImage = (c: Pick<College, "image" | "department"> | undefined, department: string) =>
  c?.image || CAMPUS[c?.department ?? department] || "/hero-bg.png";

export const colleges: College[] = DEMO.map(([department, name, shortName], i) => ({
  id: i + 1,
  slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
  name,
  shortName,
  department,
  location: "India",
  image: "",
  logo: "",
  badge: "Verified",
  established: null,
  description: departments.find((d) => d.slug === department)?.description ?? "",
  sortOrder: (i + 1) * 10,
}));
