import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SwapXyroToken, UserIcon } from 'shared/icons'
import { TetherToken } from 'shared/ui'
import { useGetUpDownContracts } from '../hooks/use-get-up-down-contracts'
import styles from '../mode-up-down.module.scss'

interface Props {
  poolSize?: number
  betsCount?: number
}

export const PoolSizeInfo: React.FC<Props> = ({ poolSize, betsCount }) => {
  const { currentUpDownSmartContract } = useGetUpDownContracts()

  return (
    <Flex
      align={'center'}
      justify={'center'}
      gap={'3'}
      mb={'6'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        gap={'1'}
      >
        <UserIcon color='var(--gray-9)' />

        <Text
          className={styles.poolBetsCountText}
          weight={'regular'}
          size={'3'}
        >
          {betsCount || 0}
        </Text>
      </Flex>

      <Flex
        gap='1'
        align='center'
      >
        {currentUpDownSmartContract?.smartContractForXyroToken ?
          <SwapXyroToken
            width={'2.5rem'}
            height={'2.5rem'}
          />
        : <TetherToken
            size='2.5rem'
            className='color-yellow'
          />
        }

        <Text
          size={'3'}
          weight={'light'}
        >
          {poolSize || 0}
        </Text>
      </Flex>
    </Flex>
  )
}
