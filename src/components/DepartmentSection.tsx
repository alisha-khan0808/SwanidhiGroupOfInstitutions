import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { departments, type Course } from "@/data/courses";
import DepartmentIcon from "@/components/DepartmentIcon";

export default function DepartmentSection({ courses }: { courses: Course[] }) {
  return (
    <section className="py-16 lg:py-20 bg-violet-50/70">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-indigo-950 tracking-tight">Explore by Department</h2>
          <p className="text-slate-500 mt-1.5 text-[15px] font-medium">Pick your path — we&apos;ll show you the right course</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {departments.map((d) => {
            const n = courses.filter((c) => c.department === d.slug).length;
            return (
              <Link
                key={d.slug}
                href={`/departments/${d.slug}`}
                className="group relative rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:shadow-indigo-900/5 hover:-translate-y-0.5 hover:border-indigo-200 transition-all"
              >
                <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                <span className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <DepartmentIcon slug={d.slug} className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-slate-900 text-[15px] leading-snug">{d.shortName}</h3>
                <p className="text-xs text-slate-500 mt-1">{n} {n === 1 ? "course" : "courses"}</p>
              </Link>
            );
          })}
          <Link href="/courses" className="group relative rounded-2xl bg-indigo-600 p-4 sm:p-5 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
            <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-white/70" />
            <span className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-5">
              <LayoutGrid className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-[15px]">All Courses</h3>
            <p className="text-xs text-white/75 mt-1">Browse all {courses.length} programmes</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
