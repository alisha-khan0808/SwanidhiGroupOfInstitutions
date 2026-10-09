import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb } from "@/components/DetailBits";
import { getCourses } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { departments, levels, formatINR } from "@/data/courses";
import DepartmentIcon from "@/components/DepartmentIcon";
import { MapPin, BadgeCheck, ArrowRight, SlidersHorizontal } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Departments — Courses, Fees & Admission",
  description: `Explore all ${departments.length} departments at ${BRAND.name} — Medical, Nursing, Pharmacy, Paramedical, Law, Education, Management & IT and ITI.`,
};

export default async function DepartmentsPage() {
  const courses = await getCourses();
  const rows = departments.map((d) => {
    const list = courses.filter((c) => c.department === d.slug);
    const durs = list.map((c) => c.durationYears);
    return {
      d,
      list,
      from: list.length ? Math.min(...list.map((c) => c.yearlyFees[0] ?? c.totalFee)) : 0,
      dur: list.length ? (Math.min(...durs) === Math.max(...durs) ? `${Math.min(...durs)} Yrs` : `${Math.min(...durs)}–${Math.max(...durs)} Yrs`) : "—",
      lv: [...new Set(list.map((c) => c.level))],
    };
  });

  return (
    <>
      <Navbar />
      <div className="bg-violet-50/60 min-h-screen">
        <div className="bg-grid border-b border-slate-100">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-10">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Departments" }]} />
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Explore {departments.length} Departments at {BRAND.shortName}</h1>
            <p className="mt-2 text-slate-600 max-w-3xl">Medical, Nursing, Pharmacy, Paramedical, Law, Education, Management &amp; IT and ITI — compare courses, duration, eligibility and year-wise fees for admission {BRAND.session}.</p>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6 items-start">
          {/* Filters */}
          <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-44">
            <p className="flex items-center gap-2 font-extrabold text-slate-900 mb-4"><SlidersHorizontal className="w-4 h-4" /> Filters</p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Course Level</p>
            <ul className="space-y-1.5 mb-5">
              {levels.map((l) => {
                const n = courses.filter((c) => c.level === l).length;
                if (!n) return null;
                return (
                  <li key={l}>
                    <Link href={`/courses?level=${encodeURIComponent(l)}`} className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-700">
                      {l} <span className="text-xs text-slate-400">{n}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Department</p>
            <ul className="space-y-1.5">
              {rows.map(({ d, list }) => (
                <li key={d.slug}>
                  <a href={`#${d.slug}`} className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-700">
                    {d.shortName} <span className="text-xs text-slate-400">{list.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Results */}
          <div>
            <p className="text-sm text-slate-500 mb-4">Showing <span className="font-semibold text-slate-800">{departments.length} departments</span> · {courses.length} programmes</p>
            <div className="space-y-4">
              {rows.map(({ d, list, from, dur, lv }) => {
                return (
                  <div key={d.slug} id={d.slug} className="scroll-mt-44 rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg hover:shadow-indigo-900/5 hover:border-indigo-200 transition-all">
                    <div className="flex flex-col md:flex-row gap-5">
                      <span className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0"><DepartmentIcon slug={d.slug} className="w-7 h-7" /></span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700"><BadgeCheck className="w-3 h-3" /> Admissions Open</span>
                          {lv.map((l) => <span key={l} className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">{l}</span>)}
                        </div>
                        <Link href={`/departments/${d.slug}`} className="mt-1.5 block text-lg font-extrabold text-slate-900 hover:text-indigo-700">{d.name}</Link>
                        <p className="flex items-center gap-1 text-sm text-slate-500"><MapPin className="w-3.5 h-3.5" /> {BRAND.name}</p>

                        <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
                          {[
                            { k: "Programmes", v: String(list.length) },
                            { k: "Fees From", v: formatINR(from) },
                            { k: "Duration", v: dur },
                          ].map(({ k, v }) => (
                            <div key={k}>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{k}</p>
                              <p className="font-extrabold text-slate-900 text-sm mt-0.5">{v}</p>
                            </div>
                          ))}
                        </div>

                        <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Popular Courses</p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {list.slice(0, 4).map((c) => (
                            <Link key={c.id} href={`/courses/${c.slug}`} className="rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs text-slate-700 hover:border-indigo-200 hover:text-indigo-700">{c.name}</Link>
                          ))}
                          {list.length > 4 && <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs text-slate-500">+{list.length - 4} more</span>}
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 md:w-40 shrink-0 md:justify-center">
                        <Link href={`/departments/${d.slug}`} className="flex-1 md:flex-none inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-indigo-400 hover:text-indigo-700">View Details</Link>
                        <Link href="/apply" className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-bold text-white">Apply Now <ArrowRight className="w-3.5 h-3.5" /></Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
