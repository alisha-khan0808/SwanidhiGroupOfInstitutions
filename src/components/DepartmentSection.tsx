"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { departments, type Course } from "@/data/courses";

const VISIBLE_ON_MOBILE = 3;

export default function DepartmentSection({ courses }: { courses: Course[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const positions = Math.max(1, departments.length + 1 - VISIBLE_ON_MOBILE + 1);

  const cardStep = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  };

  const onScroll = () => {
    const step = cardStep();
    if (step) setActive(Math.min(positions - 1, Math.round((trackRef.current?.scrollLeft ?? 0) / step)));
  };

  const goTo = (i: number) => {
    trackRef.current?.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  return (
    <section className="py-14 lg:py-16 bg-white lg:bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">Explore Our Departments</p>
            <h2 className="text-3xl font-black lg:font-bold text-gray-900 leading-tight">
              11 Departments, <br className="sm:hidden" />
              <span className="lg:text-blue-600">49 Career-Ready Courses</span>
            </h2>
            <p className="text-gray-500 mt-2">Certificate, diploma, degree and post-graduate programmes under one roof</p>
          </div>
          <Link href="/departments" className="hidden sm:flex items-center gap-1.5 bg-white border border-gray-200 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition-all shrink-0">
            View All Departments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile/tablet: swipeable row (3 visible). Desktop: grid. */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-1 px-1 pb-2 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0"
        >
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group snap-start shrink-0 w-[calc((100%-1rem)/3)] lg:w-auto bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[5/4] overflow-hidden m-1.5 mb-0 rounded-xl">
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 33vw, 16vw"
                />
              </div>
              <div className="p-2.5 lg:p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-[13px] lg:text-sm mb-0.5 leading-tight group-hover:text-blue-600 transition-colors">
                  {dept.shortName}
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  {courses.filter((c) => c.department === dept.slug).length}{" "}
                  {courses.filter((c) => c.department === dept.slug).length === 1 ? "Course" : "Courses"}
                </p>
                <div className="mt-auto self-start text-xs font-semibold px-3 lg:px-4 py-1.5 rounded-full inline-flex items-center gap-1 bg-blue-50 text-blue-600 lg:bg-blue-600 lg:text-white group-hover:gap-1.5 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}

          {/* 12th tile completes the desktop grid */}
          <Link
            href="/courses"
            className="group snap-start shrink-0 w-[calc((100%-1rem)/3)] lg:w-auto rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center justify-center text-center p-4"
          >
            <span className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-3">
              <LayoutGrid className="w-6 h-6 lg:w-7 lg:h-7" />
            </span>
            <span className="font-bold text-[13px] lg:text-base leading-tight">All {courses.length} Courses</span>
            <span className="text-[11px] lg:text-xs text-white/80 mt-1 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Browse <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Dots (mobile/tablet only) */}
        <div className="flex justify-center gap-2 mt-5 lg:hidden">
          {Array.from({ length: positions }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
