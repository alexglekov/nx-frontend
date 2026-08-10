import { gql } from '@apollo/client'

export const COUNTERS_1VS1_GAMES = gql`
  query getOneVsOneGamesCount {
    getOneVsOneGamesCount {
      activeGamesCount
      closeGamesCount
      inviteGamesCount
    }
  }
`
