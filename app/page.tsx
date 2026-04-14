'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Send, Zap, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ConnectWallet from '@/components/ConnectWallet'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="w-full relative">


      {/* Hero Section */}
      <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-32 z-10">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Borderless Remittance <br className="hidden sm:inline" /> on Solana
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-150">
            Send money globally in seconds. Zero fees. Free devnet USDC. No credit card required.
          </p>
          <div className="inline-block px-5 py-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full shadow-inner animate-in zoom-in duration-1000 delay-300 backdrop-blur-sm">
            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              ⚡ <strong>DEVNET ONLY:</strong> Uses fake USDC on Solana devnet for MVP demos.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-8 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-card/60 backdrop-blur-xl border-border/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                <Send className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-2xl tracking-tight">Send</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Send USDC to recipients anywhere. Just enter their wallet address or phone number.</p>
            </div>
          </Card>

          <Card className="p-8 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 bg-card/60 backdrop-blur-xl border-border/40 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-2xl tracking-tight">Instant</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Transactions settle in seconds on Solana. No intermediaries, no delays.</p>
            </div>
          </Card>

          <Card className="p-8 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 bg-card/60 backdrop-blur-xl border-border/40 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-2xl tracking-tight">Track</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Monitor your transfers in real-time on the Solana explorer with full transparency.</p>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
          <Link href="/send" className="group">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300 rounded-xl">
              Send Money Now
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/claim" className="group">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/50 group-hover:scale-105 transition-all duration-300 rounded-xl">
              Claim Remittance
            </Button>
          </Link>
          <Link href="/track" className="group">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:border-primary/50 group-hover:scale-105 transition-all duration-300 rounded-xl">
              Track Transfer
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center py-16 border-y border-border/30 bg-gradient-to-r from-transparent via-primary/5 to-transparent relative">
          <div className="flex flex-col gap-2 p-6 rounded-2xl hover:bg-primary/5 transition-colors">
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-blue-600">0%</p>
            <p className="text-lg font-medium text-muted-foreground uppercase tracking-wider">Platform Fee</p>
          </div>
          <div className="flex flex-col gap-2 p-6 rounded-2xl hover:bg-primary/5 transition-colors">
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-blue-600">&lt;1s</p>
            <p className="text-lg font-medium text-muted-foreground uppercase tracking-wider">Settlement Time</p>
          </div>
          <div className="flex flex-col gap-2 p-6 rounded-2xl hover:bg-primary/5 transition-colors">
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-primary to-blue-600">FREE</p>
            <p className="text-lg font-medium text-muted-foreground uppercase tracking-wider">To Get Started</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">How It Works</h3>
            <ol className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Connect your Phantom wallet (FREE)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>Get free devnet USDC from the faucet</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Enter recipient wallet or phone number</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Confirm and send - done in seconds!</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Why RemitX?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Built 100% FREE on Solana devnet</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>No KYC, no credit card, no hidden fees</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Transparent blockchain transactions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Perfect for hackathon / MVP demo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-8 px-6 text-center text-muted-foreground text-sm">
        <p>RemitX is a FREE devnet MVP. Built with Next.js, Solana, and Anchor. Zero mainnet deployment fees.</p>
      </footer>
    </main>
  )
}
