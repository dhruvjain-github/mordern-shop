import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { CartProvider } from '@/components/providers/cart-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ModernShop - Your Premium Shopping Destination',
  description: 'Discover premium products across electronics, fashion, beauty, groceries and more. Shop with confidence at ModernShop.',
  keywords: 'shopping, ecommerce, electronics, fashion, beauty, groceries, premium products',
  authors: [{ name: 'ModernShop Team' }],
  openGraph: {
    title: 'ModernShop - Your Premium Shopping Destination',
    description: 'Discover premium products across multiple categories with fast shipping and excellent customer service.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ModernShop - Your Premium Shopping Destination',
    description: 'Discover premium products across multiple categories.',
  },
  robots: 'index, follow',
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
