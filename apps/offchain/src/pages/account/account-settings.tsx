import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { HomePageSkeleton } from 'shared/skeletons/page-skeletons/home-page-skeleton'

const AccountSettings = lazy(() => import('features/account-settings'))

export const AccountSettingsPage: React.FC = () => {
  return (
    <>
      <Head title='Account settings' />
      <Suspense fallback={<HomePageSkeleton />}>
        <AccountSettings />
      </Suspense>
    </>
  )
}
