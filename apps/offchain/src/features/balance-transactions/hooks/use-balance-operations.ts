import { useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { TransactionType } from '__generated__/graphql'
import { QUERY_GET_OPERATIONS_HISTORY } from 'api/balance/get-operations-histrory'
import { accountHistoryActiveTabVar } from 'features/account-history/store'
import { AccountHistoryTab } from 'features/account-history/types'

const BALANCE_OPERATION_BETS_TAKE = 5

export const useBalanceOperations = () => {
  const accountHistoryActiveTab = useReactiveVar(accountHistoryActiveTabVar)

  const [balanceOperationsTableBetsSkip, setBalanceOperationsTableBetsSkip] =
    useState(0)

  const { data, loading } = useQuery(QUERY_GET_OPERATIONS_HISTORY, {
    variables: {
      data: {
        type:
          accountHistoryActiveTab === AccountHistoryTab.DEPOSIT ?
            TransactionType.Deposit
          : TransactionType.Withdrawal
      },
      pagination: {
        take: BALANCE_OPERATION_BETS_TAKE,
        skip: balanceOperationsTableBetsSkip
      }
    }
  })

  const balanceOperations = data?.getOperationHistory?.data || []
  const balanceOperationsTotal =
    data?.getOperationHistory.pagination?.total || 0

  const isDepositActive = Boolean(
    accountHistoryActiveTab === AccountHistoryTab.DEPOSIT
  )

  return {
    balanceOperations,
    balanceOperationsTotal,
    loading,
    BALANCE_OPERATION_BETS_TAKE,
    balanceOperationsTableBetsSkip,
    setBalanceOperationsTableBetsSkip,
    isDepositActive
  }
}
