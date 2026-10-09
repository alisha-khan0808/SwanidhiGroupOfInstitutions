import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/data/blogs";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function BlogPreview({ blogs }: { blogs: BlogPost[] }) {
  const posts = blogs.slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="py-16 lg:py-20 bg-violet-50/70">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-indigo-950 tracking-tight">Latest News &amp; Updates</h2>
            <p className="text-slate-500 mt-1.5 text-[15px]">Stay ahead with the freshest admission and course news.</p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:gap-2.5 transition-all">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 hover:-translate-y-0.5 transition-all">
              <div className="relative h-48 bg-slate-100">
                {p.image && <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="font-bold uppercase tracking-wider text-indigo-600">{p.category}</span>
                  <span className="inline-flex items-center gap-1 text-slate-400"><CalendarDays className="w-3 h-3" /> {fmt(p.publishedAt)}</span>
                </div>
                <h3 className="mt-2 font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-indigo-700">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-3 flex-1">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
