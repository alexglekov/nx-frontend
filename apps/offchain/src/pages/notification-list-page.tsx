import { Head } from 'features/head'
import { Suspense, lazy } from 'react'

const NotificationList = lazy(() => import('features/full-notification-list'))

export const NotificationListPage: React.FC = () => {
  return (
    <>
      <Head title='Notifications' />
      <Suspense fallback={<p>Loading...</p>}>
        <NotificationList />
      </Suspense>
    </>
  )
}
