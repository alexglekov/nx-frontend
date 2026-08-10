import { gql } from '@apollo/client'

export const CHECK_NAME_AVAILABILITY = gql`
  query checkNameAvailability($data: CheckNameAvailabilityInput!) {
    checkNameAvailability(data: $data)
  }
`
