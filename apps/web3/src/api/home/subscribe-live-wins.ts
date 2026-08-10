import { gql } from '__generated__'

export const SUBSCRIBE_LIVE_WINS = gql(`
  subscription liveWinsPredicts {
    liveWinsPredicts {
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
      owner {
        id
        name
        avatarUris
      }
    }
  }
`)
