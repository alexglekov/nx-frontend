import { gql } from '__generated__'

export const FRAGMENT_SETUPS_PREDICT_SHALLOW = gql(`
  fragment SetupsPredictShallow on SetupPredict {
    __typename
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
  }
`)
