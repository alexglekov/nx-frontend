import { gql } from '__generated__'

export const CHANGE_EMAIL_MUTATION = gql(`
  mutation changeEmail($data: ChangeEmailInput!) {
    changeEmail(data: $data) {
      id
    }
  }
`)
