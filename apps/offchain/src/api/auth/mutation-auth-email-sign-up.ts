import { gql } from '__generated__'

export const MUTATION_AUTH_EMAIL_SIGN_UP = gql(`
  mutation signUpEmail($data: SignUpEmailAuthInput!) {
    signUpEmail(data: $data)
  }
`)
