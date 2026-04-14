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
import { createRemittance } from '@/lib/solana-devnet'
import { processFiatOnRamp } from '@/lib/jazzcash-mock'
import QRCode from 'react-qr-code'

export default function SendPage() {
  const { isConnected, addresses } = usePhantom()
  const solanaAddress = addresses?.find(a => a.addressType === AddressType.solana)?.address
  const wallet = {
    connected: isConnected && !!solanaAddress,
    publicKey: solanaAddress ? new PublicKey(solanaAddress) : null
  }
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amountUsdc, setAmountUsdc] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [sentHash, setSentHash] = useState('')
  const [error, setError] = useState('')
  const [showFiatModal, setShowFiatModal] = useState(false)
  const [fiatAmount, setFiatAmount] = useState('')
  const [showQR, setShowQR] = useState(false)

  const handleSend = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setError('Please connect your Phantom wallet first')
      return
    }

    if (!recipientAddress.trim()) {
      setError('Please enter recipient wallet address or phone number')
      return
    }

    if (!amountUsdc || parseFloat(amountUsdc) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    setLoading(true)
    setError('')

    try {
      // FREE: This creates a mock transaction on devnet
      const txHash = await createRemittance(
        wallet,
        recipientAddress,
        parseFloat(amountUsdc)
      )
      setSentHash(txHash)
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send remittance')
    } finally {
      setLoading(false)
    }
  }

  const handleFiatOnRamp = async () => {
    if (!fiatAmount || parseFloat(fiatAmount) <= 0) {
      setError('Please enter a valid amount in PKR')
      return
    }

    setLoading(true)
    try {
      const result = await processFiatOnRamp(
        wallet.publicKey?.toString() || '',
        parseFloat(fiatAmount)
      )
      setAmountUsdc(result.usdcReceived?.toString() || '')
      setShowFiatModal(false)
      setFiatAmount('')
    } catch (err: any) {
      setError(err.message || 'Fiat on-ramp failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-full relative z-10 pt-12 pb-24">
      <div className="max-w-2xl mx-auto px-6">

        {!sent ? (
          <Card className="p-8 bg-card/60 backdrop-blur-xl border-border/40 shadow-2xl shadow-primary/5">
            <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Send Money</h2>

            {error && (
              <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Recipient Wallet Address or Phone Number
                </label>
                <Input
                  placeholder="9B5X4sPe2rTBCXZmKwRZ8E7PqD6L8V5H3U2C1A0B or +923001234567"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  disabled={loading}
                  className="h-12 bg-background/50 border-border/50 text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Enter a Solana wallet address or phone number (for JazzCash integration)
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Amount (USDC)
                </label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="50"
                    value={amountUsdc}
                    onChange={(e) => setAmountUsdc(e.target.value)}
                    disabled={loading}
                    step="0.01"
                    min="0"
                    className="h-12 bg-background/50 border-border/50"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowFiatModal(true)}
                    disabled={!wallet.connected}
                    className="h-12 px-6"
                  >
                    PKR →
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-primary font-medium">
                  FREE: Using devnet USDC. No real money.
                </p>
              </div>

              {/* Fee Info */}
              <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex justify-between mb-3 text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-foreground">{amountUsdc || '0'} USDC</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-primary/10">
                  <span className="text-sm font-semibold text-muted-foreground">Fee (1%)</span>
                  <span className="font-bold text-primary">
                    {amountUsdc ? (parseFloat(amountUsdc) * 0.01).toFixed(2) : '0'} USDC
                  </span>
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSend}
                disabled={loading || !wallet.connected}
                size="lg"
                className="w-full h-14 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/25 rounded-xl"
              >
                {loading ? 'Processing...' : wallet.connected ? 'Send Money' : 'Connect Wallet First'}
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
            <h2 className="text-3xl font-extrabold mb-2 text-foreground">Remittance Sent!</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Your money has been successfully processed
            </p>

            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl mb-8 border border-border/50 text-left shadow-sm">
              <div className="text-sm space-y-3">
                <p className="flex justify-between"><span className="text-muted-foreground font-medium">To:</span> <span className="font-bold">{recipientAddress}</span></p>
                <p className="flex justify-between"><span className="text-muted-foreground font-medium">Amount:</span> <span className="font-bold">{amountUsdc} USDC</span></p>
                <p className="flex justify-between"><span className="text-muted-foreground font-medium">Fee:</span> <span className="font-bold text-primary">{(parseFloat(amountUsdc) * 0.01).toFixed(2)} USDC</span></p>
                <div className="pt-3 border-t border-border/50 break-all">
                  <span className="text-muted-foreground font-medium block mb-1">TX Hash:</span>
                  <code className="text-xs bg-muted p-2 rounded-md block text-primary">{sentHash}</code>
                </div>
              </div>
            </div>

            {showQR ? (
              <div className="mb-8 p-6 bg-white rounded-xl inline-block shadow-sm">
                <QRCode value={`RemitX:${sentHash}`} size={180} className="mx-auto" />
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowQR(true)}
                className="w-full mb-6 h-12 rounded-xl"
              >
                Show QR Code
              </Button>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`https://explorer.solana.com/tx/${sentHash}?cluster=devnet`} target="_blank">
                <Button variant="outline" className="w-full h-12 rounded-xl hover:bg-accent">
                  View on Explorer
                </Button>
              </Link>
              <Link href="/track">
                <Button variant="outline" className="w-full h-12 rounded-xl hover:bg-accent border-primary text-primary hover:text-primary">
                  Track Remittance
                </Button>
              </Link>
            </div>

            <Button
              onClick={() => {
                setSent(false)
                setRecipientAddress('')
                setAmountUsdc('')
                setSentHash('')
              }}
              className="w-full mt-6 h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white"
            >
              Send Another
            </Button>
          </Card>
        )}
      </div>

      {/* Fiat On-Ramp Modal */}
      {showFiatModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <Card className="p-8 w-full max-w-md bg-card border-border/40 shadow-2xl relative">
            <h3 className="text-2xl font-bold mb-2">Convert PKR to USDC</h3>
            <p className="text-sm text-muted-foreground mb-6">
              FREE: Mock fiat on-ramp. No real money will be charged.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Amount in PKR
                </label>
                <Input
                  type="number"
                  placeholder="13,850 (≈ 50 USDC)"
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(e.target.value)}
                  className="h-12 bg-background/50 border-border/50"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Rate: 1 USDC ≈ 277 PKR
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                <p className="text-sm font-medium text-primary flex justify-between">
                  <span>You will receive:</span>
                  <span className="font-bold">{fiatAmount ? (parseFloat(fiatAmount) / 277).toFixed(2) : '0'} USDC</span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFiatModal(false)}
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFiatOnRamp}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white"
                  disabled={loading}
                >
                  {loading ? 'Converting...' : 'Swap for USDC'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </main>
  )
}
