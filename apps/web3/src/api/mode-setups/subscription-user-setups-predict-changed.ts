import { gql } from '__generated__'

export const USER_SETUPS_PREDICT_CHANGED = gql(`
  subscription userSetupPredictsChanged {
    userSetupPredictsChanged {
      ...SetupsPredict
    }
  }
`)
