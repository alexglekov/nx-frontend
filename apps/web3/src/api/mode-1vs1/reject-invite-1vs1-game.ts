import { gql } from '@apollo/client'

export const REJECT_INVITE_1VS1_GAME = gql`
  mutation rejectOneVsOneGameInvitation($gameId: String!) {
    rejectOneVsOneGameInvitation(gameId: $gameId) {
      id
    }
  }
`
