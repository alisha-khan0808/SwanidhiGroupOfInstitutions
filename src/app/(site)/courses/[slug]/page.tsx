import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCourses } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import EnquiryForm from "@/components/EnquiryForm";
import { BRAND } from "@/lib/brand";
import { courseLabel, formatINR, getDepartment, yearLabel } from "@/data/courses";
import {
  Award, BookOpen, ArrowLeft, CheckCircle2, Phone, Clock,
  GraduationCap, Briefcase, IndianRupee, Layers, FileSignature,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = (await getCourses()).find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.name} — Fees, Eligibility & Duration`,
    description: `${course.fullName} at ${BRAND.name}: ${course.duration}, eligibility ${course.eligibility}, total fee ${formatINR(course.totalFee)}.`,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const courses = await getCourses();
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const dept = getDepartment(course.department);
  const similar = courses.filter((c) => c.id !== course.id && c.department === course.department).slice(0, 4);
  const yearlySum = course.yearlyFees.reduce((a, b) => a + b, 0);

  const quickStats = [
    { label: "Duration", value: course.duration, color: "text-gray-800" },
    { label: "Level", value: course.level, color: "text-purple-600" },
    { label: "1st Year Fee", value: formatINR(course.yearlyFees[0] ?? 0), color: "text-blue-600" },
    { label: "Total Course Fee", value: formatINR(course.totalFee), color: "text-green-600" },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="relative h-72 sm:h-96 w-full">
          <Image src={course.image} alt={course.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="max-w-7xl mx-auto">
              <Link href="/courses" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-3 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Courses
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {dept && (
                      <Link href={`/departments/${dept.slug}`} className="text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
                        {dept.icon} {dept.name}
                      </Link>
                    )}
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full">
                      Admissions Open {BRAND.session}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black text-white mb-1">{course.name}</h1>
                  <p className="text-white/80 text-sm sm:text-base">{course.fullName}</p>
                </div>
                <Link
                  href={`/apply?course=${encodeURIComponent(courseLabel(course))}`}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-5 py-3 self-start sm:self-auto shadow-lg"
                >
                  <FileSignature className="w-5 h-5" /> Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
              {quickStats.map((s) => (
                <div key={s.label} className="py-3 px-3 text-center">
                  <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
                  <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-5">
              {/* About */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" /> About {course.name}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">{course.description}</p>
              </div>

              {/* Fee Structure */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-green-600" /> Fee Structure (Year-wise)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        {course.yearlyFees.map((_, i) => (
                          <th key={i} className="text-center px-4 py-2.5 font-semibold text-blue-800 border border-blue-100">{yearLabel(i)}</th>
                        ))}
                        <th className="text-center px-4 py-2.5 font-semibold text-green-800 bg-green-50 border border-green-100">Total Course Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {course.yearlyFees.map((f, i) => (
                          <td key={i} className="text-center px-4 py-3 text-gray-800 font-semibold border border-gray-100">{formatINR(f)}</td>
                        ))}
                        <td className="text-center px-4 py-3 font-black text-green-700 bg-green-50/50 border border-green-100">{formatINR(course.totalFee)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {course.feeNote && <p className="text-xs text-gray-500 mt-3">Note: {course.feeNote}</p>}
                {yearlySum !== course.totalFee && (
                  <p className="text-xs text-gray-500 mt-3">
                    Total course fee is as per the published fee structure. Contact the admission office for the latest fee details.
                  </p>
                )}
              </div>

              {/* Highlights */}
              {course.highlights.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" /> Programme Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Careers */}
              {course.careers.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" /> Career Opportunities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {course.careers.map((c) => (
                      <span key={c} className="bg-gray-100 hover:bg-blue-50 text-gray-700 text-sm px-3 py-1.5 rounded-full transition-colors">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick Info */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-blue-600 p-4">
                  <h3 className="font-bold text-white text-lg">{course.name}</h3>
                  <p className="text-blue-200 text-sm">{dept?.name}</p>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: GraduationCap, label: "Eligibility", value: course.eligibility },
                    { icon: Layers, label: "Level", value: course.level },
                    { icon: IndianRupee, label: "Total Fee", value: formatINR(course.totalFee), highlight: true },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-start gap-4 py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500 flex items-center gap-1.5 shrink-0"><item.icon className="w-3.5 h-3.5" />{item.label}</span>
                      <span className={`text-sm font-semibold text-right ${item.highlight ? "text-green-600" : "text-gray-800"}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquiry */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">Get Admission Details</h3>
                <p className="text-xs text-gray-500 mb-4">Share your details — our admission team will call you back.</p>
                <EnquiryForm
                  courses={courses.map((c) => ({ name: c.name, fullName: c.fullName, department: c.department }))}
                  defaultCourse={courseLabel(course)}
                  source="Course Page"
                />
              </div>

              {/* Counselling CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <h3 className="font-bold text-lg mb-1">Talk to Admissions</h3>
                <p className="text-blue-200 text-sm mb-4">Questions about {course.name}? Call our admission helpline.</p>
                <a
                  href={BRAND.phoneHref}
                  className="flex items-center justify-center gap-2 bg-white text-blue-600 font-bold text-sm px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors w-full"
                >
                  <Phone className="w-4 h-4" /> {BRAND.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Similar Courses */}
          {similar.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5">More Courses in {dept?.shortName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {similar.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
