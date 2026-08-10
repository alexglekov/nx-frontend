import { Head } from 'features/head'
import { Suspense, lazy } from 'react'
import { ProfilePageSkeleton } from 'shared/skeletons/page-skeletons/profile-page-skeleton'

const UserProfile = lazy(() => import('features/user-profile'))

export const ProfilePage: React.FC = (): JSX.Element => {
  return (
    <>
      <Head title='Profile' />
      <Suspense fallback={<ProfilePageSkeleton />}>
        <UserProfile />
      </Suspense>
    </>
  )
}
