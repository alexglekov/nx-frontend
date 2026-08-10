import { gql } from '@apollo/client'

export const GET_USER_BULLS_EYE_BETS = gql(`
  query getUserBullseyePredicts($data: UserBullseyePredictsInput!){
    getUserBullseyePredicts(data: $data) {
      skip
      take
      total
      predicts {
        id
        gameId
        gameType
        ownerId
        status
        amount
        createdAt
        outcome
        pnl
        updatedAt
        price
        place
        isExact
        game {
          endPrice
          contractAddress
          pool {
            predictsCount
          }
        }
      }
    }
  }
`)
