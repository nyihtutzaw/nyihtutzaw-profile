import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
    <html lang="en">
      <body className={`${inter.className} bg-myColor-50 text-myColor-900 dark:bg-myColor-900 dark:text-myColor-50 flex flex-col min-h-screen`}>
        <main className="flex-grow pt-16 px-4">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
        <footer className="py-6 text-center text-myColor-600 dark:text-myColor-300">
          <p>© {new Date().getFullYear()} Nyi Htut Zaw. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}