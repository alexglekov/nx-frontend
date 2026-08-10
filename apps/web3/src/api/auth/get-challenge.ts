import { gql } from '__generated__'

export const GET_METAMASK_CHALLENGE = gql(`
  query getMetamaskChallenge($walletAddress: String!) {
    getMetamaskChallenge(data: { walletAddress: $walletAddress }) {
      challenge
    }
  }
`)
