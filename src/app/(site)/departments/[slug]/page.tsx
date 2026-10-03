import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { departments, getDepartment, formatINR, yearLabel } from "@/data/courses";
import { ArrowLeft, FileSignature, Phone, IndianRupee } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) return {};
  return { title: `${dept.name} Courses & Fees`, description: dept.description };
}

export default async function DepartmentPage({ params }: PageProps) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();

  const courses = (await getCourses()).filter((c) => c.department === dept.slug);
  const maxYears = Math.max(1, ...courses.map((c) => c.yearlyFees.length));

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="relative h-72 sm:h-80 w-full">
          <Image src={dept.image} alt={dept.name} fill className="object-cover" priority />
          <div className={`absolute inset-0 bg-gradient-to-r ${dept.gradient} opacity-85`} />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-8">
              <Link href="/departments" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-3">
                <ArrowLeft className="w-4 h-4" /> All Departments
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{dept.icon}</span>
                <h1 className="text-3xl sm:text-5xl font-bold text-white">{dept.name}</h1>
              </div>
              <p className="text-white/90 max-w-2xl">{dept.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          {/* Courses */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{courses.length} Courses in {dept.shortName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>

          {/* Fee table */}
          {courses.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-600" /> {dept.shortName} — Fee Structure
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-blue-50 text-blue-800">
                      <th className="text-left px-3 py-2.5 border border-blue-100">Course</th>
                      <th className="text-left px-3 py-2.5 border border-blue-100">Duration</th>
                      <th className="text-left px-3 py-2.5 border border-blue-100">Eligibility</th>
                      {Array.from({ length: maxYears }).map((_, i) => (
                        <th key={i} className="text-right px-3 py-2.5 border border-blue-100 whitespace-nowrap">{yearLabel(i)}</th>
                      ))}
                      <th className="text-right px-3 py-2.5 border border-green-100 bg-green-50 text-green-800">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, ri) => (
                      <tr key={c.id} className={ri % 2 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-3 py-2.5 border border-gray-100 font-semibold">
                          <Link href={`/courses/${c.slug}`} className="text-blue-700 hover:underline">{c.name}</Link>
                        </td>
                        <td className="px-3 py-2.5 border border-gray-100 text-gray-600">{c.duration}</td>
                        <td className="px-3 py-2.5 border border-gray-100 text-gray-600">{c.eligibility}</td>
                        {Array.from({ length: maxYears }).map((_, i) => (
                          <td key={i} className="px-3 py-2.5 border border-gray-100 text-right text-gray-700 whitespace-nowrap">
                            {c.yearlyFees[i] ? formatINR(c.yearlyFees[i]) : "—"}
                          </td>
                        ))}
                        <td className="px-3 py-2.5 border border-gray-100 text-right font-bold text-green-700 whitespace-nowrap">{formatINR(c.totalFee)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Interested in {dept.shortName}?</h3>
              <p className="text-blue-100">Apply online or call our admission helpline for guidance.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className="flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50">
                <FileSignature className="w-4 h-4" /> Apply Now
              </Link>
              <a href={BRAND.phoneHref} className="flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10">
                <Phone className="w-4 h-4" /> {BRAND.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
