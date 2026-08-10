import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { HomePageSkeleton } from 'shared/skeletons/page-skeletons/home-page-skeleton'

const AccountHistory = lazy(() => import('features/account-history'))

export const AccountHistoryPage: React.FC = () => {
  return (
    <>
      <Head title='Account history' />
      <Suspense fallback={<HomePageSkeleton />}>
        <AccountHistory />
      </Suspense>
    </>
  )
}
