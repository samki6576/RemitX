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
    <main className="w-full relative z-10 pt-12 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <Card className="p-8 bg-card/60 backdrop-blur-xl border-border/40 shadow-2xl shadow-primary/5">
          <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Track Remittance</h2>

          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Remittance ID
              </label>
              <div className="flex gap-3">
                <Input
                  placeholder="dev1a2b3c4d5e"
                  value={remittanceId}
                  onChange={(e) => setRemittanceId(e.target.value)}
                  disabled={loading}
                  className="h-12 bg-background/50 border-border/50 text-foreground"
                />
                <Button
                  onClick={handleTrack}
                  disabled={loading}
                  className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white rounded-xl shadow-lg shadow-primary/20"
                >
                  {loading ? 'Tracking...' : 'Track'}
                </Button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}

            {/* Status Display */}
            {status && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`p-5 border rounded-xl flex items-center gap-4 ${
                  status.status === 'Claimed' ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' :
                  status.status === 'Cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' :
                  'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                }`}>
                  <div className="p-2 bg-background/50 rounded-full shadow-sm">
                    {getStatusIcon(status.status)}
                  </div>
                  <div>
                    <p className="font-extrabold text-xl tracking-tight">{status.status}</p>
                    <p className="text-sm font-medium opacity-80">Remittance is currently {status.status.toLowerCase()}</p>
                  </div>
                </div>

                {/* Details */}
                <Card className="p-6 bg-background/40 border-border/50 rounded-xl shadow-inner">
                  <h3 className="font-bold mb-4 text-foreground">Remittance Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Remittance ID</span>
                      <code className="bg-muted px-2 py-1 rounded-md text-xs font-bold text-primary break-all max-w-[50%]">{remittanceId}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Sender</span>
                      <span className="font-bold truncate max-w-[60%]">{status.sender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Recipient</span>
                      <span className="font-bold text-right">{status.recipientAddress}</span>
                    </div>
                    <div className="border-t border-border/50 pt-3 mt-3 flex justify-between">
                      <span className="text-muted-foreground font-medium">Amount</span>
                      <span className="font-extrabold">{status.amountUsdc} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Fee (1%)</span>
                      <span className="font-bold text-primary">{status.feeUsdc} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Total Sent</span>
                      <span className="font-extrabold text-foreground">
                        {(status.amountUsdc + status.feeUsdc).toFixed(2)} USDC
                      </span>
                    </div>
                    <div className="border-t border-border/50 pt-3 mt-3 flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Created</span>
                      <span className="text-xs font-semibold bg-muted px-2 py-1 rounded-md">
                        {new Date(status.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {status.claimedAt > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">Claimed</span>
                        <span className="text-xs font-semibold bg-muted px-2 py-1 rounded-md">
                          {new Date(status.claimedAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Timeline */}
                <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                  <h3 className="font-bold mb-4 text-sm text-foreground">Timeline</h3>
                  <div className="space-y-0 text-sm">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 shadow-sm"></div>
                        <div className="w-0.5 h-10 bg-primary/30 my-1"></div>
                      </div>
                      <div className="-mt-1">
                        <p className="font-bold text-foreground">Remittance Created</p>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {new Date(status.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ring-4 shadow-sm ${
                          status.status === 'Claimed' 
                            ? 'bg-green-500 ring-green-500/20' 
                            : 'bg-muted border-2 border-primary/30 ring-transparent'
                        }`}></div>
                      </div>
                      <div className="-mt-1">
                        <p className={`font-bold ${status.status === 'Claimed' ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {status.status === 'Claimed' ? 'Remittance Claimed' : 'Waiting to be claimed...'}
                        </p>
                        {status.claimedAt > 0 && (
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">
                            {new Date(status.claimedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explorer Link */}
                {explorerLink && (
                  <Link href={explorerLink} target="_blank" className="block mt-2">
                    <Button variant="outline" className="w-full h-12 rounded-xl text-primary border-primary/50 hover:bg-primary/5 transition-all">
                      View on Solana Explorer
                    </Button>
                  </Link>
                )}

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-3 pt-4 border-t border-border/40">
                  <Link href="/send">
                    <Button variant="outline" className="w-full h-12 rounded-xl">
                      Send Another
                    </Button>
                  </Link>
                  <Link href="/claim">
                    <Button variant="outline" className="w-full h-12 rounded-xl">
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
          <Card className="mt-8 p-6 bg-background/50 backdrop-blur-sm border-border/50 text-sm">
            <h3 className="font-bold mb-3 text-foreground">How to Track Your Remittance</h3>
            <ol className="space-y-2 text-muted-foreground font-medium list-decimal list-inside">
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
