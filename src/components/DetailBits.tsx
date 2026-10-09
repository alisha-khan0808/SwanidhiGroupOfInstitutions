import Link from "next/link";
import { ChevronRight, Phone, Mail, FileSignature } from "lucide-react";
import { BRAND } from "@/lib/brand";

// Shared building blocks for reference-style detail pages (department / course).

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
          {it.href ? <Link href={it.href} className="hover:text-indigo-600">{it.label}</Link> : <span className="text-slate-700 font-medium">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function StatStrip({ stats }: { stats: { value: string; label: string; accent?: boolean }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl border border-slate-100 bg-white overflow-hidden divide-x divide-y lg:divide-y-0 divide-slate-100">
      {stats.map((s) => (
        <div key={s.label} className="px-4 py-4 text-center">
          <p className={`text-lg font-extrabold leading-tight ${s.accent ? "text-indigo-700" : "text-slate-900"}`}>{s.value}</p>
          <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function SectionTabs({ tabs }: { tabs: { id: string; label: string }[] }) {
  return (
    <div className="sticky top-[68px] lg:top-[109px] z-30 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-slate-600 border-b-2 border-transparent hover:text-indigo-700 hover:border-indigo-600 transition-colors">
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Card({ id, title, children, action }: { id?: string; title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-44 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function ApplyCard({ name, applyHref = "/apply" }: { name: string; applyHref?: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-indigo-600/20">
      <p className="font-extrabold text-lg leading-snug">Interested in {name}?</p>
      <p className="text-sm text-indigo-100 mt-1">Apply for free &amp; get expert admission counselling.</p>
      <Link href={applyHref} className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-50">
        <FileSignature className="w-4 h-4" /> Apply Now — Free
      </Link>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <a href={BRAND.phoneHref} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/30 py-2.5 text-xs font-semibold hover:bg-white/10"><Phone className="w-3.5 h-3.5" /> Call</a>
        <a href={`mailto:${BRAND.admissionsEmail}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-white/30 py-2.5 text-xs font-semibold hover:bg-white/10"><Mail className="w-3.5 h-3.5" /> Email</a>
      </div>
    </div>
  );
}

export function QuickFacts({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="font-extrabold text-slate-900 mb-3">Quick Facts</p>
      <dl className="divide-y divide-slate-100 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 py-2.5">
            <dt className="text-slate-500 shrink-0">{r.label}</dt>
            <dd className="font-semibold text-slate-800 text-right">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Faqs({ id = "faqs", items }: { id?: string; items: { q: string; a: string }[] }) {
  return (
    <Card id={id} title="FAQs">
      <div className="space-y-2">
        {items.map((f) => (
          <details key={f.q} className="group rounded-xl border border-slate-100 bg-slate-50/50 open:bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-slate-800">
              {f.q}
              <span className="text-indigo-600 text-lg leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </Card>
  );
}

export const lastUpdated = () =>
  new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" }).replace(/ (\d{2})$/, " '$1");
