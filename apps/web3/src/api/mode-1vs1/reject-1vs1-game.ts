import { gql } from '@apollo/client'

export const REJECT_1VS1_GAME = gql`
  mutation rejectOneVsOneGame($gameId: String!) {
    rejectOneVsOneGame(gameId: $gameId) {
      id
    }
  }
`
