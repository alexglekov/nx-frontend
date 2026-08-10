import { Suspense, lazy } from 'react'
import { Head } from 'features/head'

const ReferralLanding = lazy(() => import('features/referral-landing'))

export const ReferralLandingPage: React.FC = () => {
  return (
    <>
      <Head title='Referral' />
      <Suspense fallback={<>Loading...</>}>
        <ReferralLanding />
      </Suspense>
    </>
  )
}
