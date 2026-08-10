import { gql } from '__generated__'

export const GET_1VS1_GAME = gql(`
  query GetOneVsOneGame($getOneVsOneGame: String!) {
    getOneVsOneGame(id: $getOneVsOneGame) {
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
      contractAddress
      token
      stopPredictAt
      opponentPredict {
        ownerId
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
        level {
          levelId
        }
      }
      opponent {
        id
        name
        avatarUris
        level {
          levelId
        }
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
