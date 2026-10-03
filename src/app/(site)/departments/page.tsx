import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCourses } from "@/lib/content";
import { departments, formatLakh } from "@/data/courses";
import { BookOpen, GraduationCap, Layers, ArrowRight, Building2 } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore our 11 departments — Medical, Nursing, Pharmacy, Paramedical (Degree, Diploma, Lateral Entry, PG), Law, Education, Management & IT and ITI.",
};

export default async function DepartmentsPage() {
  const courses = await getCourses();

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-full mb-5">
              <BookOpen className="w-4 h-4" />
              Our Departments
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Explore Our Departments</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              From ITI trades after 10th to post-graduate programmes — find the department that matches your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-white/80 text-sm">
              <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {departments.length} Departments</div>
              <div className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {courses.length} Courses</div>
              <div className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> Certificate to Post Graduate</div>
            </div>
          </div>
        </div>

        {/* Department Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const deptCourses = courses.filter((c) => c.department === dept.slug);
              const fees = deptCourses.map((c) => c.totalFee);
              const levels = [...new Set(deptCourses.map((c) => c.level))];
              return (
                <Link key={dept.slug} href={`/departments/${dept.slug}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col">
                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-br ${dept.gradient} p-6`}>
                      <div className="flex items-center justify-between">
                        <span className="text-4xl">{dept.icon}</span>
                        <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {deptCourses.length} {deptCourses.length === 1 ? "Course" : "Courses"}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mt-3">{dept.name}</h2>
                      <p className="text-white/80 text-sm mt-1 line-clamp-2">{dept.description}</p>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      {fees.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">Total Fee Range</p>
                            <p className="text-sm font-bold text-green-600">
                              {formatLakh(Math.min(...fees))}
                              {Math.min(...fees) !== Math.max(...fees) && ` – ${formatLakh(Math.max(...fees))}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">Levels</p>
                            <p className="text-sm font-semibold text-gray-700">{levels.join(", ")}</p>
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Courses</p>
                        <div className="flex flex-wrap gap-1.5">
                          {deptCourses.slice(0, 6).map((c) => (
                            <span key={c.id} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                              {c.name}
                            </span>
                          ))}
                          {deptCourses.length > 6 && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{deptCourses.length - 6}</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        Explore Department <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
