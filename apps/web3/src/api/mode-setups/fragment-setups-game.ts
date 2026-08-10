import { gql } from '__generated__'

export const FRAGMENT_SETUPS_GAME = gql(`
  fragment SetupsGame on SetupGame {
    __typename
    takeProfitPool {
      predictsCount
      poolAmount
      multiplier
    }
    stopLossPool {
      predictsCount
      poolAmount
      multiplier
    }
    owner {
      __typename
      id
      name
      avatarUris
      level {
        levelId
      }
    }
    myPredict {
      ...SetupsPredictShallow
    }
    ownerProfit
    id
    feedId
    isLong
    startAt
    endAt
    ownerId
    startPrice
    endPrice
    stopLoss
    takeProfit
    stopPredictAt
    timeframe
    status
    contractAddress
    asset {
      feedId
      id
      name
    }
  }
`)
