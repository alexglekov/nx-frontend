import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { RoundedSquareSkeleton } from 'shared/skeletons'

const UserSettings = lazy(() => import('features/user-settings'))

export const UserSettingsPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Head title='Settings' />
      <Suspense fallback={<RoundedSquareSkeleton height='100rem' />}>
        <UserSettings />
      </Suspense>
    </>
  )
}
