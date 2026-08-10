import { UserChallengeTaskStatus } from '__generated__/graphql'
import { useDailyTasks } from './use-daily-tasks'
import { useRewardsState } from './use-rewards-state'

export const useClaimableRewards = () => {
  const { seasonState } = useRewardsState()
  const { serialTasks, simpleTasks, facetedTasks } = useDailyTasks()

  const flattenedSerialTasks = serialTasks.flat()

  const dailyTasks = [...flattenedSerialTasks, ...simpleTasks, ...facetedTasks]

  const isSeasonTaskClaimable = seasonState?.challenges.some(challenge => {
    return challenge.tasks.find(task => {
      return task.userRelatedTask?.status === UserChallengeTaskStatus.Completed
    })
  })

  const isDailyTaskClaimable = dailyTasks.some(task => {
    return task.userRelatedTask?.status === UserChallengeTaskStatus.Completed
  })

  return {
    isClaimable: isSeasonTaskClaimable || isDailyTaskClaimable
  }
}
