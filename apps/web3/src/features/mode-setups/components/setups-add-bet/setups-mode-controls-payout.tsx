import React from 'react'
import { Badge, Flex, Text } from '@radix-ui/themes'
import { SetupsGamePoolFragment } from '__generated__/graphql'
import styles from '../../mode-setups.module.scss'

interface Props {
  takeProfitPool: SetupsGamePoolFragment
  stopLossPool: SetupsGamePoolFragment
}
export const SetupsModeControlsPayout: React.FC<Props> = ({
  takeProfitPool,
  stopLossPool
}) => {
  return (
    <Flex
      align={'center'}
      gap={'2'}
      width={'100%'}
    >
      <Flex
        align={'center'}
        gap={'1'}
        width={'100%'}
        justify={'center'}
      >
        <Text
          size={'1'}
          weight={'bold'}
          className={styles.payoutText}
        >
          TP PAYOUT
        </Text>
        <Badge
          size={'1'}
          color={'orange'}
          radius={'large'}
        >
          x{takeProfitPool.multiplier.toFixed(2)}
        </Badge>
      </Flex>

      <Flex
        align={'center'}
        gap={'1'}
        width={'100%'}
        justify={'center'}
      >
        <Text
          size={'1'}
          weight={'bold'}
          className={styles.payoutText}
        >
          SL PAYOUT
        </Text>
        <Badge
          size={'1'}
          color={'orange'}
          radius={'large'}
        >
          x{stopLossPool.multiplier.toFixed(2)}
        </Badge>
      </Flex>
    </Flex>
  )
}
