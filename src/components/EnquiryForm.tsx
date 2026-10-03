"use client";
import { useMemo, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BRAND } from "@/lib/brand";
import { departments, courseLabel } from "@/data/courses";

type CourseOption = { name: string; fullName: string; department: string };

interface Props {
  courses: CourseOption[];
  defaultCourse?: string;
  source: string;
  /** "compact" = sidebar enquiry, "full" = complete admission application */
  variant?: "compact" | "full";
}

const qualifications = ["10th Pass", "12th / I.Sc. Pass", "12th Appearing", "Diploma", "Graduation", "Post Graduation"];

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white";

const empty = { name: "", phone: "", email: "", city: "", guardian: "", dob: "", gender: "", qualification: "", marks: "", course: "", message: "" };

export default function EnquiryForm({ courses, defaultCourse = "", source, variant = "compact" }: Props) {
  const [form, setForm] = useState({ ...empty, course: defaultCourse });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const full = variant === "full";

  const grouped = useMemo(
    () =>
      departments
        .map((d) => ({ dept: d, items: courses.filter((c) => c.department === d.slug) }))
        .filter((g) => g.items.length > 0),
    [courses]
  );

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!isSupabaseConfigured) {
      setError(`Online applications will be enabled soon. Please call ${BRAND.phone} to apply.`);
      return;
    }
    setLoading(true);
    // Extra application details are folded into `message` so they show up on the CRM lead.
    const details = [
      form.guardian && `Father / Guardian: ${form.guardian}`,
      form.dob && `Date of Birth: ${form.dob}`,
      form.gender && `Gender: ${form.gender}`,
      form.qualification && `Qualification: ${form.qualification}`,
      form.marks && `Marks: ${form.marks}%`,
      form.message,
    ].filter(Boolean).join("\n");
    const { error: dbError } = await supabase.from("enquiries").insert([{
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      city: form.city.trim() || null,
      course: form.course || null,
      message: details || null,
      source,
      status: "new",
    }]);
    setLoading(false);
    if (dbError) {
      setError("Something went wrong. Please try again or call us.");
      return;
    }
    setSubmitted(true);
    setForm({ ...empty, course: defaultCourse });
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-green-800 mb-2">{full ? "Application Received!" : "Enquiry Sent!"}</h3>
        <p className="text-green-700 text-sm mb-4">Thank you. Our admission team will call you shortly.</p>
        <button onClick={() => setSubmitted(false)} className="text-sm text-green-700 underline hover:text-green-900">
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={full ? "space-y-5" : "space-y-3"}>
      <div className={full ? "grid grid-cols-1 sm:grid-cols-2 gap-5" : "space-y-3"}>
        <Field label="Student's Full Name *" show={full}>
          <input type="text" value={form.name} onChange={set("name")} placeholder="Full name" required className={inputCls} />
        </Field>
        <Field label="Mobile Number *" show={full}>
          <input type="tel" value={form.phone} onChange={set("phone")} placeholder="10-digit mobile number" required className={inputCls} />
        </Field>
        {full && (
          <>
            <Field label="Father's / Guardian's Name" show>
              <input type="text" value={form.guardian} onChange={set("guardian")} placeholder="Father's / guardian's name" className={inputCls} />
            </Field>
            <Field label="Email Address" show>
              <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
            </Field>
            <Field label="Date of Birth" show>
              <input type="date" value={form.dob} onChange={set("dob")} className={inputCls} />
            </Field>
            <Field label="Gender" show>
              <select value={form.gender} onChange={set("gender")} className={inputCls}>
                <option value="">Select gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Highest Qualification" show>
              <select value={form.qualification} onChange={set("qualification")} className={inputCls}>
                <option value="">Select qualification</option>
                {qualifications.map((q) => <option key={q}>{q}</option>)}
              </select>
            </Field>
            <Field label="Marks (%)" show>
              <input type="number" min="0" max="100" step="0.01" value={form.marks} onChange={set("marks")} placeholder="e.g. 65" className={inputCls} />
            </Field>
          </>
        )}
        <Field label="City / District" show={full}>
          <input type="text" value={form.city} onChange={set("city")} placeholder="City / district" className={inputCls} />
        </Field>
        <Field label="Course Applying For *" show={full}>
          <select value={form.course} onChange={set("course")} required className={inputCls}>
            <option value="">Select a course</option>
            {grouped.map(({ dept, items }) => (
              <optgroup key={dept.slug} label={dept.name}>
                {items.map((c) => (
                  <option key={courseLabel(c)} value={courseLabel(c)}>
                    {courseLabel(c)}{c.fullName && !c.fullName.startsWith(c.name) ? ` — ${c.fullName}` : ""}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
      </div>
      {full && (
        <Field label="Message / Query" show>
          <textarea rows={3} value={form.message} onChange={set("message")} placeholder="Anything you would like us to know" className={`${inputCls} resize-none`} />
        </Field>
      )}

      {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
      >
        {loading ? (
          <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
        ) : (
          <><Send className="w-4 h-4" /> {full ? "Submit Application" : "Request Call Back"}</>
        )}
      </button>
    </form>
  );
}

function Field({ label, show, children }: { label: string; show: boolean; children: React.ReactNode }) {
  if (!show) return <>{children}</>;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
