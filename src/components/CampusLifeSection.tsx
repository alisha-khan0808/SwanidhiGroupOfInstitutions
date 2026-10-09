import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, GraduationCap, Users } from "lucide-react";

const photo = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

// TODO: replace with real campus photographs when available.
const featured = {
  src: photo("1522202176988-66273c2fd55f", 1200),
  alt: "Students studying together and laughing at a table with laptops",
  title: "Learning together",
  text: "Group projects, peer study and friendships that last beyond the classroom.",
};

const tiles = [
  { src: photo("1571260899304-425eee4c7efc"), alt: "Smiling student in a classroom holding her notes", title: "Interactive classrooms", icon: Users },
  { src: photo("1582719471384-894fbb16e074"), alt: "Student working at a microscope in a laboratory", title: "Hands-on practical labs", icon: FlaskConical },
  { src: photo("1523240795612-9a054b0db644"), alt: "Students discussing a lesson around a laptop in the library", title: "Library & self-study", icon: BookOpen },
  { src: photo("1541339907198-e08756dedf3f"), alt: "Graduates throwing their caps in the air", title: "Graduating with confidence", icon: GraduationCap },
];

export default function CampusLifeSection() {
  return (
    <section className="py-16 lg:py-20 bg-violet-50/70">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 mb-3"><span className="h-[3px] w-6 rounded-full bg-indigo-600" /> Campus Life</p>
            <h2 className="text-3xl sm:text-[2.1rem] font-extrabold text-slate-900 tracking-tight leading-tight">
              Where Students <span className="text-gradient">Enjoy Learning</span>
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              Practical classes, supportive faculty and a friendly campus — learning here is something students look forward to.
            </p>
          </div>
          <Link
            href="/about"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-2.5 transition-all whitespace-nowrap"
          >
            Life at Swanidhi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {/* Featured photo */}
          <figure className="group relative h-80 sm:h-[26rem] lg:h-auto lg:min-h-[32rem] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/20 to-transparent" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="inline-block bg-white text-indigo-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Student Life
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{featured.title}</h3>
              <p className="text-white/85 text-sm sm:text-base max-w-md">{featured.text}</p>
            </figcaption>
          </figure>

          {/* 2 × 2 tiles */}
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {tiles.map(({ src, alt, title, icon: Icon }) => (
              <figure key={title} className="group relative h-44 sm:h-60 rounded-3xl overflow-hidden shadow-md">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-indigo-200" />
                  </span>
                  <span className="text-white font-semibold text-xs sm:text-sm leading-tight">{title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
