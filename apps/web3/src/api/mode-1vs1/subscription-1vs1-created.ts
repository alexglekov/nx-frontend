import { gql } from '__generated__'

export const SUBSCRIPTION_1VS1_CREATED = gql(`
  subscription oneVsOneGameCreated {
    oneVsOneGameCreated {
      feedId,
      gameType,
      id,
      isPrivate,
      contractAddress,
      endAt,
      startPrice,
      timeframe,
      ownerId,
      stopPredictAt,
      token,
      owner {
        id,
        name,
        avatarUris
        level {
          levelId
        }        
      },
      opponent {
        id
        name
        avatarUris
        level {
          levelId
        }
      },
      ownerPredict {
        amount,
        price,
        gameId
      },
    }
  }
`)
