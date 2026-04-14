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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-blue-600">RemitX</h1>
        <ConnectWallet />
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {!sent ? (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Send Money</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Recipient Wallet Address or Phone Number
                </label>
                <Input
                  placeholder="9B5X4sPe2rTBCXZmKwRZ8E7PqD6L8V5H3U2C1A0B or +923001234567"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a Solana wallet address or phone number (for JazzCash integration)
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Amount (USDC)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="50"
                    value={amountUsdc}
                    onChange={(e) => setAmountUsdc(e.target.value)}
                    disabled={loading}
                    step="0.01"
                    min="0"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowFiatModal(true)}
                    disabled={!wallet.connected}
                  >
                    PKR →
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  FREE: Using devnet USDC. No real money.
                </p>
              </div>

              {/* Fee Info */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Amount</span>
                  <span className="font-semibold">{amountUsdc || '0'} USDC</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200">
                  <span className="text-sm font-medium">Fee (1%)</span>
                  <span className="font-semibold text-blue-600">
                    {amountUsdc ? (parseFloat(amountUsdc) * 0.01).toFixed(2) : '0'} USDC
                  </span>
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSend}
                disabled={loading || !wallet.connected}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Processing...' : wallet.connected ? 'Send Money' : 'Connect Wallet First'}
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
            <h2 className="text-2xl font-bold mb-2">Remittance Sent!</h2>
            <p className="text-gray-600 mb-6">
              Your money has been sent on Solana devnet
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <div className="text-sm space-y-2">
                <p><span className="font-medium">To:</span> {recipientAddress}</p>
                <p><span className="font-medium">Amount:</span> {amountUsdc} USDC</p>
                <p><span className="font-medium">Fee:</span> {(parseFloat(amountUsdc) * 0.01).toFixed(2)} USDC</p>
                <p><span className="font-medium">TX Hash:</span> <code className="text-xs bg-white p-1 rounded">{sentHash}</code></p>
              </div>
            </div>

            {showQR ? (
              <div className="mb-6">
                <QRCode value={`RemitX:${sentHash}`} size={200} className="mx-auto" />
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowQR(true)}
                className="w-full mb-4"
              >
                Show QR Code
              </Button>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`https://explorer.solana.com/tx/${sentHash}?cluster=devnet`} target="_blank">
                <Button variant="outline" className="w-full">
                  View on Explorer
                </Button>
              </Link>
              <Link href="/track">
                <Button variant="outline" className="w-full">
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
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Send Another
            </Button>
          </Card>
        )}
      </div>

      {/* Fiat On-Ramp Modal */}
      {showFiatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Convert PKR to USDC</h3>
            <p className="text-sm text-gray-600 mb-4">
              FREE: This is a mock fiat on-ramp. No real money will be charged.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Amount in PKR
                </label>
                <Input
                  type="number"
                  placeholder="13,850 (≈ 50 USDC)"
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Rate: 1 USDC ≈ 277 PKR
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-blue-800">
                  You will receive: {fiatAmount ? (parseFloat(fiatAmount) / 277).toFixed(2) : '0'} USDC
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFiatModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFiatOnRamp}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Converting...' : 'Convert to USDC'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </main>
  )
}
