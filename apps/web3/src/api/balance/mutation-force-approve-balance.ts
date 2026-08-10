import { gql } from '__generated__'

export const MUTATION_FORCE_APPROVE_BALANCE = gql(`
  mutation forceUpdateUserBlockchainBalance {
    forceUpdateUserBlockchainBalance {
      walletAddress
      usdtBalance
      treasuryDeposit
      treasuryAllowance
    }
  }
`)
