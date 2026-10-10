-- ============================================================
-- Colleges (shown on /colleges and department pages)
-- Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Safe to run again. Names below are DEMO — edit them afterwards in the
-- website admin panel: /admin/colleges
-- ============================================================
create table if not exists colleges (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  short_name text not null default '',
  department text not null default '',
  location text not null default '',
  image text not null default '',
  logo text not null default '',
  badge text not null default 'Verified',
  established integer,
  description text not null default '',
  sort_order integer not null default 999,
  created_at timestamptz not null default now()
);

alter table colleges enable row level security;

drop policy if exists "public read" on colleges;
create policy "public read" on colleges for select using (true);
drop policy if exists "admin write" on colleges;
create policy "admin write" on colleges for all to authenticated using (is_admin()) with check (is_admin());

insert into colleges (slug, name, short_name, department, location, badge, description, sort_order) values
  ('swanidhi-ayurvedic-medical-college-and-hospital', 'Swanidhi Ayurvedic Medical College & Hospital', 'Swanidhi Ayurveda', 'medical', 'India', 'Verified', 'Ayurvedic medicine and surgery for NEET-qualified students who want to become registered doctors.', 10),
  ('swanidhi-college-of-nursing', 'Swanidhi College of Nursing', 'Swanidhi Nursing', 'nursing', 'India', 'Verified', 'ANM, GNM, B.Sc., Post Basic B.Sc. and M.Sc. Nursing — the complete nursing ladder under one roof.', 20),
  ('swanidhi-college-of-pharmacy', 'Swanidhi College of Pharmacy', 'Swanidhi Pharmacy', 'pharmacy', 'India', 'Verified', 'Diploma and Bachelor programmes in pharmacy for careers in hospitals, retail and the pharma industry.', 30),
  ('swanidhi-institute-of-paramedical-sciences', 'Swanidhi Institute of Paramedical Sciences', 'SIPS', 'paramedical-degree', 'India', 'Verified', 'Bachelor programmes in physiotherapy, radiology, lab technology, OT technology, biotechnology and hospital management.', 40),
  ('swanidhi-paramedical-training-institute', 'Swanidhi Paramedical Training Institute', 'SPTI', 'paramedical-diploma', 'India', 'Verified', 'Job-oriented diplomas in lab technology, X-ray, ECG, OT assistance, physiotherapy and sanitary inspection.', 50),
  ('swanidhi-institute-of-allied-health-lateral-entry', 'Swanidhi Institute of Allied Health — Lateral Entry', 'SIAH Lateral', 'paramedical-lateral-entry', 'India', 'Verified', 'Already hold a paramedical diploma? Join the matching bachelor programme directly in a later year.', 60),
  ('swanidhi-institute-of-advanced-allied-health-studies', 'Swanidhi Institute of Advanced Allied Health Studies', 'SIAAHS', 'paramedical-pg', 'India', 'Verified', 'Master''s programmes in physiotherapy, OT technology, radiology and medical lab technology.', 70),
  ('swanidhi-law-college', 'Swanidhi Law College', 'Swanidhi Law', 'law', 'India', 'Verified', 'Three-year LLB for graduates and five-year integrated BA LLB / BBA LLB after 12th.', 80),
  ('swanidhi-college-of-education', 'Swanidhi College of Education', 'Swanidhi B.Ed College', 'education', 'India', 'Verified', 'Teacher-training programmes — B.Ed, D.El.Ed and M.A. (Education).', 90),
  ('swanidhi-institute-of-management-and-technology', 'Swanidhi Institute of Management & Technology', 'SIMT', 'management-it', 'India', 'Verified', 'BBA, BCA, MCA and MBA programmes, including MBA in Hospital Management.', 100),
  ('swanidhi-private-iti', 'Swanidhi Private ITI', 'Swanidhi ITI', 'iti', 'India', 'Verified', 'Hands-on trade courses after 10th — Electrician, Fitter, Electronic Mechanic and Mechanic Diesel.', 110)
on conflict (slug) do nothing;
