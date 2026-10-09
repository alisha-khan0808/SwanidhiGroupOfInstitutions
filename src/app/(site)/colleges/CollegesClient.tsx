"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, BadgeCheck, MapPin, BookOpen, IndianRupee, ChevronDown, ChevronUp, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import DepartmentIcon from "@/components/DepartmentIcon";
import { BRAND } from "@/lib/brand";
import { formatINR, formatLakh, levels as allLevels, type CourseLevel } from "@/data/courses";

export interface CollegeRow {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  description: string;
  programmes: number;
  feesFrom: number;
  levels: CourseLevel[];
  popular: { name: string; slug: string }[];
  search: string;
}

const STREAMS: { label: string; slugs: string[] }[] = [
  { label: "Medical & Health Sciences", slugs: ["medical", "nursing", "pharmacy", "paramedical-degree", "paramedical-diploma", "paramedical-lateral-entry", "paramedical-pg"] },
  { label: "Law", slugs: ["law"] },
  { label: "Education", slugs: ["education"] },
  { label: "Management & IT", slugs: ["management-it"] },
  { label: "Technical (ITI)", slugs: ["iti"] },
];

const SORTS = [
  { value: "relevant", label: "Most Relevant" },
  { value: "fees", label: "Lowest Fees" },
  { value: "programmes", label: "Most Programmes" },
  { value: "name", label: "Name (A–Z)" },
];

export default function CollegesClient({ rows }: { rows: CollegeRow[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState("relevant");
  const [stream, setStream] = useState("");
  const [lvls, setLvls] = useState<CourseLevel[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let r = rows;
    const t = q.trim().toLowerCase();
    if (t) r = r.filter((x) => x.search.includes(t));
    if (stream) {
      const s = STREAMS.find((x) => x.label === stream);
      if (s) r = r.filter((x) => s.slugs.includes(x.slug));
    }
    if (lvls.length) r = r.filter((x) => x.levels.some((l) => lvls.includes(l)));
    const out = [...r];
    if (sort === "fees") out.sort((a, b) => a.feesFrom - b.feesFrom);
    if (sort === "programmes") out.sort((a, b) => b.programmes - a.programmes);
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [rows, q, sort, stream, lvls]);

  const active = (stream ? 1 : 0) + lvls.length + (q.trim() ? 1 : 0);
  const clear = () => { setQ(""); setStream(""); setLvls([]); setSort("relevant"); };

  return (
    <div className="bg-violet-50/60 min-h-screen">
      {/* Header */}
      <div className="bg-grid border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore <span className="text-gradient">Our Colleges</span>
          </h1>
          <p className="mt-3 text-slate-500 text-[15px]">Search, filter and compare the colleges &amp; departments of {BRAND.name}.</p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[270px_1fr] gap-6 items-start">
        {/* Filters */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden lg:sticky lg:top-44`}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <p className="font-extrabold text-slate-900">Filters</p>
            {active > 0 && <button type="button" onClick={clear} className="text-xs font-semibold text-red-500 hover:text-red-600">Clear All</button>}
          </div>

          <FilterGroup title="Sort By">
            {SORTS.map((s) => (
              <Check key={s.value} checked={sort === s.value} onChange={() => setSort(s.value)} label={s.label} />
            ))}
          </FilterGroup>

          <FilterGroup title="Stream">
            <Check checked={stream === ""} onChange={() => setStream("")} label="All Streams" />
            {STREAMS.map((s) => (
              <Check key={s.label} checked={stream === s.label} onChange={() => setStream(stream === s.label ? "" : s.label)} label={s.label} />
            ))}
          </FilterGroup>

          <FilterGroup title="Course Level">
            {allLevels.map((l) => (
              <Check key={l} checked={lvls.includes(l)} onChange={() => setLvls((v) => (v.includes(l) ? v.filter((x) => x !== l) : [...v, l]))} label={l} />
            ))}
          </FilterGroup>
        </aside>

        {/* Results */}
        <div className="min-w-0">
          <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm flex gap-2">
            <label className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search colleges, departments, courses…" className="w-full h-11 rounded-xl border border-slate-200 pl-10 pr-9 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
              {q && <button type="button" onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Clear search"><X className="w-4 h-4" /></button>}
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="hidden sm:block h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-indigo-400">
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button type="button" onClick={() => setShowFilters((v) => !v)} className="lg:hidden inline-flex items-center gap-1.5 h-11 px-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700">
              <SlidersHorizontal className="w-4 h-4" /> Filters{active > 0 && <span className="ml-0.5 rounded-full bg-indigo-600 px-1.5 text-[10px] text-white">{active}</span>}
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-4 mb-4">Showing <span className="font-semibold text-slate-800">{filtered.length}</span> colleges · Page 1 of 1</p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
              <p className="font-bold text-slate-900">No colleges match your filters</p>
              <button type="button" onClick={clear} className="mt-2 text-sm font-semibold text-indigo-600 underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((c) => (
                <div key={c.slug} className="group flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 hover:border-indigo-200 transition-all">
                  <Link href={`/departments/${c.slug}`} className="relative block h-44">
                    <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow"><BadgeCheck className="w-3.5 h-3.5" /> Admissions Open</span>
                    <span className="absolute -bottom-6 right-4 w-14 h-14 rounded-xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-indigo-600">
                      <DepartmentIcon slug={c.slug} className="w-6 h-6" />
                    </span>
                  </Link>
                  <div className="p-4 pt-4 flex flex-col flex-1">
                    <Link href={`/departments/${c.slug}`} className="pr-16 font-extrabold text-slate-900 leading-snug hover:text-indigo-700">{c.name}</Link>
                    <p className="flex items-center gap-1 text-xs text-slate-500 mt-1"><MapPin className="w-3.5 h-3.5" /> {BRAND.name}</p>

                    <div className="grid grid-cols-2 gap-2.5 mt-4">
                      <div className="rounded-xl bg-indigo-50/70 px-3 py-2.5">
                        <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500"><BookOpen className="w-3 h-3" /> Programmes</p>
                        <p className="font-extrabold text-indigo-900 mt-0.5">{c.programmes}</p>
                      </div>
                      <div className="rounded-xl bg-emerald-50/70 px-3 py-2.5">
                        <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600"><IndianRupee className="w-3 h-3" /> Fees From</p>
                        <p className="font-extrabold text-emerald-800 mt-0.5" title={`${formatINR(c.feesFrom)} / year`}>{formatLakh(c.feesFrom)}<span className="text-[10px] font-medium text-emerald-600"> /yr</span></p>
                      </div>
                    </div>

                    <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Levels</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {c.levels.map((l) => <span key={l} className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{l}</span>)}
                    </div>

                    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Popular Courses</p>
                    <ul className="mt-1 space-y-0.5 text-[13px] flex-1">
                      {c.popular.map((p) => (
                        <li key={p.slug}><Link href={`/courses/${p.slug}`} className="text-slate-600 hover:text-indigo-700">• {p.name}</Link></li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Link href={`/departments/${c.slug}`} className="inline-flex items-center justify-center rounded-xl border border-slate-200 py-2.5 text-[13px] font-semibold text-slate-800 hover:border-indigo-400 hover:text-indigo-700">View Details</Link>
                      <Link href="/apply" className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-brand py-2.5 text-[13px] font-bold text-white">Apply Now <ArrowRight className="w-3.5 h-3.5" /></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-50">
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="px-5 pb-4 space-y-2">{children}</div>}
    </div>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer hover:text-indigo-700">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 rounded accent-indigo-600" />
      {label}
    </label>
  );
}
