import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Grid, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useAccountBonuses } from '../hooks/use-account-bonuses'
import { useCashbackBonuses } from '../hooks/use-cashback-bonuses'
import { accountBonusStatusSelectorVar } from '../store'
import { BonusStatusSelector } from '../types'
import { AccountBonusesListItem } from './account-bonuses-list-item'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

interface Props {
  mode?: 'cashback' | 'bonuses'
}

export const AccountBonusesList: React.FC<Props> = ({ mode = 'bonuses' }) => {
  const { bonuses: allBonuses } = useAccountBonuses()
  const { bonuses: cashbackBonuses } = useCashbackBonuses()

  const accountBonusStatusSelector = useReactiveVar(
    accountBonusStatusSelectorVar
  )

  const isAvailableSectionSelected =
    accountBonusStatusSelector === BonusStatusSelector.AVAILABLE

  const handleChangeSelectorSection = (type: BonusStatusSelector) => {
    accountBonusStatusSelectorVar(type)
  }

  const bonuses = mode === 'cashback' ? cashbackBonuses : allBonuses

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'3.75rem'}
      className={styles.bonusListWrapper}
    >
      <Text
        size={'7'}
        weight={'medium'}
        className='color-white'
      >
        Available bonuses for activation
      </Text>

      {mode === 'bonuses' && (
        <Flex
          align={'center'}
          justify={'between'}
        >
          <Flex
            align={'center'}
            gap={'3.75rem'}
          >
            <Text
              className={cn('cursor-pointer', {
                ['color-pink']: isAvailableSectionSelected,
                ['color-gray']: !isAvailableSectionSelected
              })}
              weight={'medium'}
              size={{ initial: '4', sm: '2' }}
              onClick={() =>
                handleChangeSelectorSection(BonusStatusSelector.AVAILABLE)
              }
            >
              All
            </Text>

            <Text
              className={cn('cursor-pointer', {
                ['color-pink']: !isAvailableSectionSelected,
                ['color-gray']: isAvailableSectionSelected
              })}
              weight={'medium'}
              size={{ initial: '4', sm: '2' }}
              onClick={() =>
                handleChangeSelectorSection(BonusStatusSelector.COMPLETED)
              }
            >
              Completed
            </Text>
          </Flex>
        </Flex>
      )}

      {bonuses.length === 0 ?
        <Flex
          align={'center'}
          justify={'center'}
          height={'45rem'}
        >
          <Text
            size={'5'}
            className='color-gray'
          >
            There is no bonuses in this section {':('}
          </Text>
        </Flex>
      : <Grid
          columns={{ initial: '1fr', sm: '1fr 1fr 1fr' }}
          gap={'1.5rem'}
        >
          {bonuses.map(b => {
            return (
              <AccountBonusesListItem
                key={b.id}
                bonus={b}
              />
            )
          })}
        </Grid>
      }
    </Flex>
  )
}
