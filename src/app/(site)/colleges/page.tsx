import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollegesClient, { type CollegeRow } from "./CollegesClient";
import { getCourses } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { departments } from "@/data/courses";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Colleges — Search, Filter & Compare",
  description: `Explore all colleges and departments of ${BRAND.name} — Medical, Nursing, Pharmacy, Paramedical, Law, Education, Management & IT and ITI.`,
};

export default async function CollegesPage() {
  const courses = await getCourses();
  const rows: CollegeRow[] = departments
    .map((d) => {
      const list = courses.filter((c) => c.department === d.slug);
      return {
        slug: d.slug,
        name: d.name,
        shortName: d.shortName,
        image: d.image,
        description: d.description,
        programmes: list.length,
        feesFrom: list.length ? Math.min(...list.map((c) => c.yearlyFees[0] ?? c.totalFee)) : 0,
        levels: [...new Set(list.map((c) => c.level))],
        popular: list.slice(0, 3).map((c) => ({ name: c.name, slug: c.slug })),
        search: [d.name, ...list.map((c) => `${c.name} ${c.fullName}`)].join(" ").toLowerCase(),
      };
    })
    .filter((r) => r.programmes > 0);

  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <CollegesClient rows={rows} />
      </Suspense>
      <Footer />
    </>
  );
}
