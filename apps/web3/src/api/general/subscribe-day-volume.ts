import { gql } from '__generated__'

export const SUBSCRIPTION_DAY_VOLUME_CHANGED = gql(`
  subscription onVolumeChanged($contractAddress: String!) {
    onVolumeChanged(contractAddress: $contractAddress) {
      volume
    }
  }
`)
