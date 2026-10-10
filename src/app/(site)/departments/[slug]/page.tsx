import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard, { levelTag } from "@/components/CourseCard";
import { Breadcrumb, StatStrip, SectionTabs, Card, ApplyCard, QuickFacts, Faqs, lastUpdated } from "@/components/DetailBits";
import { getCourses, getColleges, collegeFor } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { departments, getDepartment, formatINR, formatLakh } from "@/data/courses";
import DepartmentIcon from "@/components/DepartmentIcon";
import { MapPin, CalendarCheck, ArrowRight, Phone, FileSignature } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) return {};
  const college = collegeFor(await getColleges(), dept.slug);
  return { title: `${college?.name ?? dept.name} Admission ${BRAND.session}, Courses & Fees`, description: dept.description };
}

const yearsLabel = (n: number) => `${n % 1 ? n.toFixed(1).replace(".5", "½") : n} ${n === 1 ? "Year" : "Years"}`;

export default async function DepartmentPage({ params }: PageProps) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();

  const [allCourses, colleges] = await Promise.all([getCourses(), getColleges()]);
  const courses = allCourses.filter((c) => c.department === dept.slug);
  const college = collegeFor(colleges, dept.slug);
  const title = college?.name ?? dept.name;
  const annual = courses.map((c) => c.yearlyFees[0] ?? c.totalFee);
  const totals = courses.map((c) => c.totalFee);
  const durs = courses.map((c) => c.durationYears);
  const levels = [...new Set(courses.map((c) => c.level))];
  const minDur = Math.min(...durs), maxDur = Math.max(...durs);

  const faqs = [
    { q: `Which courses are offered in ${dept.name}?`, a: `${courses.length} programmes: ${courses.map((c) => c.name).join(", ")}.` },
    { q: `What is the fee for ${dept.shortName} courses?`, a: `Annual fees start from ${formatINR(Math.min(...annual))}. Total course fees range from ${formatINR(Math.min(...totals))} to ${formatINR(Math.max(...totals))}, depending on the course.` },
    { q: `What is the eligibility for ${dept.shortName} admission?`, a: [...new Set(courses.map((c) => c.eligibility))].join(" • ") },
    { q: `How do I apply for ${dept.shortName} at ${BRAND.name}?`, a: `Fill the online application form or call ${BRAND.phone}. Our admission team will guide you through documents and fee payment.` },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-violet-50/60">
        {/* Header */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-6 pb-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Colleges", href: "/colleges" }, { label: title }]} />
          <div className="mt-4 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <span className="w-20 h-20 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0"><DepartmentIcon slug={dept.slug} className="w-9 h-9" /></span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  {levels.map((l) => <span key={l} className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-indigo-700">{l}</span>)}
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">Admissions Open</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
                {college && <p className="text-sm font-semibold text-indigo-600 mt-0.5">Department of {dept.name}</p>}
                <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1"><MapPin className="w-4 h-4" /> {college?.location || BRAND.address}{college?.established ? ` · Est. ${college.established}` : ""}</p>
                <p className="mt-3 text-[15px] font-semibold text-slate-800">{title} — Admission {BRAND.session}, Courses, Fees &amp; Eligibility</p>
                <p className="text-xs text-slate-400 mt-1">Last updated on {lastUpdated()}</p>
              </div>
              <div className="flex lg:flex-col gap-2 shrink-0">
                <Link href="/apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/25"><FileSignature className="w-4 h-4" /> Apply Now</Link>
                <a href={BRAND.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 px-6 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-50"><Phone className="w-4 h-4" /> Call</a>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <StatStrip
              stats={[
                { value: String(courses.length), label: "Programmes" },
                { value: formatLakh(Math.min(...annual)), label: "Fees From / yr", accent: true },
                { value: formatLakh(Math.max(...totals)), label: "Highest Total Fee" },
                { value: minDur === maxDur ? yearsLabel(minDur) : `${minDur}–${maxDur} Yrs`, label: "Duration" },
                { value: String(levels.length), label: levels.length === 1 ? "Level" : "Levels" },
                { value: BRAND.session, label: "Session" },
              ]}
            />
          </div>
        </div>

        <SectionTabs tabs={[{ id: "overview", label: "Overview" }, { id: "courses-fees", label: "Courses & Fees" }, { id: "admission", label: "Admission & Eligibility" }, { id: "faqs", label: "FAQs" }]} />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="space-y-6 min-w-0">
            <Card id="overview" title={`About ${dept.name}`}>
              <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
                <p>{dept.description}</p>
                <h3 className="font-bold text-slate-900">Courses Offered</h3>
                <p>{dept.name} at {BRAND.name} offers {courses.length} {courses.length === 1 ? "programme" : "programmes"}: {courses.map((c) => c.name).join(", ")}. Each programme combines classroom teaching with hands-on practical training.</p>
                <h3 className="font-bold text-slate-900">Admission {BRAND.session}</h3>
                <p>Admission is based on the eligibility criteria listed for each course. Apply online or visit the campus — our admission team guides you through documents, fee payment and scholarship options.</p>
              </div>
            </Card>

            <Card id="courses-fees" title="Courses & Fees" action={<span className="text-xs text-slate-500">{courses.length} programmes available</span>}>
              <ul className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <li key={c.id}>
                    <Link href={`/courses/${c.slug}`} className="group flex flex-col sm:flex-row sm:items-center gap-3 py-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 group-hover:text-indigo-700">{c.name} <span className="font-normal text-slate-500 text-sm">— {c.fullName}</span></p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-600">{levelTag(c.level)}</span> • {c.duration}
                          {c.featured && <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">Popular</span>}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 sm:text-right">
                        <div>
                          <p className="font-extrabold text-slate-900">{formatINR(c.yearlyFees[0] ?? 0)}</p>
                          <p className="text-[11px] text-slate-500">/ year</p>
                        </div>
                        <div>
                          <p className="font-extrabold text-indigo-700">{formatINR(c.totalFee)}</p>
                          <p className="text-[11px] text-slate-500">Total Fees</p>
                        </div>
                        <ArrowRight className="hidden sm:block w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            <Card id="admission" title="Admission & Eligibility">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                      <th className="py-2.5 pr-4 font-bold">Course</th>
                      <th className="py-2.5 pr-4 font-bold">Eligibility</th>
                      <th className="py-2.5 font-bold whitespace-nowrap">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {courses.map((c) => (
                      <tr key={c.id}>
                        <td className="py-3 pr-4 font-semibold text-slate-800 whitespace-nowrap">{c.name}</td>
                        <td className="py-3 pr-4 text-slate-600">{c.eligibility}</td>
                        <td className="py-3 text-slate-600 whitespace-nowrap">{c.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Faqs items={faqs} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-44">
            <ApplyCard name={dept.shortName} />
            <QuickFacts
              rows={[
                { label: "Institution", value: BRAND.name },
                { label: "Programmes", value: String(courses.length) },
                { label: "Levels", value: levels.join(", ") },
                { label: "Fees From", value: `${formatINR(Math.min(...annual))} / yr` },
                { label: "Session", value: BRAND.session },
                { label: "Helpline", value: BRAND.phone },
              ]}
            />
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="font-extrabold text-slate-900 mb-3 flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-indigo-600" /> Other Departments</p>
              <ul className="space-y-1.5 text-sm">
                {departments.filter((d) => d.slug !== dept.slug).slice(0, 6).map((d) => (
                  <li key={d.slug}><Link href={`/departments/${d.slug}`} className="text-slate-600 hover:text-indigo-700">{d.name}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {courses.length > 0 && (
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-14">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">All {dept.shortName} Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
