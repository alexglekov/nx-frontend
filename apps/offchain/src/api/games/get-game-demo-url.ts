import { gql } from '__generated__'

export const GET_GAME_DEMO_URL = gql(`
  query getInitializedDemoGameUrl($gameId: String!) {
    getInitializedDemoGameUrl(gameId: $gameId)
  }
`)
