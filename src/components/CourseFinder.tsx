"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Compass, Sparkles, ArrowRight, Info } from "lucide-react";
import { departments, formatINR, getDepartment, type Course } from "@/data/courses";

type Req = "10th" | "12any" | "12sci" | "12bio" | "diploma" | "gnm" | "grad" | "gradSpecific";

/** What qualification a course needs, derived from its eligibility text. */
function requirement(e: string): Req {
  if (/10th/i.test(e)) return "10th";
  if (/with (DOTA|DOT|DMR|DMLT|DPT)\b/i.test(e)) return "diploma";
  if (/with GNM/i.test(e)) return "gnm";
  if (/Biology\s*\/\s*Maths/i.test(e)) return "12sci";
  if (/Biology|Bio\b|PCB|NEET/i.test(e)) return "12bio";
  if (/10\+2|I\.Sc/i.test(e)) return "12any";
  if (/^Graduation|Graduation Pass Out|\/ Graduation/i.test(e)) return "grad";
  return "gradSpecific";
}

const QUALIFICATIONS: { value: string; label: string; allows: Req[] }[] = [
  { value: "10th", label: "10th Pass", allows: ["10th"] },
  { value: "12bio", label: "12th / I.Sc. — Science with Biology", allows: ["10th", "12any", "12sci", "12bio"] },
  { value: "12math", label: "12th — Science with Maths", allows: ["10th", "12any", "12sci"] },
  { value: "12arts", label: "12th — Arts / Commerce", allows: ["10th", "12any"] },
  { value: "diploma", label: "Paramedical Diploma (DMLT, DMR, DPT, DOTA, DOT)", allows: ["10th", "12any", "12sci", "12bio", "diploma"] },
  { value: "gnm", label: "GNM Nursing", allows: ["10th", "12any", "gnm"] },
  { value: "grad", label: "Graduation (any)", allows: ["10th", "12any", "grad", "gradSpecific"] },
];

const BUDGETS = [
  { value: 50000, label: "Up to ₹50K / year" },
  { value: 100000, label: "Up to ₹1L / year" },
  { value: 200000, label: "Up to ₹2L / year" },
  { value: 300000, label: "Up to ₹3L / year" },
  { value: Infinity, label: "No limit" },
];

export default function CourseFinder({ courses }: { courses: Course[] }) {
  const [qual, setQual] = useState("12bio");
  const [dept, setDept] = useState("");
  const [budget, setBudget] = useState(Infinity);
  const [ran, setRan] = useState(false);

  const results = useMemo(() => {
    const q = QUALIFICATIONS.find((x) => x.value === qual)!;
    return courses
      .filter((c) => q.allows.includes(requirement(c.eligibility)))
      .filter((c) => !dept || c.department === dept)
      .filter((c) => (c.yearlyFees[0] ?? c.totalFee) <= budget)
      .sort((a, b) => a.totalFee - b.totalFee);
  }, [courses, qual, dept, budget]);

  const select = "w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";

  return (
    <section id="course-finder" className="py-16 lg:py-20 bg-[#f8faff] scroll-mt-28">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 mb-3">
            <span className="h-[3px] w-6 rounded-full bg-indigo-600" /> Course Finder
          </p>
          <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-slate-900 tracking-tight">Find your best course match</h2>
          <p className="text-slate-500 mt-2 text-[15px]">Built on the official eligibility and fee structure — not guesswork.</p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-5">
          <form
            onSubmit={(e) => { e.preventDefault(); setRan(true); }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-5 h-fit"
          >
            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Your qualification</span>
              <select value={qual} onChange={(e) => setQual(e.target.value)} className={select}>
                {QUALIFICATIONS.map((q) => <option key={q.value} value={q.value}>{q.label}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Interested in</span>
              <select value={dept} onChange={(e) => setDept(e.target.value)} className={select}>
                <option value="">Any department</option>
                {departments.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
              </select>
            </label>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Annual budget (1st year)</span>
              <div className="grid grid-cols-2 gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${budget === b.value ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-slate-600 hover:border-indigo-300"}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full h-12 rounded-xl bg-gradient-brand text-white font-bold shadow-md shadow-indigo-600/25 inline-flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Find My Best Courses
            </button>
          </form>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm min-h-[320px]">
            {!ran ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <span className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><Compass className="w-7 h-7" /></span>
                <p className="font-bold text-slate-900">Your matches will show up here</p>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">Pick your qualification, interest and budget, then run the finder.</p>
              </div>
            ) : results.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <p className="font-bold text-slate-900">No course matches all three filters</p>
                <p className="text-sm text-slate-500 mt-1">Try a higher budget or &quot;Any department&quot;.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-slate-900"><span className="text-indigo-600">{results.length}</span> courses match you</p>
                  <span className="text-xs text-slate-400">Lowest total fee first</span>
                </div>
                <ul className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto pr-1">
                  {results.map((c) => (
                    <li key={c.id}>
                      <Link href={`/courses/${c.slug}`} className="flex items-center gap-4 py-3 group">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-700">{c.name}</p>
                          <p className="text-xs text-slate-500 truncate">{getDepartment(c.department)?.shortName} • {c.duration}</p>
                          {/NEET/i.test(c.eligibility) && (
                            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700"><Info className="w-3 h-3" /> NEET UG qualification required</p>
                          )}
                          {requirement(c.eligibility) === "gradSpecific" && (
                            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700"><Info className="w-3 h-3" /> Requires {c.eligibility}</p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-extrabold text-indigo-700 text-sm">{formatINR(c.yearlyFees[0] ?? 0)}<span className="text-[10px] font-medium text-slate-400"> / yr</span></p>
                          <p className="text-[11px] text-slate-500">Total {formatINR(c.totalFee)}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
