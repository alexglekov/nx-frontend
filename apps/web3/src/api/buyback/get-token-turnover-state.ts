import { gql } from '__generated__'

export const GET_TOKEN_TURNOVER_STATE = gql(`
  query getTokenTurnoverState {
    getTokenTurnoverState {
      locked
      lockedPercentage
      totalSupply
      burned
      circulating
      circulatingPercentage
      percentageBurned
    }
  }
`)
