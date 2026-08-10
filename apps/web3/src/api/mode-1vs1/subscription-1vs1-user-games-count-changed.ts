import { gql } from '__generated__'

export const SUBSCRIPTION_ONE_VS_ONE_USER_GAMES_COUNTERS_CHANGED = gql(`
  subscription oneVsOneCountUserGamesChanged {
    oneVsOneCountUserGamesChanged {
      current
      completed
      expired
      personal
    }
  }
`)
