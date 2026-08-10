import { gql } from '__generated__'

export const SETUPS_GAMES_CHANGED = gql(`
  subscription setupGamesChanged {
    setupGamesChanged {
      ...SetupsGame
    }
  }
`)
