/* eslint-disable complexity, max-lines, max-statements */
import { writeContract } from '@wagmi/core'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { wagmiConfig } from 'app/wagmi-config'
import { USDT_DECIMALS } from 'contracts/constants'
import { WALLET_CONNECT_PROJECT_ID } from 'features/auth/constants'
import { handleCatchAction } from 'shared/utils/handle-catch-action'
import { parseUnits, encodeFunctionData } from 'viem'
import { useAccount, useWalletClient, useConnect } from 'wagmi'
import { arbitrumSepolia, mainnet, sepolia } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

// ERC20 ABI for token transfers
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
] as const

// TRC20 ABI for Tron transfers
const TRC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
] as const

// Token contract addresses for mainnet and testnet
const TOKEN_ADDRESSES = {
  USDT_ERC20: {
    mainnet: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Mainnet USDT ERC20
    testnet: '0xdB200e0Ccdb4d2C0881E7dF24F7dAc935F6B7669' // Sepolia USDT
  },
  USDT_TRC20: {
    mainnet: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // TRON USDT
    testnet: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // TRON testnet USDT
  },
  ETH: '0x0000000000000000000000000000000000000000' // Native ETH
} as const

// Network configurations
const NETWORKS = {
  ethereum: {
    mainnet: mainnet,
    testnet: sepolia
  },
  arbitrum: {
    mainnet: {
      id: 42_161,
      name: 'Arbitrum One',
      network: 'arbitrum',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: { http: ['https://arbitrum.drpc.org'] }
      }
    },
    testnet: arbitrumSepolia
  },
  bitcoin: {
    mainnet: {
      network: 'bitcoin',
      chainId: 0
    },
    testnet: {
      network: 'bitcoin-testnet',
      chainId: 1
    }
  },
  tron: {
    mainnet: {
      network: 'tron',
      chainId: 1,
      rpcUrls: {
        default: { http: ['https://api.trongrid.io'] }
      }
    },
    testnet: {
      network: 'tron-testnet',
      chainId: 5,
      rpcUrls: {
        default: { http: ['https://api.shasta.trongrid.io'] }
      }
    }
  }
} as const

interface TransferParams {
  to: `0x${string}` | string // string for BTC addresses
  amount: string
  currency: 'USDTE' | 'USDTT' | 'ETH' | 'BTC'
  network?: 'ethereum' | 'tron' | 'bitcoin'
}

export const useCryptoTransfer = () => {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { connectAsync } = useConnect()

  const isMainnet = STAND === Stand.mainnet

  const autoConnectWallet = async () => {
    if (!address) {
      const connector = walletConnect({
        projectId: WALLET_CONNECT_PROJECT_ID
      })

      await connectAsync({ connector })
    }
  }

  const getTokenAddress = (currency: string) => {
    if (currency === 'USDTE') {
      return isMainnet ?
          TOKEN_ADDRESSES.USDT_ERC20.mainnet
        : TOKEN_ADDRESSES.USDT_ERC20.testnet
    }
    if (currency === 'USDTT') {
      return isMainnet ?
          TOKEN_ADDRESSES.USDT_TRC20.mainnet
        : TOKEN_ADDRESSES.USDT_TRC20.testnet
    }
    return TOKEN_ADDRESSES.ETH
  }

  const initiatePayment = async ({ to, amount, currency }: TransferParams) => {
    try {
      await autoConnectWallet()

      if (!walletClient || !address) {
        throw new Error('Wallet not connected')
      }

      switch (currency) {
        case 'ETH': {
          const parsedAmount = parseUnits(amount, 18)
          const hash = await walletClient.sendTransaction({
            to: to as `0x${string}`,
            value: parsedAmount,
            data: '0x'
          })
          return hash
        }

        case 'USDTE': {
          const tokenAddress = getTokenAddress(currency)
          const parsedAmount = parseUnits(amount, USDT_DECIMALS)
          const hash = await writeContract(wagmiConfig, {
            address: tokenAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [to, parsedAmount]
          })
          return hash
        }

        case 'USDTT': {
          const connector = walletConnect({
            projectId: WALLET_CONNECT_PROJECT_ID
          })

          await connectAsync({ connector })

          const provider = window.ethereum
          if (!provider) {
            throw new Error('No provider found')
          }

          const tokenAddress = getTokenAddress(currency)
          const parsedAmount = Math.floor(parseFloat(amount) * 1e6)

          const functionData = encodeFunctionData({
            abi: TRC20_ABI,
            functionName: 'transfer',
            args: [to, parsedAmount]
          })

          const result = await provider.request({
            method: 'tron_sendTransaction',
            params: [
              {
                to: tokenAddress,
                data: functionData,
                value: '0x0'
              }
            ]
          })

          return result
        }

        case 'BTC': {
          const connector = walletConnect({
            projectId: WALLET_CONNECT_PROJECT_ID
          })

          await connectAsync({ connector })

          const provider = window.ethereum
          if (!provider) {
            throw new Error('No provider found')
          }

          const satoshis = Math.floor(parseFloat(amount) * 1e8)

          const result = await provider.request({
            method: 'btc_sendTransaction',
            params: [
              {
                to,
                value: satoshis.toString(),
                network:
                  isMainnet ?
                    NETWORKS.bitcoin.mainnet.network
                  : NETWORKS.bitcoin.testnet.network
              }
            ]
          })

          return result
        }

        default:
          throw new Error('Unsupported currency')
      }
    } catch (error) {
      handleCatchAction(error)
      throw error
    }
  }

  return {
    initiatePayment,
    isConnected: Boolean(address)
  }
}
