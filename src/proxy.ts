import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Only the CRM (/crm/...) needs auth. The public Swanidhi website is
// excluded by the matcher at the bottom of this file.
// ---------------------------------------------------------------------------
// SITE SUSPENDED: every page (website, CRM, API) returns this notice.
// To restore the site, set SITE_SUSPENDED = false (or delete this block and
// restore the original matcher at the bottom of the file).
// ---------------------------------------------------------------------------
const SITE_SUSPENDED = true

const SUSPENDED_HTML = `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Website Suspended – Urgent Notice</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#111;color:#f5f5f5;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:16px}
  .card{max-width:680px;width:100%;background:#1c1c1c;border:2px solid #d32f2f;border-radius:12px;padding:32px 24px;text-align:center}
  .tag{display:inline-block;background:#d32f2f;color:#fff;font-weight:700;letter-spacing:.08em;
       padding:6px 14px;border-radius:999px;font-size:14px;margin-bottom:20px}
  h1{margin:0 0 16px;font-size:28px;color:#ff5252}
  p{font-size:17px;line-height:1.6;margin:0 0 14px}
  .amt{font-size:22px;font-weight:700;color:#fff}
  .muted{color:#aaa;font-size:14px;margin-top:24px}
</style>
</head>
<body>
  <div class="card">
    <div class="tag">⚠ URGENT NOTICE</div>
    <h1>Website Suspended</h1>
    <p>Yeh website, mobile app aur CRM jis developer ne develop kiya hai, unka
       <span class="amt">₹1,50,000</span> ka payment abhi tak nahi diya gaya hai.</p>
    <p>Pichhle 1 mahine se payment baar-baar taala ja raha hai, aur 31 October 2026 ko
       shaam 5 baje payment maangne par developer ko gandi gaaliyan di gayin.</p>
    <p>Isliye yeh website payment clear hone tak band kar di gayi hai.</p>
    <hr style="border:none;border-top:1px solid #333;margin:22px 0">
    <p>This website, along with the app and CRM, has been suspended because the developer's
       dues of <strong>₹1,50,000</strong> remain unpaid for over one month. When the payment
       was requested on 31 October 2026 at 5 PM, the developer was verbally abused.
       The site will be restored once the payment is cleared.</p>
    <p class="muted">31 October 2026</p>
  </div>
</body>
</html>`

export async function proxy(request: NextRequest) {
  if (SITE_SUSPENDED) {
    return new NextResponse(SUSPENDED_HTML, {
      status: 503,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'retry-after': '86400' },
    })
  }

  const { pathname } = request.nextUrl

  // Non-CRM paths are only matched while suspended; let them through otherwise.
  if (pathname !== '/crm' && !pathname.startsWith('/crm/')) {
    return NextResponse.next()
  }

  // Public short links (invoice PDFs shared on WhatsApp) — no auth
  if (pathname.startsWith('/crm/i/')) {
    return NextResponse.next()
  }

  // If Supabase is not configured yet, let requests through; CRM pages will
  // surface their own error.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isCrmEntry       = pathname === '/crm' || pathname === '/crm/'
  const isStudentRoute   = pathname.startsWith('/crm/student/') && pathname !== '/crm/student/login'
  const isStudentLogin   = pathname === '/crm/student/login'
  const isAdminLogin     = pathname === '/crm/login' || isCrmEntry
  const isAssociateRoute = pathname.startsWith('/crm/associate') && !pathname.startsWith('/crm/associates')
  const isAdminRoute     = !isStudentRoute && !isAssociateRoute && !isAdminLogin && !isStudentLogin

  const go = (path: string) => NextResponse.redirect(new URL(path, request.url))

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    let role = profile?.role

    // Fallback: if no profile row, check students table
    if (!role) {
      const { data: studentRecord } = await supabase
        .from('students')
        .select('id')
        .eq('portal_user_id', user.id)
        .maybeSingle()
      if (studentRecord) role = 'student'
    }

    // Logged in on Supabase but not a CRM user (e.g. a website-CMS-only admin)
    if (!role) {
      if (isAdminLogin || isStudentLogin) return response
      return go('/crm/login?error=no_profile')
    }

    // Student → always go to student portal
    if (role === 'student' && !isStudentRoute && !isStudentLogin) {
      return go('/crm/student/dashboard')
    }
    if (role !== 'student' && isStudentRoute) {
      return go(role === 'associate' ? '/crm/associate' : '/crm/dashboard')
    }

    // Associate → always go to /crm/associate, never admin area
    if (role === 'associate' && isAdminRoute) {
      return go('/crm/associate')
    }

    // Bounce logged-in users off login pages
    if (isAdminLogin) {
      if (role === 'student')   return go('/crm/student/dashboard')
      if (role === 'associate') return go('/crm/associate')
      return go('/crm/dashboard')
    }
    if (isStudentLogin && role === 'student') {
      return go('/crm/student/dashboard')
    }
  } else {
    // Unauthenticated
    if (isStudentRoute) {
      return go('/crm/student/login')
    }
    if (isCrmEntry) {
      return go('/crm/login')
    }
    if (!isAdminLogin && !isStudentLogin) {
      return go('/crm/login')
    }
  }

  return response
}

export const config = {
  // Original matcher (restore when un-suspending): ['/crm', '/crm/:path*']
  matcher: ['/((?!_next/static|_next/image).*)'],
}
