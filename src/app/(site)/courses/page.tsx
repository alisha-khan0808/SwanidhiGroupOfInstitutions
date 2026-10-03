import { Suspense } from "react";
import type { Metadata } from "next";
import { getCourses } from "@/lib/content";
import CoursesClient from "./CoursesClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Courses — Fees, Duration & Eligibility",
  description: "Browse 49 courses in medical, nursing, paramedical, pharmacy, law, education, management and ITI — with year-wise fees, duration and eligibility.",
};

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    }>
      <CoursesClient courses={courses} />
    </Suspense>
  );
}
