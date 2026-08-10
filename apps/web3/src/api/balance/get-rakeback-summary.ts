import { gql } from '__generated__'

export const GET_RAKEBACK_SUMMARY = gql(`
  query getRakebackSummary($userId: String!) {
    getRakebackSummary(userId: $userId) {
      bullseye {
        usdt
        xyro
      }
      updown {
        usdt
        xyro
      }
      setup {
        usdt
        xyro
      }
      race {
        usdt
        xyro
      }
      total {
        usdt
        xyro
      }
    }
  }
`)
