import { gql } from '__generated__'

export const GET_UPDOWN_GAME = gql(`
  query getCurrentUpDownGame($data: UpDownContractAddressInput!) {
    getCurrentUpDownGame(data: $data) {
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
`)
