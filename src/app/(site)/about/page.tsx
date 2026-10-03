import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/brand";
import {
  Award, Building2, GraduationCap, Target, Heart,
  Star, CheckCircle2, Globe, BookOpen, Phone,
  ChevronRight, Shield, Stethoscope, FileCheck, Layers, Users,
} from "lucide-react";

const stats = [
  { value: "49", label: "Courses Offered", icon: <BookOpen className="w-6 h-6" />, color: "text-blue-600", bg: "bg-blue-50" },
  { value: "11", label: "Departments", icon: <Building2 className="w-6 h-6" />, color: "text-green-600", bg: "bg-green-50" },
  { value: "30+", label: "Healthcare Programmes", icon: <Stethoscope className="w-6 h-6" />, color: "text-purple-600", bg: "bg-purple-50" },
  { value: "ITI–PG", label: "All Levels of Study", icon: <Layers className="w-6 h-6" />, color: "text-orange-600", bg: "bg-orange-50" },
  { value: "Govt.", label: "Scholarship Guidance", icon: <Award className="w-6 h-6" />, color: "text-yellow-600", bg: "bg-yellow-50" },
  { value: "1-on-1", label: "Admission Counselling", icon: <Users className="w-6 h-6" />, color: "text-indigo-600", bg: "bg-indigo-50" },
];

const values = [
  {
    icon: <Shield className="w-7 h-7 text-blue-600" />,
    title: "Integrity",
    desc: "Transparent admissions and a clear, published year-wise fee structure for every course — no hidden surprises for students and parents.",
  },
  {
    icon: <Star className="w-7 h-7 text-yellow-500" />,
    title: "Excellence",
    desc: "Practical, skill-based teaching with labs, workshops, hospital postings and internships, so students graduate job-ready.",
  },
  {
    icon: <Heart className="w-7 h-7 text-red-500" />,
    title: "Student-First",
    desc: "Every decision starts with one question: is this best for the student's career? Their growth and success are how we measure ourselves.",
  },
];

const services = [
  { title: "Medical (AYUSH)", desc: "BAMS — Bachelor of Ayurvedic Medicine and Surgery for NEET-qualified students", icon: "🌿" },
  { title: "Nursing", desc: "ANM, GNM, B.Sc. Nursing, Post Basic B.Sc. Nursing and M.Sc. Nursing", icon: "👩‍⚕️" },
  { title: "Paramedical Sciences", desc: "Degree, diploma, lateral-entry and PG programmes in physiotherapy, lab technology, radiology, OT technology and more", icon: "🩺" },
  { title: "Pharmacy", desc: "B.Pharma and D.Pharma for careers in hospitals, retail and the pharma industry", icon: "💊" },
  { title: "Law, Education & Management", desc: "LLB, BA LLB, BBA LLB, B.Ed, D.El.Ed, BBA, BCA, MBA and MCA", icon: "⚖️" },
  { title: "Technical (ITI)", desc: "Electrician, Fitter, Electronic Mechanic and Mechanic Diesel trades after 10th", icon: "🔧" },
];

const process = [
  { icon: <Phone className="w-6 h-6" />, title: "Enquire or Apply Online", desc: "Call our admission helpline or submit the online application form with your course preference." },
  { icon: <GraduationCap className="w-6 h-6" />, title: "Counselling", desc: "Our counsellor checks your eligibility and helps you choose the course that fits your goals." },
  { icon: <FileCheck className="w-6 h-6" />, title: "Documents & Fee", desc: "Submit your documents and first-year fee to confirm your seat. We also guide you on scholarships." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Start Your Course", desc: "Join classes, labs and practical training — with support from faculty throughout your programme." },
];

// TODO: replace with the actual leadership details.
const team = [
  {
    name: "Director",
    role: `Director, ${BRAND.name}`,
    desc: `${BRAND.name} was founded to make quality professional education accessible to every student — from ITI trades after 10th to post-graduate programmes — with practical training and transparent admissions.`,
    expertise: ["Professional & skill-based education", "Healthcare, law, education & management programmes", "Student-first, transparent admissions"],
    quote: "Every student deserves an education that leads to a real career. Our job is to make that path clear, affordable and achievable.",
    initials: "D",
  },
];

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto relative text-center">
            <div className="flex justify-center mb-6">
              <Image src={BRAND.logo} alt={BRAND.name} width={140} height={140} className="drop-shadow-xl" priority />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-full mb-4 border border-white/20">
              <Award className="w-4 h-4 text-yellow-300" /> Admissions Open {BRAND.session}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {BRAND.name}<br />
              <span className="text-blue-200 text-2xl sm:text-3xl font-semibold">{BRAND.tagline}</span>
            </h1>
            <p className="text-amber-200 text-xl font-semibold mb-3">“{BRAND.motto}”</p>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
              Professional education in medical, nursing, paramedical, pharmacy, law, education, management and technical trades — with practical training and transparent admissions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors">
                Talk to Admissions
              </Link>
              <Link href="/courses" className="border border-white/40 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gray-50 py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Why Students Choose {BRAND.shortName}</h2>
              <p className="text-gray-500">Career-focused education under one roof</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((s) => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-5 text-center border border-gray-100`}>
                  <div className={`flex justify-center mb-2 ${s.color}`}>{s.icon}</div>
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-gray-600 text-xs mt-1 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
                  <Target className="w-4 h-4" /> Our Purpose
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                  Education That Leads to<br /><span className="text-blue-600">a Real Career</span>
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-5">
                  {BRAND.name} is built on a simple belief — every student deserves a clear, affordable path to a professional career, whether they join after 10th, after 12th or after graduation.
                </p>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  With 49 programmes across 11 departments, we offer the right course for every qualification and interest — backed by practical training, internships and complete admission support.
                </p>
                <div className="space-y-3">
                  {[
                    "49 courses from ITI to post graduation",
                    "Transparent, published year-wise fee structure",
                    "Practical training with labs, workshops & internships",
                    "Guidance on government scholarships",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                  <Target className="w-8 h-8 mb-3 text-blue-200" />
                  <h3 className="font-bold text-lg mb-2">Our Mission</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    To provide affordable, skill-based professional education that prepares every student for a meaningful career.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white">
                  <Globe className="w-8 h-8 mb-3 text-indigo-200" />
                  <h3 className="font-bold text-lg mb-2">Our Vision</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    To be a leading centre for healthcare, legal, teacher and management education, known for job-ready graduates.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white col-span-2">
                  <Stethoscope className="w-8 h-8 mb-3 text-green-200" />
                  <h3 className="font-bold text-lg mb-2">Our Promise</h3>
                  <p className="text-green-100 text-sm leading-relaxed">
                    Transparent admissions, dedicated faculty, and support that continues from your first day on campus to your first job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Our Core Values</h2>
              <p className="text-gray-500">The principles that guide every interaction with our students</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What We Do</h2>
              <p className="text-gray-500">Programmes across healthcare, law, education, management and technical trades</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all group">
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How We Help</h2>
              <p className="text-gray-500">A simple, four-step admission process</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((p, i) => (
                <div key={p.title} className="bg-white rounded-2xl p-6 border border-gray-100 relative">
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    {p.icon}
                  </div>
                  <p className="text-xs font-bold text-blue-600 mb-1">STEP {i + 1}</p>
                  <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Leadership</h2>
              <p className="text-gray-500">Committed to your success</p>
            </div>
            <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                      <p className="text-blue-600 text-xs font-semibold leading-snug mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.desc}</p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Focus Areas</p>
                    <ul className="space-y-1">
                      {member.expertise.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <blockquote className="border-l-2 border-blue-200 pl-4 text-sm text-gray-500 italic">
                    &ldquo;{member.quote}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Ready to Start Your Journey?</h2>
            <p className="text-gray-500 mb-7 max-w-xl mx-auto">
              Apply online or talk to our admission team about the right course for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply"
                className="flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-4 h-4" /> Apply Now
              </Link>
              <Link
                href="/courses"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 font-bold px-8 py-3.5 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                Explore Courses <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
