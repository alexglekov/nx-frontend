import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { MUTATION_ACTIVATE_BONUS } from 'api/account/mutation-activate-bonus'
import { MUTATION_CANCEL_BONUS } from 'api/account/mutation-cancel-bonus'
import { QUERY_GET_ACTIVE_BONUS } from 'api/account/query-get-active-bonus'
import { QUERY_GET_AVAILABLE_BONUSES } from 'api/account/query-get-available-bonuses'
import { QUERY_GET_COMPLETED_BONUSES } from 'api/account/query-get-completed-bonuses'
import { QUERY_GET_WELCOME_BONUS_TEMPLATE } from 'api/account/query-get-welcome-bonus-templates'
import { QUERY_GET_WELCOME_BONUSES } from 'api/account/query-get-welcome-bonuses'
import { useUser } from 'features/auth/hooks/use-user'
import { notificationStateVar } from 'shared/store/notification'
import { BonusCategory } from '../../../__generated__/graphql'
import {
  accountBonusActiveTabVar,
  accountBonusStatusSelectorVar
} from '../store'
import { AccountBonusTab, BonusStatusSelector } from '../types'

// eslint-disable-next-line max-statements
export const useAccountBonuses = () => {
  const { refetchUser } = useUser()
  const accountBonusStatusSelector = useReactiveVar(
    accountBonusStatusSelectorVar
  )

  const accountBonusActiveTab = useReactiveVar(accountBonusActiveTabVar)

  const isAvailableBonusesTabSelected =
    accountBonusStatusSelector === BonusStatusSelector.AVAILABLE

  const isWelcomeBonusesTabSelected =
    accountBonusActiveTab === AccountBonusTab.WELCOME_PACK

  const [commitCancelBonus, { loading: bonusCancelationLoading }] = useMutation(
    MUTATION_CANCEL_BONUS
  )

  const {
    data: activeBonusQuery,
    loading: activeBonusLoading,
    refetch: activeBonusRefetch
  } = useQuery(QUERY_GET_ACTIVE_BONUS)

  const {
    data: availableBonusesQuery,
    loading: availableBonusesLoading,
    refetch: availableBonusesRefetch
  } = useQuery(QUERY_GET_AVAILABLE_BONUSES, {
    skip: !isAvailableBonusesTabSelected
  })

  const {
    data: welcomeBonusesQuery,
    loading: welcomeBonusesLoading,
    refetch: welcomeBonusesRefetch
  } = useQuery(QUERY_GET_WELCOME_BONUSES, {
    skip: !isWelcomeBonusesTabSelected
  })

  const {
    data: welcomeBonusTemplatesQuery,
    loading: welcomeBonusTemplateLoading
  } = useQuery(QUERY_GET_WELCOME_BONUS_TEMPLATE, {
    skip: !isWelcomeBonusesTabSelected
  })

  const {
    data: completedBonusesQuery,
    loading: completedBonusesLoading,
    refetch: completedBonusesRefetch
  } = useQuery(QUERY_GET_COMPLETED_BONUSES, {
    skip: isAvailableBonusesTabSelected
  })

  const [commitActivateBonus, { loading: bonusActivationLoading }] =
    useMutation(MUTATION_ACTIVATE_BONUS)

  const bonusesLoading = availableBonusesLoading || completedBonusesLoading

  const activeBonus = activeBonusQuery?.getActiveBonus?.active
  const availableBonuses = availableBonusesQuery?.getAvailableBonuses || []
  const completedBonuses = completedBonusesQuery?.getCompletedBonuses || []
  const welcomeBonuses = welcomeBonusesQuery?.getWelcomeBonuses || []
  const welcomeBonusesTemplates =
    welcomeBonusTemplatesQuery?.getWelcomeBonusTemplates || []

  const filteredAvailableBonuses = availableBonuses.filter(
    bonus => bonus.category !== BonusCategory.Cashback
  )

  const bonuses =
    isAvailableBonusesTabSelected ? filteredAvailableBonuses : completedBonuses

  const handleActivateBonus = async (bonusId: string) => {
    try {
      await commitActivateBonus({
        variables: {
          data: {
            bonusId
          }
        }
      })

      await activeBonusRefetch()

      await refetchUser()

      if (isWelcomeBonusesTabSelected) {
        void welcomeBonusesRefetch()
      }

      if (isAvailableBonusesTabSelected) {
        availableBonusesRefetch()
      } else {
        completedBonusesRefetch()
      }
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

      await activeBonusRefetch()

      if (isWelcomeBonusesTabSelected) {
        void welcomeBonusesRefetch()
      }

      if (isAvailableBonusesTabSelected) {
        availableBonusesRefetch()
      } else {
        completedBonusesRefetch()
      }
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
    activeBonusLoading,
    bonuses,
    welcomeBonuses,
    welcomeBonusesTemplates,
    bonusesLoading,
    welcomeBonusesLoading,
    handleActivateBonus,
    handleCancelBonus,
    bonusCancelationLoading,
    bonusActivationLoading,
    welcomeBonusTemplateLoading,
    completedBonusesRefetch
  }
}
