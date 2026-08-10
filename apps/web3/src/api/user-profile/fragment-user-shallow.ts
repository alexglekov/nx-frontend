import { gql } from '__generated__'

export const FRAGMENT_USER_SHALLOW = gql(`
  fragment UserShallow on User {
    id
    name
    isInfluencer
  }
`)
