import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Lexend } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CSEC ASTU Portal",
  description: "Computer Science and Engineering Club at Adama Science and Technology University",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
