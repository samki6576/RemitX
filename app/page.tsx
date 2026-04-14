'use client'

import Link from 'next/link'
import { Send, Zap, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ConnectWallet from '@/components/ConnectWallet'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border/40">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-primary">RemitX</h1>
          <span className="hidden sm:inline-block text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
            Devnet Only (FREE)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ConnectWallet />
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Cross-Border Remittance on Solana
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Send money across borders instantly. Zero fees. Free devnet USDC. No credit card required.
          </p>
          <div className="inline-block px-4 py-2 bg-yellow-500/10 border-l-4 border-yellow-500 rounded">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              ⚠️ <strong>DEVNET ONLY:</strong> This uses fake USDC on Solana devnet for demos. No real money.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition bg-card border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <Send className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg">Send</h3>
            </div>
            <p className="text-muted-foreground">Send USDC to recipients anywhere. Just enter their wallet address or phone number.</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition bg-card border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg">Instant</h3>
            </div>
            <p className="text-muted-foreground">Transactions settle in seconds on Solana. No intermediaries, no delays.</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition bg-card border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg">Track</h3>
            </div>
            <p className="text-muted-foreground">Monitor your transfers in real-time on the Solana explorer.</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/send">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Send Money
            </Button>
          </Link>
          <Link href="/claim">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-accent hover:text-accent-foreground">
              Claim Remittance
            </Button>
          </Link>
          <Link href="/track">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-accent hover:text-accent-foreground">
              Track Transfer
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center py-12 border-t border-b border-border/40">
          <div>
            <p className="text-3xl font-bold text-primary">0%</p>
            <p className="text-muted-foreground">Platform Fee (devnet demo)</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">&lt;1s</p>
            <p className="text-muted-foreground">Settlement Time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">FREE</p>
            <p className="text-muted-foreground">To Get Started</p>
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
