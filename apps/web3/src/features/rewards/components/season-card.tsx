import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { RewardsSeasonCardBanner } from 'shared/icons'
import { useRewardsState } from '../hooks/use-rewards-state'
import { SeasonCardProgress } from './season-card-progress'
import styles from '../rewards.module.scss'

export const SeasonCard: React.FC = () => {
  const { seasonState, seasonStateLoading } = useRewardsState()

  const seasonName = seasonState?.name || ''
  const seasonDescription = seasonState?.description || ''

  if (seasonStateLoading)
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
      direction={'column'}
      className={styles.seasonCardWrapper}
      position={'relative'}
      justify={'between'}
    >
      <Flex
        width={'100%'}
        direction={'column'}
      >
        <Text
          className='color-white'
          size={'2'}
          weight={'bold'}
          mb={'3'}
        >
          NEW SEASON
        </Text>

        <Text
          className='color-white'
          size={'6'}
          weight={'bold'}
          mb={'1'}
        >
          {seasonName}
        </Text>

        <Text
          className={cn('color-white', styles.seasonDescriptionText)}
          size={'2'}
          weight={'regular'}
        >
          {seasonDescription}
        </Text>
      </Flex>

      <SeasonCardProgress />

      <RewardsSeasonCardBanner className={styles.rewardsSeasonCardBanner} />
    </Flex>
  )
}
