import { gql } from '@apollo/client'

export const GET_REFERRAL = gql`
  query getReferral {
    getReferral {
      code
    }
  }
`
