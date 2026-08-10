import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { RewardsPageSkeleton } from 'features/rewards'

const Rewards = lazy(() => import('features/rewards'))

export const RewardsPage: React.FC = () => {
  return (
    <>
      <Head title='Rewards' />
      <Suspense fallback={<RewardsPageSkeleton />}>
        <Rewards />
      </Suspense>
    </>
  )
}
