import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-violet-50/70">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 px-6 py-14 sm:px-12 text-center shadow-2xl shadow-indigo-600/25">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-violet-300/20 blur-2xl" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Admissions Open — {BRAND.session}
            </span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Start Your Admission.<br />It&apos;s Quick &amp; Simple.
            </h2>
            <p className="mt-4 text-indigo-100 max-w-xl mx-auto">Transparent fees. Practical training. Honest guidance — matched to your qualification and goals.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/apply" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 shadow-lg hover:gap-3 transition-all">
                Apply Online <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={BRAND.phoneHref} className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10">
                <Phone className="w-4 h-4" /> Talk to Counsellor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
