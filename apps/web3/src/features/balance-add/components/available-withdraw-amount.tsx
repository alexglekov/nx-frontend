import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { XyroToken } from 'shared/ui/xyro-token'
import styles from '../balance-add.module.scss'

export const AvailableWithdrawAmount: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'1'}
      mt={'5'}
    >
      <DotTitle>AVAILABLE FOR WITHDRAWAL</DotTitle>
      <Flex
        align={'center'}
        gap={'1'}
      >
        <XyroToken
          size={'2rem'}
          color='yellow'
        />
        <Text
          weight={'light'}
          className={styles.textWhite}
          size={'5'}
        >
          10,540.25
        </Text>
      </Flex>
    </Flex>
  )
}
