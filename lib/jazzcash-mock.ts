// FREE: JazzCash mockup for devnet
// This is a simulated fiat on-ramp (no real API key needed)

export interface FiatOnRampResult {
  success: boolean;
  message: string;
  transactionId?: string;
  amount?: number;
  usdcReceived?: number;
}

/**
 * Mock JazzCash payment integration
 * FREE: This simulates a real payment but doesn't actually charge anything
 * In production, you would integrate with JazzCash API or similar
 */
export async function processFiatOnRamp(
  phoneNumber: string,
  amountPkr: number // Pakistani Rupees
): Promise<FiatOnRampResult> {
  console.log("[v0] Processing fiat on-ramp on devnet...");

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock conversion rate: 1 USDC ≈ 277 PKR (approximate)
  const conversionRate = 277;
  const estimatedUsdc = Math.floor(amountPkr / conversionRate);

  return {
    success: true,
    message: `Successfully converted ₨${amountPkr} to ${estimatedUsdc} USDC on devnet`,
    transactionId: "jazz" + Math.random().toString(36).substring(7),
    amount: amountPkr,
    usdcReceived: estimatedUsdc,
  };
}

/**
 * Mock JazzCash payout
 * FREE: This simulates a real payout but doesn't actually process it
 */
export async function processJazzCashPayout(
  phoneNumber: string,
  amountPkr: number
): Promise<FiatOnRampResult> {
  console.log("[v0] Processing JazzCash payout on devnet...");

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    message: `Successfully initiated payout of ₨${amountPkr} to ${phoneNumber}`,
    transactionId: "payout" + Math.random().toString(36).substring(7),
    amount: amountPkr,
  };
}

/**
 * Get exchange rates
 * FREE: Returns mock rates (in production, fetch from real API)
 */
export function getExchangeRates() {
  return {
    USDC_TO_PKR: 277,
    PKR_TO_USDC: 1 / 277,
    lastUpdated: new Date().toISOString(),
  };
}
