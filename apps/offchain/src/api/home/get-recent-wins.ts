import { gql } from '__generated__'

export const GET_RECENT_WINS = gql(`
  query getRecentWins {
    getRecentWins(limit: 10) {
      gameName
      betAmount
      outcome
      pnl
      userId
      userName
      thumb
      userAvatarUrl
      provider
      timestamp
    }
  }
`)
