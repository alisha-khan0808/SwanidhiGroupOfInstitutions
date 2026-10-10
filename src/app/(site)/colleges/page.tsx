import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollegesClient, { type CollegeCardData } from "./CollegesClient";
import { getColleges, getCourses } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { getDepartment } from "@/data/courses";
import { campusImage } from "@/data/colleges";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Colleges — Search, Filter & Compare",
  description: `Explore all colleges of ${BRAND.name} — Medical, Nursing, Pharmacy, Paramedical, Law, Education, Management & IT and ITI.`,
};

export default async function CollegesPage() {
  const [courses, colleges] = await Promise.all([getCourses(), getColleges()]);

  const rows: CollegeCardData[] = colleges.map((col) => {
    const dept = getDepartment(col.department);
    const list = courses.filter((c) => c.department === col.department);
    return {
      slug: col.slug,
      name: col.name,
      department: col.department,
      deptName: dept?.name ?? col.department,
      location: col.location || BRAND.address,
      image: campusImage(col, col.department),
      logo: col.logo,
      badge: col.badge,
      established: col.established,
      programmes: list.length,
      feesFrom: list.length ? Math.min(...list.map((c) => c.yearlyFees[0] ?? c.totalFee)) : 0,
      levels: [...new Set(list.map((c) => c.level))],
      popular: list.slice(0, 3).map((c) => ({ name: c.name, slug: c.slug })),
      search: [col.name, col.shortName, col.location, dept?.name ?? "", ...list.map((c) => `${c.name} ${c.fullName}`)].join(" ").toLowerCase(),
    };
  });

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
