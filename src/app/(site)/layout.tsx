import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
