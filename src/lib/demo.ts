// Demo accounts for testing the login screens.
// Create them in Supabase with:  npm run demo:setup
// Hide the demo buttons before going live by setting NEXT_PUBLIC_DEMO_LOGIN=false.

export const DEMO_LOGIN_ENABLED = process.env.NEXT_PUBLIC_DEMO_LOGIN !== 'false'

export const DEMO_PASSWORD = 'Demo@12345'

export const DEMO_ACCOUNTS = {
  /** Office staff — CRM admin, also has website-admin (/admin) access. */
  admin: { email: 'demo.admin@swanidhi.test', password: DEMO_PASSWORD, name: 'Demo Admin' },
  /** Associate partner portal. */
  associate: { email: 'demo.associate@swanidhi.test', password: DEMO_PASSWORD, name: 'Demo Associate' },
  /** Student portal — logs in with the enrollment number, not an email. */
  student: { enrollment: 'DEMO-STU-001', password: DEMO_PASSWORD, name: 'Demo Student' },
} as const

export const DEMO_SETUP_HINT =
  'Demo accounts not found. Connect Supabase (.env.local) and run "npm run demo:setup" once.'
