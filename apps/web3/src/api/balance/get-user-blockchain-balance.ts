import { gql } from '@apollo/client'

export const GET_USER_BLOCKCHAIN_BALANCE = gql(`
  query getUserBlockchainBalance {
    getUserBlockchainBalance {
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
