import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from '../rewards.module.scss'

interface Props {
  icon: React.ReactNode
  backgroundIconColor: 'pink' | 'cyan' | 'yellow'
  title: string
  statisticInfo: string
}

export const RewardsStatisticItem: React.FC<Props> = ({
  icon,
  statisticInfo,
  title,
  backgroundIconColor
}) => (
  <Flex
    align={'center'}
    width={'100%'}
    gap={'4'}
  >
    <Flex
      align={'center'}
      justify={'center'}
      p={'2'}
      className={cn(styles.statisticsIconContainer, {
        [styles.pink]: backgroundIconColor === 'pink',
        [styles.azure]: backgroundIconColor === 'cyan',
        [styles.yellow]: backgroundIconColor === 'yellow'
      })}
    >
      {icon}
    </Flex>

    <Flex
      direction={'column'}
      gap={'1'}
    >
      <Text
        size={'1'}
        weight={'medium'}
        className={cn(styles.statisticsItemTitle, 'color-white')}
      >
        {title}
      </Text>

      <Text
        className='color-white'
        weight={'medium'}
        size={'5'}
      >
        {statisticInfo}
      </Text>
    </Flex>
  </Flex>
)
