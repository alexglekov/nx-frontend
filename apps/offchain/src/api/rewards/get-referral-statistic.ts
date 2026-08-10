import { gql } from '@apollo/client'

export const GET_REFERRAL_STATISTICS = gql`
  query getReferralStatistic {
    getReferralStatistic {
      numberOfInvited
      numberOfSecondLevelInvited
    }
  }
`
