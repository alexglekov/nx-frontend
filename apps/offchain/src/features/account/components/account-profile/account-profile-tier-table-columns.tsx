import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { createColumnHelper } from '@tanstack/react-table'
import { LoyaltyLevelEntity, LoyaltyRewardType } from '__generated__/graphql'
import { userVar } from 'shared/store/user'
import { TableItemAnyText, TableItemProfit } from 'shared/ui/bets-table'
import styles from '../../account.module.scss'

const columnHelper = createColumnHelper<LoyaltyLevelEntity & { tier: number }>()

const user = userVar()
const userTier = user?.loyaltyProgress?.tier || 1
const userLevel = user?.loyaltyProgress?.lvl || 1

const levelColumn = columnHelper.accessor(row => row, {
  header: 'LVL',
  cell: ctx => {
    const { lvl: level, tier } = ctx.getValue()

    const isUserLevel = tier === userTier && level === userLevel

    return (
      <Flex
        height={'100%'}
        align={'center'}
        gap={'2'}
        className={styles.tierColumnPrizeText}
      >
        <Text size={{ initial: '1', sm: '3' }}>{level}</Text>

        {isUserLevel && (
          <Text
            size={{ initial: '1', sm: '3' }}
            className={'color-gray'}
          >
            (you)
          </Text>
        )}
      </Flex>
    )
  }
})

const turnoverColumn = columnHelper.accessor('turnover', {
  header: 'Turnover (real)',
  cell: ctx => {
    return (
      <TableItemProfit
        value={Number(ctx.getValue())}
        variant='tether'
        isTokenRounded
      />
    )
  }
})

const cashbackColumn = columnHelper.accessor('cashback', {
  header: 'Cashback',
  cell: ctx => {
    const percentage = Number(ctx.getValue()) * 100

    return <TableItemAnyText text={`${percentage.toFixed(0)}%`} />
  }
})

const wagerColumn = columnHelper.accessor('wager', {
  header: 'Wager',
  cell: ctx => {
    return <TableItemAnyText text={`${Number(ctx.getValue())}x`} />
  }
})

const prizeColumn = columnHelper.accessor('prize', {
  header: 'Prize',
  cell: ctx => {
    const prize = ctx.getValue()

    const prizeAmount = prize?.amount || 0
    const wagerAmount = prize?.wager || 0
    const type = prize?.type

    if (!prizeAmount && !wagerAmount) {
      return <TableItemAnyText text='—' />
    }

    if (type === LoyaltyRewardType.Tierup) {
      return (
        <Flex
          height={'100%'}
          align={'center'}
          className={styles.tierColumnPrizeText}
        >
          <Text className={'color-gray-light'}>
            Next week cashback{' '}
            <Text className={'color-white'}>
              +{(prizeAmount * 100).toFixed(0)}%
            </Text>
          </Text>
        </Flex>
      )
    }

    return (
      <Flex
        height={'100%'}
        align={'center'}
        className={styles.tierColumnPrizeText}
      >
        <Text className={'color-white'}>
          {prizeAmount && (
            <>
              <Text
                as={'span'}
                className={'color-gray-light'}
              >
                Bonus{' '}
              </Text>{' '}
              ${prizeAmount}{' '}
              <Text
                as={'span'}
                className={'color-gray-light'}
              >
                (wager{' '}
              </Text>{' '}
              {wagerAmount}
              <Text
                as={'span'}
                className={'color-gray-light'}
              >
                )
              </Text>
            </>
          )}
        </Text>
      </Flex>
    )
  }
})

export const accountProfileTierTableColumns = [
  levelColumn,
  turnoverColumn,
  cashbackColumn,
  wagerColumn,
  prizeColumn
]
