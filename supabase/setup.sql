-- Swanidhi Group of Institutions — website database setup.
-- Supabase Dashboard → SQL Editor → New query → paste this whole file → Run.
-- Safe to run again: it will not duplicate data.
-- (Generated from src/data/*.ts — courses, blogs and scholarships seed.)

-- ─────────────── Admins ───────────────
-- Only emails listed here can edit content from the website admin panel (/admin).
create table if not exists admins (
  email text primary key
);
alter table admins enable row level security;

create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from admins where email = auth.jwt() ->> 'email');
$$;

-- ─────────────── Programs (courses shown on the website) ───────────────
-- Named "programs" because the CRM already uses a "courses" table.
create table if not exists programs (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  full_name text not null default '',
  department text not null default '',
  level text not null default 'Degree' check (level in ('Certificate', 'Diploma', 'Degree', 'Integrated', 'Lateral Entry', 'Post Graduate')),
  duration text not null default '',
  duration_years numeric(3,1) not null default 1,
  eligibility text not null default '',
  yearly_fees integer[] not null default '{}',
  fee_note text not null default '',
  total_fee integer not null default 0,
  image text not null default '',
  description text not null default '',
  highlights text[] not null default '{}',
  careers text[] not null default '{}',
  featured boolean not null default false,
  sort_order integer not null default 999,
  created_at timestamptz not null default now()
);

-- ─────────────── Blogs ───────────────
create table if not exists blogs (
  id bigserial primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Admission Guide',
  tags text[] not null default '{}',
  author text not null default 'Swanidhi Admissions Team',
  author_role text not null default '',
  author_avatar text not null default '',
  published_at date not null default current_date,
  read_time integer not null default 5,
  image text not null default '',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─────────────── Scholarships ───────────────
create table if not exists scholarships (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  short_name text not null default '',
  provider text not null default '',
  provider_type text not null default 'Government' check (provider_type in ('Government', 'Private', 'International', 'University')),
  amount integer not null default 0,
  amount_display text not null default '',
  amount_type text not null default 'Annual' check (amount_type in ('Annual', 'One-time', 'Monthly', 'Full Tuition')),
  category text not null default '',
  streams text[] not null default '{}',
  level text[] not null default '{}',
  eligibility_criteria text[] not null default '{}',
  income_limit integer,
  income_limit_display text not null default '',
  min_marks integer not null default 0,
  deadline text not null default '',
  application_mode text not null default 'Online' check (application_mode in ('Online', 'Offline', 'Both')),
  apply_url text not null default '',
  description text not null default '',
  benefits text[] not null default '{}',
  documents text[] not null default '{}',
  selection_process text not null default '',
  renewal_criteria text not null default '',
  featured boolean not null default false,
  tags text[] not null default '{}',
  no_of_awards text not null default '',
  established_year integer not null default 2000,
  contact text not null default '',
  created_at timestamptz not null default now()
);

-- ─────────────── Enquiries (contact / apply forms) ───────────────
create table if not exists enquiries (
  id bigserial primary key,
  name text not null,
  phone text not null,
  email text,
  course text,
  city text,
  message text,
  source text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- ─────────────── Row Level Security ───────────────
alter table programs enable row level security;
alter table blogs enable row level security;
alter table scholarships enable row level security;
alter table enquiries enable row level security;

-- Content: anyone can read, only admins can write.
do $$
declare t text;
begin
  foreach t in array array['programs', 'blogs', 'scholarships'] loop
    execute format('drop policy if exists "public read" on %I', t);
    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('drop policy if exists "admin write" on %I', t);
    execute format('create policy "admin write" on %I for all to authenticated using (is_admin()) with check (is_admin())', t);
  end loop;
end $$;

-- Enquiries: anyone can submit, only admins can view / update / delete.
drop policy if exists "public submit" on enquiries;
create policy "public submit" on enquiries for insert with check (true);
drop policy if exists "admin manage" on enquiries;
create policy "admin manage" on enquiries for all to authenticated using (is_admin()) with check (is_admin());

-- ─────────────── Image uploads ───────────────
insert into storage.buckets (id, name, public) values ('images', 'images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images" on storage.objects for select using (bucket_id = 'images');
drop policy if exists "admin upload images" on storage.objects;
create policy "admin upload images" on storage.objects for insert to authenticated
  with check (bucket_id = 'images' and public.is_admin());
drop policy if exists "admin delete images" on storage.objects;
create policy "admin delete images" on storage.objects for delete to authenticated
  using (bucket_id = 'images' and public.is_admin());


-- ─────────────── Initial content: 49 courses ───────────────
insert into programs (id, slug, name, full_name, department, level, duration, duration_years, eligibility, yearly_fees, fee_note, total_fee, image, description, highlights, careers, featured, sort_order) values
  (1, 'bams', 'BAMS', 'Bachelor of Ayurvedic Medicine and Surgery', 'medical', 'Degree', '4½ Years + 1 Year Internship (5½ Years)', 5.5, '10+2 with Biology, NEET UG qualified', array[300000, 300000, 300000, 450000]::integer[], '', 1350000, 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=80', 'BAMS is a professional medical degree that combines classical Ayurveda with modern medical science. Graduates are registered Ayurvedic doctors who can practise, work in hospitals and wellness centres, or pursue MD/MS (Ayurveda).', array['Admission through NEET UG counselling', 'Integrated Ayurveda + modern medicine curriculum', 'One-year compulsory rotating internship', 'Eligible for MD/MS (Ayurveda) after graduation']::text[], array['Ayurvedic Physician', 'Medical Officer (AYUSH)', 'Panchakarma Specialist', 'Wellness & Research Centres', 'Higher studies — MD/MS (Ayurveda)']::text[], true, 10),
  (2, 'electrician', 'Electrician', 'I.T.I. Electrician', 'iti', 'Certificate', '2 Years', 2, '10th Pass', array[30500, 20000]::integer[], '', 50500, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', 'A two-year trade course covering domestic and industrial wiring, electrical machines, motors, transformers and safety practices, with extensive workshop training.', array['Workshop-based practical training', 'Wiring, motors, transformers & control panels', 'Apprenticeship-ready skills']::text[], array['Electrician (Industrial / Domestic)', 'Railways & PSU technician posts', 'Power & electricity boards', 'Self-employed electrical contractor']::text[], true, 20),
  (3, 'fitter', 'Fitter', 'I.T.I. Fitter', 'iti', 'Certificate', '2 Years', 2, '10th Pass', array[25500, 20000]::integer[], '', 45500, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', 'Trains students in fitting, assembling and maintaining machine parts and structures using hand and machine tools, with a strong focus on measurement and precision.', array['Precision fitting & machining', 'Hands-on workshop practice', 'Apprenticeship-ready skills']::text[], array['Fitter in manufacturing plants', 'Railways & PSU technician posts', 'Maintenance technician', 'Fabrication workshops']::text[], false, 30),
  (4, 'electronic-mechanic', 'Electronic Mechanic', 'I.T.I. Electronic Mechanic', 'iti', 'Certificate', '2 Years', 2, '10th Pass', array[20500, 20000]::integer[], '', 40500, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 'Covers electronic components, circuits, consumer electronics, and testing & repair of electronic equipment.', array['Circuit building & testing', 'Consumer electronics repair', 'Practical lab sessions']::text[], array['Electronics service technician', 'Electronics manufacturing', 'Telecom & equipment maintenance', 'Own repair business']::text[], false, 40),
  (5, 'mechanic-diesel', 'Mechanic Diesel', 'I.T.I. Mechanic Diesel', 'iti', 'Certificate', '1 Year', 1, '10th Pass', array[15000]::integer[], '', 15000, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', 'A one-year course on overhauling, servicing and repairing diesel engines and related vehicle systems.', array['Engine overhaul & servicing', 'Fuel & injection systems', 'Short, job-ready programme']::text[], array['Diesel mechanic', 'Automobile workshops', 'Transport & logistics fleets', 'Generator & pump maintenance']::text[], false, 50),
  (6, 'llb', 'LLB', 'Bachelor of Laws (LLB)', 'law', 'Degree', '3 Years', 3, 'Graduation Pass Out', array[60000, 60000, 60000]::integer[], '', 180000, 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', 'A three-year professional law degree for graduates, covering constitutional, criminal, civil, corporate and procedural law along with moot courts and court visits.', array['Moot court & legal-aid practice', 'Constitutional, criminal & civil law', 'Eligible to enrol as an advocate after completion']::text[], array['Advocate', 'Legal Advisor', 'Corporate Legal Executive', 'Judicial services (after exams)', 'Higher studies — LLM']::text[], true, 60),
  (7, 'ba-llb', 'BA LLB', 'Bachelor of Arts + Bachelor of Laws (Integrated)', 'law', 'Integrated', '5 Years', 5, '10+2 any stream', array[60000, 60000, 60000, 60000, 60000]::integer[], '5th Year: ₹60,000', 300000, 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80', 'A five-year integrated programme combining arts subjects (political science, history, sociology) with a full professional law curriculum — start right after 12th.', array['Integrated degree straight after 12th', 'Arts + law curriculum', 'Moot courts & internships']::text[], array['Advocate', 'Legal Advisor', 'Civil services', 'Judicial services (after exams)', 'Higher studies — LLM']::text[], false, 70),
  (8, 'bba-llb', 'BBA LLB', 'Bachelor of Business Administration + Bachelor of Laws (Integrated)', 'law', 'Integrated', '5 Years', 5, '10+2 any stream', array[60000, 60000, 60000, 60000, 60000]::integer[], '5th Year: ₹60,000', 300000, 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', 'A five-year integrated programme blending business management with law — ideal for careers in corporate law, compliance and business advisory.', array['Management + law in one degree', 'Focus on corporate & business law', 'Moot courts & internships']::text[], array['Corporate Lawyer', 'Compliance Officer', 'Legal Consultant', 'Advocate', 'Higher studies — LLM / MBA']::text[], false, 80),
  (9, 'b-pharma', 'B.Pharma', 'Bachelor of Pharmacy (B.Pharm)', 'pharmacy', 'Degree', '4 Years', 4, '10+2 with Biology / Maths', array[180000, 100000, 100000, 100000]::integer[], '', 450000, 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80', 'A four-year degree in pharmaceutical sciences — pharmaceutics, pharmacology, pharmaceutical chemistry and pharmacognosy — preparing students for the pharma industry and hospital pharmacy.', array['Pharmaceutics, pharmacology & chemistry labs', 'Industrial & hospital training', 'Eligible for registration as a pharmacist']::text[], array['Hospital / Clinical Pharmacist', 'Pharma industry (Production, QA/QC)', 'Medical Representative', 'Drug Inspector (after exams)', 'Own medical store']::text[], true, 90),
  (10, 'd-pharma', 'D. Pharma', 'Diploma in Pharmacy (D.Pharm)', 'pharmacy', 'Diploma', '2 Years', 2, '10+2 with Biology / Maths', array[100000, 75000]::integer[], '', 160000, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80', 'A two-year diploma that qualifies students to register as a pharmacist and work in hospitals, dispensaries and retail pharmacies.', array['Short route to a pharmacist licence', 'Hospital & community pharmacy training', 'Lateral entry to B.Pharm possible']::text[], array['Registered Pharmacist', 'Retail / Hospital Pharmacy', 'Own medical store', 'Pharma sales']::text[], false, 100),
  (11, 'anm', 'ANM', 'Auxiliary Nurse Midwifery', 'nursing', 'Diploma', '2 Years', 2, '10+2 any stream', array[75000, 75000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80', 'Trains community health workers in basic nursing, maternal & child health, immunisation and primary healthcare.', array['Open to all 10+2 streams', 'Community & primary healthcare focus', 'Hospital & field postings']::text[], array['ANM in PHCs / sub-centres', 'Community Health Worker', 'Hospitals & nursing homes', 'Higher studies — GNM / B.Sc. Nursing']::text[], false, 110),
  (12, 'gnm', 'GNM', 'General Nursing and Midwifery', 'nursing', 'Diploma', '3 Years', 3, '10+2 with English (40% marks)', array[300000, 150000, 150000]::integer[], '', 500000, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'A three-year diploma that prepares registered nurses and midwives for hospitals and community health settings.', array['Registered Nurse & Midwife qualification', 'Clinical postings in hospitals', 'Path to Post Basic B.Sc. Nursing']::text[], array['Staff Nurse', 'Midwife', 'Home-care Nurse', 'Government nursing jobs', 'Higher studies — P.B.B.Sc. Nursing']::text[], true, 120),
  (13, 'b-sc-nursing', 'B.Sc. Nursing', 'Bachelor of Science in Nursing', 'nursing', 'Degree', '4 Years', 4, '10+2 (PCB, minimum 45% marks) with English', array[400000, 100000, 100000, 100000]::integer[], '', 700000, 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', 'A four-year professional degree covering medical-surgical, community, paediatric, obstetric and psychiatric nursing with extensive clinical training.', array['Degree-level nursing qualification', 'Extensive clinical rotations', 'Opportunities in India & abroad']::text[], array['Staff Nurse / Nursing Officer', 'Nurse Educator', 'Military Nursing Service', 'Nursing jobs abroad', 'Higher studies — M.Sc. Nursing']::text[], true, 130),
  (14, 'p-b-b-sc-nursing', 'P.B.B.Sc. Nursing', 'Post Basic B.Sc. Nursing', 'nursing', 'Degree', '2 Years', 2, '10+2 with GNM', array[150000, 100000]::integer[], '', 180000, 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', 'A two-year degree for GNM-qualified nurses to upgrade to a B.Sc. Nursing qualification.', array['Upgrade from GNM to a degree', 'Better pay and promotion prospects', 'Path to M.Sc. Nursing']::text[], array['Senior Staff Nurse', 'Nursing Supervisor', 'Nurse Educator', 'Higher studies — M.Sc. Nursing']::text[], false, 140),
  (15, 'm-sc-nursing', 'M.Sc. Nursing', 'Master of Science in Nursing', 'nursing', 'Post Graduate', '2 Years', 2, 'B.Sc. Nursing', array[100000, 100000]::integer[], '', 180000, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', 'A two-year postgraduate programme offering specialisation in clinical nursing, nursing education and administration.', array['Clinical specialisation', 'Teaching & research skills', 'Leadership & administration roles']::text[], array['Nursing Tutor / Lecturer', 'Nursing Superintendent', 'Clinical Nurse Specialist', 'Research']::text[], false, 150),
  (16, 'b-sc-biotechnology', 'B.Sc. Biotechnology', 'Bachelor of Science in Biotechnology', 'paramedical-degree', 'Degree', '3 Years', 3, '10+2 with Biology', array[119100, 59550, 59550]::integer[], '', 238200, 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80', 'A three-year science degree in molecular biology, genetics, microbiology and bioprocess technology with strong laboratory training.', array['Modern biotechnology labs', 'Genetics, microbiology & biochemistry', 'Strong base for M.Sc. & research']::text[], array['Research Assistant', 'Pharma & biotech industry', 'Quality control labs', 'Higher studies — M.Sc. / Ph.D.']::text[], false, 160),
  (17, 'hospital-management', 'Hospital Management', 'Bachelor of Hospital Management', 'paramedical-degree', 'Degree', '3 Years & 1 Year Internship', 4, '10+2 any stream with English', array[100100, 100000, 100000]::integer[], '', 300000, 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', 'Prepares students to manage hospital operations — patient services, administration, finance, HR and quality — followed by a one-year internship.', array['Healthcare administration focus', 'One-year hospital internship', 'Path to MBA in Hospital Management']::text[], array['Hospital Administrator', 'Front-office / Patient-care Manager', 'Medical Records Officer', 'Higher studies — MBA (Hospital Management)']::text[], false, 170),
  (18, 'b-p-t', 'B.P.T.', 'Bachelor of Physiotherapy', 'paramedical-degree', 'Degree', '4 Years & 6 Month Internship', 4.5, '10+2 with Biology', array[75000, 75000, 75000, 75000]::integer[], '', 300000, 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80', 'A professional degree in physical therapy — exercise therapy, electrotherapy and rehabilitation for orthopaedic, neurological and sports conditions.', array['Exercise & electrotherapy labs', 'Six-month clinical internship', 'Can set up own clinic']::text[], array['Physiotherapist', 'Sports Physiotherapist', 'Rehabilitation centres', 'Own physiotherapy clinic', 'Higher studies — M.P.T.']::text[], true, 180),
  (19, 'b-occupational-therapy', 'B. Occupational Therapy', 'Bachelor of Occupational Therapy', 'paramedical-degree', 'Degree', '4 Years & 6 Month Internship', 4.5, '10+2 with Biology', array[75000, 75000, 75000, 75000]::integer[], '', 300000, 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80', 'Trains therapists who help people with physical, developmental or mental-health conditions regain independence in daily activities.', array['Rehabilitation-focused curriculum', 'Six-month clinical internship', 'Work with children, adults & elderly']::text[], array['Occupational Therapist', 'Rehabilitation centres', 'Special schools', 'Mental-health services', 'Higher studies']::text[], false, 190),
  (20, 'b-o-t-t', 'B.O.T.T.', 'Bachelor in Operation Theatre Technology', 'paramedical-degree', 'Degree', '4 Years & 6 Month Internship', 4.5, '10+2 with Biology', array[50000, 50000, 50000, 50000]::integer[], '', 200000, 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80', 'Trains technologists to prepare and manage operation theatres, sterilisation, anaesthesia equipment and surgical assistance.', array['Operation theatre & anaesthesia training', 'Six-month OT internship', 'High demand in surgical hospitals']::text[], array['OT Technologist', 'Anaesthesia Technician', 'CSSD / Sterilisation In-charge', 'Higher studies']::text[], false, 200),
  (21, 'b-o-t', 'B.O.T.', 'B.O.T. (Paramedical Degree)', 'paramedical-degree', 'Degree', '4 Years & 6 Month Internship', 4.5, '10+2 with Biology', array[50000, 50000, 50000, 50000]::integer[], '', 200000, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'A four-year paramedical bachelor programme with a six-month internship. Contact the admissions office for detailed syllabus information.', array['Four-year paramedical degree', 'Six-month clinical internship']::text[], array['Hospitals & multi-speciality clinics', 'Diagnostic centres', 'Government health services', 'Private practice / self-employment', 'Higher studies']::text[], false, 210),
  (22, 'b-r-i-t', 'B.R.I.T.', 'Bachelor in Radiology & Imaging Technology', 'paramedical-degree', 'Degree', '4 Years & 6 Month Internship', 4.5, '10+2 with Biology', array[50000, 50000, 50000, 50000]::integer[], '', 200000, 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80', 'Covers X-ray, CT, MRI, ultrasound and other imaging techniques, along with radiation safety and patient care.', array['X-ray, CT, MRI & ultrasound training', 'Radiation-safety practices', 'Six-month imaging internship']::text[], array['Radiographer / Imaging Technologist', 'CT / MRI Technologist', 'Diagnostic centres', 'Government health services', 'Private practice / self-employment', 'Higher studies']::text[], true, 220),
  (23, 'b-m-l-t', 'B.M.L.T.', 'Bachelor of Medical Laboratory Technology', 'paramedical-degree', 'Degree', '4 Years & 6 Month Internship', 4.5, '10+2 with Biology', array[50000, 50000, 50000, 50000]::integer[], '', 200000, 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', 'Trains lab technologists in pathology, haematology, biochemistry, microbiology and blood banking.', array['Pathology & biochemistry labs', 'Blood-bank training', 'Six-month lab internship']::text[], array['Medical Lab Technologist', 'Pathology labs', 'Blood banks', 'Research labs', 'Own diagnostic lab']::text[], false, 230),
  (24, 'dresser', 'Dresser', 'Dresser (Certificate)', 'paramedical-diploma', 'Certificate', '1 Year', 1, '10th Pass', array[50000]::integer[], '', 50000, 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80', 'A one-year course in wound care, dressing, first aid and assisting doctors in minor procedures.', array['Short one-year course', 'Open after 10th', 'First-aid & wound-care skills']::text[], array['Dresser in hospitals & clinics', 'First-aid attendant', 'Nursing homes']::text[], false, 240),
  (25, 'd-m-l-t', 'D.M.L.T', 'Diploma in Medical Laboratory Technology', 'paramedical-diploma', 'Diploma', '2 Years', 2, 'I.Sc. with Biology', array[30000, 30000]::integer[], '', 60000, 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80', 'Trains lab technicians in sample collection, pathology, haematology, biochemistry and microbiology tests.', array['Job-oriented practical training', 'Hospital & lab postings', '2-year diploma after I.Sc. (Biology)']::text[], array['Pathology Lab Technician', 'Blood banks', 'Diagnostic centres', 'Lateral entry to B.M.L.T.']::text[], false, 250),
  (26, 'd-o-t-a', 'D.O.T.A', 'Diploma in Operation Theatre Assistant', 'paramedical-diploma', 'Diploma', '2 Years', 2, 'I.Sc. with Biology', array[30000, 30000]::integer[], '', 60000, 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80', 'Prepares assistants for operation-theatre setup, sterilisation and supporting surgical teams.', array['Job-oriented practical training', 'Hospital & lab postings', '2-year diploma after I.Sc. (Biology)']::text[], array['OT Assistant', 'CSSD Technician', 'Surgical hospitals', 'Lateral entry to B.O.T.T.']::text[], false, 260),
  (27, 'd-m-r-x-ray', 'D.M.R. (X-Ray)', 'Diploma in Medical Radiology (X-Ray)', 'paramedical-diploma', 'Diploma', '2 Years', 2, 'I.Sc. with Biology', array[30000, 30000]::integer[], '', 60000, 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80', 'Covers X-ray imaging, darkroom & digital radiography and radiation safety.', array['Job-oriented practical training', 'Hospital & lab postings', '2-year diploma after I.Sc. (Biology)']::text[], array['X-Ray Technician', 'Diagnostic centres', 'Hospitals', 'Lateral entry to B.R.I.T.']::text[], false, 270),
  (28, 'd-p-t', 'D.P.T', 'Diploma in Physiotherapy', 'paramedical-diploma', 'Diploma', '3 Years', 3, 'I.Sc. with Biology', array[30000, 30000, 30000]::integer[], '', 90000, 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80', 'Trains physiotherapy assistants in exercise therapy, electrotherapy and patient rehabilitation.', array['Job-oriented practical training', 'Hospital & lab postings', '3-year diploma after I.Sc. (Biology)']::text[], array['Physiotherapy Assistant', 'Rehabilitation centres', 'Sports clubs', 'Lateral entry to B.P.T.']::text[], false, 280),
  (29, 'd-e-c-g', 'D.E.C.G', 'Diploma in ECG Technology', 'paramedical-diploma', 'Diploma', '2 Years', 2, 'I.Sc. with Biology', array[30000, 30000]::integer[], '', 60000, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80', 'Covers ECG recording, cardiac monitoring, stress testing and cardiac care support.', array['Job-oriented practical training', 'Hospital & lab postings', '2-year diploma after I.Sc. (Biology)']::text[], array['ECG Technician', 'Cardiac care units', 'Diagnostic centres']::text[], false, 290),
  (30, 'd-occupational-therapy', 'D. Occupational Therapy', 'Diploma in Occupational Therapy', 'paramedical-diploma', 'Diploma', '3 Years', 3, 'I.Sc. with Biology', array[30000, 30000, 30000]::integer[], '', 90000, 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80', 'Trains assistants who support occupational therapists in rehabilitation programmes.', array['Job-oriented practical training', 'Hospital & lab postings', '3-year diploma after I.Sc. (Biology)']::text[], array['Occupational Therapy Assistant', 'Rehabilitation centres', 'Special schools']::text[], false, 300),
  (31, 'd-sanitary-inspector', 'D. Sanitary Inspector', 'Diploma in Sanitary Inspector', 'paramedical-diploma', 'Diploma', '2 Years', 2, 'I.Sc. with Biology', array[30000, 30000]::integer[], '', 60000, 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', 'Covers public health, sanitation, food safety and environmental hygiene inspection.', array['Job-oriented practical training', 'Hospital & lab postings', '2-year diploma after I.Sc. (Biology)']::text[], array['Sanitary Inspector', 'Municipal corporations', 'Railways & public health departments']::text[], false, 310),
  (32, 'b-o-t-t-lateral-entry', 'B.O.T.T', 'Bachelor in Operation Theatre Technology (Lateral Entry)', 'paramedical-lateral-entry', 'Lateral Entry', '3½ Years', 3.5, '10+2 with DOTA', array[50000, 50000, 50000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80', 'Lateral-entry route for diploma holders: students who have completed DOTA join the B.O.T.T bachelor programme in a later year and earn the full degree in less time.', array['Direct admission for diploma holders', 'Saves time compared with the regular programme', 'Same degree as regular entry']::text[], array['Hospitals & multi-speciality clinics', 'Diagnostic centres', 'Government health services', 'Private practice / self-employment', 'Higher studies']::text[], false, 320),
  (33, 'b-o-t-lateral-entry', 'B.O.T', 'B.O.T. (Lateral Entry)', 'paramedical-lateral-entry', 'Lateral Entry', '2 Years & 1 Year Internship', 3, '10+2 with DOT', array[50000, 50000, 50000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'Lateral-entry route for diploma holders: students who have completed DOT join the B.O.T bachelor programme in a later year and earn the full degree in less time.', array['Direct admission for diploma holders', 'Saves time compared with the regular programme', 'Same degree as regular entry']::text[], array['Hospitals & multi-speciality clinics', 'Diagnostic centres', 'Government health services', 'Private practice / self-employment', 'Higher studies']::text[], false, 330),
  (34, 'b-r-i-t-lateral-entry', 'B.R.I.T', 'Bachelor in Radiology & Imaging Technology (Lateral Entry)', 'paramedical-lateral-entry', 'Lateral Entry', '3½ Years', 3.5, '10+2 with DMR', array[50000, 50000, 50000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80', 'Lateral-entry route for diploma holders: students who have completed DMR join the B.R.I.T bachelor programme in a later year and earn the full degree in less time.', array['Direct admission for diploma holders', 'Saves time compared with the regular programme', 'Same degree as regular entry']::text[], array['Hospitals & multi-speciality clinics', 'Diagnostic centres', 'Government health services', 'Private practice / self-employment', 'Higher studies']::text[], false, 340),
  (35, 'b-m-l-t-lateral-entry', 'B.M.L.T', 'Bachelor of Medical Laboratory Technology (Lateral Entry)', 'paramedical-lateral-entry', 'Lateral Entry', '3½ Years', 3.5, '10+2 with DMLT', array[60000, 60000, 60000]::integer[], '', 180000, 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', 'Lateral-entry route for diploma holders: students who have completed DMLT join the B.M.L.T bachelor programme in a later year and earn the full degree in less time.', array['Direct admission for diploma holders', 'Saves time compared with the regular programme', 'Same degree as regular entry']::text[], array['Hospitals & multi-speciality clinics', 'Diagnostic centres', 'Government health services', 'Private practice / self-employment', 'Higher studies']::text[], false, 350),
  (36, 'b-p-t-lateral-entry', 'B.P.T', 'Bachelor of Physiotherapy (Lateral Entry)', 'paramedical-lateral-entry', 'Lateral Entry', '3½ Years', 3.5, '10+2 with DPT', array[75000, 75000, 75000]::integer[], '', 225000, 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80', 'Lateral-entry route for diploma holders: students who have completed DPT join the B.P.T bachelor programme in a later year and earn the full degree in less time.', array['Direct admission for diploma holders', 'Saves time compared with the regular programme', 'Same degree as regular entry']::text[], array['Hospitals & multi-speciality clinics', 'Diagnostic centres', 'Government health services', 'Private practice / self-employment', 'Higher studies']::text[], false, 360),
  (37, 'm-p-t', 'M.P.T', 'Master of Physiotherapy', 'paramedical-pg', 'Post Graduate', '2 Years', 2, 'B.P.T. Pass', array[100000, 100000]::integer[], '', 200000, 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80', 'A two-year postgraduate programme for B.P.T. graduates, offering advanced clinical skills, specialisation and research training.', array['Advanced clinical specialisation', 'Research & dissertation', 'Teaching & senior-role eligibility']::text[], array['Senior Technologist / Therapist', 'Lecturer / Faculty', 'Department Head', 'Research']::text[], false, 370),
  (38, 'm-d-t-t', 'M.D.T.T', 'M.D.T.T. (Post Graduate)', 'paramedical-pg', 'Post Graduate', '2 Years', 2, 'B.O.T.T. Pass', array[75000, 75000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80', 'A two-year postgraduate programme for B.O.T.T. graduates, offering advanced clinical skills, specialisation and research training.', array['Advanced clinical specialisation', 'Research & dissertation', 'Teaching & senior-role eligibility']::text[], array['Senior Technologist / Therapist', 'Lecturer / Faculty', 'Department Head', 'Research']::text[], false, 380),
  (39, 'm-o-t', 'M.O.T', 'M.O.T. (Post Graduate)', 'paramedical-pg', 'Post Graduate', '2 Years', 2, 'B.O.T. Pass', array[75000, 75000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=80', 'A two-year postgraduate programme for B.O.T. graduates, offering advanced clinical skills, specialisation and research training.', array['Advanced clinical specialisation', 'Research & dissertation', 'Teaching & senior-role eligibility']::text[], array['Senior Technologist / Therapist', 'Lecturer / Faculty', 'Department Head', 'Research']::text[], false, 390),
  (40, 'm-r-i-t', 'M.R.I.T', 'Master in Radiology & Imaging Technology', 'paramedical-pg', 'Post Graduate', '2 Years', 2, 'B.R.I.T. Pass', array[75000, 75000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80', 'A two-year postgraduate programme for B.R.I.T. graduates, offering advanced clinical skills, specialisation and research training.', array['Advanced clinical specialisation', 'Research & dissertation', 'Teaching & senior-role eligibility']::text[], array['Senior Technologist / Therapist', 'Lecturer / Faculty', 'Department Head', 'Research']::text[], false, 400),
  (41, 'm-m-l-t', 'M.M.L.T', 'Master of Medical Laboratory Technology', 'paramedical-pg', 'Post Graduate', '2 Years', 2, 'B.M.L.T. Pass', array[75000, 75000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80', 'A two-year postgraduate programme for B.M.L.T. graduates, offering advanced clinical skills, specialisation and research training.', array['Advanced clinical specialisation', 'Research & dissertation', 'Teaching & senior-role eligibility']::text[], array['Senior Technologist / Therapist', 'Lecturer / Faculty', 'Department Head', 'Research']::text[], false, 410),
  (42, 'b-ed', 'B.Ed', 'Bachelor of Education', 'education', 'Degree', '2 Years', 2, 'Graduation', array[75000, 75000]::integer[], '', 150000, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', 'A two-year professional teacher-education degree for graduates, covering pedagogy, educational psychology and school internship.', array['School teaching internship', 'Pedagogy & educational psychology', 'Required for TET / government teaching posts']::text[], array['School Teacher (TGT/PGT after TET)', 'Private schools & coaching', 'Education counsellor', 'Higher studies — M.Ed']::text[], true, 420),
  (43, 'd-el-ed', 'D.El.Ed', 'Diploma in Elementary Education', 'education', 'Diploma', '2 Years', 2, '10+2 any stream', array[65000, 65000]::integer[], '', 125000, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', 'A two-year diploma that trains primary and upper-primary teachers (Classes 1–8).', array['Primary-teacher qualification', 'School internship', 'Open after 12th (any stream)']::text[], array['Primary Teacher (after TET)', 'Private schools', 'Pre-schools & coaching']::text[], false, 430),
  (44, 'm-a-education', 'M.A (Education)', 'Master of Arts in Education', 'education', 'Post Graduate', '2 Years', 2, 'Graduation', array[10000, 10000]::integer[], '', 20000, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', 'A two-year postgraduate degree in the philosophy, psychology and sociology of education.', array['Affordable PG programme', 'Education theory & research']::text[], array['Teaching', 'Educational administration', 'Curriculum development', 'Higher studies — Ph.D.']::text[], false, 440),
  (45, 'mba-in-hospital-management', 'MBA in Hospital Management', 'Master of Business Administration — Hospital Management', 'management-it', 'Post Graduate', '2 Years', 2, 'BHM / BBA / Graduation Pass Out', array[140000, 140000]::integer[], '', 280000, 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', 'A two-year MBA specialising in healthcare management — hospital operations, health economics, quality accreditation and healthcare marketing.', array['Healthcare-specific MBA', 'Hospital internships', 'Leadership roles in healthcare']::text[], array['Hospital Manager / Administrator', 'Healthcare Consultant', 'Insurance & TPA', 'Pharma & healthcare companies']::text[], true, 450),
  (46, 'mba', 'MBA', 'MBA in Rural Management, Finance, Information Technology, Human Resources & Marketing and Sales', 'management-it', 'Post Graduate', '2 Years', 2, 'Graduation Pass Out', array[140000, 140000]::integer[], '', 280000, 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80', 'A two-year MBA with specialisations in Rural Management, Finance, IT, Human Resources, and Marketing & Sales.', array['Choice of five specialisations', 'Case studies & live projects', 'Summer internship']::text[], array['Management Trainee', 'Finance / HR / Marketing Executive', 'Rural development organisations', 'Banking & NBFCs']::text[], false, 460),
  (47, 'mca', 'MCA', 'Master in Computer Application', 'management-it', 'Post Graduate', '2 Years', 2, 'BCA Pass Out', array[140000, 140000]::integer[], '', 280000, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', 'A two-year postgraduate programme in software development, databases, networks, web technologies and emerging computing fields.', array['Programming & software projects', 'Web, database & cloud technologies', 'Industry-oriented curriculum']::text[], array['Software Developer', 'Web Developer', 'System / Database Administrator', 'IT companies & startups']::text[], false, 470),
  (48, 'b-b-a', 'B.B.A', 'Bachelor of Business Administration', 'management-it', 'Degree', '3 Years', 3, '10+2 any stream', array[75000, 75000, 75000]::integer[], '', 225000, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'A three-year undergraduate programme in management fundamentals — marketing, finance, HR and entrepreneurship.', array['Management fundamentals', 'Presentations & projects', 'Path to MBA']::text[], array['Business Executive', 'Sales & Marketing', 'Banking & Finance', 'Entrepreneurship', 'Higher studies — MBA']::text[], false, 480),
  (49, 'b-c-a', 'B.C.A', 'Bachelor of Computer Application', 'management-it', 'Degree', '3 Years', 3, '10+2 any stream', array[75000, 75000, 75000]::integer[], '', 225000, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', 'A three-year undergraduate programme in programming, databases, networking and web development.', array['Programming from the first semester', 'Computer labs & projects', 'Path to MCA']::text[], array['Software / Web Developer', 'IT Support', 'Data Entry & Operations', 'Higher studies — MCA']::text[], false, 490)
on conflict do nothing;
select setval(pg_get_serial_sequence('programs', 'id'), (select max(id) from programs));

insert into blogs (id, slug, title, excerpt, content, category, tags, author, author_role, author_avatar, published_at, read_time, image, featured) values
  (1, 'paramedical-courses-after-12th', 'Paramedical Courses After 12th: Diploma vs Degree — Which One Should You Choose?', 'BMLT or DMLT? BPT or DPT? A simple guide to choosing between a paramedical diploma and a degree, with fees, duration and career paths.', 'Healthcare is not only about doctors and nurses. Every hospital depends on lab technologists, radiographers, physiotherapists and operation-theatre technicians. These are **paramedical** careers — and they are some of the fastest ways to a stable healthcare job.

## Diploma or Degree?

| | Diploma (e.g. DMLT, DMR, DPT) | Degree (e.g. BMLT, BRIT, BPT) |
|---|---|---|
| Eligibility | I.Sc. / 10+2 with Biology | 10+2 with Biology |
| Duration | 2–3 years | 4 years + 6-month internship |
| Total fee (approx.) | ₹60,000 – ₹90,000 | ₹2,00,000 – ₹3,00,000 |
| Best for | Getting job-ready quickly | Senior roles & PG studies |

## Can I upgrade later?

Yes. Diploma holders can join the matching bachelor programme through **lateral entry** — for example DMLT → BMLT, DMR → BRIT, DPT → BPT. After the degree, you can go on to a master''s such as MMLT, MRIT or MPT.

## Which course has the best scope?

- **Medical Lab Technology** — every hospital and diagnostic centre needs lab technologists.
- **Radiology & Imaging** — growing demand for X-ray, CT and MRI technologists.
- **Physiotherapy** — option to open your own clinic.
- **Operation Theatre Technology** — high demand in surgical hospitals.

Talk to our admission counsellors to find the course that fits your marks, budget and goals.', 'Course Guide', array['Paramedical', 'After 12th', 'Career']::text[], 'Swanidhi Admissions Team', 'Admission Counsellors', '', '2026-09-10', 6, 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80', true),
  (2, 'anm-vs-gnm-vs-bsc-nursing', 'ANM vs GNM vs B.Sc. Nursing: Eligibility, Fees & Career Compared', 'Three ways to become a nurse — here is how ANM, GNM and B.Sc. Nursing differ in eligibility, duration, fees and job roles.', 'Nursing offers a respected career with jobs in India and abroad. There are three main entry routes.

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

GNM nurses can upgrade to a degree through **Post Basic B.Sc. Nursing** (2 years), and B.Sc. graduates can pursue **M.Sc. Nursing** for teaching and senior roles.', 'Course Guide', array['Nursing', 'ANM', 'GNM', 'B.Sc. Nursing']::text[], 'Swanidhi Admissions Team', 'Admission Counsellors', '', '2026-08-22', 5, 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80', true),
  (3, 'bams-admission-guide', 'BAMS Admission Guide: NEET, Eligibility, Fees & Career', 'Everything you need to know about getting into BAMS — NEET requirement, course structure, internship, fees and career options.', '**BAMS (Bachelor of Ayurvedic Medicine and Surgery)** is a professional medical degree that makes you a registered Ayurvedic doctor.

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

Contact our admission desk for the current year''s admission process and documentation support.', 'Admission Guide', array['BAMS', 'NEET', 'Ayurveda']::text[], 'Swanidhi Admissions Team', 'Admission Counsellors', '', '2026-07-30', 5, 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=80', true),
  (4, 'iti-courses-after-10th', 'ITI Courses After 10th: Electrician, Fitter & More', 'Want a skilled job quickly after 10th? Here is what ITI Electrician, Fitter, Electronic Mechanic and Mechanic Diesel offer.', 'ITI (Industrial Training Institute) courses teach practical trade skills that lead directly to jobs and apprenticeships.

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
- Opportunities in railways, PSUs, manufacturing and self-employment', 'Career Advice', array['ITI', 'After 10th', 'Skills']::text[], 'Swanidhi Admissions Team', 'Admission Counsellors', '', '2026-07-12', 4, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', false)
on conflict do nothing;
select setval(pg_get_serial_sequence('blogs', 'id'), (select max(id) from blogs));

insert into scholarships (id, slug, name, short_name, provider, provider_type, amount, amount_display, amount_type, category, streams, level, eligibility_criteria, income_limit, income_limit_display, min_marks, deadline, application_mode, apply_url, description, benefits, documents, selection_process, renewal_criteria, featured, tags, no_of_awards, established_year, contact) values
  (1, 'post-matric-scholarship-sc-st-obc', 'Post Matric Scholarship for SC / ST / OBC Students', 'Post Matric Scholarship', 'Government of India & State Governments', 'Government', 0, 'Tuition fee + maintenance (as per scheme)', 'Annual', 'SC / ST / OBC', array['Any Stream']::text[], array['Diploma', 'UG', 'PG']::text[], array['Student belongs to SC, ST or OBC category', 'Studying in a recognised post-matric course', 'Family income within the scheme limit']::text[], 250000, 'Up to ₹2.5 lakh p.a. (varies by category / state)', 0, 'As notified (usually Oct–Dec)', 'Online', 'https://scholarships.gov.in', 'The largest scholarship scheme for SC/ST/OBC students pursuing courses after Class 10 — including diploma, degree and postgraduate programmes. It reimburses tuition fees and provides a maintenance allowance.', array['Reimbursement of compulsory non-refundable fees', 'Monthly maintenance allowance', 'Renewable every year of the course']::text[], array['Aadhaar card', 'Income certificate', 'Caste certificate (if applicable)', 'Previous year marksheet', 'Fee receipt / bonafide certificate', 'Bank passbook (Aadhaar-seeded account)']::text[], 'Online application on the National / State Scholarship Portal, verification by the institute and the district welfare office.', 'Pass the previous year''s examination and re-apply on the portal.', true, array['SC', 'ST', 'OBC', 'NSP']::text[], 'No fixed limit', 1944, 'National Scholarship Portal helpdesk'),
  (2, 'central-sector-scholarship', 'Central Sector Scheme of Scholarships for College & University Students', 'Central Sector Scholarship', 'Ministry of Education, Government of India', 'Government', 12000, '₹12,000 – ₹20,000 / year', 'Annual', 'Merit-cum-Means', array['Any Stream']::text[], array['UG', 'PG']::text[], array['Above 80th percentile in Class 12 board exam', 'Pursuing a regular degree course', 'Family income within the scheme limit']::text[], 450000, 'Up to ₹4.5 lakh p.a.', 80, 'As notified (usually Oct–Dec)', 'Online', 'https://scholarships.gov.in', 'A merit-cum-means scholarship for meritorious students from lower-income families pursuing regular undergraduate and postgraduate degree courses.', array['Annual scholarship for graduation', 'Higher amount for postgraduate years', 'Direct benefit transfer to bank account']::text[], array['Aadhaar card', 'Income certificate', 'Caste certificate (if applicable)', 'Previous year marksheet', 'Fee receipt / bonafide certificate', 'Bank passbook (Aadhaar-seeded account)']::text[], 'Merit list based on Class 12 marks, verified through the National Scholarship Portal.', 'Minimum 50% marks and 75% attendance in the previous year.', true, array['Merit', 'NSP', 'Degree']::text[], '82,000 per year (all India)', 2008, 'National Scholarship Portal helpdesk'),
  (3, 'pre-post-matric-minority-scholarship', 'Post Matric Scholarship for Minority Students', 'Minority Scholarship', 'Ministry of Minority Affairs, Government of India', 'Government', 0, 'Admission + tuition + maintenance (as per scheme)', 'Annual', 'Minority', array['Any Stream']::text[], array['Diploma', 'UG', 'PG']::text[], array['Belongs to a notified minority community', 'Minimum 50% marks in the previous final exam', 'Family income within the scheme limit']::text[], 200000, 'Up to ₹2 lakh p.a.', 50, 'As notified', 'Online', 'https://scholarships.gov.in', 'Supports students from minority communities pursuing post-matric courses, including technical and vocational courses at Class 11–12 level and above.', array['Admission & tuition fee support', 'Maintenance allowance']::text[], array['Aadhaar card', 'Income certificate', 'Caste certificate (if applicable)', 'Previous year marksheet', 'Fee receipt / bonafide certificate', 'Bank passbook (Aadhaar-seeded account)', 'Minority community self-declaration']::text[], 'Online application, institute verification and merit-cum-means selection.', 'Pass the previous year with at least 50% marks.', true, array['Minority', 'NSP']::text[], 'As per state quota', 2007, 'National Scholarship Portal helpdesk'),
  (4, 'aicte-pragati-saksham', 'AICTE Pragati & Saksham Scholarships', 'Pragati / Saksham', 'AICTE', 'Government', 50000, '₹50,000 / year', 'Annual', 'Girls / Specially-abled', array['Management', 'Computer Applications']::text[], array['Diploma', 'UG']::text[], array['Pragati: girl students (max. 2 per family)', 'Saksham: students with 40%+ disability', 'Admitted to the first year (or second year via lateral entry) of an AICTE-approved course']::text[], 800000, 'Up to ₹8 lakh p.a.', 0, 'As notified', 'Online', 'https://scholarships.gov.in', 'AICTE scholarships for girl students (Pragati) and specially-abled students (Saksham) studying in AICTE-approved technical programmes.', array['₹50,000 per year for the course duration', 'Can be used for fees, books and equipment']::text[], array['Aadhaar card', 'Income certificate', 'Caste certificate (if applicable)', 'Previous year marksheet', 'Fee receipt / bonafide certificate', 'Bank passbook (Aadhaar-seeded account)', 'Disability certificate (Saksham)']::text[], 'Merit based on qualifying exam marks.', 'Promotion to the next year without backlog.', false, array['Girls', 'Divyang', 'AICTE']::text[], 'Several thousand per year', 2014, 'AICTE helpdesk')
on conflict do nothing;
select setval(pg_get_serial_sequence('scholarships', 'id'), (select max(id) from scholarships));

-- ─────────────── Admin access ───────────────
-- ← Replace with the email of your website admin (create the same user in
--   Supabase → Authentication → Users first).
insert into admins (email) values ('admin@swanidhi.com') on conflict do nothing;
