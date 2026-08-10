import React from 'react'
import { Flex } from '@radix-ui/themes'
import { BalanceTransactionsCTATabBanner } from './balance-transactions-cta-tab-banner'
import { BalanceTransactionsCTATabButtons } from './balance-transactions-cta-tab-buttons'
import styles from '../balance-transactions.module.scss'

export const BalanceTransactionsCTATab: React.FC = () => {
  return (
    <Flex
      className={styles.ctaTabContainer}
      width={'100%'}
      align={'center'}
      direction={{ initial: 'column', sm: 'row' }}
    >
      <BalanceTransactionsCTATabButtons />

      <BalanceTransactionsCTATabBanner />
    </Flex>
  )
}
