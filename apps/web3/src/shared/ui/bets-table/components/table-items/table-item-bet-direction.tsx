import React from 'react'
import { Flex } from '@radix-ui/themes'
import { BetType } from '__generated__/graphql'
import { BetCondition } from '../bet-condition'
import styles from '../../table.module.scss'

interface Props {
  betType: BetType
  betPrice: number
  isBetUp: boolean
}
export const TableItemBetDirection: React.FC<Props> = ({
  betPrice,
  betType,
  isBetUp
}) => {
  return (
    <Flex
      align={'center'}
      height={'100%'}
      style={{ minWidth: '12rem' }}
    >
      <Flex
        className={styles.tableItemDirectionWrapper}
        align={'center'}
        gap={'1'}
      >
        <BetCondition
          betType={betType}
          betPrice={betPrice}
          isBetUp={isBetUp}
        />
      </Flex>
    </Flex>
  )
}
