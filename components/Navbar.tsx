'use client'

import Link from 'next/link'
import Image from 'next/image'
import ConnectWallet from '@/components/ConnectWallet'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#8b5cf6]/90 dark:bg-background/80 backdrop-blur-xl border-b border-white/10 dark:border-border/40 shadow-sm transition-all">
      <div className="flex items-center gap-4 text-white dark:text-foreground">
        {!isHome && (
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon-white-32x32.png" width={32} height={32} alt="RemitX Logo" className="w-8 h-8 drop-shadow-md" />
          <h1 className="text-2xl font-black tracking-tight drop-shadow-sm hover:opacity-90 transition-opacity">RemitX</h1>
        </Link>
        <span className="hidden sm:inline-block text-xs bg-white/20 dark:bg-primary/20 text-white dark:text-primary px-3 py-1 rounded-full font-bold backdrop-blur-md">
          Devnet Only (FREE)
        </span>
      </div>
      <div className="flex items-center gap-3">
        <ConnectWallet />
        <ThemeToggle />
      </div>
    </nav>
  )
}
