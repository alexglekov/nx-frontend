import { gql } from '@apollo/client'

export const GET_EMAIL_NOTIFICATIONS = gql`
  query getNotificationsPolicies {
    getNotificationsPolicies {
      sendNotificationsToEmail
      notifyBetsResult
      notifyBettingInvitation
      notifyNewAchievements
      notifyUpdates
    }
  }
`
