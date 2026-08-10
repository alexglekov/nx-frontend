import { gql } from '__generated__'

export const GET_CURRENT_BULLS_EYE_GAME = gql(`
  query getCurrentBullsEyeGame($data: BullseyeContractAddressInput!) {
    getCurrentBullseyeGame(data: $data) {
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
      amount
      token
      myPredicts {
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
      pool {
        predictsCount
        poolAmount
      }
    }
  }
`)
