import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { useWallet } from 'shared/hooks/use-wallet'
import { userVar } from 'shared/store/user'
import { BalanceAddButton } from './balance-add-button'
import { ConfirmActionDialog } from './confirm-action-dialog'
import { DepositDialog } from './deposit-dailog'
import { OperationFailDialog } from './operation-fail-dialog'
import { OperationSuccessDialog } from './operation-success-dialog'
import { WithdrawDialog } from './withdraw-dailog'

export const BalanceAdd = () => {
  const user = useReactiveVar(userVar)
  const { isReady } = useWallet()

  if (!user || !isReady || STAND !== Stand.mainnet) return null

  return (
    <Flex
      align={'center'}
      gap={'3'}
    >
      <BalanceAddButton />

      <DepositDialog />
      <WithdrawDialog />
      <ConfirmActionDialog />
      <OperationFailDialog />
      <OperationSuccessDialog />
    </Flex>
  )
}
