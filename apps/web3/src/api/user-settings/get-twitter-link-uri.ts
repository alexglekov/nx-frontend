import { gql } from '@apollo/client'

export const GET_TWITTER_LINK_URI = gql`
  query getTwitterLinkUri($data: GetTwitterAuthUriInput!) {
    getTwitterAuthUri(data: $data)
  }
`
