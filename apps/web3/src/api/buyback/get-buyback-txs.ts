import { gql } from '__generated__'

export const GET_BUYBACK_TXS = gql(`
  query getBuybackTxs {
    getBuybackTxs {
      buybackTxs {
        txhash
        usdt
        xyro
        price
        timestamp
      }
    }
  }
`)
