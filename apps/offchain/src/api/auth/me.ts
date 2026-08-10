import { gql } from '__generated__'

export const GET_ME = gql(`
  query me {
    me {
      ...Me
    }
  }
`)
