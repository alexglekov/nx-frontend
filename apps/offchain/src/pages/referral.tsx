import { Suspense, lazy } from 'react'
import { Head } from 'features/head'

const Referral = lazy(() => import('../features/referral'))

export const ReferralPage: React.FC = () => {
  return (
    <>
      <Head title='Referral' />
      <Suspense fallback={<>Loading</>}>
        <Referral />
      </Suspense>
    </>
  )
}
