import { gql } from '__generated__'

export const SUBSCRIPTION_SETUPS_GAME_CHANGED = gql(`
  subscription setupsGameChanged($gameId: String!) {
    setupGameChanged(gameId: $gameId) {
      ...SetupsGame
    }
  }
`)
