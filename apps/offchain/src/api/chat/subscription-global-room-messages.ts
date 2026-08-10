import { gql } from '__generated__'

export const SUBSCRIPTION_GLOBAL_ROOM_MESSAGES = gql(`
  subscription roomMessages($roomId: String!) {
    roomMessages(roomId: $roomId) {
      id
      text
      sender {
        id
        name
        avatarUris
        avatarKeys
        discordRoles
        level {
          levelId
        }
      }
      roomId
      replyTo {
        id
      }
      createdAt
    }
  }
`)
