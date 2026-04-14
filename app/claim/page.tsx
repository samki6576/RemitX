'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'
import { claimRemittance } from '@/lib/solana-devnet'

export default function ClaimPage() {
  const wallet = useWallet()
  const [remittanceId, setRemittanceId] = useState('')
  const [loading, setLoading] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [claimedAmount, setClaimedAmount] = useState('')
  const [error, setError] = useState('')

  const handleClaim = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setError('Please connect your Phantom wallet first')
      return
    }

    if (!remittanceId.trim()) {
      setError('Please enter remittance ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      // FREE: This claims a mock remittance on devnet
      const txHash = await claimRemittance(wallet, remittanceId)
      setClaimedAmount('50.00') // Mock amount
      setClaimed(true)
    } catch (err: any) {
      setError(err.message || 'Failed to claim remittance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-blue-600">RemitX</h1>
        <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700" />
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {!claimed ? (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Claim Remittance</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                💡 You receive a remittance ID from the sender. Enter it here to claim the USDC in your wallet.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Remittance ID
                </label>
                <Input
                  placeholder="dev1a2b3c4d5e"
                  value={remittanceId}
                  onChange={(e) => setRemittanceId(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  The ID provided by the sender (usually starts with 'dev' on devnet)
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                <p className="font-medium">How to get your remittance ID:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Ask the sender to send you the remittance ID</li>
                  <li>They can scan the QR code or copy the ID from the confirmation</li>
                  <li>Paste it above and click Claim</li>
                </ol>
              </div>

              <Button
                onClick={handleClaim}
                disabled={loading || !wallet.connected}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Processing...' : wallet.connected ? 'Claim USDC' : 'Connect Wallet First'}
              </Button>

              {!wallet.connected && (
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    👇 Please connect your Phantom wallet above
                  </p>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Remittance Claimed!</h2>
            <p className="text-gray-600 mb-6">
              {claimedAmount} USDC has been added to your wallet
            </p>

            <div className="bg-green-50 p-4 rounded-lg mb-6 text-left text-sm">
              <p><span className="font-medium">Remittance ID:</span> {remittanceId}</p>
              <p className="mt-2"><span className="font-medium">Amount Received:</span> {claimedAmount} USDC</p>
              <p className="mt-2"><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Claimed</span></p>
            </div>

            <Button
              onClick={() => {
                setClaimed(false)
                setRemittanceId('')
              }}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Claim Another
            </Button>

            <Link href="/" className="block mt-4">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  )
}
