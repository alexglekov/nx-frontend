import React from 'react'
import { Flex } from '@radix-ui/themes'
import { BuyBackBridgeCard } from './buy-back-bridge-card'
import { BuyBackWrapper } from './buy-back-wrapper'
import styles from '../buy-back.module.scss'

export const BuyBackBridgeTab: React.FC = () => (
  <BuyBackWrapper>
    <Flex
      width={'100%'}
      align={'center'}
      justify={'center'}
      className={styles.buybackBridgeTab}
    >
      <BuyBackBridgeCard />
    </Flex>
  </BuyBackWrapper>
)
