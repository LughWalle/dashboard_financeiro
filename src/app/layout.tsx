'use client'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { TransactionsProvider } from "@/contexts/transactions"
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TransactionsProvider>
          {!isDashboard && <Header />}
          {isDashboard ? (
            children
          ) : (
            <main style={{ padding: '2rem' }}>
              {children}
            </main>
          )}
        </TransactionsProvider>
      </body>
    </html>
  );
}
