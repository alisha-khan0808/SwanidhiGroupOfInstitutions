import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Compass } from "lucide-react";

const campus = "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=900&q=75";
const study = "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=75";

export default function PromoBanners() {
  return (
    <section className="py-10 bg-violet-50/70">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-5">
        <Banner
          img={study}
          tag={<><Zap className="w-3.5 h-3.5" /> Free for all students</>}
          title={<>Free Admission<br />Counselling</>}
          text="Talk to our admission team about eligibility, fees and the right course for you."
          cta="Book Free Session"
          href="/contact"
          tone="from-indigo-950 via-indigo-900/90 to-indigo-900/20"
        />
        <Banner
          img={campus}
          tag={<><Compass className="w-3.5 h-3.5" /> Course Finder</>}
          title={<>Which Course<br />Suits You?</>}
          text="Enter your qualification and budget — see every course you're eligible for in seconds."
          cta="Try Course Finder"
          href="/#course-finder"
          tone="from-violet-950 via-violet-900/90 to-violet-900/20"
        />
      </div>
    </section>
  );
}

function Banner({ img, tag, title, text, cta, href, tone }: { img: string; tag: React.ReactNode; title: React.ReactNode; text: string; cta: string; href: string; tone: string }) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-3xl min-h-[230px] shadow-lg shadow-indigo-900/10">
      <Image src={img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className={`absolute inset-0 bg-gradient-to-r ${tone}`} />
      <div className="relative p-7 sm:p-8 max-w-sm">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-400 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-indigo-950">{tag}</span>
        <h3 className="mt-3 text-3xl font-extrabold text-white leading-tight tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-white/80">{text}</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-950 group-hover:gap-3 transition-all">
          {cta} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
