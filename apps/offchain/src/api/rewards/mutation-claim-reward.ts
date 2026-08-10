import { gql } from '@apollo/client'

export const MUTATION_CLAIM_REWARD = gql(`
  mutation claimReward ($data: ClaimRewardInput!){
    claimReward(data: $data) {
      id
      status
    }
  }
`)
