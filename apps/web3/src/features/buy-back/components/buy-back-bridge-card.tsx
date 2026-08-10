import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { PoweredByChainlinkIcon } from 'shared/icons'
import { BuyBackBridgeCardForm } from './buy-back-bridge-card-form'
import styles from '../buy-back.module.scss'

export const BuyBackBridgeCard: React.FC = () => (
  <Flex
    minWidth={'40rem'}
    minHeight={'15rem'}
    className={styles.swapCard}
    p={'6'}
    justify={'center'}
    direction={'column'}
  >
    <Flex
      align={'center'}
      justify={'center'}
      direction={'column'}
      maxWidth={'58.5rem'}
      mb={'5'}
    >
      <Text
        size={'6'}
        align={'center'}
        className='color-white'
        mb={'5'}
      >
        Bridge XYRO
      </Text>

      <Text
        className='color-gray-light'
        align={'center'}
        size={'1'}
      >
        Swap XYRO tokens between Arbitrum and Ethereum quickly and securely.
        Fast, easy, and low fees — start now
      </Text>
    </Flex>

    <BuyBackBridgeCardForm />

    <Flex
      width={'100%'}
      align={'center'}
      justify={'center'}
      mt={'5'}
    >
      <PoweredByChainlinkIcon />
    </Flex>
  </Flex>
)
