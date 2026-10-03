// Creates (or resets) the demo login accounts used by the "Demo login" buttons.
//
//   npm run demo:setup
//
// Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, and
// supabase/setup.sql + supabase/crm_setup.sql already run. Safe to run repeatedly.
// Keep in sync with src/lib/demo.ts.
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const PASSWORD = 'Demo@12345'
const ADMIN = { email: 'demo.admin@swanidhi.test', name: 'Demo Admin', phone: '9000000001' }
const ASSOCIATE = { email: 'demo.associate@swanidhi.test', name: 'Demo Associate', phone: '9000000002', code: 'ASC-DEMO' }
const STUDENT = { enrollment: 'DEMO-STU-001', name: 'Demo Student', phone: '9000000003', course: 'B.Sc. Nursing', totalFee: 700000 }

// ── env ──
for (const file of ['.env.local', '.env']) {
  const p = path.resolve(file)
  if (!fs.existsSync(p)) continue
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('✖ Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.')
  process.exit(1)
}
const db = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })

const fail = (step, error) => {
  console.error(`✖ ${step}: ${error.message ?? error}`)
  process.exit(1)
}

/** Create the auth user, or reset its password if it already exists. Returns the user id. */
async function ensureAuthUser(email) {
  const { data, error } = await db.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true })
  if (!error) return data.user.id
  for (let page = 1; page < 50; page++) {
    const { data: list, error: listErr } = await db.auth.admin.listUsers({ page, perPage: 200 })
    if (listErr) fail(`find user ${email}`, listErr)
    const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    if (existing) {
      const { error: updErr } = await db.auth.admin.updateUserById(existing.id, { password: PASSWORD, email_confirm: true })
      if (updErr) fail(`reset password for ${email}`, updErr)
      return existing.id
    }
    if (list.users.length < 200) break
  }
  fail(`create user ${email}`, error)
}

async function upsertProfile(id, email, fullName, role, phone) {
  const { error } = await db.from('profiles').upsert(
    { id, email, full_name: fullName, role, phone, is_active: true },
    { onConflict: 'id' },
  )
  if (error) fail(`profile for ${email}`, error)
}

// ── 1. Office staff (CRM admin + website admin) ──
const adminId = await ensureAuthUser(ADMIN.email)
await upsertProfile(adminId, ADMIN.email, ADMIN.name, 'admin', ADMIN.phone)
const { error: adminsErr } = await db.from('admins').upsert({ email: ADMIN.email }, { onConflict: 'email' })
if (adminsErr) console.warn(`! Could not add website-admin access (run supabase/setup.sql): ${adminsErr.message}`)
console.log(`✔ Office staff   ${ADMIN.email} / ${PASSWORD}`)

// ── 2. Associate ──
const associateId = await ensureAuthUser(ASSOCIATE.email)
await upsertProfile(associateId, ASSOCIATE.email, ASSOCIATE.name, 'associate', ASSOCIATE.phone)
{
  const { error } = await db.from('associates').upsert(
    {
      name: ASSOCIATE.name,
      phone: ASSOCIATE.phone,
      email: ASSOCIATE.email,
      status: 'approved',
      associate_code: ASSOCIATE.code,
      user_id: associateId,
      approved_at: new Date().toISOString(),
      current_city: 'Demo City',
    },
    { onConflict: 'email' },
  )
  if (error) fail('associate record', error)
}
console.log(`✔ Associate      ${ASSOCIATE.email} / ${PASSWORD}`)

// ── 3. Student (portal login uses the enrollment number) ──
// Same email scheme as /api/students/create-credentials.
const portalEmail = `${STUDENT.enrollment.toLowerCase().replace(/[^a-z0-9]/g, '')}@hdportal.in`
const studentUserId = await ensureAuthUser(portalEmail)
await upsertProfile(studentUserId, portalEmail, STUDENT.name, 'student', STUDENT.phone)
{
  const { data: course } = await db.from('courses').select('id').eq('name', STUDENT.course).maybeSingle()
  const { error } = await db.from('students').upsert(
    {
      enrollment_number: STUDENT.enrollment,
      full_name: STUDENT.name,
      phone: STUDENT.phone,
      email: 'demo.student@swanidhi.test',
      city: 'Demo City',
      course_id: course?.id ?? null,
      total_fee: STUDENT.totalFee,
      enrollment_date: new Date().toISOString().slice(0, 10),
      status: 'active',
      portal_user_id: studentUserId,
      portal_username: STUDENT.enrollment,
      portal_temp_password: PASSWORD,
      portal_active: true,
    },
    { onConflict: 'enrollment_number' },
  )
  if (error) fail('student record', error)
}
console.log(`✔ Student        ${STUDENT.enrollment} / ${PASSWORD}`)
console.log('\nDemo accounts are ready. Use the "Demo login" buttons on the login pages.')
