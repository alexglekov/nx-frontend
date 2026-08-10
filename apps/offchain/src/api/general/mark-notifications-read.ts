import { gql } from '@apollo/client'

export const MARK_NOTIFICATIONS_READ = gql`
  mutation markNotificationsRead($data: MarkNotificationsAsReadInput!) {
    markNotificationsRead(data: $data)
  }
`
