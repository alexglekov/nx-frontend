import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { HomePageSkeleton } from 'shared/skeletons/page-skeletons/home-page-skeleton'

const AccountBonus = lazy(() => import('features/account-bonus'))

export const AccountBonusPage: React.FC = () => {
  return (
    <>
      <Head title='Account bonus' />
      <Suspense fallback={<HomePageSkeleton />}>
        <AccountBonus />
      </Suspense>
    </>
  )
}
