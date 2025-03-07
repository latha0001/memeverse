import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { MemeProvider } from "@/context/meme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MemeVerse - Explore, Upload, and Share Memes",
  description: "A platform for meme enthusiasts to explore, upload, and interact with memes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MemeProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </MemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'