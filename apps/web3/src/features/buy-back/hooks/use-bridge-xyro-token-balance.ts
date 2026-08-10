/* eslint-disable max-statements */
import { useEffect, useState } from 'react'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { arbitrumOne, EthHttpProvider, httpProvider } from 'app/wagmi-config'
import { createPublicClient, http } from 'viem'
import { arbitrumSepolia, mainnet, sepolia } from 'viem/chains'
import { useAccount } from 'wagmi'
import { BRIDGE_OPTIONS_MAP } from '../constants'

const TOKEN_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

const CHAIN_ARBITRUM = STAND === Stand.mainnet ? arbitrumOne : arbitrumSepolia
const CHAIN_ETH = STAND === Stand.mainnet ? mainnet : sepolia

// TODO: Move logic to BE, remove current logic once done
export const useBridgeXyroTokenBalance = () => {
  const { address } = useAccount()

  const [arbitrumTokenBalance, setArbitrumTokenBalace] = useState(0)
  const [ethereumTokenBalance, setEthereumTokenBalance] = useState(0)

  const [arbitrumTokenBalanceLoading, setArbitrumTokenBalanceLoading] =
    useState(false)
  const [ethereumTokenBalanceLoading, setEthereumTokenBalanceLoading] =
    useState(false)

  const publicClientArbitrum = createPublicClient({
    chain: CHAIN_ARBITRUM,
    transport: http(httpProvider)
  })

  const publicClientETH = createPublicClient({
    chain: CHAIN_ETH,
    transport: http(EthHttpProvider)
  })

  const getARBBalanceData = async () => {
    try {
      setArbitrumTokenBalanceLoading(true)

      const arbitrumBalanceData = await publicClientArbitrum.readContract({
        address: BRIDGE_OPTIONS_MAP.ARBITRUM.tokenAddress,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address]
      })

      if (!arbitrumBalanceData) return

      const value = normalizeBalanceValue(arbitrumBalanceData as bigint)

      setArbitrumTokenBalace(value)
    } catch (e) {
      console.error(e)
    } finally {
      setArbitrumTokenBalanceLoading(false)
    }
  }

  const getETHBalanceData = async () => {
    try {
      setEthereumTokenBalanceLoading(true)

      const ethBalanceData = await publicClientETH.readContract({
        address: BRIDGE_OPTIONS_MAP.ETH.tokenAddress,
        abi: TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address]
      })

      if (!ethBalanceData) return

      const value = normalizeBalanceValue(ethBalanceData as bigint)

      setEthereumTokenBalance(value)
    } catch (e) {
      console.error(e)
    } finally {
      setEthereumTokenBalanceLoading(false)
    }
  }

  useEffect(() => {
    getARBBalanceData()
    getETHBalanceData()
  }, [])

  return {
    arbitrumTokenBalance,
    ethereumTokenBalance,
    arbitrumBalanceLoading: arbitrumTokenBalanceLoading,
    ethBalanceLoading: ethereumTokenBalanceLoading
  }
}

const normalizeBalanceValue = (balanceValue: bigint) => {
  return Number((parseInt(String(balanceValue)) / 1e18).toFixed(6))
}
