import { gql } from '@apollo/client'

export const MUTATION_UPDATE_USER_REFFERAL = gql`
  mutation updateReferral($data: UpdateReferralInput!) {
    updateReferral(data: $data) {
      code
    }
  }
`
