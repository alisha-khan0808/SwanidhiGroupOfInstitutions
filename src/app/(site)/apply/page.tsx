import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import { getCourses } from "@/lib/content";
import { BRAND } from "@/lib/brand";
import { CheckCircle2, FileSignature, Phone, FileText } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Apply Online",
  description: `Apply online for admission to ${BRAND.name} — session ${BRAND.session}.`,
};

const steps = [
  "Fill the online application form",
  "Our admission counsellor calls you to confirm details",
  "Submit documents & pay the first-year fee",
  "Receive your admission confirmation",
];

const documents = [
  "10th marksheet & certificate",
  "12th / I.Sc. marksheet (if applicable)",
  "Graduation / diploma marksheets (for PG / lateral entry)",
  "Transfer & migration certificate",
  "Aadhaar card",
  "Caste / income certificate (for scholarship, if applicable)",
  "6 passport-size photographs",
  "NEET UG scorecard (for BAMS)",
];

export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const [{ course }, courses] = await Promise.all([searchParams, getCourses()]);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50">
        <section className="bg-gradient-to-br from-blue-800 to-blue-600 text-white py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <FileSignature className="w-4 h-4" />
              Admissions Open {BRAND.session}
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3">Apply Online</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Submit your application in two minutes. Our admission team will contact you to complete the process.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Admission Application Form</h2>
            <EnquiryForm
              courses={courses.map((c) => ({ name: c.name, fullName: c.fullName, department: c.department }))}
              defaultCourse={course ?? ""}
              source="Online Application"
              variant="full"
            />
          </div>

          <aside className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Admission Process</h3>
              <ol className="space-y-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-sm text-gray-700">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600" /> Documents Required</h3>
              <ul className="space-y-2">
                {documents.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-lg mb-1">Need Help?</h3>
              <p className="text-blue-200 text-sm mb-4">Call our admission helpline — {BRAND.hours[0]}.</p>
              <a href={BRAND.phoneHref} className="flex items-center justify-center gap-2 bg-white text-blue-600 font-bold text-sm px-5 py-3 rounded-xl hover:bg-blue-50 w-full">
                <Phone className="w-4 h-4" /> {BRAND.phone}
              </a>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
