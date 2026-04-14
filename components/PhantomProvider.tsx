'use client';

import { PhantomProvider, darkTheme, AddressType } from "@phantom/react-sdk";

export default function PhantomProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PhantomProvider
      config={{
        providers: ["google", "apple", "injected"],
        appId: "a23f9e8b-fd48-47e8-aef1-bedf92ba8c87",
        addressTypes: [
          AddressType.ethereum,
          AddressType.solana,
          AddressType.bitcoinSegwit,
          AddressType.sui,
        ],
        authOptions: {
          redirectUrl: "RemitX://auth/callback",
        },
      }}
      theme={darkTheme}
      appIcon=""
      appName="RemitX"
    >
      {children}
    </PhantomProvider>
  );
}