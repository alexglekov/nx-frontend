import { gql } from '__generated__'

export const VERIFY_METAMASK = gql(`
  mutation verifyMetamaskSignature(
    $walletAddress: String!
    $signature: String!
    $username: String
    $referrerId: String
  ) {
    verifyMetamaskSignature(
      data: {
        walletAddress: $walletAddress
        signature: $signature
        username: $username
        referrerId: $referrerId
      }
    )
  }
`)
