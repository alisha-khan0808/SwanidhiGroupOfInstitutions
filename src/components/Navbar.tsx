"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, FileSignature, Briefcase, GraduationCap, Handshake, ChevronRight } from "lucide-react";
import { BRAND } from "@/lib/brand";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Departments", href: "/departments" },
  { label: "Fee Structure", href: "/fee-structure" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const loginOptions = [
  { label: "Office Staff", desc: "Admin, counsellor & team CRM login", href: "/crm/login", icon: Briefcase, color: "bg-blue-50 text-blue-600" },
  { label: "Student", desc: "Admission, fees & documents portal", href: "/crm/student/login", icon: GraduationCap, color: "bg-green-50 text-green-600" },
  { label: "Associate", desc: "Partner portal — leads, students & wallet", href: "/crm/login?as=associate", icon: Handshake, color: "bg-teal-50 text-teal-700" },
];

const statItems = [
  { label: "Courses Offered", value: "49" },
  { label: "Departments", value: "11" },
  { label: "ITI to Post Graduate", value: "All Levels" },
  { label: "Admissions Open", value: BRAND.session },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-6 h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 xl:shrink-0">
              <Image
                src={BRAND.logo}
                alt={BRAND.name}
                width={56}
                height={56}
                className="object-contain shrink-0 w-12 h-12 sm:w-14 sm:h-14"
                priority
              />
              <div className="flex flex-col gap-1 leading-none">
                <span className="text-[15px] sm:text-lg font-black text-blue-900 tracking-wide leading-tight sm:whitespace-nowrap">{BRAND.name}</span>
                <span className="hidden sm:block text-[10px] font-semibold text-green-700 tracking-wide whitespace-nowrap">{BRAND.tagline}</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden xl:flex flex-1 items-center justify-center gap-5 2xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <Link
                href="/apply"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg shadow-md shadow-red-200 transition-colors text-sm flex items-center gap-2 whitespace-nowrap"
              >
                <FileSignature className="w-4 h-4" />
                Apply Now
              </Link>
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="text-sm bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-blue-600">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-center lg:justify-between gap-6">
            <a
              href={BRAND.phoneHref}
              className="hidden lg:flex items-center gap-2 text-sm text-white/90 hover:text-white whitespace-nowrap transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span>
                Admission Helpline: <span className="font-semibold text-white">{BRAND.phone}</span>
              </span>
            </a>
            <div className="flex items-center justify-center gap-6 sm:gap-10 py-2.5 text-white">
              {statItems.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-sm sm:text-base font-bold leading-tight">{item.value}</div>
                  <div className="text-[10px] sm:text-xs text-blue-200 leading-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 text-sm bg-red-600 text-white px-4 py-2.5 rounded-lg font-bold shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <FileSignature className="w-4 h-4" />
              Apply Now
            </Link>
            <a
              href={BRAND.phoneHref}
              className="flex items-center justify-center gap-2 text-sm text-blue-600 border border-blue-600 px-4 py-2 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="w-4 h-4" />
              Admission Helpline · {BRAND.phone}
            </a>
            <button
              type="button"
              className="text-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
              onClick={() => { setIsOpen(false); setLoginOpen(true); }}
            >
              Login
            </button>
          </div>
        </div>
      )}

      {/* Login chooser */}
      {loginOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setLoginOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-blue-900">Login</h2>
                <p className="text-sm text-gray-500 mt-0.5">Choose how you want to sign in</p>
              </div>
              <button
                type="button"
                onClick={() => setLoginOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {loginOptions.map(({ label, desc, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-gray-900">{label}</span>
                    <span className="block text-xs text-gray-500">{desc}</span>
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600" />
                </a>
              ))}
            </div>
            <Link
              href="/admin/login"
              className="block text-center text-xs text-gray-400 hover:text-blue-600 mt-5"
            >
              Website content admin →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
