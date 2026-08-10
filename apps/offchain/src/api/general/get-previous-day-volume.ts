import { gql } from '__generated__'

export const GET_PREVIOUS_DAY_VOLUME = gql(`
  query getVolumeOfThePreviousDay($contractAddress: String!) {
    getVolumeOfThePreviousDay(contractAddress: $contractAddress) {
      volume
    }
  }
`)
