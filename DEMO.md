# RemitX 30-Second Demo Script

## Setup (Before Demo)
- Open RemitX on phone/laptop
- Have 2 browser windows open: one as Sender, one as Recipient
- Both connected to devnet with Phantom wallets
- Both have free devnet USDC (~50 USDC each)

## Demo Flow (30 seconds)

### Slide 1: Title (5 sec)
**"RemitX - Cross-Border Remittance on Solana Devnet"**
- Show home page
- Highlight: "0% Platform Fee", "Instant Settlement", "100% FREE"

### Slide 2: Send (8 sec)
1. Click "Send Money" button
2. Enter recipient wallet: `9B5X4sPe2rTBCXZmKwRZ8E7PqD6L8V5H3U2C1A0B`
3. Enter amount: `10 USDC`
4. Show fee calculation: "1% fee = 0.10 USDC"
5. Click "Send Money"
6. Show success: "Remittance Sent!" with TX hash
7. Show QR code

**NARRATION**: "Just enter the recipient's wallet address and amount. RemitX generates a unique ID and QR code. That's it!"

### Slide 3: Track (7 sec)
1. Go to `/track`
2. Paste remittance ID
3. Click "Track"
4. Show status: "Pending"
5. Click "View on Solana Explorer"
6. Show blockchain explorer with real transaction

**NARRATION**: "Track your remittance in real-time on the Solana blockchain. Complete transparency. No hidden charges."

### Slide 4: Claim (7 sec)
1. Switch to recipient wallet (new browser tab)
2. Go to `/claim`
3. Paste same remittance ID
4. Click "Claim USDC"
5. Show success: "Remittance Claimed!"
6. Show status changed to "Claimed"

**NARRATION**: "Recipient claims their money in one click. Settled instantly on the blockchain. No bank, no intermediaries, no fees!"

### Slide 5: Impact Slide (3 sec)
**"Why RemitX?"**
- ✅ 0% Platform Fee
- ✅ Instant Settlement (~1 second)
- ✅ 100% FREE to build & deploy
- ✅ No KYC, No Credit Card
- ✅ For 30M+ Pakistani diaspora

---

## Recording Tips

### Free Tools for Recording

**Option 1: OBS Studio (Recommended)**
```bash
# Install OBS
# Windows/Mac: Download from obsproject.com
# Linux: sudo apt install obs-studio

# Record Settings:
# - Resolution: 1920x1080 (or 1280x720)
# - Bitrate: 5000 Kbps
# - Framerate: 30 fps
# - Audio: System + Microphone
```

**Option 2: ScreenFlow (Mac)
**
- Built-in screen recording
- File → New Screen Recording

**Option 3: Windows 10/11 Game Bar**
- Press `Win + G`
- Click "Record"

**Option 4: Loom (Online, FREE)**
- loom.com
- No installation needed
- Auto-uploads to cloud

### Screen Recording Checklist
- [ ] Close all notifications/messages
- [ ] Set to fullscreen or mobile view
- [ ] Test audio levels
- [ ] Have demo wallets ready with USDC
- [ ] Do a dry run first
- [ ] Record at 1080p minimum
- [ ] Keep it exactly 30 seconds or under

### Narration Script (Practice beforehand)
```
"Remittance costs Pakistanis 6 to 8 percent in fees. That's $2 billion wasted annually.

RemitX is FREE. Send USDC directly to anyone on Solana devnet in seconds.

[Send demo]

Track your money on the blockchain in real-time.

[Track demo]

Recipient claims their funds instantly.

[Claim demo]

No bank. No fees. No borders. Just blockchain.

RemitX. The future of remittance. Built 100% free."
```

---

## Pitch Deck Structure (10 Slides)

### Slide 1: Title Slide
- RemitX Logo
- "Cross-Border Remittance on Solana Devnet"
- Subtitle: "Zero fees. Instant settlement. Built 100% FREE."

### Slide 2: Problem
- Stat: "Pakistan receives $30B in remittances annually"
- Stat: "Average fee: 6-8% ($2B lost to fees)"
- Stat: "Settlement: 1-3 days"
- Problem: Too slow, too expensive, inefficient

### Slide 3: Solution
- RemitX: Instant settlement on blockchain
- Zero platform fees
- Complete transparency
- No intermediaries

### Slide 4: How It Works (3 steps)
1. Sender → Enters recipient wallet & amount
2. Smart contract → Holds funds in secure vault
3. Recipient → Claims funds in seconds

### Slide 5: Tech Stack
- Frontend: Next.js + React
- Smart Contract: Anchor + Rust
- Blockchain: Solana Devnet
- Wallet: Phantom (FREE)
- Hosting: Vercel (FREE)

### Slide 6: MVP Features
- ✅ Send remittances to wallets/phone numbers
- ✅ Real Solana smart contract
- ✅ QR code generation
- ✅ JazzCash mock integration
- ✅ Blockchain explorer tracking

### Slide 7: Costs
- Table showing: Solana devnet ($0), Vercel ($0), RPC ($0)
- **Total: $0**
- Vs. Traditional: $15-50k for fintech MVP

### Slide 8: Market Opportunity
- Pakistani diaspora: 7+ million
- Remittance corridors: UAE, US, UK, Saudi, Canada
- TAM: $30B/year market
- RemitX capture: 1% = $300M revenue potential

### Slide 9: Roadmap
- ✅ Devnet MVP (Done)
- 🔄 Real JazzCash API (Q2)
- 🔄 Mainnet deployment (Q3)
- 🔄 Mobile PWA (Q3)
- 🔄 Multi-chain (Q4)

### Slide 10: Ask
- "Building the future of remittance on Solana"
- Call to action: "Try the demo at remitx.vercel.app"
- Contact: your@email.com | twitter.com/yourhandle

---

## Pitch Deck Tools (All FREE)

- **Canva**: canva.com (FREE templates)
- **Google Slides**: docs.google.com
- **Gamma**: gamma.app (AI-powered)
- **Slides**: slides.com

---

## Demo Troubleshooting

### Problem: Wallet not connecting
**Solution**: 
1. Refresh page
2. Check Phantom wallet is set to Devnet
3. Re-connect wallet

### Problem: "Insufficient USDC"
**Solution**:
1. Get free devnet USDC from faucet
2. Use the `/scripts/get-devnet-usdc.sh` script

### Problem: Remittance shows as "Pending" forever
**Solution**:
- This is expected for mock devnet
- Click "Claim" to change status
- Or wait 5-10 seconds and refresh

### Problem: "Transaction Failed" error
**Solution**:
1. Check wallet has SOL (for gas)
2. Check RPC endpoint is not rate-limited
3. Refresh and try again

---

## Social Media Copy (For Sharing)

### Twitter
```
🚀 Just launched RemitX - Cross-border remittance on Solana devnet

✅ Send USDC in seconds
✅ Zero platform fees  
✅ 100% FREE to build
✅ No KYC required

Built with Next.js + Anchor + devnet 

Try the demo: [link]

#Solana #Blockchain #Fintech #Pakistan
```

### LinkedIn
```
Excited to announce RemitX, a proof-of-concept for reimagining cross-border remittance using blockchain.

RemitX enables:
• Instant settlement on Solana
• Zero platform fees
• Complete transparency
• No intermediaries

Built 100% free with public tools and services.

This MVP demonstrates how blockchain can solve real problems in fintech - specifically the $2B annually wasted on remittance fees.

Tech: Next.js, Anchor, Solana Devnet, Phantom

Try it: [link]
```

### Telegram/Discord
```
🎉 RemitX is live!

The first FREE, open-source cross-border remittance app on Solana devnet

⚡ Send money in seconds
💰 Zero fees
🔗 Transparent & decentralized
🌍 Built for Pakistan & diaspora

Try: [link]

Code: [github]
```

---

## For Hackathons/Competitions

### Submission Checklist
- [ ] Code on GitHub (public)
- [ ] Live demo at vercel.app URL
- [ ] README with setup instructions
- [ ] 30-second demo video
- [ ] Pitch deck (PDF)
- [ ] Smart contract deployed to devnet (screenshot)
- [ ] License (MIT)

### Where to Submit
- Solana Hackathon: solana.com/hackathon
- Anchor Hackathon: anchor-lang.com
- Devpost: devpost.com
- ETHGlobal: ethglobal.com (multi-chain track)

---

**Good luck with your demo! 🚀**
