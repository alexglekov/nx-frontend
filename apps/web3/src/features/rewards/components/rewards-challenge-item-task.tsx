import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ChallengeTask, UserChallengeTaskStatus } from '__generated__/graphql'
import { useCollectRewardTask } from '../hooks/use-collect-reward-task'
import { useRefreshRewardTask } from '../hooks/use-refresh-reward-task'
import { useRewardsState } from '../hooks/use-rewards-state'
import { RewardTaskStep } from './reward-task-step'
import { RewardsChallengeItemTaskText } from './rewards-challenge-item-task-text'
import { RewardsClaimButton } from './rewards-claim-button'
import { TaskRefreshButton } from './task-refresh-button'
import styles from '../rewards.module.scss'

interface Props {
  task: ChallengeTask
}

// eslint-disable-next-line complexity, max-statements
export const RewardsChallengeItemTask: React.FC<Props> = ({ task }) => {
  const { refetchSeasonState } = useRewardsState()

  const { handleClaimReward, claimRewardLoading } = useCollectRewardTask(
    task.userRelatedTask?.id || ''
  )

  const { handleRefreshTask, refreshTaskLoading } = useRefreshRewardTask(
    task.userRelatedTask?.id || '',
    refetchSeasonState
  )

  const taskStepState =
    task?.userRelatedTask?.status === UserChallengeTaskStatus.NotCompleted ?
      'current'
    : 'done'

  const taskStepType = !task?.userRelatedTask ? 'locked' : taskStepState

  const isCurrentTaskInProgress =
    task.userRelatedTask?.status === UserChallengeTaskStatus.NotCompleted

  const isRewardClaimed =
    task.userRelatedTask?.status === UserChallengeTaskStatus.Completed ?
      'claim'
    : 'claimed'

  const buttonStepState = isCurrentTaskInProgress ? null : isRewardClaimed

  const buttonStepType = !task.userRelatedTask ? 'locked' : buttonStepState

  return (
    <Flex
      align={'start'}
      gap={'5'}
      className={styles.rewardsChallengeItemTaskWrapper}
      position={'relative'}
      justify={'between'}
      width={'100%'}
    >
      <RewardTaskStep type={taskStepType} />

      <Flex
        width={'100%'}
        align={'start'}
        justify={'between'}
      >
        <Flex
          direction={'column'}
          gap={'2'}
          className={styles.rewardsChallengeItemContentWrapper}
        >
          <Flex
            align={'center'}
            gap={'2'}
          >
            <Text
              className='color-white'
              weight={'bold'}
              size={'4'}
            >
              {task.name}
            </Text>

            {taskStepType === 'current' ?
              <TaskRefreshButton
                loading={refreshTaskLoading}
                handleRefresh={handleRefreshTask}
              />
            : null}
          </Flex>

          <RewardsChallengeItemTaskText text={task.description || ''} />
        </Flex>

        <RewardsClaimButton
          type={buttonStepType}
          handleClick={handleClaimReward}
          claimReward={task.reward || null}
          disabled={claimRewardLoading}
        />
      </Flex>
    </Flex>
  )
}
