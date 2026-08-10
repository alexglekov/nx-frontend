import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ChallengeTask } from '__generated__/graphql'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { useCollectRewardTask } from '../hooks/use-collect-reward-task'
import { useDailyTasks } from '../hooks/use-daily-tasks'
import { useRefreshRewardTask } from '../hooks/use-refresh-reward-task'
import { getDailyTaskStateByStatus } from '../utils/get-daily-task-state-by-status'
import { RewardsDailyChallengeItemButton } from './rewards-daily-challenge-item-button'
import { TaskRefreshButton } from './task-refresh-button'
import styles from '../rewards.module.scss'

interface Props {
  task: ChallengeTask
  type?: 'facet' | 'simple'
}
export const RewardsDailyChallengeItem: React.FC<Props> = ({
  task,
  type = 'simple'
}) => {
  const { name, description, reward, userRelatedTask } = task

  const { refetchDailyTasks } = useDailyTasks()

  const { handleClaimReward, claimRewardLoading } = useCollectRewardTask(
    userRelatedTask?.id || ''
  )

  const { handleRefreshTask, refreshTaskLoading } = useRefreshRewardTask(
    userRelatedTask?.id || '',
    refetchDailyTasks
  )

  const taskReward = reward || 0

  const state = getDailyTaskStateByStatus(userRelatedTask?.status || null)

  return (
    <Flex
      className={cn(styles.dailyRewardContainerWrapper, {
        [styles.dailyRewardContainerWrapperFacet]: type === 'facet'
      })}
      width={'100%'}
      data-testid={DataTestIDs.rewardsTaskContainer}
    >
      <Flex
        className={styles.dailyRewardContainer}
        direction={'column'}
        justify={'between'}
        width={'100%'}
        gap={'2'}
      >
        <Flex
          width={'100%'}
          direction={'column'}
          gap={'1'}
        >
          <Flex className={styles.dailyRewardLevelContainer} />

          <Flex
            align={'center'}
            gap={'3'}
          >
            <Text
              weight={'bold'}
              className='color-white'
              size={'6'}
            >
              {name}
            </Text>

            {state === 'closed' ?
              <TaskRefreshButton
                handleRefresh={handleRefreshTask}
                loading={refreshTaskLoading}
              />
            : null}
          </Flex>

          <Text
            size={'2'}
            className={styles.dailyRewardDescription}
          >
            {description}
          </Text>
        </Flex>

        <Flex
          className={cn({
            [styles.dailyRewardContainerWrapperFacet]: type === 'facet'
          })}
          width={'100%'}
        >
          <RewardsDailyChallengeItemButton
            amount={taskReward}
            type={state}
            handleCollect={handleClaimReward}
            loading={claimRewardLoading}
            variant={type}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
