import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ChallengeTask, UserChallengeTaskStatus } from '__generated__/graphql'
import { DataTestIDs } from 'shared/constants'
import { useCollectRewardTask } from '../hooks/use-collect-reward-task'
import { getDailyTaskStateByStatus } from '../utils/get-daily-task-state-by-status'
import { RewardsDailyChallengeItemButton } from './rewards-daily-challenge-item-button'
import { RewardsRoundProgressbar } from './rewards-round-progressbar'
import styles from '../rewards.module.scss'

interface Props {
  tasks: ChallengeTask[]
}
// eslint-disable-next-line max-statements, complexity
export const RewardDailyChallengeSerialItem: React.FC<Props> = ({ tasks }) => {
  const firstNotClaimedTask =
    tasks.find(
      t => t?.userRelatedTask?.status !== 'CLAIMED' && Boolean(t.isCompleted)
    ) || null

  const firstNotCompletedTask = tasks.find(t => !Boolean(t.isCompleted)) || null

  const currentTask =
    firstNotClaimedTask || firstNotCompletedTask || tasks[tasks.length - 1]

  const { name, description, reward, userRelatedTask } = currentTask

  const { handleClaimReward, claimRewardLoading } = useCollectRewardTask(
    userRelatedTask?.id || ''
  )

  const amountCompletedTasks = tasks?.filter(
    task =>
      task.userRelatedTask?.status === UserChallengeTaskStatus.Completed ||
      task.userRelatedTask?.status === UserChallengeTaskStatus.Claimed
  )?.length

  const taskReward = reward || 0

  const state = getDailyTaskStateByStatus(userRelatedTask?.status || null)

  const currentTaskRequirement = currentTask.requirement || 0
  const currentTaskProgress = currentTask.userRelatedTask?.progress || 0

  return (
    <Flex
      className={styles.dailyRewardContainerWrapper}
      width={'100%'}
      data-testid={DataTestIDs.rewardsTaskContainer}
    >
      <Flex
        className={styles.dailyRewardContainer}
        direction={'column'}
        justify={'between'}
        width={'100%'}
        gap={'4'}
      >
        <Flex
          width={'100%'}
          direction={'column'}
          gap={'3'}
        >
          <Flex
            className={styles.dailyRewardLevelContainerSerial}
            align={'center'}
            justify={'center'}
          >
            {amountCompletedTasks > 0 && (
              <Flex
                className={styles.dailyRewardLevel}
                align={'center'}
                justify={'center'}
              >
                <Text
                  className='color-black'
                  size={'1'}
                  weight={'bold'}
                >
                  {amountCompletedTasks} LVL
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex
            align={'start'}
            justify={'between'}
            gap={'3'}
            width={'100%'}
          >
            <Text
              weight={'bold'}
              className='color-white'
              size={'6'}
            >
              {name}
            </Text>
          </Flex>

          <Text
            size={'2'}
            className={styles.dailyRewardDescription}
          >
            {description}
          </Text>

          <RewardsRoundProgressbar
            stepsAmount={currentTaskRequirement}
            completedStepsAmount={currentTaskProgress}
            isTooltipDisabled
            customText='Games played'
          />
        </Flex>

        <RewardsDailyChallengeItemButton
          amount={taskReward}
          type={state}
          handleCollect={handleClaimReward}
          loading={claimRewardLoading}
        />
      </Flex>
    </Flex>
  )
}
