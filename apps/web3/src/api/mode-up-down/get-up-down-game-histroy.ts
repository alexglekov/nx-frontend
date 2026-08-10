import { gql } from '__generated__'

export const GET_UP_DOWN_GAME_HISTORY = gql(`
  query getLastClosedUpDownGames($data: UpDownContractAddressInput!) {
    getLastClosedUpDownGames(data: $data) {
      games {
        id
        isUp
        startAt
        endAt
        startPrice
        endPrice
      }
    }
  }
`)
