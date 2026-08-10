import { gql } from '__generated__'

export const CHANGE_PASSWORD = gql(`
  mutation changePassword($data: ChangePasswordInput!){
    changePassword(data: $data) {
      id
    }
  }
`)
