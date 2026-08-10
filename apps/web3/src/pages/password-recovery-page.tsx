import { Suspense, lazy } from 'react'
import { Head } from 'features/head'

const PasswordRecovery = lazy(() => import('features/password-recovery'))

export const PasswordRecoveryPage: React.FC = () => {
  return (
    <>
      <Head title='XYRO' />
      <Suspense fallback={<>Loading...</>}>
        <PasswordRecovery />
      </Suspense>
    </>
  )
}
