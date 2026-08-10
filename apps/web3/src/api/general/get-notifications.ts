import { gql } from '@apollo/client'

export const GET_NOTIFICATIONS = gql`
  query getNotifications($data: PaginatedInput!) {
    getNotifications(data: $data) {
      skip
      take
      notifications {
        __typename
        ... on SetupGameClosedNotification {
          id
          userId
          type
          isRead
          createdAt
          payload {
            gameId
            ownerProfit
          }
        }
        ... on OneVsOneAcceptedNotification {
          id
          userId
          type
          isRead
          createdAt
          payload {
            gameId
            opponentId
          }
        }
        ... on OneVsOneRefusedNotification {
          id
          userId
          type
          isRead
          createdAt
          payload {
            gameId
            opponentId
          }
        }
        ... on OneVsOneInvitationNotification {
          id
          userId
          type
          isRead
          createdAt
          payload {
            gameId
            opponentId
          }
        }
        ... on HotNotification {
          __typename
          createdAt
          id
          isRead
          type
          updatedAt
          userId
        }
        ... on BonusNotification {
          id
          userId
          type
          isRead
          createdAt
          title
          description
          amount
          assetId
          __typename
        }
        ... on MentionNotification {
          __typename
          createdAt
          id
          isRead
          messageId
          type
          userId
        }
        ... on GameResultNotification {
          __typename
          createdAt
          id
          isRead
          type
          userId
          payload {
            __typename
            ... on UpDownGameResultNotificationPayload {
              __typename
              amount
              gameType
              outcome
              status
            }
            ... on SetupGameResultNotificationPayload {
              __typename
              amount
              gameType
              outcome
              status
            }
            ... on OneVsOneGameResultNotificationPayload {
              __typename
              amount
              gameType
              opponent {
                id
              }
              outcome
              status
            }
            ... on BullseyeGameResultNotificationPayload {
              __typename
              amount
              gameType
              winner {
                id
              }
              isExact
              outcome
              status
              winnerOutcome
            }
          }
        }
      }
    }
  }
`
