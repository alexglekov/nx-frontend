import { gql } from '@apollo/client'

export const GET_WINRATE_DATA = gql`
  query getUserGamesWinratesHistory($data: GetWinrateDiagramInput!) {
    getUserGamesWinratesHistory(data: $data) {
      average {
        intervals
        winrate
      }
    }
  }
`
