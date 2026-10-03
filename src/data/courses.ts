// Course catalogue — transcribed from the official fee-structure brochure.
// This file is the local fallback / seed. Once Supabase is connected the
// website reads the `programs` table instead (see supabase/setup.sql) and the
// admin panel (/admin/courses) edits it.

export type CourseLevel = "Certificate" | "Diploma" | "Degree" | "Integrated" | "Lateral Entry" | "Post Graduate";

export interface Course {
  id: number;
  slug: string;
  name: string; // as printed, e.g. "B.Sc. Nursing"
  fullName: string;
  department: string; // Department slug
  level: CourseLevel;
  duration: string; // display text, e.g. "4 Years & 6 Month Internship"
  durationYears: number; // used for filters / sorting
  eligibility: string;
  yearlyFees: number[]; // one entry per year, in ₹
  feeNote: string; // extra fee text, e.g. "5th Year: ₹60,000"
  totalFee: number; // total course fee as published, in ₹
  image: string;
  description: string;
  highlights: string[];
  careers: string[];
  featured: boolean;
}

export interface Department {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  image: string;
  description: string;
  gradient: string;
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

const IMG = {
  ayurveda: img("1512069772995-ec65ed45afd6"),
  electrician: img("1621905251189-08b45d6a269e"),
  industrial: img("1581092160562-40aa08e78837"),
  technician: img("1581091226825-a6a2a5aee158"),
  law: img("1589829545856-d10d557cf95f"),
  lawBooks: img("1505664194779-8beaceb93744"),
  pharmacy: img("1587854692152-cbe660dbde88"),
  pills: img("1471864190281-a93a3070b6de"),
  nursing: img("1584515933487-779824d29309"),
  doctor: img("1576091160399-112ba8d25d1d"),
  stethoscope: img("1576091160550-2173dba999ef"),
  hospital: img("1519494026892-80bbd2d6fd0d"),
  corridor: img("1516549655169-df83a0774514"),
  biotech: img("1532187863486-abf9dbad1b69"),
  microscope: img("1576086213369-97a306d36557"),
  lab: img("1582719471384-894fbb16e074"),
  labWork: img("1579684385127-1ef15d508118"),
  physio: img("1581594693702-fbdc51b2763b"),
  surgery: img("1551076805-e1869033e561"),
  radiology: img("1530026405186-ed1f139313f8"),
  scan: img("1559757148-5c350d0d3c56"),
  clinic: img("1504439468489-c8920d796a29"),
  classroom: img("1503676260728-1c00da094a0b"),
  books: img("1497633762265-9d179a990aa6"),
  code: img("1517694712202-14dd9538aa97"),
  laptop: img("1498050108023-c5249f4df085"),
  analytics: img("1460925895917-afdab827c52f"),
  meeting: img("1556761175-b413da4baf72"),
  campus: img("1523050854058-8df90110c9f1"),
};

export const departments: Department[] = [
  { slug: "medical", name: "Medical (AYUSH)", shortName: "Medical", icon: "🌿", image: IMG.ayurveda, gradient: "from-green-600 to-emerald-700", description: "Ayurvedic medicine and surgery for NEET-qualified students who want to become registered doctors." },
  { slug: "nursing", name: "Nursing", shortName: "Nursing", icon: "👩‍⚕️", image: IMG.nursing, gradient: "from-sky-500 to-blue-700", description: "ANM, GNM, B.Sc., Post Basic B.Sc. and M.Sc. Nursing — the complete nursing ladder under one roof." },
  { slug: "pharmacy", name: "Pharmacy", shortName: "Pharmacy", icon: "💊", image: IMG.pharmacy, gradient: "from-purple-600 to-fuchsia-700", description: "Diploma and Bachelor programmes in pharmacy for careers in hospitals, retail and the pharma industry." },
  { slug: "paramedical-degree", name: "Paramedical — Degree", shortName: "Paramedical Degree", icon: "🩺", image: IMG.physio, gradient: "from-blue-600 to-indigo-700", description: "Bachelor programmes in physiotherapy, radiology, lab technology, OT technology, biotechnology and hospital management." },
  { slug: "paramedical-diploma", name: "Paramedical — Diploma", shortName: "Paramedical Diploma", icon: "🧪", image: IMG.lab, gradient: "from-cyan-500 to-sky-700", description: "Job-oriented diplomas in lab technology, X-ray, ECG, OT assistance, physiotherapy and sanitary inspection." },
  { slug: "paramedical-lateral-entry", name: "Paramedical — Lateral Entry", shortName: "Lateral Entry", icon: "⤴️", image: IMG.radiology, gradient: "from-teal-500 to-emerald-700", description: "Already hold a paramedical diploma? Join the matching bachelor programme directly in a later year." },
  { slug: "paramedical-pg", name: "Paramedical — PG", shortName: "Paramedical PG", icon: "🎓", image: IMG.clinic, gradient: "from-indigo-500 to-violet-700", description: "Master's programmes in physiotherapy, OT technology, radiology and medical lab technology." },
  { slug: "law", name: "Law", shortName: "Law", icon: "⚖️", image: IMG.law, gradient: "from-amber-600 to-orange-700", description: "Three-year LLB for graduates and five-year integrated BA LLB / BBA LLB after 12th." },
  { slug: "education", name: "Education", shortName: "Education", icon: "📚", image: IMG.classroom, gradient: "from-rose-500 to-pink-700", description: "Teacher-training programmes — B.Ed, D.El.Ed and M.A. (Education)." },
  { slug: "management-it", name: "Management & IT", shortName: "Management & IT", icon: "💼", image: IMG.analytics, gradient: "from-slate-600 to-slate-800", description: "BBA, BCA, MCA and MBA programmes, including MBA in Hospital Management." },
  { slug: "iti", name: "I.T.I. (Technical)", shortName: "I.T.I.", icon: "🔧", image: IMG.electrician, gradient: "from-orange-500 to-red-600", description: "Hands-on trade courses after 10th — Electrician, Fitter, Electronic Mechanic and Mechanic Diesel." },
];

type Seed = Omit<Course, "id" | "slug" | "featured" | "image"> & { slug?: string; featured?: boolean; image?: string };

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const deptImage = (slug: string) => departments.find((d) => d.slug === slug)?.image ?? IMG.campus;

const paramedicalCareers = ["Hospitals & multi-speciality clinics", "Diagnostic centres", "Government health services", "Private practice / self-employment", "Higher studies"];

const seeds: Seed[] = [
  // ───────── Medical ─────────
  {
    name: "BAMS", fullName: "Bachelor of Ayurvedic Medicine and Surgery", department: "medical", level: "Degree",
    duration: "4½ Years + 1 Year Internship (5½ Years)", durationYears: 5.5,
    eligibility: "10+2 with Biology, NEET UG qualified",
    yearlyFees: [300000, 300000, 300000, 450000], feeNote: "", totalFee: 1350000, image: IMG.ayurveda, featured: true,
    description: "BAMS is a professional medical degree that combines classical Ayurveda with modern medical science. Graduates are registered Ayurvedic doctors who can practise, work in hospitals and wellness centres, or pursue MD/MS (Ayurveda).",
    highlights: ["Admission through NEET UG counselling", "Integrated Ayurveda + modern medicine curriculum", "One-year compulsory rotating internship", "Eligible for MD/MS (Ayurveda) after graduation"],
    careers: ["Ayurvedic Physician", "Medical Officer (AYUSH)", "Panchakarma Specialist", "Wellness & Research Centres", "Higher studies — MD/MS (Ayurveda)"],
  },

  // ───────── I.T.I. ─────────
  {
    name: "Electrician", fullName: "I.T.I. Electrician", department: "iti", level: "Certificate",
    duration: "2 Years", durationYears: 2, eligibility: "10th Pass",
    yearlyFees: [30500, 20000], feeNote: "", totalFee: 50500, image: IMG.electrician, featured: true,
    description: "A two-year trade course covering domestic and industrial wiring, electrical machines, motors, transformers and safety practices, with extensive workshop training.",
    highlights: ["Workshop-based practical training", "Wiring, motors, transformers & control panels", "Apprenticeship-ready skills"],
    careers: ["Electrician (Industrial / Domestic)", "Railways & PSU technician posts", "Power & electricity boards", "Self-employed electrical contractor"],
  },
  {
    name: "Fitter", fullName: "I.T.I. Fitter", department: "iti", level: "Certificate",
    duration: "2 Years", durationYears: 2, eligibility: "10th Pass",
    yearlyFees: [25500, 20000], feeNote: "", totalFee: 45500, image: IMG.industrial,
    description: "Trains students in fitting, assembling and maintaining machine parts and structures using hand and machine tools, with a strong focus on measurement and precision.",
    highlights: ["Precision fitting & machining", "Hands-on workshop practice", "Apprenticeship-ready skills"],
    careers: ["Fitter in manufacturing plants", "Railways & PSU technician posts", "Maintenance technician", "Fabrication workshops"],
  },
  {
    name: "Electronic Mechanic", fullName: "I.T.I. Electronic Mechanic", department: "iti", level: "Certificate",
    duration: "2 Years", durationYears: 2, eligibility: "10th Pass",
    yearlyFees: [20500, 20000], feeNote: "", totalFee: 40500, image: IMG.technician,
    description: "Covers electronic components, circuits, consumer electronics, and testing & repair of electronic equipment.",
    highlights: ["Circuit building & testing", "Consumer electronics repair", "Practical lab sessions"],
    careers: ["Electronics service technician", "Electronics manufacturing", "Telecom & equipment maintenance", "Own repair business"],
  },
  {
    name: "Mechanic Diesel", fullName: "I.T.I. Mechanic Diesel", department: "iti", level: "Certificate",
    duration: "1 Year", durationYears: 1, eligibility: "10th Pass",
    yearlyFees: [15000], feeNote: "", totalFee: 15000, image: IMG.industrial,
    description: "A one-year course on overhauling, servicing and repairing diesel engines and related vehicle systems.",
    highlights: ["Engine overhaul & servicing", "Fuel & injection systems", "Short, job-ready programme"],
    careers: ["Diesel mechanic", "Automobile workshops", "Transport & logistics fleets", "Generator & pump maintenance"],
  },

  // ───────── Law ─────────
  {
    name: "LLB", fullName: "Bachelor of Laws (LLB)", department: "law", level: "Degree",
    duration: "3 Years", durationYears: 3, eligibility: "Graduation Pass Out",
    yearlyFees: [60000, 60000, 60000], feeNote: "", totalFee: 180000, image: IMG.law, featured: true,
    description: "A three-year professional law degree for graduates, covering constitutional, criminal, civil, corporate and procedural law along with moot courts and court visits.",
    highlights: ["Moot court & legal-aid practice", "Constitutional, criminal & civil law", "Eligible to enrol as an advocate after completion"],
    careers: ["Advocate", "Legal Advisor", "Corporate Legal Executive", "Judicial services (after exams)", "Higher studies — LLM"],
  },
  {
    name: "BA LLB", fullName: "Bachelor of Arts + Bachelor of Laws (Integrated)", department: "law", level: "Integrated",
    duration: "5 Years", durationYears: 5, eligibility: "10+2 any stream",
    yearlyFees: [60000, 60000, 60000, 60000, 60000], feeNote: "5th Year: ₹60,000", totalFee: 300000, image: IMG.lawBooks,
    description: "A five-year integrated programme combining arts subjects (political science, history, sociology) with a full professional law curriculum — start right after 12th.",
    highlights: ["Integrated degree straight after 12th", "Arts + law curriculum", "Moot courts & internships"],
    careers: ["Advocate", "Legal Advisor", "Civil services", "Judicial services (after exams)", "Higher studies — LLM"],
  },
  {
    name: "BBA LLB", fullName: "Bachelor of Business Administration + Bachelor of Laws (Integrated)", department: "law", level: "Integrated",
    duration: "5 Years", durationYears: 5, eligibility: "10+2 any stream",
    yearlyFees: [60000, 60000, 60000, 60000, 60000], feeNote: "5th Year: ₹60,000", totalFee: 300000, image: IMG.law,
    description: "A five-year integrated programme blending business management with law — ideal for careers in corporate law, compliance and business advisory.",
    highlights: ["Management + law in one degree", "Focus on corporate & business law", "Moot courts & internships"],
    careers: ["Corporate Lawyer", "Compliance Officer", "Legal Consultant", "Advocate", "Higher studies — LLM / MBA"],
  },

  // ───────── Pharmacy ─────────
  {
    name: "B.Pharma", fullName: "Bachelor of Pharmacy (B.Pharm)", department: "pharmacy", level: "Degree",
    duration: "4 Years", durationYears: 4, eligibility: "10+2 with Biology / Maths",
    yearlyFees: [180000, 100000, 100000, 100000], feeNote: "", totalFee: 450000, image: IMG.pharmacy, featured: true,
    description: "A four-year degree in pharmaceutical sciences — pharmaceutics, pharmacology, pharmaceutical chemistry and pharmacognosy — preparing students for the pharma industry and hospital pharmacy.",
    highlights: ["Pharmaceutics, pharmacology & chemistry labs", "Industrial & hospital training", "Eligible for registration as a pharmacist"],
    careers: ["Hospital / Clinical Pharmacist", "Pharma industry (Production, QA/QC)", "Medical Representative", "Drug Inspector (after exams)", "Own medical store"],
  },
  {
    name: "D. Pharma", fullName: "Diploma in Pharmacy (D.Pharm)", department: "pharmacy", level: "Diploma",
    duration: "2 Years", durationYears: 2, eligibility: "10+2 with Biology / Maths",
    yearlyFees: [100000, 75000], feeNote: "", totalFee: 160000, image: IMG.pills,
    description: "A two-year diploma that qualifies students to register as a pharmacist and work in hospitals, dispensaries and retail pharmacies.",
    highlights: ["Short route to a pharmacist licence", "Hospital & community pharmacy training", "Lateral entry to B.Pharm possible"],
    careers: ["Registered Pharmacist", "Retail / Hospital Pharmacy", "Own medical store", "Pharma sales"],
  },

  // ───────── Nursing ─────────
  {
    name: "ANM", fullName: "Auxiliary Nurse Midwifery", department: "nursing", level: "Diploma",
    duration: "2 Years", durationYears: 2, eligibility: "10+2 any stream",
    yearlyFees: [75000, 75000], feeNote: "", totalFee: 150000, image: IMG.nursing,
    description: "Trains community health workers in basic nursing, maternal & child health, immunisation and primary healthcare.",
    highlights: ["Open to all 10+2 streams", "Community & primary healthcare focus", "Hospital & field postings"],
    careers: ["ANM in PHCs / sub-centres", "Community Health Worker", "Hospitals & nursing homes", "Higher studies — GNM / B.Sc. Nursing"],
  },
  {
    name: "GNM", fullName: "General Nursing and Midwifery", department: "nursing", level: "Diploma",
    duration: "3 Years", durationYears: 3, eligibility: "10+2 with English (40% marks)",
    yearlyFees: [300000, 150000, 150000], feeNote: "", totalFee: 500000, image: IMG.hospital, featured: true,
    description: "A three-year diploma that prepares registered nurses and midwives for hospitals and community health settings.",
    highlights: ["Registered Nurse & Midwife qualification", "Clinical postings in hospitals", "Path to Post Basic B.Sc. Nursing"],
    careers: ["Staff Nurse", "Midwife", "Home-care Nurse", "Government nursing jobs", "Higher studies — P.B.B.Sc. Nursing"],
  },
  {
    name: "B.Sc. Nursing", fullName: "Bachelor of Science in Nursing", department: "nursing", level: "Degree",
    duration: "4 Years", durationYears: 4, eligibility: "10+2 (PCB, minimum 45% marks) with English",
    yearlyFees: [400000, 100000, 100000, 100000], feeNote: "", totalFee: 700000, image: IMG.stethoscope, featured: true,
    description: "A four-year professional degree covering medical-surgical, community, paediatric, obstetric and psychiatric nursing with extensive clinical training.",
    highlights: ["Degree-level nursing qualification", "Extensive clinical rotations", "Opportunities in India & abroad"],
    careers: ["Staff Nurse / Nursing Officer", "Nurse Educator", "Military Nursing Service", "Nursing jobs abroad", "Higher studies — M.Sc. Nursing"],
  },
  {
    name: "P.B.B.Sc. Nursing", fullName: "Post Basic B.Sc. Nursing", department: "nursing", level: "Degree",
    duration: "2 Years", durationYears: 2, eligibility: "10+2 with GNM",
    yearlyFees: [150000, 100000], feeNote: "", totalFee: 180000, image: IMG.corridor,
    description: "A two-year degree for GNM-qualified nurses to upgrade to a B.Sc. Nursing qualification.",
    highlights: ["Upgrade from GNM to a degree", "Better pay and promotion prospects", "Path to M.Sc. Nursing"],
    careers: ["Senior Staff Nurse", "Nursing Supervisor", "Nurse Educator", "Higher studies — M.Sc. Nursing"],
  },
  {
    name: "M.Sc. Nursing", fullName: "Master of Science in Nursing", department: "nursing", level: "Post Graduate",
    duration: "2 Years", durationYears: 2, eligibility: "B.Sc. Nursing",
    yearlyFees: [100000, 100000], feeNote: "", totalFee: 180000, image: IMG.doctor,
    description: "A two-year postgraduate programme offering specialisation in clinical nursing, nursing education and administration.",
    highlights: ["Clinical specialisation", "Teaching & research skills", "Leadership & administration roles"],
    careers: ["Nursing Tutor / Lecturer", "Nursing Superintendent", "Clinical Nurse Specialist", "Research"],
  },

  // ───────── Paramedical Degree ─────────
  {
    name: "B.Sc. Biotechnology", fullName: "Bachelor of Science in Biotechnology", department: "paramedical-degree", level: "Degree",
    duration: "3 Years", durationYears: 3, eligibility: "10+2 with Biology",
    yearlyFees: [119100, 59550, 59550], feeNote: "", totalFee: 238200, image: IMG.biotech,
    description: "A three-year science degree in molecular biology, genetics, microbiology and bioprocess technology with strong laboratory training.",
    highlights: ["Modern biotechnology labs", "Genetics, microbiology & biochemistry", "Strong base for M.Sc. & research"],
    careers: ["Research Assistant", "Pharma & biotech industry", "Quality control labs", "Higher studies — M.Sc. / Ph.D."],
  },
  {
    name: "Hospital Management", fullName: "Bachelor of Hospital Management", department: "paramedical-degree", level: "Degree",
    duration: "3 Years & 1 Year Internship", durationYears: 4, eligibility: "10+2 any stream with English",
    yearlyFees: [100100, 100000, 100000], feeNote: "", totalFee: 300000, image: IMG.corridor,
    description: "Prepares students to manage hospital operations — patient services, administration, finance, HR and quality — followed by a one-year internship.",
    highlights: ["Healthcare administration focus", "One-year hospital internship", "Path to MBA in Hospital Management"],
    careers: ["Hospital Administrator", "Front-office / Patient-care Manager", "Medical Records Officer", "Higher studies — MBA (Hospital Management)"],
  },
  {
    name: "B.P.T.", fullName: "Bachelor of Physiotherapy", department: "paramedical-degree", level: "Degree",
    duration: "4 Years & 6 Month Internship", durationYears: 4.5, eligibility: "10+2 with Biology",
    yearlyFees: [75000, 75000, 75000, 75000], feeNote: "", totalFee: 300000, image: IMG.physio, featured: true,
    description: "A professional degree in physical therapy — exercise therapy, electrotherapy and rehabilitation for orthopaedic, neurological and sports conditions.",
    highlights: ["Exercise & electrotherapy labs", "Six-month clinical internship", "Can set up own clinic"],
    careers: ["Physiotherapist", "Sports Physiotherapist", "Rehabilitation centres", "Own physiotherapy clinic", "Higher studies — M.P.T."],
  },
  {
    name: "B. Occupational Therapy", fullName: "Bachelor of Occupational Therapy", department: "paramedical-degree", level: "Degree",
    duration: "4 Years & 6 Month Internship", durationYears: 4.5, eligibility: "10+2 with Biology",
    yearlyFees: [75000, 75000, 75000, 75000], feeNote: "", totalFee: 300000, image: IMG.clinic,
    description: "Trains therapists who help people with physical, developmental or mental-health conditions regain independence in daily activities.",
    highlights: ["Rehabilitation-focused curriculum", "Six-month clinical internship", "Work with children, adults & elderly"],
    careers: ["Occupational Therapist", "Rehabilitation centres", "Special schools", "Mental-health services", "Higher studies"],
  },
  {
    name: "B.O.T.T.", fullName: "Bachelor in Operation Theatre Technology", department: "paramedical-degree", level: "Degree",
    duration: "4 Years & 6 Month Internship", durationYears: 4.5, eligibility: "10+2 with Biology",
    yearlyFees: [50000, 50000, 50000, 50000], feeNote: "", totalFee: 200000, image: IMG.surgery,
    description: "Trains technologists to prepare and manage operation theatres, sterilisation, anaesthesia equipment and surgical assistance.",
    highlights: ["Operation theatre & anaesthesia training", "Six-month OT internship", "High demand in surgical hospitals"],
    careers: ["OT Technologist", "Anaesthesia Technician", "CSSD / Sterilisation In-charge", ...paramedicalCareers.slice(4)],
  },
  {
    name: "B.O.T.", fullName: "B.O.T. (Paramedical Degree)", department: "paramedical-degree", level: "Degree",
    duration: "4 Years & 6 Month Internship", durationYears: 4.5, eligibility: "10+2 with Biology",
    yearlyFees: [50000, 50000, 50000, 50000], feeNote: "", totalFee: 200000, image: IMG.hospital,
    description: "A four-year paramedical bachelor programme with a six-month internship. Contact the admissions office for detailed syllabus information.",
    highlights: ["Four-year paramedical degree", "Six-month clinical internship"],
    careers: paramedicalCareers,
  },
  {
    name: "B.R.I.T.", fullName: "Bachelor in Radiology & Imaging Technology", department: "paramedical-degree", level: "Degree",
    duration: "4 Years & 6 Month Internship", durationYears: 4.5, eligibility: "10+2 with Biology",
    yearlyFees: [50000, 50000, 50000, 50000], feeNote: "", totalFee: 200000, image: IMG.radiology, featured: true,
    description: "Covers X-ray, CT, MRI, ultrasound and other imaging techniques, along with radiation safety and patient care.",
    highlights: ["X-ray, CT, MRI & ultrasound training", "Radiation-safety practices", "Six-month imaging internship"],
    careers: ["Radiographer / Imaging Technologist", "CT / MRI Technologist", "Diagnostic centres", ...paramedicalCareers.slice(2)],
  },
  {
    name: "B.M.L.T.", fullName: "Bachelor of Medical Laboratory Technology", department: "paramedical-degree", level: "Degree",
    duration: "4 Years & 6 Month Internship", durationYears: 4.5, eligibility: "10+2 with Biology",
    yearlyFees: [50000, 50000, 50000, 50000], feeNote: "", totalFee: 200000, image: IMG.labWork,
    description: "Trains lab technologists in pathology, haematology, biochemistry, microbiology and blood banking.",
    highlights: ["Pathology & biochemistry labs", "Blood-bank training", "Six-month lab internship"],
    careers: ["Medical Lab Technologist", "Pathology labs", "Blood banks", "Research labs", "Own diagnostic lab"],
  },

  // ───────── Paramedical Diploma ─────────
  {
    name: "Dresser", fullName: "Dresser (Certificate)", department: "paramedical-diploma", level: "Certificate",
    duration: "1 Year", durationYears: 1, eligibility: "10th Pass",
    yearlyFees: [50000], feeNote: "", totalFee: 50000, image: IMG.nursing,
    description: "A one-year course in wound care, dressing, first aid and assisting doctors in minor procedures.",
    highlights: ["Short one-year course", "Open after 10th", "First-aid & wound-care skills"],
    careers: ["Dresser in hospitals & clinics", "First-aid attendant", "Nursing homes"],
  },
  ...([
    ["D.M.L.T", "Diploma in Medical Laboratory Technology", 2, IMG.lab, "Trains lab technicians in sample collection, pathology, haematology, biochemistry and microbiology tests.", ["Pathology Lab Technician", "Blood banks", "Diagnostic centres", "Lateral entry to B.M.L.T."]],
    ["D.O.T.A", "Diploma in Operation Theatre Assistant", 2, IMG.surgery, "Prepares assistants for operation-theatre setup, sterilisation and supporting surgical teams.", ["OT Assistant", "CSSD Technician", "Surgical hospitals", "Lateral entry to B.O.T.T."]],
    ["D.M.R. (X-Ray)", "Diploma in Medical Radiology (X-Ray)", 2, IMG.radiology, "Covers X-ray imaging, darkroom & digital radiography and radiation safety.", ["X-Ray Technician", "Diagnostic centres", "Hospitals", "Lateral entry to B.R.I.T."]],
    ["D.P.T", "Diploma in Physiotherapy", 3, IMG.physio, "Trains physiotherapy assistants in exercise therapy, electrotherapy and patient rehabilitation.", ["Physiotherapy Assistant", "Rehabilitation centres", "Sports clubs", "Lateral entry to B.P.T."]],
    ["D.E.C.G", "Diploma in ECG Technology", 2, IMG.scan, "Covers ECG recording, cardiac monitoring, stress testing and cardiac care support.", ["ECG Technician", "Cardiac care units", "Diagnostic centres"]],
    ["D. Occupational Therapy", "Diploma in Occupational Therapy", 3, IMG.clinic, "Trains assistants who support occupational therapists in rehabilitation programmes.", ["Occupational Therapy Assistant", "Rehabilitation centres", "Special schools"]],
    ["D. Sanitary Inspector", "Diploma in Sanitary Inspector", 2, IMG.corridor, "Covers public health, sanitation, food safety and environmental hygiene inspection.", ["Sanitary Inspector", "Municipal corporations", "Railways & public health departments"]],
  ] as const).map(([name, fullName, years, image, description, careers]): Seed => ({
    name, fullName, department: "paramedical-diploma", level: "Diploma",
    duration: `${years} Years`, durationYears: years, eligibility: "I.Sc. with Biology",
    yearlyFees: Array(years).fill(30000), feeNote: "", totalFee: 30000 * years, image,
    description, highlights: ["Job-oriented practical training", "Hospital & lab postings", `${years}-year diploma after I.Sc. (Biology)`],
    careers: [...careers],
  })),

  // ───────── Paramedical Lateral Entry ─────────
  ...([
    ["B.O.T.T", "Bachelor in Operation Theatre Technology (Lateral Entry)", "3½ Years", 3.5, "10+2 with DOTA", 50000, IMG.surgery],
    ["B.O.T", "B.O.T. (Lateral Entry)", "2 Years & 1 Year Internship", 3, "10+2 with DOT", 50000, IMG.hospital],
    ["B.R.I.T", "Bachelor in Radiology & Imaging Technology (Lateral Entry)", "3½ Years", 3.5, "10+2 with DMR", 50000, IMG.radiology],
    ["B.M.L.T", "Bachelor of Medical Laboratory Technology (Lateral Entry)", "3½ Years", 3.5, "10+2 with DMLT", 60000, IMG.labWork],
    ["B.P.T", "Bachelor of Physiotherapy (Lateral Entry)", "3½ Years", 3.5, "10+2 with DPT", 75000, IMG.physio],
  ] as const).map(([name, fullName, duration, years, eligibility, fee, image]): Seed => ({
    name, fullName, slug: `${slugify(name)}-lateral-entry`, department: "paramedical-lateral-entry", level: "Lateral Entry",
    duration, durationYears: years, eligibility,
    yearlyFees: [fee, fee, fee], feeNote: "", totalFee: fee * 3, image,
    description: `Lateral-entry route for diploma holders: students who have completed ${eligibility.replace("10+2 with ", "")} join the ${name} bachelor programme in a later year and earn the full degree in less time.`,
    highlights: ["Direct admission for diploma holders", "Saves time compared with the regular programme", "Same degree as regular entry"],
    careers: paramedicalCareers,
  })),

  // ───────── Paramedical PG ─────────
  ...([
    ["M.P.T", "Master of Physiotherapy", "B.P.T. Pass", 100000, IMG.physio],
    ["M.D.T.T", "M.D.T.T. (Post Graduate)", "B.O.T.T. Pass", 75000, IMG.surgery],
    ["M.O.T", "M.O.T. (Post Graduate)", "B.O.T. Pass", 75000, IMG.clinic],
    ["M.R.I.T", "Master in Radiology & Imaging Technology", "B.R.I.T. Pass", 75000, IMG.radiology],
    ["M.M.L.T", "Master of Medical Laboratory Technology", "B.M.L.T. Pass", 75000, IMG.lab],
  ] as const).map(([name, fullName, eligibility, fee, image]): Seed => ({
    name, fullName, department: "paramedical-pg", level: "Post Graduate",
    duration: "2 Years", durationYears: 2, eligibility,
    yearlyFees: [fee, fee], feeNote: "", totalFee: fee * 2, image,
    description: `A two-year postgraduate programme for ${eligibility.replace(" Pass", "")} graduates, offering advanced clinical skills, specialisation and research training.`,
    highlights: ["Advanced clinical specialisation", "Research & dissertation", "Teaching & senior-role eligibility"],
    careers: ["Senior Technologist / Therapist", "Lecturer / Faculty", "Department Head", "Research"],
  })),

  // ───────── Education ─────────
  {
    name: "B.Ed", fullName: "Bachelor of Education", department: "education", level: "Degree",
    duration: "2 Years", durationYears: 2, eligibility: "Graduation",
    yearlyFees: [75000, 75000], feeNote: "", totalFee: 150000, image: IMG.classroom, featured: true,
    description: "A two-year professional teacher-education degree for graduates, covering pedagogy, educational psychology and school internship.",
    highlights: ["School teaching internship", "Pedagogy & educational psychology", "Required for TET / government teaching posts"],
    careers: ["School Teacher (TGT/PGT after TET)", "Private schools & coaching", "Education counsellor", "Higher studies — M.Ed"],
  },
  {
    name: "D.El.Ed", fullName: "Diploma in Elementary Education", department: "education", level: "Diploma",
    duration: "2 Years", durationYears: 2, eligibility: "10+2 any stream",
    yearlyFees: [65000, 65000], feeNote: "", totalFee: 125000, image: IMG.books,
    description: "A two-year diploma that trains primary and upper-primary teachers (Classes 1–8).",
    highlights: ["Primary-teacher qualification", "School internship", "Open after 12th (any stream)"],
    careers: ["Primary Teacher (after TET)", "Private schools", "Pre-schools & coaching"],
  },
  {
    name: "M.A (Education)", fullName: "Master of Arts in Education", department: "education", level: "Post Graduate",
    duration: "2 Years", durationYears: 2, eligibility: "Graduation",
    yearlyFees: [10000, 10000], feeNote: "", totalFee: 20000, image: IMG.books,
    description: "A two-year postgraduate degree in the philosophy, psychology and sociology of education.",
    highlights: ["Affordable PG programme", "Education theory & research"],
    careers: ["Teaching", "Educational administration", "Curriculum development", "Higher studies — Ph.D."],
  },

  // ───────── Management & IT ─────────
  {
    name: "MBA in Hospital Management", fullName: "Master of Business Administration — Hospital Management", department: "management-it", level: "Post Graduate",
    duration: "2 Years", durationYears: 2, eligibility: "BHM / BBA / Graduation Pass Out",
    yearlyFees: [140000, 140000], feeNote: "", totalFee: 280000, image: IMG.corridor, featured: true,
    description: "A two-year MBA specialising in healthcare management — hospital operations, health economics, quality accreditation and healthcare marketing.",
    highlights: ["Healthcare-specific MBA", "Hospital internships", "Leadership roles in healthcare"],
    careers: ["Hospital Manager / Administrator", "Healthcare Consultant", "Insurance & TPA", "Pharma & healthcare companies"],
  },
  {
    name: "MBA", fullName: "MBA in Rural Management, Finance, Information Technology, Human Resources & Marketing and Sales", department: "management-it", level: "Post Graduate",
    duration: "2 Years", durationYears: 2, eligibility: "Graduation Pass Out",
    yearlyFees: [140000, 140000], feeNote: "", totalFee: 280000, image: IMG.meeting,
    description: "A two-year MBA with specialisations in Rural Management, Finance, IT, Human Resources, and Marketing & Sales.",
    highlights: ["Choice of five specialisations", "Case studies & live projects", "Summer internship"],
    careers: ["Management Trainee", "Finance / HR / Marketing Executive", "Rural development organisations", "Banking & NBFCs"],
  },
  {
    name: "MCA", fullName: "Master in Computer Application", department: "management-it", level: "Post Graduate",
    duration: "2 Years", durationYears: 2, eligibility: "BCA Pass Out",
    yearlyFees: [140000, 140000], feeNote: "", totalFee: 280000, image: IMG.code,
    description: "A two-year postgraduate programme in software development, databases, networks, web technologies and emerging computing fields.",
    highlights: ["Programming & software projects", "Web, database & cloud technologies", "Industry-oriented curriculum"],
    careers: ["Software Developer", "Web Developer", "System / Database Administrator", "IT companies & startups"],
  },
  {
    name: "B.B.A", fullName: "Bachelor of Business Administration", department: "management-it", level: "Degree",
    duration: "3 Years", durationYears: 3, eligibility: "10+2 any stream",
    yearlyFees: [75000, 75000, 75000], feeNote: "", totalFee: 225000, image: IMG.analytics,
    description: "A three-year undergraduate programme in management fundamentals — marketing, finance, HR and entrepreneurship.",
    highlights: ["Management fundamentals", "Presentations & projects", "Path to MBA"],
    careers: ["Business Executive", "Sales & Marketing", "Banking & Finance", "Entrepreneurship", "Higher studies — MBA"],
  },
  {
    name: "B.C.A", fullName: "Bachelor of Computer Application", department: "management-it", level: "Degree",
    duration: "3 Years", durationYears: 3, eligibility: "10+2 any stream",
    yearlyFees: [75000, 75000, 75000], feeNote: "", totalFee: 225000, image: IMG.laptop,
    description: "A three-year undergraduate programme in programming, databases, networking and web development.",
    highlights: ["Programming from the first semester", "Computer labs & projects", "Path to MCA"],
    careers: ["Software / Web Developer", "IT Support", "Data Entry & Operations", "Higher studies — MCA"],
  },
];

export const courses: Course[] = seeds.map((s, i) => ({
  ...s,
  id: i + 1,
  slug: s.slug ?? slugify(s.name),
  image: s.image ?? deptImage(s.department),
  featured: s.featured ?? false,
}));

export const levels: CourseLevel[] = ["Certificate", "Diploma", "Degree", "Integrated", "Lateral Entry", "Post Graduate"];

export const feeRanges = [
  { label: "Under ₹1 Lakh", min: 0, max: 99999 },
  { label: "₹1L – ₹2L", min: 100000, max: 200000 },
  { label: "₹2L – ₹3L", min: 200001, max: 300000 },
  { label: "₹3L – ₹5L", min: 300001, max: 500000 },
  { label: "₹5L+", min: 500001, max: Infinity },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Compact amount: 1350000 → ₹13.5L, 1000000 → ₹10L, 40500 → ₹40.5K
export const formatLakh = (n: number) =>
  n >= 100000 ? `₹${Number((n / 100000).toFixed(2))}L` : `₹${Number((n / 1000).toFixed(1))}K`;

export const yearLabel = (i: number) => ["1st", "2nd", "3rd", "4th", "5th", "6th"][i] + " Year";

export const getDepartment = (slug: string) => departments.find((d) => d.slug === slug);

/** Unique course label used in enquiry forms and as the CRM course name. */
export const courseLabel = (c: Pick<Course, "name" | "department">) =>
  c.department === "paramedical-lateral-entry" ? `${c.name.replace(/\.$/, "")} (Lateral Entry)` : c.name;
