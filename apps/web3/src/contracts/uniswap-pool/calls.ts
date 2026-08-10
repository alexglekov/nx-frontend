import { readContract as readContractWagmi } from '@wagmi/core'
import { wagmiConfig } from 'app/wagmi-config'
import { abi } from './abi'
import { POOL_ADDRESS } from './constants'

export const slot0 = () =>
  readContractWagmi(wagmiConfig, {
    address: POOL_ADDRESS,
    abi,
    functionName: 'slot0'
  })

export const liquidity = () =>
  readContractWagmi(wagmiConfig, {
    address: POOL_ADDRESS,
    abi,
    functionName: 'liquidity'
  })
