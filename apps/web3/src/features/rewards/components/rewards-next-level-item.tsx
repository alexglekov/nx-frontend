import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { XyroToken } from 'shared/components'
import styles from '../rewards.module.scss'

interface Props {
  level: number
  reward: number
}
export const RewardsNextLevelItem: React.FC<Props> = ({ level, reward }) => {
  return (
    <Flex
      align={'center'}
      justify={'between'}
    >
      <Text
        className={cn('color-white', styles.rewardItemLevelText)}
        size={'1'}
        weight={'medium'}
      >
        Lvl {level}
      </Text>

      <Flex
        width={'100%'}
        className={styles.rewardLevelItemDots}
      />

      <Flex align={'center'}>
        <XyroToken
          color='yellow'
          size='2rem'
        />

        <Text
          size={'3'}
          className='color-white'
          weight={'light'}
        >
          {reward}
        </Text>
      </Flex>
    </Flex>
  )
}
