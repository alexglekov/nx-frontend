import { gql } from '@apollo/client'

export const ATTACH_DISCORD = gql`
  mutation attachDiscord($data: AttachDiscordInput!) {
    attachDiscord(data: $data)
  }
`
