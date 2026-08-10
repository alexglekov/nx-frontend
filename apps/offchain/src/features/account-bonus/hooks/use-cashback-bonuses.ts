import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { MUTATION_ACTIVATE_CASHBACK_BONUS } from 'api/account/mutation-activate-cashback-bonus'
import { MUTATION_CANCEL_BONUS } from 'api/account/mutation-cancel-bonus'
import { QUERY_GET_ACTIVE_CASHBACK_BONUS } from 'api/account/query-get-active-cashback-bonus'
import { QUERY_GET_AVAILABLE_CASHBACK_BONUSES } from 'api/account/query-get-available-cashback-bonuses'
import { useUser } from 'features/auth/hooks/use-user'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from '../../../shared/store/user'
import { accountBonusActiveTabVar } from '../store'
import { AccountBonusTab } from '../types'
import { useAccountBonuses } from './use-account-bonuses'

// eslint-disable-next-line max-statements
export const useCashbackBonuses = () => {
  const { completedBonusesRefetch } = useAccountBonuses()
  const { refetchUser } = useUser()
  const user = useReactiveVar(userVar)

  const cashbackBonuses = user?.loyaltyProgress?.cashbackBonuses || []

  const accountBonusActiveTab = useReactiveVar(accountBonusActiveTabVar)

  const isCashbackBonusesTabSelected =
    accountBonusActiveTab === AccountBonusTab.CASHBACK

  const [commitCancelBonus, { loading: bonusCancelationLoading }] = useMutation(
    MUTATION_CANCEL_BONUS
  )

  const {
    data: activeCashbackBonusQuery,
    loading: activeCashbackBonusLoading,
    refetch: activeCashbackBonusRefetch
  } = useQuery(QUERY_GET_ACTIVE_CASHBACK_BONUS)

  const {
    data: availableCashbackBonusesQuery,
    loading: availableCashbackBonusesLoading,
    refetch: availableCashbackBonusesRefetch
  } = useQuery(QUERY_GET_AVAILABLE_CASHBACK_BONUSES, {
    skip: !isCashbackBonusesTabSelected
  })

  const [commitActivateBonus, { loading: bonusActivationLoading }] =
    useMutation(MUTATION_ACTIVATE_CASHBACK_BONUS)

  const bonusesLoading =
    activeCashbackBonusLoading || availableCashbackBonusesLoading

  const activeBonus = activeCashbackBonusQuery?.getActiveCashbackBonus?.active
  const availableBonuses =
    availableCashbackBonusesQuery?.getAvailableCashbackBonuses || []

  const bonuses = [...cashbackBonuses, ...availableBonuses]

  const handleActivateBonus = async (bonusId: string) => {
    try {
      await commitActivateBonus({
        variables: {
          data: {
            bonusId
          }
        }
      })

      await activeCashbackBonusRefetch()

      await refetchUser()

      await availableCashbackBonusesRefetch()
    } catch (e: any) {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Error',
        description: e?.message || ''
      })
    }
  }

  const handleCancelBonus = async (bonusId: string) => {
    try {
      await commitCancelBonus({
        variables: {
          data: {
            bonusId
          }
        }
      })

      await activeCashbackBonusRefetch()

      await refetchUser()

      await availableCashbackBonusesRefetch()

      await completedBonusesRefetch()
    } catch (e: any) {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Error',
        description: e?.message || ''
      })
    }
  }

  return {
    activeBonus,
    bonuses,
    bonusesLoading,
    handleActivateBonus,
    handleCancelBonus,
    bonusCancelationLoading,
    bonusActivationLoading
  }
}
