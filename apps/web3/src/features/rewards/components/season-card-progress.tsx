import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useRewardsState } from '../hooks/use-rewards-state'
import { RewardsProgressBar } from './rewards-progress-bar'
import styles from '../rewards.module.scss'

export const SeasonCardProgress: React.FC = () => {
  const { seasonState } = useRewardsState()

  const rewardsProgressStep = seasonState?.countCompletedChallegnes || 0

  return (
    <Flex
      direction={'column'}
      width={'100%'}
      className={styles.seasonCardProgressWrapper}
    >
      <Text
        size={'1'}
        className='color-white'
        weight={'bold'}
        mb={'2'}
      >
        Season progress
      </Text>

      <RewardsProgressBar currentStep={rewardsProgressStep} />
    </Flex>
  )
}
