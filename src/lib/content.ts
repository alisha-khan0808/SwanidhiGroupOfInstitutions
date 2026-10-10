import { supabase, isSupabaseConfigured } from './supabase'
import { courses as localCourses, type Course } from '@/data/courses'
import { blogs as localBlogs, type BlogPost } from '@/data/blogs'
import { scholarships as localScholarships, type Scholarship } from '@/data/scholarships'
import { colleges as localColleges, type College } from '@/data/colleges'

export interface CollegeRow {
  id: number
  slug: string
  name: string
  short_name: string
  department: string
  location: string
  image: string
  logo: string
  badge: string
  established: number | null
  description: string
  sort_order: number
}

const toCollege = (r: CollegeRow): College => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  shortName: r.short_name,
  department: r.department,
  location: r.location,
  image: r.image,
  logo: r.logo,
  badge: r.badge,
  established: r.established,
  description: r.description,
  sortOrder: r.sort_order,
})

// Falls back to the demo list if the `colleges` table hasn't been created
// yet (supabase/colleges.sql), so the site keeps working either way.
export async function getColleges(): Promise<College[]> {
  if (!isSupabaseConfigured) return localColleges
  const { data, error } = await supabase.from('colleges').select('*').order('sort_order').order('id')
  if (error || !data?.length) {
    if (error) console.warn(`colleges: ${error.message} — using demo college names`)
    return localColleges
  }
  return (data as CollegeRow[]).map(toCollege)
}

/** College for a department (first by sort order), if any. */
export const collegeFor = (all: College[], department: string) => all.find((c) => c.department === department)

export interface ProgramRow {
  id: number
  slug: string
  name: string
  full_name: string
  department: string
  level: Course['level']
  duration: string
  duration_years: number
  eligibility: string
  yearly_fees: number[]
  fee_note: string
  total_fee: number
  image: string
  description: string
  highlights: string[]
  careers: string[]
  featured: boolean
  sort_order: number
}

export interface BlogRow {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  author_role: string
  author_avatar: string
  published_at: string
  read_time: number
  image: string
  featured: boolean
}

export interface ScholarshipRow {
  id: number
  slug: string
  name: string
  short_name: string
  provider: string
  provider_type: Scholarship['providerType']
  amount: number
  amount_display: string
  amount_type: Scholarship['amountType']
  category: string
  streams: string[]
  level: Scholarship['level']
  eligibility_criteria: string[]
  income_limit: number | null
  income_limit_display: string
  min_marks: number
  deadline: string
  application_mode: Scholarship['applicationMode']
  apply_url: string
  description: string
  benefits: string[]
  documents: string[]
  selection_process: string
  renewal_criteria: string
  featured: boolean
  tags: string[]
  no_of_awards: string
  established_year: number
  contact: string
}

const toCourse = (r: ProgramRow): Course => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  fullName: r.full_name,
  department: r.department,
  level: r.level,
  duration: r.duration,
  durationYears: Number(r.duration_years),
  eligibility: r.eligibility,
  yearlyFees: (r.yearly_fees ?? []).map(Number),
  feeNote: r.fee_note,
  totalFee: Number(r.total_fee),
  image: r.image,
  description: r.description,
  highlights: r.highlights,
  careers: r.careers,
  featured: r.featured,
})

const toBlog = (r: BlogRow): BlogPost => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  content: r.content,
  category: r.category,
  tags: r.tags,
  author: r.author,
  authorRole: r.author_role,
  authorAvatar: r.author_avatar,
  publishedAt: r.published_at,
  readTime: r.read_time,
  image: r.image,
  featured: r.featured,
})

const toScholarship = (r: ScholarshipRow): Scholarship => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  shortName: r.short_name,
  provider: r.provider,
  providerType: r.provider_type,
  amount: r.amount,
  amountDisplay: r.amount_display,
  amountType: r.amount_type,
  category: r.category,
  streams: r.streams,
  level: r.level,
  eligibilityCriteria: r.eligibility_criteria,
  incomeLimit: r.income_limit,
  incomeLimitDisplay: r.income_limit_display,
  minMarks: r.min_marks,
  deadline: r.deadline,
  applicationMode: r.application_mode,
  applyUrl: r.apply_url,
  description: r.description,
  benefits: r.benefits,
  documents: r.documents,
  selectionProcess: r.selection_process,
  renewalCriteria: r.renewal_criteria,
  featured: r.featured,
  tags: r.tags,
  noOfAwards: r.no_of_awards,
  establishedYear: r.established_year,
  contact: r.contact,
})

// Until Supabase is connected the site serves the bundled seed data in src/data.
// Once connected, errors are thrown (not swallowed) so a failed fetch keeps
// serving the last good page instead of an empty one.
export async function getCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured) return localCourses
  const { data, error } = await supabase.from('programs').select('*').order('sort_order').order('id')
  if (error) throw new Error(`programs: ${error.message}`)
  return (data as ProgramRow[]).map(toCourse)
}

export async function getBlogs(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return localBlogs
  const { data, error } = await supabase.from('blogs').select('*').order('published_at', { ascending: false })
  if (error) throw new Error(`blogs: ${error.message}`)
  return (data as BlogRow[]).map(toBlog)
}

export async function getScholarships(): Promise<Scholarship[]> {
  if (!isSupabaseConfigured) return localScholarships
  const { data, error } = await supabase.from('scholarships').select('*').order('id')
  if (error) throw new Error(`scholarships: ${error.message}`)
  return (data as ScholarshipRow[]).map(toScholarship)
}
