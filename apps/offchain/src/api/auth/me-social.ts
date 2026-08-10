import { gql } from '__generated__'

export const GET_ME_SOCIAL = gql(`
  query meSocial {
    me {
      ...MeSocial
    }
  }
`)
