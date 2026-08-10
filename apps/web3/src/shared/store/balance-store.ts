import { makeVar } from '@apollo/client'
import { UserBlockchainBalance } from '__generated__/graphql'
import { zeroAddress } from 'viem'

const initialUserBlockChainBalance: UserBlockchainBalance = {
  treasuryAllowance: 0,
  treasuryDeposit: 0,
  usdtBalance: 0,
  xyroBalance: 0,
  xyroAllowance: 0,
  xyroDeposit: 0,
  walletAddress: zeroAddress
}

export const balanceVar = makeVar<UserBlockchainBalance>(
  initialUserBlockChainBalance
)
