import { gql } from '@apollo/client'

export const GET_USER_UP_DOWN_BETS = gql(`
  query getUserUpDownPredicts($data: UserUpDownPredictsInput!) {
    getUserUpDownPredicts(data: $data) {
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
        winStreakLength
        updatedAt
        isLong
        game {
          startPrice
          endPrice
          commission
          contractAddress
          upPool {
            predictsCount
            poolAmount
          }
          downPool {
            predictsCount
            poolAmount
          }
        }
      }
    }
  }
`)
