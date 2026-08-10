import { gql } from '@apollo/client'

export const ATTACH_TWITTER = gql`
  mutation attachTwitter($data: AttachTwitterInput!) {
    attachTwitter(data: $data)
  }
`
