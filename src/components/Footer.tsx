import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { departments } from "@/data/courses";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  { title: "Departments", links: departments.slice(0, 7).map((d) => ({ label: d.shortName, href: `/departments/${d.slug}` })) },
  {
    title: "Popular Courses",
    links: [
      { label: "B.Sc. Nursing", href: "/courses/b-sc-nursing" },
      { label: "GNM", href: "/courses/gnm" },
      { label: "BAMS", href: "/courses/bams" },
      { label: "B.Pharma", href: "/courses/b-pharma" },
      { label: "B.P.T.", href: "/courses/b-p-t" },
      { label: "LLB", href: "/courses/llb" },
      { label: "All Courses", href: "/courses" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Course Finder", href: "/#course-finder" },
      { label: "Scholarship Finder", href: "/#scholarship-finder" },
      { label: "Fee Structure", href: "/fee-structure" },
      { label: "Apply Online", href: "/apply" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Scholarships", href: "/scholarship" },
      { label: "Staff Login", href: "/crm/login" },
      { label: "Student Login", href: "/crm/student/login" },
    ],
  },
];

const popular: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Courses After 10th",
    links: [
      { label: "ITI Electrician", href: "/courses/electrician" },
      { label: "ITI Fitter", href: "/courses/fitter" },
      { label: "Dresser", href: "/courses/dresser" },
      { label: "All ITI Courses", href: "/departments/iti" },
    ],
  },
  {
    title: "Courses After 12th",
    links: [
      { label: "Nursing Courses", href: "/departments/nursing" },
      { label: "Paramedical Courses", href: "/departments/paramedical-degree" },
      { label: "Pharmacy Courses", href: "/departments/pharmacy" },
      { label: "BA LLB / BBA LLB", href: "/departments/law" },
    ],
  },
  {
    title: "Diploma Courses",
    links: [
      { label: "DMLT", href: "/courses/d-m-l-t" },
      { label: "D.Pharma", href: "/courses/d-pharma" },
      { label: "X-Ray (DMR)", href: "/courses/d-m-r-x-ray" },
      { label: "D.El.Ed", href: "/courses/d-el-ed" },
    ],
  },
  {
    title: "PG & Lateral Entry",
    links: [
      { label: "M.Sc. Nursing", href: "/courses/m-sc-nursing" },
      { label: "MBA Hospital Mgmt.", href: "/courses/mba-in-hospital-management" },
      { label: "Paramedical PG", href: "/departments/paramedical-pg" },
      { label: "Lateral Entry", href: "/departments/paramedical-lateral-entry" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#f7f7fb] border-t border-slate-100 text-slate-600">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2.4fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src={BRAND.logo} alt={BRAND.name} width={56} height={56} className="w-14 h-14 object-contain" />
              <span className="font-extrabold text-slate-900 leading-tight">{BRAND.name}</span>
            </Link>
            <p className="text-sm mt-4 leading-relaxed">Professional education in medical, nursing, paramedical, pharmacy, law, education, management and technical trades — from ITI to post graduation.</p>
            <p className="text-sm mt-2 font-semibold text-indigo-700">“{BRAND.motto}” <span className="font-normal text-slate-500">— {BRAND.mottoMeaning}</span></p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-indigo-600 shrink-0" /><a href={BRAND.phoneHref} className="hover:text-indigo-700">{BRAND.phone}</a></li>
              <li className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-indigo-600 shrink-0" /><a href={`mailto:${BRAND.email}`} className="hover:text-indigo-700">{BRAND.email}</a></li>
              <li className="flex items-start gap-2.5"><MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />{BRAND.address}</li>
              <li className="flex items-start gap-2.5"><Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />{BRAND.hours.join(" · ")}</li>
            </ul>
          </div>

          {/* Link columns */}
          <nav className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-slate-900 mb-4">{col.title}</h4>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}><Link href={l.href} className="hover:text-indigo-700 transition-colors">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Stay in the loop</h4>
            <p className="text-sm">Admission dates, new courses and scholarship alerts — straight to your inbox.</p>
            <form action="/contact" className="mt-4 flex gap-2">
              <input type="email" name="email" placeholder="Email address" className="flex-1 min-w-0 h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-400" />
              <button className="h-11 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Subscribe</button>
            </form>
            <Link href="/apply" className="mt-5 inline-flex items-center justify-center w-full h-11 rounded-xl bg-gradient-brand text-white text-sm font-bold">Apply for {BRAND.session}</Link>
          </div>
        </div>

        {/* Popular searches */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-5">Popular Searches</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popular.map((p) => (
              <div key={p.title}>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{p.title}</p>
                <p className="text-sm leading-7">
                  {p.links.map((l, i) => (
                    <span key={l.label}>
                      <Link href={l.href} className="hover:text-indigo-700">{l.label}</Link>
                      {i < p.links.length - 1 && <span className="mx-2 text-slate-300">|</span>}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p>Admissions {BRAND.session} · Helpline {BRAND.phone}</p>
        </div>
      </div>
    </footer>
  );
}
