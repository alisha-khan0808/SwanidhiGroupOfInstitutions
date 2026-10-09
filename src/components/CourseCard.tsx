import Link from "next/link";
import { ArrowRight, Building2, Clock, Star } from "lucide-react";
import { type Course, getDepartment, formatLakh } from "@/data/courses";
import DepartmentIcon from "@/components/DepartmentIcon";

export const levelColors: Record<string, string> = {
  Certificate: "bg-orange-50 text-orange-700 border-orange-100",
  Diploma: "bg-sky-50 text-sky-700 border-sky-100",
  Degree: "bg-indigo-50 text-indigo-700 border-indigo-100",
  Integrated: "bg-amber-50 text-amber-700 border-amber-100",
  "Lateral Entry": "bg-teal-50 text-teal-700 border-teal-100",
  "Post Graduate": "bg-violet-50 text-violet-700 border-violet-100",
};

// Short level tag like the reference's "UG • 3 Years".
export const levelTag = (level: Course["level"]) =>
  level === "Post Graduate" ? "PG" : level === "Degree" || level === "Integrated" || level === "Lateral Entry" ? "UG" : level;

export default function CourseCard({ course }: { course: Course }) {
  const dept = getDepartment(course.department);
  const tags = course.careers.slice(0, 2);
  const more = Math.max(0, course.careers.length - tags.length);

  return (
    <div className="group h-full flex flex-col rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 hover:border-indigo-200 transition-all">
      <div className="flex items-start gap-3">
        <span className="w-12 h-12 rounded-xl border border-slate-100 bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <DepartmentIcon slug={course.department} className="w-5 h-5" />
        </span>
        <div className="flex-1 min-w-0">
          <Link href={`/courses/${course.slug}`} className="block font-bold text-slate-900 text-[15px] leading-snug line-clamp-2 group-hover:text-indigo-700">
            {course.name}
          </Link>
          <p className="flex items-center gap-1 text-xs text-slate-500 mt-1 truncate">
            <Building2 className="w-3 h-3 shrink-0" /> {dept?.shortName}
          </p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${levelColors[course.level] ?? "bg-slate-50 text-slate-600 border-slate-100"}`}>
          {levelTag(course.level)}
        </span>
      </div>

      <p className="text-xs text-slate-500 mt-3 line-clamp-1" title={course.fullName}>{course.fullName}</p>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">
          Total: {formatLakh(course.totalFee)}
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">
          <Clock className="w-3 h-3" /> {course.duration.replace(/ Month Internship| Year Internship/, " Intern.")}
        </span>
        {course.featured && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Popular
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
        {tags.map((t) => (
          <span key={t} className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[11px] text-slate-600 max-w-full truncate">{t}</span>
        ))}
        {more > 0 && <span className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[11px] text-slate-500">+{more}</span>}
      </div>

      <Link
        href={`/courses/${course.slug}`}
        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-[13px] font-semibold text-slate-800 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
      >
        Explore Course <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
