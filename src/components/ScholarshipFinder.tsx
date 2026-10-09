"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, IndianRupee } from "lucide-react";
import type { Scholarship } from "@/data/scholarships";

const CATEGORIES = [
  { value: "general", label: "General", words: [] as string[] },
  { value: "obc", label: "OBC", words: ["obc"] },
  { value: "sc", label: "SC", words: ["sc"] },
  { value: "st", label: "ST", words: ["st"] },
  { value: "minority", label: "Minority", words: ["minority"] },
];

const INCOMES = [
  { value: 100000, label: "Below ₹1 lakh" },
  { value: 250000, label: "₹1 – 2.5 lakh" },
  { value: 450000, label: "₹2.5 – 4.5 lakh" },
  { value: 800000, label: "₹4.5 – 8 lakh" },
  { value: Infinity, label: "Above ₹8 lakh" },
];

const LEVELS = ["Diploma", "UG", "PG"] as const;

// Words in a scholarship's category / tags that restrict who can apply.
const RESTRICTING = ["sc", "st", "obc", "minority", "girls", "girl", "divyang", "specially"];

const words = (s: Scholarship) =>
  new Set(`${s.category} ${s.tags.join(" ")}`.toLowerCase().split(/[^a-z]+/).filter(Boolean));

export default function ScholarshipFinder({ scholarships }: { scholarships: Scholarship[] }) {
  const [cat, setCat] = useState("general");
  const [income, setIncome] = useState(250000);
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("UG");
  const [girl, setGirl] = useState(false);
  const [divyang, setDivyang] = useState(false);

  const matches = useMemo(() => {
    const mine = new Set([
      ...(CATEGORIES.find((c) => c.value === cat)?.words ?? []),
      ...(girl ? ["girls", "girl"] : []),
      ...(divyang ? ["divyang", "specially"] : []),
    ]);
    return scholarships.filter((s) => {
      const w = words(s);
      const restrictions = RESTRICTING.filter((r) => w.has(r));
      const eligibleGroup = restrictions.length === 0 || restrictions.some((r) => mine.has(r));
      const withinIncome = s.incomeLimit == null || income <= s.incomeLimit;
      const levelOk = s.level.length === 0 || s.level.includes(level);
      return eligibleGroup && withinIncome && levelOk;
    });
  }, [scholarships, cat, income, level, girl, divyang]);

  const pill = (on: boolean) =>
    `rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${on ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`;

  return (
    <section id="scholarship-finder" className="py-16 lg:py-20 bg-[#f8faff] scroll-mt-28">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 mb-3">
            <span className="h-[3px] w-6 rounded-full bg-indigo-600" /> Scholarships 2026
          </p>
          <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-slate-900 tracking-tight">Find scholarships you actually qualify for</h2>
          <p className="text-slate-500 mt-2 text-[15px]">Set your category, income and level — the list updates to only what you can claim.</p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-5 h-fit">
            <p className="font-bold text-slate-900">Your eligibility</p>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => <button key={c.value} type="button" onClick={() => setCat(c.value)} className={pill(cat === c.value)}>{c.label}</button>)}
              </div>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Annual family income</span>
              <div className="flex flex-wrap gap-2">
                {INCOMES.map((i) => <button key={i.label} type="button" onClick={() => setIncome(i.value)} className={pill(income === i.value)}>{i.label}</button>)}
              </div>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Course level</span>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => <button key={l} type="button" onClick={() => setLevel(l)} className={pill(level === l)}>{l}</button>)}
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <label className="flex items-center gap-2"><input type="checkbox" checked={girl} onChange={(e) => setGirl(e.target.checked)} className="w-4 h-4 accent-indigo-600" /> I am a girl student</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={divyang} onChange={(e) => setDivyang(e.target.checked)} className="w-4 h-4 accent-indigo-600" /> Person with disability (40%+)</label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            <div className="bg-gradient-brand px-6 py-5 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/75">You qualify for</p>
                <p className="text-4xl font-extrabold">{matches.length}</p>
              </div>
              <Link href="/scholarship" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-indigo-700">
                Browse all scholarships <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <ul className="divide-y divide-slate-100">
              {matches.length === 0 && (
                <li className="p-6 text-sm text-slate-500">No listed scholarship matches this profile. Our office can still guide you on state-specific schemes — call the admission helpline.</li>
              )}
              {matches.map((s) => (
                <li key={s.slug} className="p-5 flex flex-wrap items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><Award className="w-5 h-5" /></span>
                  <div className="flex-1 min-w-[200px]">
                    <span className="inline-block rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">{s.category}</span>
                    <p className="font-bold text-slate-900 mt-1">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="inline-flex items-center gap-0.5 font-extrabold text-emerald-700 text-sm max-w-[220px]">
                      {s.amountDisplay.startsWith("₹") && <IndianRupee className="w-3.5 h-3.5 shrink-0" />}
                      {s.amountDisplay.replace(/^₹/, "")}
                    </p>
                    <Link href={`/scholarship/${s.slug}`} className="block text-xs font-semibold text-indigo-600 hover:underline mt-0.5">Details →</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
