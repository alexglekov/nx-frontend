import { gql } from '@apollo/client'

export const GET_PRIVACY_POLICIES = gql`
  query getPrivacyPolicies {
    getPrivacyPolicies {
      showProfile
      showAchievements
      showSetups
      showStats
      showBettingHistory
      allowTagInChat
      allowInviteIn1vs1Game
    }
  }
`
