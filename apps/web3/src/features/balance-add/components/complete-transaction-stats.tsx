import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { EthAssetIcon, MetamaskLogoIcon } from 'shared/icons'
import styles from '../balance-add.module.scss'

export const CompleteTransactionStats: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'4'}
      mt={'5'}
    >
      <Flex
        direction={'column'}
        width={'100%'}
        gap={'2'}
      >
        <DotTitle>ASSET</DotTitle>
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
        >
          <Flex
            align={'center'}
            gap={'2'}
          >
            <EthAssetIcon />
            <Text
              size={'2'}
              className={styles.feeText}
            >
              ETH
            </Text>
          </Flex>
          <Text
            size={'2'}
            className={styles.feeText}
          >
            0,060147 ETH
          </Text>
        </Flex>
      </Flex>

      <Flex
        width={'100%'}
        justify={'between'}
      >
        <DotTitle>FROM</DotTitle>
        <Text
          size={'2'}
          className={styles.feeText}
        >
          02xjd...g813f124r
        </Text>
      </Flex>

      <Flex
        width={'100%'}
        justify={'between'}
      >
        <DotTitle>TO</DotTitle>
        <Flex
          align={'center'}
          gap={'2'}
        >
          <Flex
            align={'center'}
            justify={'center'}
            className={styles.metamaskIconContainer}
          >
            <MetamaskLogoIcon
              width={'1.5rem'}
              height={'1.5rem'}
            />
          </Flex>
          <Text
            size={'2'}
            className={styles.feeText}
          >
            02xjd...g813f124r
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
