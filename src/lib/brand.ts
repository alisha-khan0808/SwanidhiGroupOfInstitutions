// Single source of truth for institution branding & contact details.
// Update these values (and replace /public/logo.png) once the final
// name, logo and contact information are confirmed.
export const BRAND = {
  name: "Swanidhi Group of Institutions",
  shortName: "Swanidhi",
  tagline: "Medical • Nursing • Paramedical • Law • Management",
  logo: "/logo.png",
  motto: "ज्ञानं परमं बलम्",
  mottoMeaning: "Knowledge is the supreme strength",

  // Institution contact number (calls + WhatsApp). TODO: confirm email & address.
  phone: "+91 94318 99956",
  phoneHref: "tel:+919431899956",
  whatsappHref: "https://wa.me/919431899956",
  email: "info@swanidhi.edu.in",
  admissionsEmail: "admissions@swanidhi.edu.in",
  address: "Swanidhi Group of Institutions, India",
  mapsUrl: "https://maps.google.com/?q=Swanidhi+Group+of+Institutions",
  hours: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sun: Closed"],
  siteUrl: "https://swanidhi.edu.in",

  session: "2026-27",
} as const;
