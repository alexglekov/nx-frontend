import { gql } from '@apollo/client'

export const SUBSCRIBE_USER_BLOCKCHAIN_BALANCE = gql(`
  subscription userBlockchainBalanceChanged {
    userBlockchainBalanceChanged {
      walletAddress
      usdtBalance
      treasuryDeposit
      treasuryAllowance
      treasuryOldDeposit
      xyroBalance
      xyroDeposit
      xyroAllowance
    }
  }
`)
