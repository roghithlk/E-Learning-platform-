import "./globals.css"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-Learning Platform",
  description: "Learn and grow with our interactive courses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <MainNav />
          <main className="flex-1">{children}</main>
          <footer className="py-6 text-center text-sm text-gray-500">
            © 2023 E-Learning Platform. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  )
}

