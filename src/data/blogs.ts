export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  image: string;
  featured: boolean;
}

export const blogCategories = [
  { name: "All", slug: "all" },
  { name: "Admission Guide", slug: "admission-guide" },
  { name: "Career Advice", slug: "career-advice" },
  { name: "Course Guide", slug: "course-guide" },
  { name: "Scholarships", slug: "scholarships" },
  { name: "Campus Life", slug: "campus-life" },
];

const author = { author: "Swanidhi Admissions Team", authorRole: "Admission Counsellors", authorAvatar: "" };

// Local fallback / seed content — managed from /admin/blogs once Supabase is connected.
export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "paramedical-courses-after-12th",
    title: "Paramedical Courses After 12th: Diploma vs Degree — Which One Should You Choose?",
    excerpt: "BMLT or DMLT? BPT or DPT? A simple guide to choosing between a paramedical diploma and a degree, with fees, duration and career paths.",
    category: "Course Guide",
    tags: ["Paramedical", "After 12th", "Career"],
    ...author,
    publishedAt: "2026-09-10",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
    featured: true,
    content: `
Healthcare is not only about doctors and nurses. Every hospital depends on lab technologists, radiographers, physiotherapists and operation-theatre technicians. These are **paramedical** careers — and they are some of the fastest ways to a stable healthcare job.

## Diploma or Degree?

| | Diploma (e.g. DMLT, DMR, DPT) | Degree (e.g. BMLT, BRIT, BPT) |
|---|---|---|
| Eligibility | I.Sc. / 10+2 with Biology | 10+2 with Biology |
| Duration | 2–3 years | 4 years + 6-month internship |
| Total fee (approx.) | ₹60,000 – ₹90,000 | ₹2,00,000 – ₹3,00,000 |
| Best for | Getting job-ready quickly | Senior roles & PG studies |

## Can I upgrade later?

Yes. Diploma holders can join the matching bachelor programme through **lateral entry** — for example DMLT → BMLT, DMR → BRIT, DPT → BPT. After the degree, you can go on to a master's such as MMLT, MRIT or MPT.

## Which course has the best scope?

- **Medical Lab Technology** — every hospital and diagnostic centre needs lab technologists.
- **Radiology & Imaging** — growing demand for X-ray, CT and MRI technologists.
- **Physiotherapy** — option to open your own clinic.
- **Operation Theatre Technology** — high demand in surgical hospitals.

Talk to our admission counsellors to find the course that fits your marks, budget and goals.
`,
  },
  {
    id: 2,
    slug: "anm-vs-gnm-vs-bsc-nursing",
    title: "ANM vs GNM vs B.Sc. Nursing: Eligibility, Fees & Career Compared",
    excerpt: "Three ways to become a nurse — here is how ANM, GNM and B.Sc. Nursing differ in eligibility, duration, fees and job roles.",
    category: "Course Guide",
    tags: ["Nursing", "ANM", "GNM", "B.Sc. Nursing"],
    ...author,
    publishedAt: "2026-08-22",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    featured: true,
    content: `
Nursing offers a respected career with jobs in India and abroad. There are three main entry routes.

## Quick comparison

| Course | Eligibility | Duration | Total Fee |
|---|---|---|---|
| ANM | 10+2 any stream | 2 years | ₹1,50,000 |
| GNM | 10+2 with English (40%) | 3 years | ₹5,00,000 |
| B.Sc. Nursing | 10+2 PCB (45%) with English | 4 years | ₹7,00,000 |

## Which one is right for you?

- **ANM** is ideal if you did not study science in 12th and want to work in community healthcare.
- **GNM** makes you a registered nurse & midwife and opens hospital staff-nurse jobs.
- **B.Sc. Nursing** is the degree route with the best long-term growth, including nursing jobs abroad and M.Sc. Nursing.

## Growing further

GNM nurses can upgrade to a degree through **Post Basic B.Sc. Nursing** (2 years), and B.Sc. graduates can pursue **M.Sc. Nursing** for teaching and senior roles.
`,
  },
  {
    id: 3,
    slug: "bams-admission-guide",
    title: "BAMS Admission Guide: NEET, Eligibility, Fees & Career",
    excerpt: "Everything you need to know about getting into BAMS — NEET requirement, course structure, internship, fees and career options.",
    category: "Admission Guide",
    tags: ["BAMS", "NEET", "Ayurveda"],
    ...author,
    publishedAt: "2026-07-30",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=80",
    featured: true,
    content: `
**BAMS (Bachelor of Ayurvedic Medicine and Surgery)** is a professional medical degree that makes you a registered Ayurvedic doctor.

## Eligibility

- 10+2 with Physics, Chemistry and Biology
- **NEET UG qualification is mandatory**

## Course structure

The programme runs for **4½ years of academics plus a 1-year compulsory internship** (5½ years in total).

## Career options

- Ayurvedic physician / own clinic
- Medical officer in AYUSH hospitals and government health schemes
- Panchakarma & wellness centres
- Higher studies — MD/MS (Ayurveda)

Contact our admission desk for the current year's admission process and documentation support.
`,
  },
  {
    id: 4,
    slug: "iti-courses-after-10th",
    title: "ITI Courses After 10th: Electrician, Fitter & More",
    excerpt: "Want a skilled job quickly after 10th? Here is what ITI Electrician, Fitter, Electronic Mechanic and Mechanic Diesel offer.",
    category: "Career Advice",
    tags: ["ITI", "After 10th", "Skills"],
    ...author,
    publishedAt: "2026-07-12",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    featured: false,
    content: `
ITI (Industrial Training Institute) courses teach practical trade skills that lead directly to jobs and apprenticeships.

## Trades offered

| Trade | Duration | Total Fee |
|---|---|---|
| Electrician | 2 years | ₹50,500 |
| Fitter | 2 years | ₹45,500 |
| Electronic Mechanic | 2 years | ₹40,500 |
| Mechanic Diesel | 1 year | ₹15,000 |

## Why ITI?

- Short duration and affordable fees
- Workshop-based, hands-on learning
- Opportunities in railways, PSUs, manufacturing and self-employment
`,
  },
];
