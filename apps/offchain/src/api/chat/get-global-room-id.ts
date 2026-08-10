import { gql } from '__generated__'

export const GET_GLOBAL_ROOM_ID = gql(`
  query getRoomByType($data: GetRoom!) {
    getRoomByType(data: $data) {
      id
    }
  }
`)
