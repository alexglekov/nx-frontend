import { gql } from '__generated__'

export const SEND_ROOM_MESSAGE = gql(`
  mutation sendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      id
      text
      sender {
        id
        name
        avatarUris
        avatarKeys
        discordRoles
      }
      roomId
      replyTo {
        id
      }
      createdAt
    }
  }
`)
