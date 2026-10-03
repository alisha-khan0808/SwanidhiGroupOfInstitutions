export interface Scholarship {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  provider: string;
  providerType: "Government" | "Private" | "International" | "University";
  amount: number; // per year in rupees
  amountDisplay: string;
  amountType: "Annual" | "One-time" | "Monthly" | "Full Tuition";
  category: string;
  streams: string[];
  level: ("Class 11-12" | "UG" | "PG" | "PhD" | "Diploma")[];
  eligibilityCriteria: string[];
  incomeLimit: number | null; // annual family income in rupees
  incomeLimitDisplay: string;
  minMarks: number; // percentage
  deadline: string; // month-year
  applicationMode: "Online" | "Offline" | "Both";
  applyUrl: string;
  description: string;
  benefits: string[];
  documents: string[];
  selectionProcess: string;
  renewalCriteria: string;
  featured: boolean;
  tags: string[];
  noOfAwards: string;
  establishedYear: number;
  contact: string;
}

export const scholarshipCategories = [
  { name: "All", slug: "all" },
  { name: "Government", slug: "government" },
  { name: "Private", slug: "private" },
  { name: "International", slug: "international" },
  { name: "University", slug: "university" },
];

export const scholarshipStreams = [
  "Medical", "Nursing", "Paramedical", "Pharmacy", "Law",
  "Education", "Management", "Computer Applications", "ITI", "Any Stream",
];

export const scholarshipLevels = ["Class 11-12", "UG", "PG", "PhD", "Diploma"];

const commonDocs = [
  "Aadhaar card",
  "Income certificate",
  "Caste certificate (if applicable)",
  "Previous year marksheet",
  "Fee receipt / bonafide certificate",
  "Bank passbook (Aadhaar-seeded account)",
];

// Local fallback / seed content — managed from /admin/scholarships once Supabase is connected.
// Amounts & deadlines vary by year and state — always verify on the official portal.
export const scholarships: Scholarship[] = [
  {
    id: 1, slug: "post-matric-scholarship-sc-st-obc", name: "Post Matric Scholarship for SC / ST / OBC Students",
    shortName: "Post Matric Scholarship", provider: "Government of India & State Governments", providerType: "Government",
    amount: 0, amountDisplay: "Tuition fee + maintenance (as per scheme)", amountType: "Annual", category: "SC / ST / OBC",
    streams: ["Any Stream"], level: ["Diploma", "UG", "PG"],
    eligibilityCriteria: ["Student belongs to SC, ST or OBC category", "Studying in a recognised post-matric course", "Family income within the scheme limit"],
    incomeLimit: 250000, incomeLimitDisplay: "Up to ₹2.5 lakh p.a. (varies by category / state)", minMarks: 0, deadline: "As notified (usually Oct–Dec)",
    applicationMode: "Online", applyUrl: "https://scholarships.gov.in",
    description: "The largest scholarship scheme for SC/ST/OBC students pursuing courses after Class 10 — including diploma, degree and postgraduate programmes. It reimburses tuition fees and provides a maintenance allowance.",
    benefits: ["Reimbursement of compulsory non-refundable fees", "Monthly maintenance allowance", "Renewable every year of the course"],
    documents: commonDocs, selectionProcess: "Online application on the National / State Scholarship Portal, verification by the institute and the district welfare office.",
    renewalCriteria: "Pass the previous year's examination and re-apply on the portal.", featured: true,
    tags: ["SC", "ST", "OBC", "NSP"], noOfAwards: "No fixed limit", establishedYear: 1944, contact: "National Scholarship Portal helpdesk",
  },
  {
    id: 2, slug: "central-sector-scholarship", name: "Central Sector Scheme of Scholarships for College & University Students",
    shortName: "Central Sector Scholarship", provider: "Ministry of Education, Government of India", providerType: "Government",
    amount: 12000, amountDisplay: "₹12,000 – ₹20,000 / year", amountType: "Annual", category: "Merit-cum-Means",
    streams: ["Any Stream"], level: ["UG", "PG"],
    eligibilityCriteria: ["Above 80th percentile in Class 12 board exam", "Pursuing a regular degree course", "Family income within the scheme limit"],
    incomeLimit: 450000, incomeLimitDisplay: "Up to ₹4.5 lakh p.a.", minMarks: 80, deadline: "As notified (usually Oct–Dec)",
    applicationMode: "Online", applyUrl: "https://scholarships.gov.in",
    description: "A merit-cum-means scholarship for meritorious students from lower-income families pursuing regular undergraduate and postgraduate degree courses.",
    benefits: ["Annual scholarship for graduation", "Higher amount for postgraduate years", "Direct benefit transfer to bank account"],
    documents: commonDocs, selectionProcess: "Merit list based on Class 12 marks, verified through the National Scholarship Portal.",
    renewalCriteria: "Minimum 50% marks and 75% attendance in the previous year.", featured: true,
    tags: ["Merit", "NSP", "Degree"], noOfAwards: "82,000 per year (all India)", establishedYear: 2008, contact: "National Scholarship Portal helpdesk",
  },
  {
    id: 3, slug: "pre-post-matric-minority-scholarship", name: "Post Matric Scholarship for Minority Students",
    shortName: "Minority Scholarship", provider: "Ministry of Minority Affairs, Government of India", providerType: "Government",
    amount: 0, amountDisplay: "Admission + tuition + maintenance (as per scheme)", amountType: "Annual", category: "Minority",
    streams: ["Any Stream"], level: ["Diploma", "UG", "PG"],
    eligibilityCriteria: ["Belongs to a notified minority community", "Minimum 50% marks in the previous final exam", "Family income within the scheme limit"],
    incomeLimit: 200000, incomeLimitDisplay: "Up to ₹2 lakh p.a.", minMarks: 50, deadline: "As notified",
    applicationMode: "Online", applyUrl: "https://scholarships.gov.in",
    description: "Supports students from minority communities pursuing post-matric courses, including technical and vocational courses at Class 11–12 level and above.",
    benefits: ["Admission & tuition fee support", "Maintenance allowance"],
    documents: [...commonDocs, "Minority community self-declaration"], selectionProcess: "Online application, institute verification and merit-cum-means selection.",
    renewalCriteria: "Pass the previous year with at least 50% marks.", featured: true,
    tags: ["Minority", "NSP"], noOfAwards: "As per state quota", establishedYear: 2007, contact: "National Scholarship Portal helpdesk",
  },
  {
    id: 4, slug: "aicte-pragati-saksham", name: "AICTE Pragati & Saksham Scholarships",
    shortName: "Pragati / Saksham", provider: "AICTE", providerType: "Government",
    amount: 50000, amountDisplay: "₹50,000 / year", amountType: "Annual", category: "Girls / Specially-abled",
    streams: ["Management", "Computer Applications"], level: ["Diploma", "UG"],
    eligibilityCriteria: ["Pragati: girl students (max. 2 per family)", "Saksham: students with 40%+ disability", "Admitted to the first year (or second year via lateral entry) of an AICTE-approved course"],
    incomeLimit: 800000, incomeLimitDisplay: "Up to ₹8 lakh p.a.", minMarks: 0, deadline: "As notified",
    applicationMode: "Online", applyUrl: "https://scholarships.gov.in",
    description: "AICTE scholarships for girl students (Pragati) and specially-abled students (Saksham) studying in AICTE-approved technical programmes.",
    benefits: ["₹50,000 per year for the course duration", "Can be used for fees, books and equipment"],
    documents: [...commonDocs, "Disability certificate (Saksham)"], selectionProcess: "Merit based on qualifying exam marks.",
    renewalCriteria: "Promotion to the next year without backlog.", featured: false,
    tags: ["Girls", "Divyang", "AICTE"], noOfAwards: "Several thousand per year", establishedYear: 2014, contact: "AICTE helpdesk",
  },
];
