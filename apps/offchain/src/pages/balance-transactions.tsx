import { Suspense, lazy } from 'react'
import { Head } from 'features/head'

const BalanceTransactions = lazy(() => import('features/balance-transactions'))

export const BalanceTransactionPage: React.FC = () => {
  return (
    <>
      <Head title='XYRO' />
      <Suspense fallback={'Loading...'}>
        <BalanceTransactions />
      </Suspense>
    </>
  )
}
