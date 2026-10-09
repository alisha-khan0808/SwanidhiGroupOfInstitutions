import Link from "next/link";
import Image from "next/image";
import { PhoneCall, FileText, ClipboardCheck, GraduationCap, ShieldCheck, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

const steps = [
  { icon: PhoneCall, title: "Enquire or apply online", text: "Fill the 2-minute application or call our admission helpline — we call you back the same day." },
  { icon: FileText, title: "Get your course guidance", text: "Our counsellor checks your eligibility and suggests the right course, fees and scholarship options." },
  { icon: ClipboardCheck, title: "Submit documents & first-year fee", text: "Bring your marksheets and ID — we verify them and confirm your seat." },
  { icon: GraduationCap, title: "Start your programme", text: "Join classes, labs and practical training — with support all the way to your final year." },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-200 to-violet-200 -rotate-2" />
          <div className="relative aspect-[16/11] rounded-[1.75rem] overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=75" alt="Campus" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
              <span className="rounded-xl bg-white/95 px-4 py-2.5 text-sm font-bold text-indigo-950 shadow">Admissions {BRAND.session}</span>
              <span className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow">4 simple steps</span>
            </div>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 mb-3">
            <span className="h-[3px] w-6 rounded-full bg-indigo-600" /> Process
          </p>
          <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-slate-900 tracking-tight">
            How Admission at <span className="text-gradient">Swanidhi</span> works
          </h2>
          <p className="text-slate-500 mt-2 text-sm">From your first call to your first class — we guide you at every step.</p>

          <ol className="mt-7 space-y-5">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Icon className="w-4 h-4" /></span>
                <div>
                  <p className="font-bold text-slate-900 text-[15px]"><span className="text-[11px] font-bold text-slate-400 mr-2">0{i + 1}</span>{title}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-7 flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-sm text-slate-700">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
            <p><span className="font-bold text-slate-900">Our promise:</span> transparent, published fees and honest guidance on the course that fits you — no hidden charges.</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/apply" className="inline-flex items-center gap-2 rounded-xl bg-indigo-950 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-900">Apply Now</Link>
            <Link href="/courses" className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 px-6 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-50">
              Browse Courses <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
