"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CourseCard from "./CourseCard";
import type { Course } from "@/data/courses";

const filterTabs = [
  { label: "Popular", value: "" },
  { label: "Nursing", value: "nursing" },
  { label: "Paramedical", value: "paramedical" },
  { label: "Pharmacy", value: "pharmacy" },
  { label: "Law", value: "law" },
  { label: "Management & IT", value: "management-it" },
  { label: "Education", value: "education" },
  { label: "ITI", value: "iti" },
];

export default function FeaturedCourses({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState("");

  const filtered = (
    activeTab === ""
      ? courses.filter((c) => c.featured)
      : courses.filter((c) => c.department.startsWith(activeTab))
  ).slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">Top Picks</p>
            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
            <p className="text-gray-500 mt-2">Duration, eligibility and complete fee details for every programme</p>
          </div>
          <Link href="/courses" className="hidden sm:flex items-center gap-1 text-blue-600 text-sm font-medium hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.value)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
          >
            View All {courses.length} Courses <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
