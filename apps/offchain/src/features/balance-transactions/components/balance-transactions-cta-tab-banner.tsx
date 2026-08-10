import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from '../balance-transactions.module.scss'

export const BalanceTransactionsCTATabBanner: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'2.5rem'}
      className={styles.ctaTabBannerWrapper}
    >
      <Text
        className={cn(styles.ctaTabBannerText, 'color-gray-light')}
        size={'6'}
        weight={'bold'}
      >
        <Text className='color-white'>Claim your bonuses</Text> now and unlock
        even more benefits!
      </Text>

      <Flex
        direction={'column'}
        gap={'1'}
      >
        <Text
          className='color-gray-light'
          size={'2'}
          weight={'medium'}
        >
          Bonus Balance
        </Text>

        <Text
          className='color-cyan'
          weight={'bold'}
          size='7'
        >
          $0.00
        </Text>
      </Flex>
    </Flex>
  )
}
