import { gql } from '__generated__'

export const MUTATION_AUTH_EMAIL_SIGN_IN = gql(`
  mutation signInEmail($data: SignInEmailAuthInput!) {
    signInEmail(data: $data)
  }
`)
