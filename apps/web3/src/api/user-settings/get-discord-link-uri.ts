import { gql } from '@apollo/client'

export const GET_DISCORD_LINK_URI = gql`
  query getDiscordLinkUri($data: GetDiscordAuthUriInput!) {
    getDiscordAuthUri(data: $data)
  }
`
