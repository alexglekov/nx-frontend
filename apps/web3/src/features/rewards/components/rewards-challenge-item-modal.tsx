import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { UserChallengeTaskStatus } from '__generated__/graphql'
import cn from 'classnames'
import { XyroDialog } from 'shared/ui'
import { challengeModalStateVar } from '../store/challenge-modal'
import { RewardsChallengeItemTask } from './rewards-challenge-item-task'
import { RewardsRoundProgressbar } from './rewards-round-progressbar'
import styles from '../rewards.module.scss'

export const RewardsChallengeItemModal: React.FC = () => {
  const challengeModalState = useReactiveVar(challengeModalStateVar)

  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (isOpen) return

    challengeModalStateVar(null)
  }, [])

  const challengeName = challengeModalState?.name || ''

  const challengeDescription = challengeModalState?.description || ''

  const amountCompletedTasks = challengeModalState?.tasks?.filter(
    task =>
      task.userRelatedTask?.status === UserChallengeTaskStatus.Completed ||
      task.userRelatedTask?.status === UserChallengeTaskStatus.Claimed
  )?.length

  const sortedTasks =
    challengeModalState?.tasks.toSorted((a, b) => a.number - b.number) ?? []

  return (
    <XyroDialog
      open={Boolean(challengeModalState)}
      onOpenChange={handleOpenChange}
      className={styles.modalContentWrapper}
    >
      <Flex
        className={styles.rewardsChallengeModal}
        direction={'column'}
      >
        <Flex
          align={'center'}
          justify={'between'}
          mb={'4'}
        >
          <Text
            className='color-white'
            size={'7'}
            weight={'medium'}
          >
            {challengeName}
          </Text>

          <RewardsRoundProgressbar
            stepsAmount={challengeModalState?.tasks.length || 0}
            completedStepsAmount={amountCompletedTasks || 0}
            isLocked={!Boolean(challengeModalState?.tasks[0].userRelatedTask)}
          />
        </Flex>

        <Text
          weight={'medium'}
          size={'2'}
          className={cn('color-white', styles.challengeItemDescription)}
        >
          {challengeDescription}
        </Text>

        <Flex
          width={'100%'}
          direction={'column'}
          height={'100%'}
          className={styles.challengeTasksContainer}
        >
          {sortedTasks?.map(task => {
            return (
              <RewardsChallengeItemTask
                key={task.id}
                task={task}
              />
            )
          })}
        </Flex>
      </Flex>
    </XyroDialog>
  )
}
