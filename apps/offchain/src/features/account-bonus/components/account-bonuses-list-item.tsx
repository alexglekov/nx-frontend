/* eslint-disable max-statements, complexity */
import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import {
  Bonus,
  BonusCategory,
  BonusStatus,
  BonusType,
  LoyaltyBonus
} from '__generated__/graphql'
import { differenceInDays } from 'date-fns'
import {
  BonusAccountCup,
  BonusAccountCupActive,
  RealAccountCup,
  RealAccountCupActive
} from 'shared/icons'
import { formatDate } from 'shared/utils/format-date'
import { useAccountBonuses } from '../hooks/use-account-bonuses'
// TODO: Split styles file per feature
import { useCashbackBonuses } from '../hooks/use-cashback-bonuses'
import styles from '../../account/account.module.scss'

interface Props {
  bonus: Bonus | LoyaltyBonus
}

export const AccountBonusesListItem: React.FC<Props> = ({ bonus }) => {
  const { handleActivateBonus, bonusActivationLoading } = useAccountBonuses()
  const {
    handleActivateBonus: handleActivateCashbackBonus,
    bonusActivationLoading: bonusCashbackActivationLoading
  } = useCashbackBonuses()

  const {
    id,
    amount,
    name,
    status,
    type,
    burnedAt,
    closedAt,
    createdAt,
    category
  } = bonus

  const isBonusActive =
    status === BonusStatus.Active || status === BonusStatus.Available
  const isBonusCompleted = status === BonusStatus.Completed

  const isActivateButtonShown = Boolean(status === BonusStatus.Available)

  const isRealAccount = type === BonusType.Real

  const now = new Date()
  const activeBonusExpirationDate = formatDate(burnedAt, false)
  const bonusClosedDate = formatDate(closedAt || 0, false)
  const bonusActiveDaysAmount = differenceInDays(now, createdAt)

  const bonusAmountClassname =
    isBonusCompleted ? 'color-green'
    : isBonusActive ? 'color-white'
    : 'color-gray'

  const isCashbackBonus = category === BonusCategory.Cashback

  const handleBonusClick = (bonusId: string) => {
    if (isCashbackBonus) {
      handleActivateCashbackBonus(bonusId)
    } else {
      handleActivateBonus(bonusId)
    }
  }

  return (
    <Flex
      direction={'column'}
      className={styles.accountBunusesListItem}
      gap={'2rem'}
    >
      <Flex
        align={'center'}
        gap={'3'}
      >
        {isRealAccount ?
          isBonusActive ?
            <RealAccountCupActive />
          : <RealAccountCup />
        : isBonusActive ?
          <BonusAccountCupActive />
        : <BonusAccountCup />}

        <Flex
          direction={'column'}
          gap={'2'}
        >
          {isRealAccount ?
            <Text
              className='color-green'
              weight={'medium'}
            >
              Real account
            </Text>
          : <Text
              color='purple'
              weight={'medium'}
            >
              Bonus account
            </Text>
          }

          <Flex
            align={'center'}
            gap={'1'}
          >
            <Text className='color-gray'>
              {isBonusActive ? 'Active:' : 'Finish:'}
            </Text>

            <Text className='color-white'>
              {!isBonusActive ?
                bonusClosedDate
              : `${bonusActiveDaysAmount} day(-s)`}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Text
        className='color-white'
        size={'4'}
        weight={'medium'}
      >
        {name}
      </Text>

      {isBonusActive ?
        <Flex
          align={'center'}
          gap={'1'}
        >
          <Text className='color-gray'>Expiration date:</Text>

          <Text className='color-white'>{activeBonusExpirationDate}</Text>
        </Flex>
      : null}

      <Flex
        direction={'column'}
        gap={'1'}
      >
        {!isBonusActive ?
          <Text
            className='color-gray'
            weight={'medium'}
          >
            Received:
          </Text>
        : null}
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
        >
          <Text
            className={bonusAmountClassname}
            weight={'light'}
            size={'5'}
          >
            {isBonusCompleted ? '+' : ''}
            {!isCashbackBonus && ' $'}
            {isCashbackBonus ? amount * 100 : amount.toFixed(2)}
            {isCashbackBonus && '%'}
          </Text>

          {isActivateButtonShown && (
            <Button
              color='pink'
              variant='outline'
              onClick={() => handleBonusClick(id)}
              disabled={
                bonusActivationLoading || bonusCashbackActivationLoading
              }
            >
              <Text
                color='pink'
                weight={'bold'}
                size={'2'}
              >
                {bonusActivationLoading || bonusCashbackActivationLoading ?
                  'Loading...'
                : 'ACTIVATE'}
              </Text>
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
