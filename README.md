# HumanWallet + Wagmi Integration Guide

A comprehensive guide for implementing HumanWallet's passkey-based Web3 connector with Wagmi for seamless, secure, and user-friendly blockchain interactions.

## 🚀 Overview

HumanWallet provides a revolutionary Web3 connector that eliminates the need for traditional seed phrases by leveraging **WebAuthn passkeys**. This integration with Wagmi enables:

- **🔐 Passwordless Authentication**: Use biometrics or device PINs instead of seed phrases
- **⚡ Account Abstraction**: Smart contract wallets with gasless transactions
- **🌐 Multi-Chain Support**: Works across Ethereum, Polygon, and other EVM chains  
- **📱 Cross-Device Sync**: Passkeys sync across your devices via iCloud/Google
- **🛡️ Enhanced Security**: Private keys never leave secure hardware

## 📦 Installation

### 1. Install Dependencies

```bash
npm install @humanwallet/connector wagmi viem @tanstack/react-query
```

### 2. Install Node Polyfills (for Vite projects)

```bash
npm install --save-dev vite-plugin-node-polyfills
```

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_HW_PROJECT_ID=your_project_id_here
```

> **Getting a Project ID**: Contact HumanWallet to obtain your project ID for production use.

### 2. Vite Configuration

Update your `vite.config.ts` to include node polyfills:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()
  ],
  // ... other config
})
```

### 3. Wagmi Configuration

Create your Wagmi config with HumanWallet connector:

```typescript
// wagmi/config.ts
import { createConfig, http } from "wagmi"
import { mainnet, sepolia, polygon } from "wagmi/chains"
import { humanWalletConnector } from "@humanwallet/connector"

const PROJECT_ID = import.meta.env.VITE_HW_PROJECT_ID

export const config = createConfig({
  chains: [sepolia, mainnet, polygon],
  connectors: [
    humanWalletConnector({
      projectId: PROJECT_ID,
      appName: "My Web3 App",
      passkeyName: "My Wallet", // Default passkey name
      logging: {
        developerMode: true, // Enable for development
      },
    }),
  ],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
```

### 4. Provider Setup

Wrap your app with Wagmi and React Query providers:

```typescript
// wagmi/provider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config } from "./config"

const queryClient = new QueryClient()

export function WagmiProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

```typescript
// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProviders } from './wagmi/provider'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProviders>
      <App />
    </WagmiProviders>
  </React.StrictMode>,
)
```

## 🔌 Basic Usage

### Connection Component

```typescript
import { useConnect } from "wagmi"
import type { Connector } from "wagmi"

export function ConnectWallet() {
  const { connectors, connect, isPending } = useConnect()

  const handleConnect = (connector: Connector) => {
    connect({ connector }, {
      onError: (error) => {
        console.error("Connection failed:", error)
      }
    })
  }

  const handleCreateNew = (connector: Connector) => {
    // Force create new wallet with native prompt
    ;(connect as (args: { connector: Connector; forceCreate?: boolean }) => void)({
      connector,
      forceCreate: true,
    })
  }

  return (
    <div>
      {connectors.map((connector) => (
        <div key={connector.uid}>
          {connector.name === "HumanWallet" && (
            <>
              <button
                onClick={() => handleConnect(connector)}
                disabled={isPending}
              >
                Connect with HumanWallet
              </button>
              
              <button
                onClick={() => handleCreateNew(connector)}
                disabled={isPending}
              >
                Create New Wallet
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
```

### Account Information

```typescript
import { useAccount, useBalance, useDisconnect } from "wagmi"

export function AccountInfo() {
  const { address, chain, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { disconnect } = useDisconnect()

  if (!isConnected) return <ConnectWallet />

  return (
    <div>
      <p>Address: {address}</p>
      <p>Chain: {chain?.name}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
```

## 🌐 Multi-Chain Support

### Chain Switching

```typescript
import { useSwitchChain, useChains } from "wagmi"

export function ChainSwitcher() {
  const chains = useChains()
  const { switchChain, isPending } = useSwitchChain()

  return (
    <div>
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
          disabled={isPending}
        >
          Switch to {chain.name}
        </button>
      ))}
    </div>
  )
}
```

### Cross-Chain Balance Display

```typescript
import { useBalance, useChains } from "wagmi"

export function MultiChainBalances({ address }: { address: `0x${string}` }) {
  const chains = useChains()

  return (
    <div>
      {chains.map((chain) => {
        const { data: balance } = useBalance({
          address,
          chainId: chain.id,
        })
        
        return (
          <div key={chain.id}>
            <p>{chain.name}: {balance?.formatted} {balance?.symbol}</p>
          </div>
        )
      })}
    </div>
  )
}
```

## ✍️ Message Signing

### Passkey Authentication

```typescript
import { useSignMessage } from "wagmi"
import { useState } from "react"

export function MessageSigner() {
  const [message, setMessage] = useState("I authorize this action")
  const [signature, setSignature] = useState<string | null>(null)
  const { signMessage, isPending, error } = useSignMessage()

  const handleSign = () => {
    signMessage(
      { message },
      {
        onSuccess: (sig) => setSignature(sig),
        onError: (err) => console.error("Signing failed:", err),
      }
    )
  }

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to sign..."
      />
      
      <button onClick={handleSign} disabled={isPending}>
        {isPending ? "Authenticating..." : "Sign with Passkey"}
      </button>

      {signature && (
        <div>
          <h3>Signature:</h3>
          <code>{signature}</code>
        </div>
      )}

      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
```

## 💸 Transaction Handling

### Simple Transaction

```typescript
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"

export function SendTransaction() {
  const { data: hash, sendTransaction, isPending } = useSendTransaction()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSend = () => {
    sendTransaction(
      {
        to: "0x...", // recipient address
        value: parseEther("0.01"), // 0.01 ETH
      },
      {
        onSuccess: (hash) => console.log("Transaction sent:", hash),
        onError: (error) => console.error("Transaction failed:", error),
      }
    )
  }

  return (
    <div>
      <button onClick={handleSend} disabled={isPending}>
        {isPending ? "Confirming..." : "Send 0.01 ETH"}
      </button>
      
      {isConfirming && <p>Waiting for confirmation...</p>}
      {isSuccess && <p>Transaction successful!</p>}
      {hash && <p>Hash: {hash}</p>}
    </div>
  )
}
```

### Contract Interaction

```typescript
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseUnits } from "viem"

const ERC20_ABI = [
  {
    name: "transfer",
    type: "function",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const

export function TokenTransfer() {
  const { data: hash, writeContract, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleTransfer = () => {
    writeContract(
      {
        address: "0x...", // token contract address
        abi: ERC20_ABI,
        functionName: "transfer",
        args: ["0x...", parseUnits("100", 18)], // recipient, amount
      },
      {
        onSuccess: (hash) => console.log("Transfer initiated:", hash),
        onError: (error) => console.error("Transfer failed:", error),
      }
    )
  }

  return (
    <div>
      <button onClick={handleTransfer} disabled={isPending}>
        {isPending ? "Confirming..." : "Transfer Tokens"}
      </button>
      
      {isConfirming && <p>Transaction pending...</p>}
      {isSuccess && <p>Transfer successful!</p>}
    </div>
  )
}
```

## 🔧 Advanced Features

### Account Switching

```typescript
import { useSwitchAccount } from "wagmi"

export function AccountSwitcher() {
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => switchAccount({ connector })}
        >
          Switch to {connector.name}
        </button>
      ))}
    </div>
  )
}
```

### Custom Hooks

```typescript
// hooks/useHumanWallet.ts
import { useAccount, useConnect } from "wagmi"

export function useHumanWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  
  const humanWalletConnector = connectors.find(
    (connector) => connector.name === "HumanWallet"
  )

  const connectHumanWallet = () => {
    if (humanWalletConnector) {
      connect({ connector: humanWalletConnector }, {
        onError: (error) => console.error("Connection failed:", error)
      })
    }
  }

  const createNewWallet = () => {
    if (humanWalletConnector) {
      ;(connect as any)({
        connector: humanWalletConnector,
        forceCreate: true,
      })
    }
  }

  return {
    address,
    isConnected,
    connectHumanWallet,
    createNewWallet,
    isHumanWalletAvailable: !!humanWalletConnector,
  }
}
```

## 🎨 UI Components

### Connection Status Component

```typescript
import { useAccount, useDisconnect } from "wagmi"

export function ConnectionStatus() {
  const { address, chain, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        Not Connected
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-sm font-medium">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
      
      {chain && (
        <span className="px-2 py-1 text-xs bg-muted rounded">
          {chain.name}
        </span>
      )}
      
      <button
        onClick={() => disconnect()}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        Disconnect
      </button>
    </div>
  )
}
```

## 🚨 Error Handling

### Connection Error Handling

```typescript
import { useConnect } from "wagmi"

export function ConnectWithErrorHandling() {
  const { connect, error, isPending } = useConnect()

  const handleConnect = (connector: any) => {
    connect({ connector }, {
      onError: (error) => {
        console.error("Connection failed:", error)
        // Handle specific error types
        if (error.message.includes("User rejected")) {
          console.log("User cancelled the passkey authentication")
        }
      }
    })
  }

  return (
    <div>
      {/* Connection UI */}
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-medium text-red-800">Connection Failed</h3>
          <p className="text-sm text-red-600">{error.message}</p>
          
          {error.message.includes("User rejected") && (
            <p className="text-xs text-red-500 mt-1">
              Please complete the passkey authentication to connect.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
```

## 📱 Best Practices

### 1. **User Experience**
- Always provide clear feedback during passkey authentication
- Handle connection errors gracefully with helpful messages
- Show loading states during transaction confirmation

### 2. **Security**
- Never store or log private keys or sensitive data
- Validate all user inputs before transactions
- Use proper error boundaries in React components

### 3. **Performance**
- Use React Query's caching for balance and chain data
- Implement proper loading states for better UX
- Debounce frequent operations like balance updates

### 4. **Development**
- Enable developer mode during development
- Test on multiple devices and browsers
- Use TypeScript for better type safety

## 🔍 Troubleshooting

### Common Issues

**1. "Cannot find package 'globals'" Error**
```bash
npm install globals @eslint/js typescript-eslint
```

**2. Passkey Not Working in Development**
- Ensure you're using HTTPS (even in dev)
- Check browser compatibility (Chrome 67+, Safari 14+, Firefox 60+)
- Verify WebAuthn is enabled in browser settings

**3. Transaction Failures**
- Check network connection and RPC endpoints
- Verify sufficient balance for gas fees
- Ensure correct contract addresses and ABIs

**4. Chain Switching Issues**
- Add network to wallet if not supported
- Check if chain is configured in Wagmi config
- Verify RPC endpoints are working

## 📚 Examples

This repository includes complete examples:

- **Basic Connection**: Simple wallet connection and disconnection
- **Multi-Chain**: Cross-chain balance display and switching
- **Message Signing**: Passkey-based message authentication
- **Token Staking**: Complex DeFi interactions with bundled transactions

## 🤝 Support

For issues and questions:
- Check the [HumanWallet Documentation](https://docs.humanwallet.io)
- Review [Wagmi Documentation](https://wagmi.sh)
- Open an issue in this repository

## 📄 License

MIT License - see LICENSE file for details.
