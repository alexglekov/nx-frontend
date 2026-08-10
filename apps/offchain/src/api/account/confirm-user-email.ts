import { gql } from '__generated__'

export const CONFIRM_EMAIL_MUTATION = gql(`
  mutation confirmEmail($data: ConfirmEmailInput!) {
    confirmEmail(data: $data)
  }
`)
