'use client';

import { useModal, usePhantom, useDisconnect, AddressType } from "@phantom/react-sdk";
import { Button } from "@/components/ui/button";

export default function ConnectWallet() {
  const { open } = useModal();
  const { isConnected, addresses } = usePhantom();
  const { disconnect } = useDisconnect();

  if (isConnected && addresses && addresses.length > 0) {
    const solanaAddress = addresses.find(a => a.addressType === AddressType.solana)?.address;
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-foreground">
          Connected: {solanaAddress?.slice(0, 6)}...{solanaAddress?.slice(-4)}
        </div>
        <Button onClick={disconnect} variant="destructive" size="sm">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={open} 
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      Connect Phantom Wallet
    </Button>
  );
}