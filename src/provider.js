'use client'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {

  arbitrum,
  arbitrumGoerli,
  arbitrumNova,
  arbitrumSepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";



export const config = getDefaultConfig({
  appName: 'Beat',
  projectId: 'fa7b299471fa848b2dc52a5e1529ac37',
  chains: [ // x1Testnet,
    arbitrum,
    arbitrumGoerli,
    arbitrumNova,
    arbitrumSepolia
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const EthProvider = ({children}) => {
  return (
    <WagmiProvider  config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode={true}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};