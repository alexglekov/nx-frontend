import { gql } from '@apollo/client'

export const SUBSCRIBE_UP_DOWN_STATE = gql`
  subscription upDownGameChanged($contractAddress: String!) {
    upDownGameChanged(contractAddress: $contractAddress) {
      id
      gameType
      feedId
      startAt
      stopPredictAt
      endAt
      startPrice
      endPrice
      timeframe
      status
      contractAddress
      createdAt
      updatedAt
      isUp
      token
      myPredict {
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
        isLong
      }
      upPool {
        predictsCount
        poolAmount
        predicts {
          id
          amount
          isLong
          owner {
            id
            name
            avatarUris
            wallet {
              address
            }
            level {
              levelId
            }
          }
        }
      }
      downPool {
        predictsCount
        poolAmount
        predicts {
          id
          amount
          isLong
          owner {
            id
            name
            avatarUris
            wallet {
              address
            }
            level {
              levelId
            }
          }
        }
      }
    }
  }
`
