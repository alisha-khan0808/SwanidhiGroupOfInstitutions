import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrintButton from "./PrintButton";
import { getCourses } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { departments, formatINR } from "@/data/courses";
import { IndianRupee } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fee Structure",
  description: `Complete course-wise and year-wise fee structure of ${BRAND.name} for session ${BRAND.session}.`,
};

const YEARS = 4;

export default async function FeeStructurePage() {
  const courses = await getCourses();
  // Serial numbers follow the department-grouped order shown in the table.
  const serialOf = new Map(
    departments.flatMap((d) => courses.filter((c) => c.department === d.slug)).map((c, i) => [c.id, i + 1])
  );

  return (
    <>
      <div className="print:hidden"><Navbar /></div>
      <div className="bg-gray-50 min-h-screen print:bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-12 px-4 print:hidden">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-full mb-4">
              <IndianRupee className="w-4 h-4" />
              Session {BRAND.session}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Course Fee Structure</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">Duration, eligibility and year-wise fee for all {courses.length} courses.</p>
            <div className="mt-6"><PrintButton /></div>
          </div>
        </div>

        <div className="hidden print:block text-center py-4">
          <h1 className="text-2xl font-bold">{BRAND.name}</h1>
          <p className="text-sm">Course Fee Structure — Session {BRAND.session}</p>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8 print:py-0 print:px-0">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden print:border-0 print:rounded-none">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[900px] print:min-w-0 print:text-[10px]">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th rowSpan={2} className="px-3 py-3 border border-blue-800 text-left">S.No.</th>
                    <th rowSpan={2} className="px-3 py-3 border border-blue-800 text-left">Course</th>
                    <th rowSpan={2} className="px-3 py-3 border border-blue-800 text-left">Duration</th>
                    <th rowSpan={2} className="px-3 py-3 border border-blue-800 text-left">Eligibility</th>
                    <th colSpan={YEARS} className="px-3 py-2 border border-blue-800 text-center">Fee (Yearly)</th>
                    <th rowSpan={2} className="px-3 py-3 border border-blue-800 text-right">Total Course Fee</th>
                  </tr>
                  <tr className="bg-blue-800 text-white">
                    {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
                      <th key={y} className="px-3 py-2 border border-blue-700 text-right whitespace-nowrap font-semibold">{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => {
                    const list = courses.filter((c) => c.department === dept.slug);
                    if (list.length === 0) return null;
                    return [
                      <tr key={dept.slug} className="bg-blue-50">
                        <td colSpan={YEARS + 5} className="px-3 py-2.5 border border-blue-100 text-center font-black text-blue-900 uppercase tracking-wide">
                          <Link href={`/departments/${dept.slug}`} className="hover:underline">{dept.name} Courses</Link>
                        </td>
                      </tr>,
                      ...list.map((c) => {
                        return (
                          <tr key={c.id} className="hover:bg-gray-50 align-top">
                            <td className="px-3 py-2.5 border border-gray-100 text-gray-500">{serialOf.get(c.id)}.</td>
                            <td className="px-3 py-2.5 border border-gray-100 font-semibold">
                              <Link href={`/courses/${c.slug}`} className="text-blue-700 hover:underline">{c.name}</Link>
                            </td>
                            <td className="px-3 py-2.5 border border-gray-100 text-gray-600">{c.duration}</td>
                            <td className="px-3 py-2.5 border border-gray-100 text-gray-600">{c.eligibility}</td>
                            {Array.from({ length: YEARS }).map((_, i) => (
                              <td key={i} className="px-3 py-2.5 border border-gray-100 text-right whitespace-nowrap text-gray-700">
                                {c.yearlyFees[i] ? formatINR(c.yearlyFees[i]) : "—"}
                                {i === YEARS - 1 && c.feeNote && <div className="text-[11px] text-gray-500">+ {c.feeNote}</div>}
                              </td>
                            ))}
                            <td className="px-3 py-2.5 border border-gray-100 text-right font-bold text-green-700 whitespace-nowrap">{formatINR(c.totalFee)}</td>
                          </tr>
                        );
                      }),
                    ];
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 px-2">
            Fees are as per the published fee structure for session {BRAND.session} and may be revised. Hostel, transport, uniform and
            examination/university fees, if any, are charged separately. Contact the admission office for the latest details.
          </p>
        </div>
      </div>
      <div className="print:hidden"><Footer /></div>
    </>
  );
}
