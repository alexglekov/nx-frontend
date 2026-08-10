import { gql } from '__generated__'

export const SUBSCRIPTION_1VS1_CHANGED = gql(`
  subscription oneVsOneGameChanged($gameId: String!) {
    oneVsOneGameChanged(gameId: $gameId) {
      asset {
        id
        name
        precision
      }
      isAccepted
      gameType
      feedId
      endPrice
      endAt
      id
      isPrivate
      stopPredictAt
      contractAddress
      token
      opponentPredict {
        ownerId
        gameId
        amount
        gameId
        gameType
        id
        price
        status
        pnl
      }
      ownerId
      owner {
        id
        name
        avatarUris
      }
      opponent {
        id
        name
        avatarUris
      }
      ownerPredict {
        ownerId
        gameId
        amount
        gameId
        gameType
        id
        price
        status
        pnl
      }
      startPrice
      status
    }
  }
`)
