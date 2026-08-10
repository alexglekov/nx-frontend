import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { RoundedSquareSkeleton } from 'shared/skeletons'

const UserAccount = lazy(() => import('features/user-account'))

export const UserAccountPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Head title='Account' />
      <Suspense fallback={<RoundedSquareSkeleton height='100rem' />}>
        <UserAccount />
      </Suspense>
    </>
  )
}
