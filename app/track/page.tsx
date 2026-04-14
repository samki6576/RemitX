'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { getRemittanceStatus, trackRemittance } from '@/lib/solana-devnet'

export default function TrackPage() {
  const [remittanceId, setRemittanceId] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<any>(null)
  const [error, setError] = useState('')
  const [explorerLink, setExplorerLink] = useState('')

  const handleTrack = async () => {
    if (!remittanceId.trim()) {
      setError('Please enter remittance ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      // FREE: Fetch mock remittance status
      const remittanceData = await getRemittanceStatus(remittanceId)
      if (!remittanceData) {
        setError('Remittance not found')
        return
      }

      setStatus(remittanceData)

      // Get explorer link
      const link = await trackRemittance(remittanceId)
      setExplorerLink(link)
    } catch (err: any) {
      setError(err.message || 'Failed to track remittance')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-6 h-6 text-yellow-600" />
      case 'Claimed':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />
      case 'Cancelled':
        return <XCircle className="w-6 h-6 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'Claimed':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'Cancelled':
        return 'bg-red-50 border-red-200 text-red-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
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
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Track Remittance</h2>

          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Remittance ID
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="dev1a2b3c4d5e"
                  value={remittanceId}
                  onChange={(e) => setRemittanceId(e.target.value)}
                  disabled={loading}
                />
                <Button
                  onClick={handleTrack}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Tracking...' : 'Track'}
                </Button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Status Display */}
            {status && (
              <div className="space-y-4">
                <div className={`p-4 border rounded-lg ${getStatusColor(status.status)} flex items-center gap-3`}>
                  {getStatusIcon(status.status)}
                  <div>
                    <p className="font-semibold text-lg">{status.status}</p>
                    <p className="text-sm opacity-75">Remittance is currently {status.status.toLowerCase()}</p>
                  </div>
                </div>

                {/* Details */}
                <Card className="p-4 bg-gray-50">
                  <h3 className="font-semibold mb-3">Remittance Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remittance ID</span>
                      <code className="bg-white px-2 py-1 rounded text-xs">{remittanceId}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sender</span>
                      <span className="font-medium truncate">{status.sender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipient (Phone/Address)</span>
                      <span className="font-medium">{status.recipientAddress}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold">{status.amountUsdc} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee (1%)</span>
                      <span className="font-semibold text-blue-600">{status.feeUsdc} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Sent</span>
                      <span className="font-semibold">
                        {(status.amountUsdc + status.feeUsdc).toFixed(2)} USDC
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="text-gray-600">Created</span>
                      <span className="text-xs">
                        {new Date(status.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {status.claimedAt > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Claimed</span>
                        <span className="text-xs">
                          {new Date(status.claimedAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Timeline */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-3 text-sm">Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="w-0.5 h-8 bg-blue-200"></div>
                      </div>
                      <div>
                        <p className="font-medium">Remittance Created</p>
                        <p className="text-xs text-gray-600">
                          {new Date(status.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          status.status === 'Claimed' 
                            ? 'bg-green-600' 
                            : 'bg-gray-300'
                        }`}></div>
                      </div>
                      <div>
                        <p className="font-medium">
                          {status.status === 'Claimed' ? 'Remittance Claimed' : 'Waiting to be claimed...'}
                        </p>
                        {status.claimedAt > 0 && (
                          <p className="text-xs text-gray-600">
                            {new Date(status.claimedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explorer Link */}
                {explorerLink && (
                  <Link href={explorerLink} target="_blank">
                    <Button variant="outline" className="w-full">
                      View on Solana Explorer
                    </Button>
                  </Link>
                )}

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-2">
                  <Link href="/send">
                    <Button variant="outline" className="w-full">
                      Send Another
                    </Button>
                  </Link>
                  <Link href="/claim">
                    <Button variant="outline" className="w-full">
                      Claim Remittance
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Help Section */}
        {!status && (
          <Card className="mt-8 p-6 bg-gray-50">
            <h3 className="font-semibold mb-3">How to Track Your Remittance</h3>
            <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Enter the remittance ID that was provided when the money was sent</li>
              <li>Click "Track" to fetch the current status</li>
              <li>View all details including sender, recipient, amount, and timeline</li>
              <li>Visit the Solana Explorer link to see the blockchain transaction</li>
            </ol>
          </Card>
        )}
      </div>
    </main>
  )
}
