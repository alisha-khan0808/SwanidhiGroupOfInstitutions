"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import CourseCard from "./CourseCard";
import { departments, type Course } from "@/data/courses";
import DepartmentIcon from "@/components/DepartmentIcon";

const tabs = ["nursing", "paramedical-degree", "pharmacy", "law", "management-it", "education", "iti"];

export default function FeaturedCourses({ courses }: { courses: Course[] }) {
  const [active, setActive] = useState("");
  const list = (active ? courses.filter((c) => c.department === active) : courses.filter((c) => c.featured)).slice(0, 8);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8">
          <div className="lg:w-[380px] shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-700">
              <Award className="w-3 h-3" /> Featured
            </span>
            <h2 className="mt-3 text-3xl sm:text-[2.1rem] font-extrabold text-indigo-950 tracking-tight leading-tight">Popular Courses at Swanidhi</h2>
            <p className="text-slate-500 mt-1.5 text-[15px]">Handpicked programmes with year-wise fees</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end flex-1">
            <TabChip on={active === ""} onClick={() => setActive("")}>All</TabChip>
            {tabs.map((slug) => {
              const d = departments.find((x) => x.slug === slug)!;
              return (
                <TabChip key={slug} on={active === slug} onClick={() => setActive(slug)}>
                  <DepartmentIcon slug={slug} className="w-3.5 h-3.5" /> {d.shortName}
                </TabChip>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:gap-2 transition-all">
            View all courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
    </section>
  );
}

function TabChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
        on ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/25" : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
      }`}
    >
      {children}
    </button>
  );
}
