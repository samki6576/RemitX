import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
//import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import PhantomProviderComponent from '@/components/PhantomProvider'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'RemitX - Free Cross-Border Remittance on Solana Devnet',
  description: 'Send money across borders instantly with zero fees using RemitX on Solana devnet',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Dynamic Background Elements */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
          </div>

          <PhantomProviderComponent>
            <Navbar />
            {children}
          </PhantomProviderComponent>
        </ThemeProvider>
      </body>
    </html>
  );
}
