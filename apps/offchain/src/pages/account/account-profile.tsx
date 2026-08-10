import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { HomePageSkeleton } from 'shared/skeletons/page-skeletons/home-page-skeleton'

const AccountProfile = lazy(() => import('features/account'))

export const AccountPage: React.FC = () => {
  return (
    <>
      <Head title='Account' />
      <Suspense fallback={<HomePageSkeleton />}>
        <AccountProfile />
      </Suspense>
    </>
  )
}
