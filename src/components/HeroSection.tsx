"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Flame, BadgeCheck, IndianRupee } from "lucide-react";
import { BRAND } from "@/lib/brand";

const slides = [
  { top: ["Find Your", "Dream Course,"], accent: "Shape Your Future", sub: "49 career-focused programmes in Medical, Nursing, Paramedical, Pharmacy, Law, Education, Management & ITI." },
  { top: ["Healthcare Careers", "Start Here —"], accent: "Nursing to Paramedical", sub: "ANM, GNM, B.Sc. Nursing, BPT, BMLT, Radiology & OT Technology — with hospital training and internships." },
  { top: ["Transparent Fees,", "Simple Admission,"], accent: "Zero Confusion", sub: "Year-wise fee for every course, published openly. Apply online in two minutes — our team does the rest." },
];

const chips = [
  { label: "B.Sc. Nursing", href: "/courses/b-sc-nursing" },
  { label: "GNM", href: "/courses/gnm" },
  { label: "BAMS", href: "/courses/bams" },
  { label: "Paramedical", href: "/departments/paramedical-degree" },
  { label: "B.Pharma", href: "/courses/b-pharma" },
  { label: "LLB", href: "/courses/llb" },
  { label: "B.Ed", href: "/courses/b-ed" },
  { label: "ITI", href: "/departments/iti" },
];

const stats = [
  { value: "49", label: "Courses" },
  { value: "11", label: "Departments" },
  { value: "ITI–PG", label: "All Levels" },
];

export default function HeroSection() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-indigo-300/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -left-32 w-[28rem] h-[28rem] rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 py-12 lg:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-6 items-center">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-700">
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> Admissions {BRAND.session}
          </span>

          <h1 key={i} className="animate-fade-up mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.1rem] font-extrabold tracking-tight text-slate-900">
            {s.top.map((line) => <span key={line} className="block">{line}</span>)}
            <span className="block text-gradient pb-1">{s.accent}</span>
          </h1>

          <p key={`p${i}`} className="animate-fade-up mt-5 text-slate-600 text-base sm:text-lg max-w-xl">{s.sub}</p>

          <div className="flex gap-1.5 mt-5" aria-hidden>
            {slides.map((_, n) => (
              <button key={n} type="button" onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-indigo-600" : "w-3 bg-indigo-200"}`} />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {chips.map((c) => (
              <Link key={c.label} href={c.href} className="rounded-full border border-indigo-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors">
                {c.label}
              </Link>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); router.push(`/courses${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`); }}
            className="mt-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-indigo-900/5 max-w-xl"
          >
            <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a course — e.g. Nursing, DMLT, LLB" className="flex-1 min-w-0 h-11 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 outline-none" />
            <button type="submit" className="h-11 px-6 rounded-xl bg-gradient-brand text-white text-sm font-bold shadow-md shadow-indigo-600/25 hover:opacity-95">Search</button>
          </form>

          <div className="flex gap-8 sm:gap-10 mt-8">
            {stats.map((st) => (
              <div key={st.label}>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950">{st.value}</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-violet-500 rotate-3 opacity-20" />
          <div className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/20 border-4 border-white">
            <Image src="/hero-bg.png" alt={`Students at ${BRAND.name}`} fill priority className="object-cover object-[60%_50%]" sizes="(max-width: 1024px) 90vw, 40vw" />
          </div>

          <FloatCard className="top-8 -right-2 sm:-right-6" delay="0s" icon={<BadgeCheck className="w-4 h-4 text-indigo-600" />} title="49 Courses" sub="ITI → Post Graduate" />
          <FloatCard className="top-1/2 -left-2 sm:-left-8" delay="1.2s" icon={<Flame className="w-4 h-4 text-orange-500" />} title="Filling Fast" sub="B.Sc. Nursing • GNM • BPT" />
          <FloatCard className="bottom-8 -right-2 sm:-right-4" delay="2.4s" icon={<IndianRupee className="w-4 h-4 text-emerald-600" />} title="Govt. Scholarships" sub="Guidance for eligible students" />
        </div>
      </div>
    </section>
  );
}

function FloatCard({ className, delay, icon, title, sub }: { className: string; delay: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className={`absolute animate-float rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-xl shadow-indigo-900/10 border border-white flex items-center gap-3 ${className}`} style={{ animationDelay: delay }}>
      <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">{icon}</span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-slate-900">{title}</span>
        <span className="block text-[11px] text-slate-500">{sub}</span>
      </span>
    </div>
  );
}
