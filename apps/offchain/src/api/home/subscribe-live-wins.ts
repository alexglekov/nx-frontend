import { gql } from '__generated__'

export const SUBSCRIBE_PROVIDER_LIVE_WINS = gql(`
  subscription onProviderLiveWins {
    onProviderLiveWins {
      gameName
      betAmount
      outcome
      pnl
      userId
      userName
      thumb
      userAvatarUrl
      provider
      timestamp
    }
  }
`)
