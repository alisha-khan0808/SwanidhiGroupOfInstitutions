import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard, { levelTag } from "@/components/CourseCard";
import EnquiryForm from "@/components/EnquiryForm";
import { Breadcrumb, StatStrip, SectionTabs, Card, QuickFacts, Faqs, lastUpdated } from "@/components/DetailBits";
import { getCourses } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { courseLabel, formatINR, formatLakh, getDepartment, yearLabel } from "@/data/courses";
import DepartmentIcon from "@/components/DepartmentIcon";
import { CheckCircle2, Briefcase, MapPin, Phone, FileSignature, Building2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = (await getCourses()).find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.name} Admission ${BRAND.session}: Fees, Eligibility & Duration`,
    description: `${course.fullName} at ${BRAND.name}: ${course.duration}, eligibility ${course.eligibility}, total fee ${formatINR(course.totalFee)}.`,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const courses = await getCourses();
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const dept = getDepartment(course.department);
  const similar = courses.filter((c) => c.id !== course.id && c.department === course.department).slice(0, 4);
  const yearlySum = course.yearlyFees.reduce((a, b) => a + b, 0);
  const label = courseLabel(course);

  const faqs = [
    { q: `What is the total fee for ${course.name}?`, a: `The total course fee is ${formatINR(course.totalFee)}. Year-wise: ${course.yearlyFees.map((f, i) => `${yearLabel(i)} ${formatINR(f)}`).join(", ")}${course.feeNote ? ` (${course.feeNote})` : ""}.` },
    { q: `What is the eligibility for ${course.name}?`, a: course.eligibility + "." },
    { q: `What is the duration of ${course.name}?`, a: course.duration + "." },
    { q: `How do I apply for ${course.name} at ${BRAND.name}?`, a: `Fill the online application form or call ${BRAND.phone}. Our admission team will guide you through documents, fee payment and scholarship options.` },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-violet-50/60">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-6 pb-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }, ...(dept ? [{ label: dept.shortName, href: `/departments/${dept.slug}` }] : []), { label: course.name }]} />
          <div className="mt-4 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <span className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0"><DepartmentIcon slug={course.department} className="w-9 h-9" /></span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-indigo-700">{course.level}</span>
                  {dept && <Link href={`/departments/${dept.slug}`} className="rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-violet-700 hover:bg-violet-100">{dept.shortName}</Link>}
                  {course.featured && <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-700">Popular</span>}
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">Admissions Open</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{course.name}</h1>
                <p className="text-slate-600 mt-0.5">{course.fullName}</p>
                <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1"><MapPin className="w-4 h-4" /> {BRAND.name}</p>
                <p className="mt-3 text-[15px] font-semibold text-slate-800">{course.name} Admission {BRAND.session}: Fees, Eligibility, Duration &amp; Career</p>
                <p className="text-xs text-slate-400 mt-1">Last updated on {lastUpdated()}</p>
              </div>
              <div className="flex lg:flex-col gap-2 shrink-0">
                <Link href={`/apply?course=${encodeURIComponent(label)}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/25"><FileSignature className="w-4 h-4" /> Apply Now</Link>
                <a href={BRAND.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 px-6 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-50"><Phone className="w-4 h-4" /> Call</a>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <StatStrip
              stats={[
                { value: course.duration.split(/ & | \+ |\(/)[0].trim(), label: "Duration" },
                { value: formatLakh(course.yearlyFees[0] ?? 0), label: "Fee / Year", accent: true },
                { value: formatLakh(course.totalFee), label: "Total Fee", accent: true },
                { value: levelTag(course.level), label: course.level },
                { value: String(course.yearlyFees.length), label: course.yearlyFees.length === 1 ? "Year of Fee" : "Years of Fee" },
                { value: BRAND.session, label: "Session" },
              ]}
            />
          </div>
        </div>

        <SectionTabs tabs={[{ id: "overview", label: "Overview" }, { id: "fees", label: "Fees" }, { id: "eligibility", label: "Eligibility & Admission" }, { id: "careers", label: "Careers" }, { id: "faqs", label: "FAQs" }]} />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[1fr_360px] gap-6 items-start">
          <div className="space-y-6 min-w-0">
            <Card id="overview" title={`About ${course.name}`}>
              <p className="text-[15px] leading-relaxed text-slate-600">{course.description}</p>
              {course.highlights.length > 0 && (
                <>
                  <h3 className="font-bold text-slate-900 mt-5 mb-3">Programme Highlights</h3>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {course.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {h}</li>
                    ))}
                  </ul>
                </>
              )}
            </Card>

            <Card id="fees" title={`${course.name} Fee Structure ${BRAND.session}`}>
              <ul className="divide-y divide-slate-100">
                {course.yearlyFees.map((f, i) => (
                  <li key={i} className="flex items-center justify-between py-3">
                    <span className="font-semibold text-slate-700">{yearLabel(i)}</span>
                    <span className="font-extrabold text-slate-900">{formatINR(f)} <span className="text-[11px] font-medium text-slate-400">/ year</span></span>
                  </li>
                ))}
                <li className="flex items-center justify-between py-3.5 mt-1 rounded-xl bg-indigo-50 px-4">
                  <span className="font-bold text-indigo-900">Total Course Fee</span>
                  <span className="text-lg font-extrabold text-indigo-700">{formatINR(course.totalFee)}</span>
                </li>
              </ul>
              {course.feeNote && <p className="text-xs text-slate-500 mt-3">Note: {course.feeNote}</p>}
              {yearlySum !== course.totalFee && <p className="text-xs text-slate-500 mt-2">Total course fee is as per the published fee structure. Contact the admission office for the latest details.</p>}
            </Card>

            <Card id="eligibility" title="Eligibility & Admission">
              <dl className="grid sm:grid-cols-3 gap-3">
                {[
                  { k: "Eligibility", v: course.eligibility },
                  { k: "Duration", v: course.duration },
                  { k: "Level", v: course.level },
                ].map(({ k, v }) => (
                  <div key={k} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{k}</dt>
                    <dd className="mt-1 font-semibold text-slate-800 text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
              <ol className="mt-5 space-y-2 text-sm text-slate-600 list-decimal list-inside">
                <li>Apply online or call the admission helpline.</li>
                <li>Counsellor verifies your eligibility and documents.</li>
                <li>Pay the first-year fee to confirm your seat.</li>
              </ol>
            </Card>

            {course.careers.length > 0 && (
              <Card id="careers" title="Career Opportunities">
                <div className="flex flex-wrap gap-2">
                  {course.careers.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-700"><Briefcase className="w-3.5 h-3.5 text-indigo-500" /> {c}</span>
                  ))}
                </div>
              </Card>
            )}

            <Faqs items={faqs} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-44">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="font-extrabold text-slate-900">Get Admission Details</p>
              <p className="text-xs text-slate-500 mt-0.5 mb-4">Share your details — our admission team will call you back.</p>
              <EnquiryForm courses={courses.map((c) => ({ name: c.name, fullName: c.fullName, department: c.department }))} defaultCourse={label} source="Course Page" />
            </div>
            <QuickFacts
              rows={[
                { label: "Course", value: course.name },
                { label: "Department", value: dept?.shortName ?? "—" },
                { label: "Duration", value: course.duration },
                { label: "Fee / Year", value: formatINR(course.yearlyFees[0] ?? 0) },
                { label: "Total Fee", value: formatINR(course.totalFee) },
                { label: "Helpline", value: BRAND.phone },
              ]}
            />
            {dept && (
              <Link href={`/departments/${dept.slug}`} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-indigo-200">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Building2 className="w-5 h-5" /></span>
                <span className="text-sm"><span className="block font-bold text-slate-900">{dept.name}</span><span className="text-slate-500">View all courses &amp; fees →</span></span>
              </Link>
            )}
          </aside>
        </div>

        {similar.length > 0 && (
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-14">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">More Courses in {dept?.shortName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
