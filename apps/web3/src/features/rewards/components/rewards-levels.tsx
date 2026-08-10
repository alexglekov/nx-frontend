import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import ProgressBar from '@ramonak/react-progress-bar'
import Skeleton from 'react-loading-skeleton'
import { XyroToken } from 'shared/components'
import { LEVELS_ICONS_MAP } from '../constants/constants'
import { useRewardsLevels } from '../hooks/use-rewards-levels'
import { RewardsNextLevels } from './rewards-next-levels'
import styles from '../rewards.module.scss'

export const RewardsLevels: React.FC = () => {
  const { userLevel, levels, loading } = useRewardsLevels()

  const currentLevel = userLevel?.levelId || 0
  const currentLevelProgressPercent =
    userLevel?.progressPercent?.toFixed(2) || 0
  const userLevelName = userLevel?.level?.name || 'Newcomer'
  const nextLevelReward = levels[0]?.pointReward || 0

  const rewardLevelIcon = LEVELS_ICONS_MAP[currentLevel]

  if (loading)
    return (
      <Skeleton
        width={'100%'}
        height={'44.5rem'}
        borderRadius={'5rem'}
      />
    )

  return (
    <Flex
      width={'100%'}
      className={styles.inviteFriendsWrapper}
      direction={'column'}
    >
      <Flex
        align={'center'}
        gap={'3'}
      >
        {rewardLevelIcon}

        <Flex direction={'column'}>
          <Text
            className='color-white'
            weight={'bold'}
            size={'6'}
          >
            {userLevelName}
          </Text>

          <Text
            size={'1'}
            weight={'medium'}
            className='color-gray'
          >
            Level {currentLevel}
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        width={'100%'}
        gap={'1'}
      >
        <Flex
          width={'100%'}
          justify={'end'}
        >
          <Text
            className='color-white'
            weight={'medium'}
            size={'2'}
          >
            {currentLevelProgressPercent}%
          </Text>
        </Flex>

        <ProgressBar
          completed={currentLevelProgressPercent}
          bgColor='var(--orange)'
          height='0.75rem'
          isLabelVisible={false}
          baseBgColor='var(--gray)'
          className={styles.levelProgressBar}
        />
      </Flex>

      <Flex
        mt={'2'}
        align={'center'}
        gap={'1'}
      >
        <Text
          className='color-gray'
          size={'1'}
          weight={'medium'}
        >
          Reward for next level:
        </Text>

        <Flex align={'center'}>
          <XyroToken
            color='yellow'
            size='2rem'
          />

          <Text
            className='color-white'
            size={'1'}
            weight={'medium'}
          >
            {nextLevelReward}
          </Text>
        </Flex>
      </Flex>

      <RewardsNextLevels />
    </Flex>
  )
}
