import { gql } from '__generated__'

export const GET_LIVE_WINS = gql(`
  query getLiveWinsPredicts {
    getLiveWinsPredicts(pagination: { skip: 0, take: 10 }) {
      skip
      take
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
        game {
          contractAddress
        }
        owner {
          id
          name
          avatarUris
          level {
            levelId
          }
        }
      }
    }
  }
`)
