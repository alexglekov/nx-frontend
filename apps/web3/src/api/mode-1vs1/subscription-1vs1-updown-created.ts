import { gql } from '__generated__'

export const SUBSCRIPTION_1VS1_UPDOWN_CREATED = gql(`
  subscription oneVsOneUpDownGameCreated {
    oneVsOneUpDownGameCreated {
      feedId
      id
    }
  }
`)
