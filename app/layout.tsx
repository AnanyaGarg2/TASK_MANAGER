import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"
const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'StudyAI - AI-Powered Study Planner',
  description: 'Your intelligent study companion for better learning outcomes',
}

export const viewport: Viewport = {
  themeColor: '#0a0b14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background`}>
         <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
  >
    <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "rgba(15, 23, 42, 0.9)",
      color: "#fff",
      border: "1px solid rgba(139, 92, 246, 0.5)",
      borderRadius: "16px",
      padding: "14px",
      backdropFilter: "blur(12px)",
      boxShadow:
        "0 0 20px rgba(139, 92, 246, 0.4)",
    },

    success: {
      style: {
        border:
          "1px solid rgba(34,197,94,0.6)",
        boxShadow:
          "0 0 20px rgba(34,197,94,0.4)",
      },
    },

    error: {
      style: {
        border:
          "1px solid rgba(239,68,68,0.6)",
        boxShadow:
          "0 0 20px rgba(239,68,68,0.4)",
      },
    },
  }}
/>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </ThemeProvider>
      </body>
    </html>
  )
}
