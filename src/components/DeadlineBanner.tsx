import Link from "next/link";
import Image from "next/image";
import { AlarmClock, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function DeadlineBanner() {
  return (
    <section className="py-10 bg-violet-50/70">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl min-h-[300px] flex items-center shadow-xl shadow-indigo-900/15">
          <Image src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1600&q=75" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-950/85 to-indigo-950/30" />
          <div className="relative p-8 sm:p-12 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-100">
              <AlarmClock className="w-3.5 h-3.5" /> Applications Open · {BRAND.session}
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Don&apos;t Miss Your<br /><span className="text-indigo-300">Admission Deadline</span>
            </h2>
            <p className="mt-3 text-indigo-100/90 max-w-lg">Seats in Nursing, Paramedical and Pharmacy programmes fill fast every year. Apply early to secure your seat for {BRAND.session}.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/apply" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-950 hover:gap-3 transition-all">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/fee-structure" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                View Fee Structure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
