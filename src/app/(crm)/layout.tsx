import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

import { BRAND } from '@/lib/brand'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${BRAND.name} CRM`,
  description: `Manage leads, students, finance and HR for ${BRAND.name}`,
  appleWebApp: {
    capable: true,
    title: `${BRAND.name} CRM`,
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#162b58',
}

export default function CrmRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
