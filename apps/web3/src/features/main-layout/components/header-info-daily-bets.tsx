import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { JoystickIcon } from 'shared/icons'
import styles from '../header.module.scss'

interface Props {
  totalBets: number
}
export const HeaderInfoDailyBets: React.FC<Props> = ({ totalBets }) => {

  if (!totalBets) return null

  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        p={'2'}
        className={cn('xyro-border', styles.headerIconContainer)}
      >
        <JoystickIcon color='var(--c-white-alpha-1)' />
      </Flex>

      <Flex direction={'column'}>
        <Text
          size={'1'}
          className='color-white'
          weight={'medium'}
        >
          Games played today
        </Text>

        <Text
          size={'3'}
          weight={'light'}
          className='color-white'
        >
          {totalBets}
        </Text>
      </Flex>
    </Flex>
  )
}
