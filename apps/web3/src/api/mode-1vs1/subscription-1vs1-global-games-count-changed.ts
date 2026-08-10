import { gql } from '__generated__'

export const SUBSCRIPTION_ONE_VS_ONE_GLOBAL_GAMES_COUNTERS_CHANGED = gql(`
  subscription oneVsOneCountGlobalGamesChanged {
    oneVsOneCountGlobalGamesChanged {
      global
    }
  }
`)
