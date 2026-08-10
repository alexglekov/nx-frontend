import {
  WSS_PROVIDER_URL,
  VITE_HTTP_PROVIDER,
  STAND,
  VITE_ETH_HTTP_PROVIDER
} from 'app/constants'
import { createClient, defineChain } from 'viem'
import { http, createConfig, webSocket } from 'wagmi'
import {
  arbitrumSepolia,
  bsc,
  bscTestnet,
  mainnet,
  sepolia
} from 'wagmi/chains'
import { Stand } from './types'

export const httpProvider = VITE_HTTP_PROVIDER || 'https://arbitrum.drpc.org'
export const EthHttpProvider =
  VITE_ETH_HTTP_PROVIDER || 'https://rpc.ankr.com/eth'
export const arbitrumOne = defineChain({
  id: 42_161,
  name: 'Arbitrum One',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [httpProvider]
    }
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
      apiUrl: 'https://api.arbiscan.io/api'
    }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7654707
    }
  }
})

export const APP_CHAIN = STAND === Stand.mainnet ? arbitrumOne : arbitrumSepolia

export const wagmiConfig = createConfig({
  chains: [APP_CHAIN, mainnet, sepolia],
  transports: {
    [arbitrumSepolia.id]: http(httpProvider),
    [arbitrumOne.id]: http(httpProvider),
    [mainnet.id]: http(EthHttpProvider),
    [sepolia.id]: http(EthHttpProvider),
    [bsc.id]: http(),
    [bscTestnet.id]: http()
  }
})

export const wagmiWsConfig = createConfig({
  chains: [APP_CHAIN],
  client: ({ chain }) =>
    createClient({ chain, transport: webSocket(WSS_PROVIDER_URL) })
})
