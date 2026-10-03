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
3. Authentication → Users → add your admin user, then make sure its email is in the
   `admins` insert at the end of `setup.sql` and the `profiles` insert at the end of `crm_setup.sql`.

Website enquiries (Contact / Apply / course pages) are stored in `enquiries` and
automatically become CRM leads with source `website`.

## Course data

`src/data/courses.ts` is transcribed from the official fee-structure brochure. After
Supabase is connected, edit courses from **/admin/courses** instead (the site reads the
`programs` table).

## Demo logins (testing)

Every login screen has **Demo login** buttons. After connecting Supabase, create the
demo accounts once (needs `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`):

```bash
npm run demo:setup
```

| Portal | Login | Password |
|---|---|---|
| Office staff (CRM admin + website admin) | `demo.admin@swanidhi.test` | `Demo@12345` |
| Associate | `demo.associate@swanidhi.test` | `Demo@12345` |
| Student | enrollment no. `DEMO-STU-001` | `Demo@12345` |

Running the command again resets the passwords. **Before going live**, set
`NEXT_PUBLIC_DEMO_LOGIN=false` (hides the buttons) and delete the demo users in
Supabase → Authentication.
