import { gql } from '__generated__'

export const SUBSCRIPTION_DAILY_TASKS = gql(`
  subscription userDailyTasksChanged {
    userDailyTasksChanged {
      id
      name
      description
      number
      reward
      userRelatedTask {
        id
        status
      }
    }
  }
`)
