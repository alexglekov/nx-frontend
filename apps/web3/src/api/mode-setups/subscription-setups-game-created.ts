import { gql } from '__generated__'

export const SETUPS_GAME_CREATED = gql(`
  subscription createdSetupGame {
    setupGameCreated {
      ...SetupsGame
    }
  }
`)
