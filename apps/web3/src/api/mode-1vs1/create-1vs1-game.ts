import { gql } from '@apollo/client'

export const CREATE_1VS1_GAME = gql`
  mutation createOneVsOneGame($data: CreateOneVsOneGameInput!) {
    createOneVsOneGame(data: $data) {
      id
    }
  }
`
