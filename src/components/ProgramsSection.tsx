import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Layers, Building2, CalendarCheck, MapPin, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { departments, levels, formatINR, type Course } from "@/data/courses";
import DepartmentIcon from "@/components/DepartmentIcon";
import { BRAND } from "@/lib/brand";

export default function ProgramsSection({ courses }: { courses: Course[] }) {
  const tiles = [
    { icon: BookOpen, value: `${courses.length}+`, label: "Programmes" },
    { icon: Building2, value: String(departments.length), label: "Departments" },
    { icon: Layers, value: "1–5½ Years", label: "Typical Duration" },
    { icon: CalendarCheck, value: BRAND.session, label: "Admissions Open" },
  ];

  const cards = departments
    .map((d) => {
      const list = courses.filter((c) => c.department === d.slug);
      return { d, list, from: Math.min(...list.map((c) => c.yearlyFees[0] ?? c.totalFee)), lv: [...new Set(list.map((c) => c.level))] };
    })
    .filter((x) => x.list.length > 0)
    .slice(0, 8);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="All Programmes"
          title={<>Degree, Diploma &amp; PG Programmes {BRAND.session}</>}
          subtitle="Certificate to post-graduate programmes across healthcare, law, education, management and technical trades."
          action={{ label: "Explore All Courses", href: "/courses" }}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {tiles.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 px-4 py-3.5">
              <span className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-sm"><Icon className="w-4 h-4" /></span>
              <span className="leading-tight">
                <span className="block font-extrabold text-slate-900">{value}</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {levels.map((lv) => {
            const n = courses.filter((c) => c.level === lv).length;
            if (!n) return null;
            return (
              <Link key={lv} href={`/courses?level=${encodeURIComponent(lv)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors">
                {lv} ({n})
              </Link>
            );
          })}
          <Link href="/fee-structure" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700">Complete Fee Structure</Link>
          <Link href="/scholarship" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700">Scholarships</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ d, list, from, lv }) => {
            return (
              <div key={d.slug} className="group flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 hover:border-indigo-200 transition-all">
                <div className="relative h-32">
                  <Image src={d.image} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                    {lv.slice(0, 2).map((l) => (
                      <span key={l} className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold text-indigo-700">{l}</span>
                    ))}
                  </div>
                  <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {list.length} courses
                  </span>
                  <span className="absolute -bottom-5 left-4 w-11 h-11 rounded-full bg-white border border-slate-100 shadow flex items-center justify-center text-indigo-600">
                    <DepartmentIcon slug={d.slug} className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-4 pt-7 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900">{d.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5"><MapPin className="w-3 h-3" /> {BRAND.shortName} Group of Institutions</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {list.slice(0, 2).map((c) => (
                      <span key={c.id} className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">{c.name}</span>
                    ))}
                    {list.length > 2 && <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">+{list.length - 2} more</span>}
                  </div>
                  <div className="grid grid-cols-2 border-t border-slate-100 mt-4 pt-3 text-center">
                    <div className="border-r border-slate-100">
                      <p className="font-extrabold text-indigo-700 text-sm">{formatINR(from)}</p>
                      <p className="text-[10px] text-slate-500">Fees From / yr</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 text-sm">{list.length}</p>
                      <p className="text-[10px] text-slate-500">Programmes</p>
                    </div>
                  </div>
                  <Link href={`/departments/${d.slug}`} className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-indigo-600 hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
