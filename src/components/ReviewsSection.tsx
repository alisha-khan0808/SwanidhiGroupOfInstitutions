import { Star, Quote, BadgeCheck } from "lucide-react";

// TODO: replace with real student/parent reviews before going live.
const reviews = [
  {
    name: "Student Name",
    detail: "B.Sc. Nursing",
    text: "The admission team explained the eligibility and year-wise fees clearly, and helped me with every document during admission.",
  },
  {
    name: "Parent Name",
    detail: "Parent of a paramedical student",
    text: "Honest guidance with no pressure. They suggested the right diploma for my daughter and guided us on the scholarship form too.",
  },
  {
    name: "Student Name ",
    detail: "B.P.T. (Physiotherapy)",
    text: "Good practical training and supportive faculty. The internship gave me real hospital experience before graduating.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 mb-3">
            <span className="h-[3px] w-6 rounded-full bg-indigo-600" /> Student Voices
          </p>
          <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-slate-900 tracking-tight">What Students Are Saying</h2>
          <p className="text-slate-500 mt-2 text-[15px]">Feedback from students and parents who joined Swanidhi.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <figure key={r.name + r.detail} className="relative flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg hover:shadow-indigo-900/5 transition-shadow">
              <Quote className="absolute top-5 right-5 w-8 h-8 text-indigo-100" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <blockquote className="text-slate-700 text-[15px] leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                <span className="w-10 h-10 rounded-full bg-gradient-brand text-white font-bold flex items-center justify-center">{r.name.charAt(0)}</span>
                <span>
                  <span className="flex items-center gap-1 font-bold text-slate-900 text-sm">{r.name.trim()} <BadgeCheck className="w-4 h-4 text-indigo-500" /></span>
                  <span className="block text-xs text-slate-500">{r.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
