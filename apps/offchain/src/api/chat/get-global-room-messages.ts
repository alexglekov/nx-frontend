import { gql } from '__generated__'

export const GET_GLOBAL_ROOM_MESSAGES = gql(`
  query getRoomMessagesPaginated($data: GetRoomMessages!) {
    getRoomMessagesPaginated(data: $data) {
      prevToken
      nextToken
      messages {
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
  }
`)
