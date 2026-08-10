import { useMutation } from '@apollo/client'
import { MUTATION_CREATE_COINSPAID_DEPOSIT } from 'api/balance/mutation-create-coinspaid-deposit'
import { notificationStateVar } from 'shared/store/notification'
import { requestedDepositAddressVar } from '../store/balance-flow-values.store'

export const useBalanceDeposit = () => {
  const [createCoinspaidDeposit, { loading }] = useMutation(
    MUTATION_CREATE_COINSPAID_DEPOSIT
  )

  // eslint-disable-next-line max-statements
  const handleCreateCoinspaidDeposit = async (
    currency: string,
    amount: number
  ) => {
    try {
      const { data } = await createCoinspaidDeposit({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        variables: { data: { currency, amount } }
      })

      const depositAddress = data?.createCoinspaidDeposit?.depositAddress

      if (!depositAddress) {
        notificationStateVar({
          isOpen: true,
          type: 'error',
          title: 'Deposit address creation failed'
        })

        return null
      }

      requestedDepositAddressVar(depositAddress)

      return depositAddress
    } catch {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Deposit address creation failed'
      })

      return null
    }
  }

  return { handleCreateCoinspaidDeposit, loading }
}
