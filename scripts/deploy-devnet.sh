#!/bin/bash
# FREE: Deploy to Solana devnet (no mainnet fees)
# This script deploys the RemitX smart contract to devnet

set -e

echo "🚀 Deploying RemitX to Solana devnet..."
echo "⚠️ Make sure you have Anchor CLI installed: cargo install --git https://github.com/coral-xyz/anchor"

# Check if anchor is installed
if ! command -v anchor &> /dev/null; then
    echo "❌ Anchor CLI not found. Install it with:"
    echo "   cargo install --git https://github.com/coral-xyz/anchor avm"
    echo "   avm install latest"
    exit 1
fi

# Build the program
echo "🔨 Building program..."
anchor build

# Deploy to devnet
echo "📡 Deploying to devnet..."
anchor deploy --provider.cluster devnet

echo "✅ Deployment complete!"
echo "📝 Update your program ID in:"
echo "   - Anchor.toml"
echo "   - Your frontend .env.local"
