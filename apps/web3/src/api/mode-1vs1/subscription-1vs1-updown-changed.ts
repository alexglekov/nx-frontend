import { gql } from '__generated__'

export const SUBSCRIPTION_1VS1_UPDOWN_CHANGED = gql(`
  subscription oneVsOneUpDownGameChanged {
    oneVsOneUpDownGameChanged {
      feedId
      id
    }
  }
`)