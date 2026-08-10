import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { RewardsPageSkeleton } from 'features/rewards'

const Referrals = lazy(() => import('features/referrals'))

export const ReferralsPage: React.FC = () => {
  return (
    <>
      <Head title='Referrals' />
      <Suspense fallback={<RewardsPageSkeleton />}>
        <Referrals />
      </Suspense>
    </>
  )
}
