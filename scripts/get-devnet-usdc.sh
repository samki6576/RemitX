#!/bin/bash
# FREE: Get devnet USDC from faucet
# Use this to get free devnet USDC (fake money, no value)

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <wallet-address>"
    echo "Example: $0 9B5X4sPe2rTBCXZmKwRZ8E7PqD6L8V5H3U2C1A0B"
    exit 1
fi

WALLET=$1
DEVNET_USDC_MINT="4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDu"
FAUCET_URL="https://faucet.solana.com"

echo "🚰 Requesting devnet SOL from faucet..."
solana airdrop 2 "$WALLET" --url devnet

echo "✅ Received 2 SOL on devnet"
echo "💡 Tip: Use an SPL faucet UI or convert SOL to devnet USDC using Phantom wallet bridge"
echo "   Devnet USDC Mint: $DEVNET_USDC_MINT"
