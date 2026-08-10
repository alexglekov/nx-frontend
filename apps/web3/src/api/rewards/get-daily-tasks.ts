import { gql } from '__generated__'

export const GET_DAILY_TASKS = gql(`
  query getUserDailyTasks {
    getUserDailyTasks {
      facetedTasks {
        id
        name
        description
        number
        reward
        userRelatedTask {
          id
          taskId
          progress
          userId
          status
          isBonusReceived
        }
        isCompleted
        requirement
      }
      simpleTasks {
        id
        name
        description
        number
        reward
        userRelatedTask {
          id
          taskId
          progress
          userId
          status
          isBonusReceived
        }
        isCompleted
        requirement
      }
      serialTasks {
        id
        name
        description
        number
        reward
        userRelatedTask {
          id
          taskId
          progress
          userId
          status
          isBonusReceived
        }
        isCompleted
        requirement
      }
    }
  }
`)
