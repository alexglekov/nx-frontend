import { gql } from '@apollo/client'

export const UPDATE_EMAIL_NOTIFICATIONS = gql`
  mutation updateNotificationsPolicy(
    $changes: ChangeEmailNotificationPolicyInput!
  ) {
    updateNotificationsPolicy(changes: $changes) {
      sendNotificationsToEmail
      notifyBetsResult
      notifyBettingInvitation
      notifyNewAchievements
      notifyUpdates
    }
  }
`
