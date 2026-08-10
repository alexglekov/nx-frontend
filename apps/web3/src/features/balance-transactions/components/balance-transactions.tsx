import { useQuery } from '@apollo/client'
import { Button, Card, Flex, Heading } from '@radix-ui/themes'
import { ListTransactionsQuery, TransactionType } from '__generated__/graphql'
import { GET_PAYMENT_TRANSACTIONS } from 'api/payments/list-transactions'
import {
  isDepositDialogOpenVar,
  isWithdrawDialogOpenVar
} from 'features/balance-add/store/dialogs-balance-store'
import { BetsTable } from 'shared/ui'
import { balanceTransactionsTableColumns } from './balance-tansactions-table-columns'
import styles from '../balance-transactions.module.scss'

const EMPTY_STATE_TEXT = "You don't have any balance operations yet"

interface Props {
  isDeposit: boolean
}

export const BalanceTransactions: React.FC<Props> = ({ isDeposit }) => {
  const { data } = useQuery<ListTransactionsQuery>(GET_PAYMENT_TRANSACTIONS)

  const handleDeposit = () => isDepositDialogOpenVar(true)
  const handleWithdraw = () => isWithdrawDialogOpenVar(true)

  const list = data?.listTransactions
    ? data?.listTransactions.filter(
        item =>
          (isDeposit && item.type === 'DEPOSIT') ||
          (!isDeposit && item.type === 'WITHDRAW')
      )
    : ([] as TransactionType[])

  return (
    <Card
      size={'3'}
      className={styles.balanceTransactions}
    >
      <Flex
        gap={'3'}
        justify={'between'}
        align={'center'}
        mb={'5'}
      >
        <Heading
          as='h1'
          size={'7'}
          weight={'medium'}
          className='color-white'
        >
          {isDeposit ? 'Deposit' : 'Withdrawals'}
        </Heading>

        {isDeposit ? (
          <Button
            className={styles.actionButton}
            onClick={handleDeposit}
          >
            Deposit
          </Button>
        ) : (
          <Button
            className={styles.actionButton}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        )}
      </Flex>

      {/* <BetsTable
        columns={balanceTransactionsTableColumns}
        bets={list}
        emptyStateText={EMPTY_STATE_TEXT}
      /> */}
    </Card>
  )
}
