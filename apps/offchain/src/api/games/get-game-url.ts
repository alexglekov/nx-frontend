import { gql } from '__generated__'

export const GET_GAME_URL = gql(`
  query initializeGameSession($payload: InitializeProviderGame!) {
    initializeGameSession(payload: $payload)
  }
`)
