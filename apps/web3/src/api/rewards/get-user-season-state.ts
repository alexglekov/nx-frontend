import { gql } from '@apollo/client'

export const GET_USER_SEASON_STATE = gql(`
  query getUserSeasonState {
    getUserSeasonState {
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
