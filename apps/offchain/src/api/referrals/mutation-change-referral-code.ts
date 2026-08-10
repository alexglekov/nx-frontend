import { gql } from '@apollo/client'

export const MUTATION_CHANGE_REFFERAL_CODE = gql`
  mutation changeReferralCode($input: ChangeOffchainReferralCodeInputType!) {
    changeReferralCode(input: $input)
  }
`
