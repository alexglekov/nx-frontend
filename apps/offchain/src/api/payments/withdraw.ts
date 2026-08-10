import { gql } from '@apollo/client'

export const WITHDRAW = gql`
  mutation withdrawal($data: WithdrawalInput!) {
    withdrawal(data: $data)
  }
`
