import { gql } from '__generated__'

export const FRAGMENT_BET_SHALLOW = gql(`
  fragment BetShallow on Bet {
    owner {
      ...UserShallow
    }
    id
    gameId
  }
`)
