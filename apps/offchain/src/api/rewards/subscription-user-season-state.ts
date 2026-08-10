import { gql } from '@apollo/client'

export const SUBSCRIPTION_USER_SEASON_STATE = gql(`
  subscription userSeasonChanged {
    userSeasonChanged {
      id
      name
      description
      challenges {
        id
        name
        description
        number
        tasks {
          id
          name
          description
          reward
          number
          userRelatedTask {
            id
            status
          }
        }
      }
      countCompletedChallegnes
    }
  }
`)
