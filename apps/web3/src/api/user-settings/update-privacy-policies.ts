import { gql } from '@apollo/client'

export const UPDATE_PRIVACY_POLICY = gql`
  mutation updatePrivacyPolicy($changes: ChangePrivacyPolicyInput!) {
    updatePrivacyPolicy(changes: $changes) {
      showProfile
      showAchievements
      showSetups
      showStats
      showBettingHistory
    }
  }
`
