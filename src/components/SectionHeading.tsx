import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Reference-style section header: short indigo line + uppercase eyebrow,
// bold title, muted subtitle and an optional outline action on the right.
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: { label: string; href: string };
  center?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-4 mb-8 ${center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-3 ${center ? "justify-center" : ""}`}>
            <span className="h-[3px] w-6 rounded-full bg-blue-600" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-slate-900 leading-tight tracking-tight">{title}</h2>
        {subtitle && <p className="text-slate-500 mt-2 text-[15px]">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          {action.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
