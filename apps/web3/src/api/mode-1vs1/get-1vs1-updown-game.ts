import { gql } from '__generated__'

export const GET_1VS1_UPDOWN_GAME = gql(`
  query GetOneVsOneUpDownGame($getOneVsOneUpDownGameId: String!) {
    getOneVsOneUpDownGame(id: $getOneVsOneUpDownGameId) {
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
      isLong
      isPrivate
      stopPredictAt
      opponentPredict {
        amount
        isLong
        status
        pnl
      }
      ownerId
      owner {
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
        isLong
        status
        pnl
      }
      opponent {
        name
        avatarUris
      }
      startPrice
      status  
    }
  }
`)
