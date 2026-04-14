# RemitX Setup Guide - 0-Dev Beginner

## 🎯 5-Minute Quick Start

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd remittx
```

### Step 2: Install Dependencies
```bash
npm install
# or if you prefer pnpm:
pnpm install
```

### Step 3: Run Locally
```bash
npm run dev
# or with pnpm:
pnpm dev
```

Open `http://localhost:3000` in your browser. ✅ **Done!**

---

## 🔗 Setup Phantom Wallet (2 minutes)

### On Desktop
1. Visit: https://phantom.app/download
2. Download extension for Chrome/Firefox/Edge
3. Click "Create New Wallet"
4. Save your seed phrase **SAFELY** (write it down!)
5. Set a password
6. You're done! Phantom is now your web3 wallet

### On Mobile
1. Download Phantom app from App Store or Play Store
2. Open the app
3. Tap "Create New Wallet"
4. Save seed phrase **SAFELY**
5. Set password
6. Done!

### Switch to Devnet
1. Open Phantom wallet
2. Click the network dropdown at the top (usually says "Mainnet")
3. Select "Devnet" or "Testnet"
4. ✅ You're now on FREE devnet!

---

## 💰 Get Free Devnet USDC (3 minutes)

### Option A: Via Phantom Wallet UI (Easiest)
1. Open Phantom wallet
2. Click on "USDC" token
3. Look for "Airdrop" or "Request Funds" button
4. Click it and follow instructions
5. You'll receive FREE devnet USDC ✅

### Option B: Via Command Line
```bash
# First, get your wallet address from Phantom
# (Copy it to clipboard)

# Then run:
chmod +x scripts/get-devnet-usdc.sh
./scripts/get-devnet-usdc.sh YOUR_WALLET_ADDRESS_HERE
```

Example:
```bash
./scripts/get-devnet-usdc.sh 9B5X4sPe2rTBCXZmKwRZ8E7PqD6L8V5H3U2C1A0B
```

### Option C: Solana CLI
```bash
# Install Solana CLI first:
# https://docs.solana.com/cli/install-solana-cli-tools

# Get SOL airdrop
solana airdrop 2 --url devnet

# Then convert SOL to USDC using Phantom wallet
```

---

## 🚀 Using RemitX

### Send Remittance (3 steps)

1. **Go to Send Page**
   - Click "Send Money" button on homepage
   - Or navigate to: `http://localhost:3000/send`

2. **Connect Wallet**
   - Click "Connect Wallet" button
   - Select "Phantom"
   - Approve in Phantom popup

3. **Fill the Form**
   - **Recipient**: Enter wallet address or phone number
   - **Amount**: Enter USDC amount (e.g., 10)
   - Click "Send Money"
   - Approve transaction in Phantom

4. **Get Remittance ID**
   - You'll see: "Remittance Sent!"
   - Copy the remittance ID
   - Download QR code if needed

### Claim Remittance (2 steps)

1. **Go to Claim Page**
   - Click "Claim Remittance" button
   - Or navigate to: `http://localhost:3000/claim`

2. **Claim**
   - **Remittance ID**: Paste the ID from sender
   - Click "Claim USDC"
   - Approve in Phantom
   - Done! USDC is now in your wallet ✅

### Track Remittance

1. **Go to Track Page**
   - Click "Track Transfer" button
   - Or navigate to: `http://localhost:3000/track`

2. **Enter ID**
   - Paste remittance ID
   - Click "Track"

3. **View Status**
   - See full details
   - View on Solana Explorer
   - Status: Pending → Claimed

---

## 🧪 Test Scenarios

### Scenario 1: Send to Yourself (for testing)
```
1. Get your wallet address from Phantom (click copy icon)
2. Go to /send
3. Paste your address as recipient
4. Send 5 USDC
5. Go to /claim
6. Paste the remittance ID
7. Claim as recipient
```

### Scenario 2: Send to Friend
```
1. Get friend's wallet address
2. Go to /send
3. Enter friend's wallet
4. Send 10 USDC
5. Share remittance ID (or QR code)
6. Friend goes to /claim
7. Friend pastes ID and claims
```

### Scenario 3: Test with Mock Phone Number
```
1. Go to /send
2. Enter phone: +923001234567 (Pakistani format)
3. Send any amount
4. System shows: "Remittance created"
5. Track it on explorer
```

---

## 🔧 Deployment (Optional)

### Deploy to Vercel (FREE)

**Option 1: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

**Option 2: Using GitHub**
1. Push your code to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Import your GitHub repo
5. Click "Deploy"
6. Your app will be live at: `https://remitx.vercel.app`

### Deploy Smart Contract (Optional)

If you want to deploy your own Solana program:

```bash
# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor avm
avm install latest
avm use latest

# Deploy to devnet
chmod +x scripts/deploy-devnet.sh
./scripts/deploy-devnet.sh
```

This will give you a program ID. Update it in:
- `Anchor.toml`
- `.env.local`
- `lib/solana-devnet.ts`

---

## 📱 Build for Mobile (PWA)

RemitX works on mobile! Just:

1. Open `http://localhost:3000` on your phone's browser
2. Add to home screen (iOS: Share → Add to Home Screen)
3. Or install as PWA (Android/Chrome: Menu → Install app)

---

## 🐛 Troubleshooting

### "Wallet not connecting"
**Solution**: 
- Refresh the page
- Make sure Phantom is on Devnet
- Try re-connecting

### "Insufficient USDC"
**Solution**:
- Get more free devnet USDC from faucet (see above)
- Each wallet can get ~50 USDC for free

### "Transaction Failed"
**Solution**:
- Make sure you have SOL for gas (needed for tx fees)
- Refresh and try again
- Check network connection

### "USDC token not showing"
**Solution**:
- Click "+" in Phantom to add token
- Paste Devnet USDC mint: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDu`
- It will appear in your wallet

### "Page is white/blank"
**Solution**:
1. Open browser console: F12
2. Check for errors
3. Try: Clear cache → Hard refresh (Ctrl+Shift+R)
4. Restart dev server: `pnpm dev`

---

## 📚 Learning Resources

### Understanding Solana
- [Solana Docs](https://docs.solana.com)
- [Solana Devnet Faucet](https://faucet.solana.com)
- [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)

### Web3 Development
- [Web3.js Docs](https://docs.solana.com/de/developing/clients/javascript)
- [Anchor Framework](https://book.anchor-lang.com)
- [Phantom Wallet API](https://docs.phantom.app)

### Next.js & React
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## 💡 Pro Tips

### Tip 1: Save Your Seed Phrase
- Your seed phrase = your private key
- Write it down physically or use a password manager
- **NEVER** share it with anyone
- If you lose it, you lose access to your wallet

### Tip 2: Use Different Wallets for Testing
- Keep one wallet with funds for sending
- Use another for testing receives
- Easier to test full flow

### Tip 3: Monitor Gas Fees
- Devnet gas is FREE, but mainnet is not
- Each transaction ~$0.00001 (very cheap!)
- Check current fees: `solana fees`

### Tip 4: Check Wallet Balance
- In Phantom: Shows your SOL + USDC balance
- Via CLI: `solana balance <wallet-address> --url devnet`

### Tip 5: Share Your Progress
- Record a demo video
- Share on Twitter #Solana #Web3
- Post on GitHub
- Submit to hackathons!

---

## 🚀 Next Steps

1. ✅ Setup complete? Try the demo!
2. Try sending USDC between two wallets
3. Track transactions on Solana explorer
4. Deploy to Vercel (make it live)
5. Share with friends
6. Participate in hackathons

---

## 📞 Need Help?

- **GitHub Issues**: Create an issue on this repo
- **Solana Discord**: https://discord.gg/solana
- **Phantom Support**: https://support.phantom.app
- **Anchor Discord**: https://discord.gg/anchor

---

## 🎓 What You Just Built

Congratulations! You've set up:
- ✅ A Next.js web3 app
- ✅ Solana wallet integration
- ✅ Smart contract interaction (via Anchor)
- ✅ Cross-border remittance system
- ✅ Blockchain transaction tracking

**All 100% FREE, with zero credit card required!**

This is the same tech used by:
- Magic Eden (NFT marketplace)
- Marinade Finance (Liquid staking)
- Drift Protocol (Derivatives)
- Raydium (AMM)

You're now part of the Solana ecosystem. Welcome! 🎉

---

**Ready to deploy? Go to `/DEMO.md` for pitch deck and demo tips!**
