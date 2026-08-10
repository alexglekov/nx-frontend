import { useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { balanceVar } from 'shared/store/balance-store'
import {
  activeBalanceClaimSwitchTypeVar,
  activeBalanceSwitchTypeVar
} from '../store/switch-types'
import { ClaimBalanceSwitchTypes } from '../types'
import { getFormattedBalances } from '../utils/get-formatted-balances'
import styles from '../approved-balance.module.scss'

export const ApprovedBalanceInputLabel = () => {
  const activeType = useReactiveVar(activeBalanceClaimSwitchTypeVar)
  const activeBalanceType = useReactiveVar(activeBalanceSwitchTypeVar)

  const balance = useReactiveVar(balanceVar)

  const { formattedAllowance, formattedBalance, formattedTreasury } =
    getFormattedBalances(activeBalanceType, balance)

  const fieldTitle = useMemo(() => {
    if (activeType === ClaimBalanceSwitchTypes.Deposit) {
      return 'APPROVED BALANCE'
    }

    if (activeType === ClaimBalanceSwitchTypes.Claim) {
      return 'AVAILABLE TO CLAIM'
    }

    return 'WALLET BALANCE'
  }, [activeType])

  const balanceValue = useMemo(() => {
    if (activeType === ClaimBalanceSwitchTypes.Deposit) {
      return formattedAllowance
    }

    if (activeType === ClaimBalanceSwitchTypes.Claim) {
      return formattedTreasury
    }

    return formattedBalance
  }, [activeType, formattedTreasury, formattedBalance, formattedAllowance])

  return (
    <Flex
      className={styles.approvedFormAmountLabel}
      gap={'1'}
      pl={'2'}
    >
      <Text
        size={'1'}
        weight={'bold'}
        color='gray'
      >
        {fieldTitle}:
      </Text>

      <Text
        size={'1'}
        weight={'bold'}
        className={'color-white'}
        data-testid={DataTestIDs.treasureAvailableAmount}
      >
        {balanceValue}
      </Text>
    </Flex>
  )
}
