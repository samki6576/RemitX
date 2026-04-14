# RemitX - 100% FREE Cross-Border Remittance App on Solana Devnet

**Built 100% FREE with ZERO credit card required, ZERO mainnet fees, ZERO API keys needed.**

## 🚀 Overview

RemitX is a complete cross-border remittance MVP that demonstrates how to build fintech applications on Solana using only free tools and services. Send money across borders in seconds with blockchain transparency - all on the FREE Solana devnet.

### Key Features
- ✅ Send USDC remittances to wallet addresses or phone numbers
- ✅ Claim remittances instantly
- ✅ Track remittances on the Solana blockchain
- ✅ QR code generation for easy sharing
- ✅ Mock JazzCash fiat on-ramp (no real API needed)
- ✅ Real Solana smart contract (devnet)
- ✅ Phantom wallet integration
- ✅ 100% FREE devnet deployment

### Why RemitX?
- **Zero Fees** - No infrastructure costs, no platform fees on devnet
- **No KYC** - Phantom wallet, no identity verification needed
- **No Credit Card** - Nothing to link or authenticate
- **Production Ready** - Real Solana blockchain (devnet), Anchor smart contracts, Next.js frontend
- **Perfect for Hackathons** - MVPs, demos, and pitch competitions

## 📊 Tech Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| **Frontend** | Next.js 16 + React 19 + Tailwind CSS | FREE (Vercel) |
| **Smart Contract** | Anchor + Rust | FREE (Solana devnet) |
| **Blockchain** | Solana Devnet | FREE (unlimited txns) |
| **Wallet** | Phantom | FREE (no KYC) |
| **Hosting** | Vercel FREE tier | FREE |
| **Database** | None (on-chain only) | FREE |
| **RPC** | Solana public RPC | FREE |

## 🎯 File Structure

```
remittx/
├── programs/remittance/              # Anchor smart contract
│   ├── src/
│   │   └── lib.rs                   # Smart contract code
│   ├── tests/
│   │   └── remittance.ts            # Contract tests
│   └── Cargo.toml
├── app/
│   ├── page.tsx                     # Homepage
│   ├── send/page.tsx                # Send remittance
│   ├── claim/page.tsx               # Claim remittance
│   ├── track/page.tsx               # Track status
│   ├── layout.tsx                   # Root layout with wallet provider
│   └── globals.css
├── components/
│   ├── wallet-provider.tsx          # Solana wallet adapter setup
│   └── ui/                          # shadcn/ui components (pre-installed)
├── lib/
│   ├── solana-devnet.ts            # Solana interaction utilities
│   └── jazzcash-mock.ts            # Simulated fiat on-ramp
├── utils/
│   └── qr-free.ts                  # QR code generation
├── scripts/
│   ├── deploy-devnet.sh            # Deploy contract to devnet
│   └── get-devnet-usdc.sh          # Get free devnet USDC
├── Anchor.toml                      # Anchor configuration
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## 🏃 Quick Start (0-Dev Guide)

### Prerequisites
- Node.js 18+ (for frontend)
- Phantom wallet (FREE, download from phantom.app)
- Optional: Anchor CLI (for smart contract deployment)

### Step 1: Clone & Install (1 min)

```bash
git clone <this-repo>
cd remittx
npm install
# or: pnpm install
```

### Step 2: Run Locally (30 seconds)

```bash
npm run dev
# or: pnpm dev
```

Visit: `http://localhost:3000`

### Step 3: Connect Wallet (1 min)

1. Click "Connect Wallet" button
2. Select "Phantom"
3. Approve in Phantom wallet popup
4. You're connected to devnet (FREE)

### Step 4: Get Free Devnet USDC (2 min)

Option A: Using Phantom UI
```
1. Open Phantom wallet
2. Switch to Solana devnet
3. Open "USDC" token
4. Click "Request Airdrop" or use the faucet button
```

Option B: Using CLI
```bash
chmod +x scripts/get-devnet-usdc.sh
./scripts/get-devnet-usdc.sh <your-phantom-wallet-address>
```

For example:
```bash
./scripts/get-devnet-usdc.sh 9B5X4sPe2rTBCXZmKwRZ8E7PqD6L8V5H3U2C1A0B
```

### Step 5: Send a Test Remittance (1 min)

1. Go to `/send`
2. Enter recipient wallet address (or test: `9B5X4sPe2rTBCXZmKwRZ8E7PqD6L8V5H3U2C1A0B`)
3. Enter amount in USDC (e.g., 5)
4. Click "Send Money"
5. Get remittance ID and QR code

### Step 6: Claim Remittance (1 min)

1. Go to `/claim`
2. Connect as recipient (new wallet or same)
3. Paste remittance ID from step 5
4. Click "Claim USDC"
5. Money is claimed!

### Step 7: Track on Blockchain (30 sec)

1. Go to `/track`
2. Enter remittance ID
3. See full status on Solana explorer
4. View at: `https://explorer.solana.com/tx/...?cluster=devnet`

## 🔧 Smart Contract Setup (Optional)

### Deploy to Devnet (5 minutes)

Only do this if you want to deploy your own smart contract.

```bash
# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor avm
avm install latest
avm use latest

# Deploy
chmod +x scripts/deploy-devnet.sh
./scripts/deploy-devnet.sh
```

This will:
1. Build the Anchor program
2. Deploy to devnet (FREE)
3. Output your program ID

**Update `Anchor.toml` and `.env.local` with your program ID**

### Test Contract

```bash
anchor test
```

## 📱 API Reference

### Frontend Components

#### Send Remittance
```typescript
import { createRemittance } from '@/lib/solana-devnet'

const txHash = await createRemittance(
  wallet,
  'recipient_wallet_or_phone',
  50.00  // USDC amount
)
```

#### Claim Remittance
```typescript
import { claimRemittance } from '@/lib/solana-devnet'

const txHash = await claimRemittance(wallet, remittanceId)
```

#### Track Status
```typescript
import { getRemittanceStatus, trackRemittance } from '@/lib/solana-devnet'

const status = await getRemittanceStatus(remittanceId)
const explorerLink = await trackRemittance(remittanceId)
```

#### Fiat On-Ramp (Mock)
```typescript
import { processFiatOnRamp } from '@/lib/jazzcash-mock'

const result = await processFiatOnRamp(
  '03001234567',    // Phone number
  13850             // PKR amount
)
// Returns: { success: true, usdcReceived: 50, ... }
```

### Smart Contract Functions

#### Create Remittance
```rust
pub fn create_remittance(
    ctx: Context<CreateRemittance>,
    recipient_address: String,
    amount_usdc: u64,
) -> Result<()>
```
- Transfers USDC from sender to PDA vault
- Auto-calculates 1% fee
- Creates Remittance account with Pending status

#### Claim Remittance
```rust
pub fn claim_remittance(
    ctx: Context<ClaimRemittance>,
    remittance_id: u64,
) -> Result<()>
```
- Transfers USDC from vault to recipient
- Changes status to Claimed
- Only works if status is Pending

#### Cancel Remittance
```rust
pub fn cancel_remittance(
    ctx: Context<CancelRemittance>,
) -> Result<()>
```
- Refunds sender (USDC + 1% fee)
- Changes status to Cancelled
- Only sender can cancel

## 💰 Costs Breakdown

| Item | Cost | Notes |
|------|------|-------|
| Solana devnet txns | $0 | Unlimited free |
| Frontend hosting | $0 | Vercel FREE tier |
| Smart contract deploy | $0 | Devnet only |
| Domain | $0 | .vercel.app is free |
| RPC calls | $0 | Public devnet RPC |
| **TOTAL** | **$0** | **100% FREE** |

**Note**: If you deploy to Solana mainnet, transaction costs ~$0.00025 per tx. RemitX does NOT deploy to mainnet.

## 🌐 Deployment

### Deploy to Vercel (3 clicks)

```bash
npm run build
vercel deploy --prod
```

Or:
1. Push to GitHub
2. Go to vercel.com
3. Import GitHub repo
4. Deploy (automatic)

**Your app will be live at**: `https://remitx.vercel.app` (or your custom domain)

## 📈 Pakistan Use Case

RemitX is designed for cross-border remittance from Pakistan:

**Background Stats:**
- Pakistan receives **$30 billion/year** in remittances
- Average fee: **6-8%** (World Bank data)
- Typical corridors: PK → UAE, US, UK, Saudi Arabia

**RemitX Advantage:**
- **0% Platform Fee** (only 1% contract fee for validators)
- **No intermediaries** - direct blockchain settlement
- **Instant delivery** - seconds vs hours/days
- **No KYC** - Phantom wallet is enough
- **Transparent** - all txns on blockchain

### Pakistani Integration (Future)
- JazzCash API integration (replace mock)
- Easypaisa on-ramp
- Urdu UI translation
- PKR ↔ USDC auto-conversion

## 🎓 Learning Resources

### Smart Contract (Anchor/Rust)
- [Anchor Docs](https://book.anchor-lang.com)
- [Solana Dev Docs](https://docs.solana.com)
- [Anchor Examples](https://github.com/coral-xyz/anchor/tree/master/examples)

### Frontend (Next.js)
- [Next.js Docs](https://nextjs.org/docs)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Web3.js Docs](https://docs.solana.com/de/developing/clients/javascript)

### Blockchain
- [Solana Devnet Faucet](https://faucet.solana.com)
- [Solana Explorer](https://explorer.solana.com/?cluster=devnet)
- [Phantom Wallet Docs](https://docs.phantom.app)

## 🚀 Next Steps (Add to MVP)

- [ ] Real JazzCash API integration
- [ ] Multi-signature security
- [ ] Dispute resolution system
- [ ] User profiles & history
- [ ] Mobile PWA optimization
- [ ] SMS notifications
- [ ] In-app KYC (optional)
- [ ] Mainnet deployment
- [ ] Multi-chain support (Polygon, etc)

## 🤝 Contributing

Feel free to fork, modify, and deploy! This is 100% open source and free.

## ⚖️ Disclaimer

- **DEVNET ONLY** - This MVP uses Solana devnet, not mainnet. USDC is fake.
- **NO PRODUCTION USE** - Don't store real money without security audits.
- **TEST ONLY** - For demos, hackathons, and learning only.
- **NO WARRANTY** - Use at your own risk.

## 📞 Support

- GitHub Issues: [Create an issue](https://github.com/yourusername/remitx/issues)
- Solana Discord: [Join](https://discord.gg/solana)
- Anchor Discord: [Join](https://discord.gg/anchor)

## 📄 License

MIT License - Feel free to use, modify, and deploy!

---

**Built with ❤️ for the Solana community. 100% FREE. Zero compromise.**

---

## Appendix: Commands Cheat Sheet

```bash
# Local Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Lint code

# Smart Contract (Anchor)
anchor build             # Build program
anchor deploy --provider.cluster devnet  # Deploy to devnet
anchor test              # Run tests

# Scripts
chmod +x scripts/deploy-devnet.sh
./scripts/deploy-devnet.sh        # Deploy contract
./scripts/get-devnet-usdc.sh <wallet-address>  # Get free USDC

# Devnet Tools
solana balance           # Check SOL balance
solana airdrop 2 <wallet>  # Get 2 SOL airdrop
solana config set --url devnet  # Switch to devnet

# Deployment
vercel deploy --prod     # Deploy to Vercel
```

---

**Last Updated:** April 2026  
**Status:** ✅ Production Ready for Devnet  
**Cost:** 💸 $0 (100% FREE)
"# RemitX" 
