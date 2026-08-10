import { useMutation } from '@apollo/client'
import { CheckChallengeTaskCompletionMutation } from '__generated__/graphql'
import { MUTATION_CHECK_CHALLENGE_TASK_COMPLETION } from 'api/rewards/mutation-check-challenge-task-completion'
import { notificationStateVar } from 'shared/store/notification'

export const useRefreshRewardTask = (id: string, refetchTasks: () => void) => {
  const [commitRefreshTask, { loading: refreshTaskLoading }] =
    useMutation<CheckChallengeTaskCompletionMutation>(
      MUTATION_CHECK_CHALLENGE_TASK_COMPLETION
    )

  const handleRefreshTask = () => {
    if (!id) return

    commitRefreshTask({
      variables: {
        data: {
          id
        }
      },
      onCompleted: () => {
        notifyOnTaskRefreshSuccess()
        refetchTasks()
      },
      onError: notifyOnTaskRefreshError
    })
  }

  return {
    handleRefreshTask,
    refreshTaskLoading
  }
}

const notifyOnTaskRefreshSuccess = () => {
  notificationStateVar({
    isOpen: true,
    type: 'success',
    title: 'Success',
    description: 'Task was successfully refreshed'
  })
}

const notifyOnTaskRefreshError = () => {
  notificationStateVar({
    isOpen: true,
    type: 'error',
    title: 'Error!',
    description: 'Task was not refreshed. Something went wrong..'
  })
}
