import { gql } from '@apollo/client'

export const CHECK_REFERRAL_CODE_AVAILABILITY = gql`
  query checkReferralAvailability($data: CheckReferralAvalabilityInput!) {
    checkReferralAvalability(data: $data) {
      active
      user {
        id
      }
    }
  }
`
