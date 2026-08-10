import { gql } from '__generated__'

export const FRAGMENT_SETUPS_PREDICT = gql(`
  fragment SetupsPredict on SetupPredict {
    __typename
    game {
      id
      endAt
      asset {
        id
      }
      stopLoss
      takeProfit
      startPrice
      contractAddress
      stopLossPool {
        predictsCount
        poolAmount
        multiplier
      }
      takeProfitPool {
        predictsCount
        poolAmount
        multiplier
      }
    }
    owner {
      ...SetupsGameOwner
    }
    id
    gameType
    ownerId
    gameId
    status
    amount
    createdAt
    outcome
    isLong
    pnl
    updatedAt
    isRetrieved
  }
`)
