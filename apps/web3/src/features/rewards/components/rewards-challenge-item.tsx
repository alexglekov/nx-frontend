import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ChallengeTask, UserChallengeTaskStatus } from '__generated__/graphql'
import cn from 'classnames'
import styles from '../rewards.module.scss'
import { RewardsRoundProgressbar } from './rewards-round-progressbar'

interface Props {
  name: string
  desciption: string
  tasks: ChallengeTask[]
  handleClick: () => void
}

const DESCRIPTION_LENGHT_TRASHHOLD = 102

export const RewardsChallengeItem: React.FC<Props> = ({
  name,
  desciption,
  handleClick,
  tasks
}) => {
  const formattedDescription =
    desciption.length > DESCRIPTION_LENGHT_TRASHHOLD
      ? desciption.slice(0, DESCRIPTION_LENGHT_TRASHHOLD)
      : desciption

  const isProgressBarLocked = !Boolean(tasks[0].userRelatedTask)

  const amountCompletedTasks = tasks?.filter(
    task =>
      task.userRelatedTask?.status === UserChallengeTaskStatus.Completed ||
      task.userRelatedTask?.status === UserChallengeTaskStatus.Claimed
  )?.length

  return (
    <Flex
      className={cn(styles.challengeItemWrapper, 'cursor-pointer', {
        [styles.challengeItemWrapperLocked]: isProgressBarLocked
      })}
      direction={'column'}
      width={'100%'}
      height={'100%'}
      justify={'between'}
      onClick={handleClick}
    >
      <Flex
        direction={'column'}
        gap={'2'}
        width={'100%'}
      >
        <Text
          size={'5'}
          weight={'bold'}
          className='color-white'
        >
          {name}
        </Text>

        <Text
          size={'2'}
          weight={'medium'}
          className={cn('color-white', styles.challengeItemDescription)}
        >
          {formattedDescription}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        justify={'between'}
        mt={'5'}
      >
        <RewardsRoundProgressbar
          stepsAmount={tasks.length}
          completedStepsAmount={amountCompletedTasks}
          isLocked={isProgressBarLocked}
        />
      </Flex>
    </Flex>
  )
}
