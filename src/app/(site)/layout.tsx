import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Medical, Nursing, Paramedical, Law & Management Courses`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.name} offers 49 courses — BAMS, B.Sc. Nursing, GNM, ANM, B.Pharma, D.Pharma, BPT, BMLT, DMLT, LLB, BA LLB, B.Ed, D.El.Ed, MBA, BCA, MCA and ITI trades. Admissions open ${BRAND.session}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
