import { gql } from '__generated__'

export const GET_SETUPS_GAME = gql(`
  query getSetupGame($id: String!) {
    getSetupGame(id: $id) {
      ...SetupsGame
    }
  }
`)
