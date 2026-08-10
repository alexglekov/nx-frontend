import { useMutation } from '@apollo/client'
import { MUTATION_CREATE_COINSPAID_WITHDRAWAL } from 'api/balance/mutation-create-coinspaid-withdrawal'
import { Web3Adress } from 'shared/types'

export const useBalanceWithdraw = () => {
  const [createCoinspaidWithdrawal, { loading }] = useMutation(
    MUTATION_CREATE_COINSPAID_WITHDRAWAL
  )

  const handleCreateCoinspaidWithdrawal = async (
    address: Web3Adress,
    amount: number,
    currency: string
  ) => {
    await createCoinspaidWithdrawal({
      variables: { data: { address, amount, currency } }
    })
  }

  return {
    handleCreateCoinspaidWithdrawal,
    loading
  }
}
