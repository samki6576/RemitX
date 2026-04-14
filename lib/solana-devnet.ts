// FREE: This uses devnet USDC, no real money
// Solana connection and wallet utilities for devnet

import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
} from "@solana/web3.js";
export interface MockWalletContext {
  publicKey: PublicKey | null;
}

// FREE: Uses public devnet RPC (no API key needed)
const DEVNET_RPC = "https://api.devnet.solana.com";

// Devnet USDC mint address
export const DEVNET_USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDu"
);

// Program ID (update after deployment)
export const REMITTANCE_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || "11111111111111111111111111111111"
);

export const getConnection = () => {
  return new Connection(DEVNET_RPC, "processed");
};

interface RemittanceData {
  sender: string;
  recipientAddress: string;
  amountUsdc: number;
  feeUsdc: number;
  status: "Pending" | "Claimed" | "Cancelled";
  createdAt: number;
  claimedAt: number;
}

export async function createRemittance(
  wallet: MockWalletContext,
  recipientAddress: string,
  amountUsdc: number
): Promise<string> {
  // FREE: This is a mock for devnet - full implementation requires
  // Anchor IDL and transaction building
  console.log("[v0] Creating remittance on devnet...");

  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }

  // In production, this would:
  // 1. Create a PDA for the remittance
  // 2. Build the transaction with proper Anchor serialization
  // 3. Send it to the program
  // For now, we return a mock transaction hash
  const mockHash = "dev" + Math.random().toString(36).substring(7);
  return mockHash;
}

export async function claimRemittance(
  wallet: MockWalletContext,
  remittanceId: string
): Promise<string> {
  console.log("[v0] Claiming remittance on devnet...");

  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }

  const mockHash = "dev" + Math.random().toString(36).substring(7);
  return mockHash;
}

export async function getRemittanceStatus(
  remittanceId: string
): Promise<RemittanceData | null> {
  console.log("[v0] Fetching remittance status...");

  // Mock data for demo
  return {
    sender: "YourWalletAddress",
    recipientAddress: "+923001234567",
    amountUsdc: 50,
    feeUsdc: 0.5,
    status: "Pending",
    createdAt: Date.now(),
    claimedAt: 0,
  };
}

export async function trackRemittance(remittanceId: string): Promise<string> {
  // FREE: Returns devnet explorer link
  return `https://explorer.solana.com/tx/${remittanceId}?cluster=devnet`;
}

export async function getWalletBalance(wallet: MockWalletContext): Promise<number> {
  if (!wallet.publicKey) {
    return 0;
  }

  const connection = getConnection();
  const balance = await connection.getBalance(wallet.publicKey);
  return balance / 1e9; // Convert lamports to SOL
}
