import { createConfig, http } from "wagmi"
import { mainnet, sepolia, polygon } from "wagmi/chains"
import { humanWalletConnector } from "@humanwallet/connector"

const PROJECT_ID = import.meta.env.VITE_HW_PROJECT_ID

export const config = createConfig({
  chains: [sepolia, mainnet, polygon], // Sepolia as default, Polygon Amoy as alternative
  connectors: [
    humanWalletConnector({
      projectId: PROJECT_ID,
      logging: {
        developerMode: true,
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
