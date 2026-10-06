# Swanidhi Group of Institutions — Website, Admin Panel & CRM

Next.js 16 · React 19 · Tailwind CSS 4 · Supabase

| Area | URL | What it does |
|---|---|---|
| Public website | `/` | Home, courses, departments, fee structure, apply online, scholarships, blog, about, contact |
| Website admin | `/admin` | Manage courses, blogs, scholarships and website enquiries |
| CRM (staff) | `/crm/login` | Leads, students, fees & invoices, finance, HRMS, associates, targets, settings |
| Student portal | `/crm/student/login` | Admission status, fees, documents, support |
| Associate portal | `/crm/login?as=associate` | Partner leads, students & wallet |

## Run locally

Requires **Node.js 20.9 or newer** (Node 22 LTS recommended).

```bash
npm install
npm run dev
```

The public website works immediately — until Supabase is connected it serves the
49 courses, blogs and scholarships bundled in `src/data/`.

## Branding

- Name, tagline, phone, email, address, session: **`src/lib/brand.ts`**
- Logo: replace **`public/logo.png`** (square PNG, ≥ 512 px). Also used on invoices and salary slips.
- Favicons: `src/app/icon.png`, `src/app/apple-icon.png`
- Website colour palette: the `@theme` block in `src/app/(site)/globals.css`

## Connecting Supabase

1. Create a Supabase project and copy `.env.example` → `.env.local` with the API keys.
2. SQL Editor → run, in order:
   1. `supabase/setup.sql` — website tables + all 49 courses, blogs, scholarships
   2. `supabase/crm_setup.sql` — CRM tables + courses, 11 departments, sessions and the published fee structure
   3. `supabase/whatsapp_setup.sql` — only if you use the WhatsApp bot (`whatsapp-bot/`)
3. Admin login: put your password into `supabase/create_admin_user.sql` and run it in the
   SQL Editor. It creates `admin@swanidhi.com` (confirmed) and grants website-admin and CRM-admin
   access. It works before or after step 2, and re-running it just updates the password.

Website enquiries (Contact / Apply / course pages) are stored in `enquiries` and
automatically become CRM leads with source `website`.

## Course data

`src/data/courses.ts` is transcribed from the official fee-structure brochure. After
Supabase is connected, edit courses from **/admin/courses** instead (the site reads the
`programs` table).
