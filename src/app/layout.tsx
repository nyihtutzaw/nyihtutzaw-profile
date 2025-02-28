import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nyi Htut Zaw',
  description: 'Personal portfolio showcasing my work and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-myColor-50 text-myColor-900 dark:bg-myColor-900 dark:text-myColor-50 flex flex-col min-h-screen`}>
        <ThemeProvider>
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <main className="flex-grow pt-16 px-4">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>
          <footer className="py-6 text-center text-myColor-600 dark:text-myColor-300">
            <p>© {new Date().getFullYear()} Nyi Htut Zaw. All rights reserved.</p>
          </footer>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}