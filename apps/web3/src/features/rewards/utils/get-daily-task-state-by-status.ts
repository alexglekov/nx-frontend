import {
  UserChallengeTask,
  UserChallengeTaskStatus
} from '__generated__/graphql'
import { DailyRewardState } from '../types'

export const getDailyTaskStateByStatus = (
  status: UserChallengeTask['status'] | null
): DailyRewardState => {
  if (!status) return 'closed'

  if (status === Completed) {
    return 'claim'
  }

  if (status === Claimed) {
    return 'claimed'
  }

  return 'closed'
}

const { Claimed, Completed } = UserChallengeTaskStatus
