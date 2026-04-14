'use client'

import Link from 'next/link'
import { Send, Zap, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">RemitX</h1>
        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
          Devnet Only (FREE)
        </span>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Cross-Border Remittance on Solana
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Send money across borders instantly. Zero fees. Free devnet USDC. No credit card required.
          </p>
          <div className="inline-block px-4 py-2 bg-yellow-100 border-l-4 border-yellow-500 rounded">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>DEVNET ONLY:</strong> This uses fake USDC on Solana devnet for demos. No real money.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <Send className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-lg">Send</h3>
            </div>
            <p className="text-gray-600">Send USDC to recipients anywhere. Just enter their wallet address or phone number.</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-lg">Instant</h3>
            </div>
            <p className="text-gray-600">Transactions settle in seconds on Solana. No intermediaries, no delays.</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-lg">Track</h3>
            </div>
            <p className="text-gray-600">Monitor your transfers in real-time on the Solana explorer.</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/send">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Send Money
            </Button>
          </Link>
          <Link href="/claim">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Claim Remittance
            </Button>
          </Link>
          <Link href="/track">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Track Transfer
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center py-12 border-t border-b">
          <div>
            <p className="text-3xl font-bold text-blue-600">0%</p>
            <p className="text-gray-600">Platform Fee (devnet demo)</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">&lt;1s</p>
            <p className="text-gray-600">Settlement Time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">FREE</p>
            <p className="text-gray-600">To Get Started</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">How It Works</h3>
            <ol className="space-y-2 text-gray-600">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">1.</span>
                <span>Connect your Phantom wallet (FREE)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">2.</span>
                <span>Get free devnet USDC from the faucet</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">3.</span>
                <span>Enter recipient wallet or phone number</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">4.</span>
                <span>Confirm and send - done in seconds!</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Why RemitX?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex gap-2">
                <span className="text-blue-600">✓</span>
                <span>Built 100% FREE on Solana devnet</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">✓</span>
                <span>No KYC, no credit card, no hidden fees</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">✓</span>
                <span>Transparent blockchain transactions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">✓</span>
                <span>Perfect for hackathon / MVP demo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8 px-6 text-center text-gray-600 text-sm">
        <p>RemitX is a FREE devnet MVP. Built with Next.js, Solana, and Anchor. Zero mainnet deployment fees.</p>
      </footer>
    </main>
  )
}
