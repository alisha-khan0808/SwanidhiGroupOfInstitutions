import { Star, Quote } from "lucide-react";

// TODO: replace with real student/parent reviews before going live.
const reviews = [
  {
    name: "Student Name",
    detail: "B.Sc. Nursing",
    text: "The admission team explained the eligibility and year-wise fees clearly, and helped me with every document during admission.",
    rating: 5,
  },
  {
    name: "Parent Name",
    detail: "Parent of a paramedical student",
    text: "Honest guidance with no pressure. They suggested the right diploma for my daughter and guided us on the scholarship form too.",
    rating: 5,
  },
  {
    name: "Student Name",
    detail: "B.P.T. (Physiotherapy)",
    text: "Good practical training and supportive faculty. The internship gave me real hospital experience before graduating.",
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 lg:py-20 bg-sky-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 lg:mb-12">
          <p className="text-green-600 text-sm font-semibold uppercase tracking-wider mb-2">Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">What Students &amp; Parents Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure
              key={r.detail}
              className="relative bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-green-100" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white font-bold flex items-center justify-center">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.detail}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
