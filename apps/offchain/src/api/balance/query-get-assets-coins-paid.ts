import { gql } from '__generated__'

export const QUERY_GET_ASSETS_COINS_PAID = gql(`
  query assetsCoinsPaid {
    assetsCoinsPaid {
      id
      name
      network
      ethlike
      minDeposit
      minWithdrawal
      convertRate
      convertTo
    }
  }
`)
