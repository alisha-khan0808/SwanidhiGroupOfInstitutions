import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, GraduationCap } from "lucide-react";
import { BRAND } from "@/lib/brand";

const points = [
  "49 courses across 11 departments — from ITI to post graduation",
  "Practical, job-oriented training with hospital & industry exposure",
  "Transparent year-wise fee structure for every course",
  "Guidance on government scholarships & complete admission support",
];

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="relative">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1000&q=80"
              alt={`Students at ${BRAND.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 right-4 sm:right-8 bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 text-white flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{BRAND.shortName} Campus</p>
              <p className="text-xs text-gray-500">Medical, Nursing, Law &amp; more</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-green-600 text-sm font-semibold uppercase tracking-wider mb-2">About {BRAND.shortName}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 leading-tight mb-5">
            Where Skills Meet <span className="text-green-600">Careers</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {BRAND.name} offers professional education in Ayurvedic medicine, nursing, pharmacy, paramedical
            sciences, law, education, management, computer applications and technical trades — so every student
            can find a course that matches their qualification, interest and budget.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            From choosing the right course to admission, documentation, scholarships and placement guidance, our team
            stays with you at every step.
          </p>
          <ul className="space-y-3 mb-8">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-700">{p}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:opacity-95 transition-opacity"
          >
            Know More About Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
