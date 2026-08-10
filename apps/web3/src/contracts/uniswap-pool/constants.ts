import { STAND } from 'app/constants'
import { Stand } from 'app/types'

export const POOL_ADDRESS_DEV = '0x59A62220F117557F59A5c39cA366F70873bE5e0A'

export const POOL_ADDRESS_MAINNET = '0xcD3439B962b3FCF9163d6cE9B498949d7Ed1eF14'

export const POOL_ADDRESS =
  STAND === Stand.mainnet ? POOL_ADDRESS_MAINNET : POOL_ADDRESS_DEV
