"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, X, Search, LogIn, LayoutGrid, Building2, IndianRupee, FileSignature, School,
  Briefcase, GraduationCap, Handshake, ChevronRight, ChevronDown, Wrench, Award, Compass,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

const quickLinks = [
  { label: "All Colleges", href: "/colleges", icon: School },
  { label: "All Courses", href: "/courses", icon: LayoutGrid },
  { label: "Departments", href: "/departments", icon: Building2, wideOnly: true },
  { label: "Fee Structure", href: "/fee-structure", icon: IndianRupee, wideOnly: true },
  { label: "Apply Online", href: "/apply", icon: FileSignature, live: true },
];

const navLinks = [
  { label: "All Colleges", href: "/colleges" },
  { label: "Departments", href: "/departments" },
  { label: "Courses", href: "/courses" },
  { label: "Fee Structure", href: "/fee-structure" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Admissions", href: "/apply", highlight: true },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const tools = [
  { label: "Course Finder", desc: "Courses you're eligible for", href: "/#course-finder", icon: Compass },
  { label: "Scholarship Finder", desc: "Scholarships you qualify for", href: "/#scholarship-finder", icon: Award },
  { label: "Fee Structure", desc: "Year-wise fee for all courses", href: "/fee-structure", icon: IndianRupee },
];

const loginOptions = [
  { label: "Office Staff", desc: "Admin, counsellor & team CRM login", href: "/crm/login", icon: Briefcase, color: "bg-blue-50 text-blue-600" },
  { label: "Student", desc: "Admission, fees & documents portal", href: "/crm/student/login", icon: GraduationCap, color: "bg-emerald-50 text-emerald-600" },
  { label: "Associate", desc: "Partner portal — leads, students & wallet", href: "/crm/login?as=associate", icon: Handshake, color: "bg-amber-50 text-amber-700" },
];

const announcements = [
  `Admissions Open ${BRAND.session} — Apply Online`,
  "B.Sc. Nursing, GNM & ANM : Seats Filling Fast",
  "BAMS Admission through NEET UG 2026",
  "Paramedical Diploma holders : Lateral Entry to Bachelor programmes",
  "Govt. Scholarship guidance for SC / ST / OBC & Minority students",
  `Admission Helpline : ${BRAND.phone}`,
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: string) => href !== "/" && (pathname === href || pathname.startsWith(href + "/"));
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    router.push(`/courses${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        {/* Row 1 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 lg:gap-6 h-[68px]">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
              <Image src={BRAND.logo} alt={BRAND.name} width={48} height={48} className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0" priority />
              <span className="flex flex-col leading-tight min-w-0">
                <span className="text-[15px] sm:text-base font-extrabold text-slate-900 tracking-tight sm:whitespace-nowrap">{BRAND.name}</span>
                <span className="hidden sm:block text-[10px] font-semibold text-slate-500 whitespace-nowrap">{BRAND.tagline}</span>
              </span>
            </Link>

            <div className="hidden xl:flex items-center gap-1">
              {quickLinks.map(({ label, href, icon: Icon, live, wideOnly }) => (
                <Link
                  key={label}
                  href={href}
                  className={`${wideOnly ? "hidden 2xl:flex" : "flex"} items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                    isActive(href) ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {live && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </Link>
              ))}
            </div>

            <form onSubmit={search} className="hidden lg:flex flex-1 min-w-0 max-w-md ml-auto">
              <label className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses — Nursing, BMLT, LLB, B.Ed…"
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3 text-[13px] text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition"
                />
              </label>
            </form>

            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
              <button className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="hidden lg:block border-t border-slate-100">
          <div className="max-w-[1320px] mx-auto px-6 h-10 flex items-center justify-center gap-1 text-[13px]">
            {navLinks.map((l, i) => (
              <span key={l.label} className="flex items-center">
                {(i === 3 || i === 6) && <span className="mx-2 h-4 w-px bg-slate-200" />}
                <Link href={l.href} className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${isActive(l.href) ? "bg-blue-50 text-blue-700" : l.highlight ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}>
                  {l.label}
                </Link>
              </span>
            ))}
            <span className="mx-2 h-4 w-px bg-slate-200" />
            <div className="relative" onMouseLeave={() => setToolsOpen(false)}>
              <button type="button" onClick={() => setToolsOpen((v) => !v)} onMouseEnter={() => setToolsOpen(true)} className="flex items-center gap-1 px-3 py-1 font-semibold text-slate-700 hover:text-blue-600">
                <Wrench className="w-3.5 h-3.5 text-blue-600" /> Tools <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {toolsOpen && (
                <div className="absolute right-0 top-full pt-2 w-64">
                  <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                    {tools.map(({ label, desc, href, icon: Icon }) => (
                      <Link key={label} href={href} onClick={() => setToolsOpen(false)} className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-blue-50">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Icon className="w-4 h-4" /></span>
                        <span>
                          <span className="block text-[13px] font-semibold text-slate-800">{label}</span>
                          <span className="block text-[11px] text-slate-500">{desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            <form onSubmit={search} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses…" className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-blue-400" />
            </form>
            <div className="grid grid-cols-2 gap-2">
              {[...navLinks, ...tools.slice(0, 2)].map((l) => (
                <Link key={l.label + l.href} href={l.href} onClick={() => setIsOpen(false)} className="rounded-xl border border-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-600">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-2">
              <Link href="/apply" onClick={() => setIsOpen(false)} className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-brand text-white text-sm font-semibold">
                <FileSignature className="w-4 h-4" /> Apply Now
              </Link>
              <button type="button" onClick={() => { setIsOpen(false); setLoginOpen(true); }} className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-blue-200 text-blue-700 text-sm font-semibold">
                <LogIn className="w-4 h-4" /> Login
              </button>
            </div>
            <a href={BRAND.phoneHref} className="block text-center text-sm text-slate-600">Admission Helpline: <span className="font-semibold text-slate-900">{BRAND.phone}</span></a>
          </div>
        )}
      </nav>

      {/* Announcement ticker */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 text-white overflow-hidden">
        <div className="flex w-max animate-marquee py-2.5">
          {[...announcements, ...announcements].map((a, i) => (
            <Link key={i} href="/apply" className="flex items-center gap-3 px-6 text-[13px] font-semibold whitespace-nowrap hover:text-indigo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              {a}
            </Link>
          ))}
        </div>
      </div>

      {/* Login chooser */}
      {loginOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/50 flex items-center justify-center p-4" onClick={() => setLoginOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Login</h2>
                <p className="text-sm text-slate-500 mt-0.5">Choose how you want to sign in</p>
              </div>
              <button type="button" onClick={() => setLoginOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {loginOptions.map(({ label, desc, href, icon: Icon, color }) => (
                <a key={label} href={href} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group">
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}><Icon className="w-5 h-5" /></span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-slate-900">{label}</span>
                    <span className="block text-xs text-slate-500">{desc}</span>
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                </a>
              ))}
            </div>
            <Link href="/admin/login" className="block text-center text-xs text-slate-400 hover:text-blue-600 mt-5">Website content admin →</Link>
          </div>
        </div>
      )}
    </>
  );
}
