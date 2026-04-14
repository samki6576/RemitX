'use client';

import { useModal, usePhantom } from "@phantom/react-sdk";

export default function ConnectWallet() {
  const { open } = useModal();
  const { isConnected, user, disconnect } = usePhantom();

  if (isConnected && user) {
    const solanaAddress = user.wallets.solana?.address;
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          Connected: {solanaAddress?.slice(0, 6)}...{solanaAddress?.slice(-4)}
        </div>
        <button onClick={disconnect} className="px-4 py-2 bg-red-500 text-white rounded">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button onClick={open} className="px-6 py-3 bg-purple-600 text-white rounded-lg">
      Connect Phantom Wallet
    </button>
  );
}