import Link from "next/link";
import Image from "next/image";
import { Clock, GraduationCap } from "lucide-react";
import { type Course, getDepartment, formatINR, formatLakh } from "@/data/courses";

export const levelColors: Record<string, string> = {
  Certificate: "bg-orange-100 text-orange-700",
  Diploma: "bg-sky-100 text-sky-700",
  Degree: "bg-green-100 text-green-700",
  Integrated: "bg-amber-100 text-amber-700",
  "Lateral Entry": "bg-teal-100 text-teal-700",
  "Post Graduate": "bg-purple-100 text-purple-700",
};

export default function CourseCard({ course }: { course: Course }) {
  const dept = getDepartment(course.department);

  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-blue-600">
            {dept?.shortName ?? course.department}
          </div>
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${levelColors[course.level] ?? "bg-gray-100 text-gray-700"}`}>
            {course.level}
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white text-xl font-black drop-shadow">{course.name}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.fullName}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
            <Clock className="w-3 h-3 shrink-0" />
            <span className="truncate">{course.duration}</span>
          </div>
          <div className="flex items-start gap-1.5 text-gray-500 text-xs mb-3">
            <GraduationCap className="w-3 h-3 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{course.eligibility}</span>
          </div>

          {/* Stats footer */}
          <div className="mt-auto border-t border-gray-100 pt-3 grid grid-cols-2 gap-1">
            <div>
              <p className="text-xs text-gray-400">1st Year Fee</p>
              <p className="text-xs font-bold text-blue-600">{formatINR(course.yearlyFees[0] ?? 0)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Total Course Fee</p>
              <p className="text-xs font-bold text-green-600">{formatLakh(course.totalFee)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
