import { gql } from '__generated__'

export const SUBSCRIPTION_1VS1_GAMES_CHANGED = gql(`
  subscription oneVsOneGamesChanged {
    oneVsOneGamesChanged {
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
      token
      opponentPredict {
        amount
        price
        status
        pnl
        ownerId
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
