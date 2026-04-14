'use client'

import { useState } from 'react'
import Link from 'next/link'
import ConnectWallet from '@/components/ConnectWallet'
import { usePhantom, AddressType } from '@phantom/react-sdk'
import { PublicKey } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'
import { claimRemittance } from '@/lib/solana-devnet'

export default function ClaimPage() {
  const { isConnected, addresses } = usePhantom()
  const solanaAddress = addresses?.find(a => a.addressType === AddressType.solana)?.address
  const wallet = {
    connected: isConnected && !!solanaAddress,
    publicKey: solanaAddress ? new PublicKey(solanaAddress) : null
  }
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
    <main className="w-full relative z-10 pt-12 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        {!claimed ? (
          <Card className="p-8 bg-card/60 backdrop-blur-xl border-border/40 shadow-2xl shadow-primary/5">
            <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Claim Remittance</h2>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-8">
              <p className="text-sm text-primary font-medium">
                💡 You receive a remittance ID from the sender. Enter it here to claim the USDC in your wallet.
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Remittance ID
                </label>
                <Input
                  placeholder="dev1a2b3c4d5e"
                  value={remittanceId}
                  onChange={(e) => setRemittanceId(e.target.value)}
                  disabled={loading}
                  className="h-12 bg-background/50 border-border/50 text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  The ID provided by the sender (usually starts with 'dev' on devnet)
                </p>
              </div>

              <div className="bg-background/40 border border-border/50 p-5 rounded-xl text-sm space-y-3">
                <p className="font-bold text-foreground">How to get your remittance ID:</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground font-medium">
                  <li>Ask the sender to send you the remittance ID</li>
                  <li>They can scan the QR code or copy the ID from the confirmation</li>
                  <li>Paste it above and click Claim</li>
                </ol>
              </div>

              <Button
                onClick={handleClaim}
                disabled={loading || !wallet.connected}
                size="lg"
                className="w-full h-14 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25 rounded-xl"
              >
                {loading ? 'Processing...' : wallet.connected ? 'Claim USDC' : 'Connect Wallet First'}
              </Button>

              {!wallet.connected && (
                <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    👇 Please connect your Phantom wallet above
                  </p>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card className="p-10 text-center bg-card/60 backdrop-blur-xl border-border/40 shadow-2xl">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-extrabold mb-2 text-foreground">Remittance Claimed!</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {claimedAmount} USDC has been added to your wallet
            </p>

            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl mb-8 border border-border/50 text-left shadow-sm">
              <div className="text-sm space-y-3">
                <p className="flex justify-between"><span className="text-muted-foreground font-medium">Remittance ID:</span> <span className="font-bold text-primary break-all">{remittanceId}</span></p>
                <p className="flex justify-between"><span className="text-muted-foreground font-medium">Amount Received:</span> <span className="font-bold">{claimedAmount} USDC</span></p>
                <div className="pt-3 border-t border-border/50 flex justify-between">
                  <span className="text-muted-foreground font-medium">Status:</span>
                  <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full">Claimed</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setClaimed(false)
                setRemittanceId('')
              }}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white"
            >
              Claim Another
            </Button>

            <Link href="/" className="block mt-4">
              <Button variant="outline" className="w-full h-12 rounded-xl hover:bg-accent border-primary text-primary hover:text-primary transition-all">
                Back to Home
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  )
}
