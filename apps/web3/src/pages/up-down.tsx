import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { UpDownPageSkeleton } from 'shared/skeletons/page-skeletons/up-down-page-skeleton'
const UpDownMode = lazy(() => import('features/mode-up-down'))

export const UpDownModePage: React.FC = () => {
  return (
    <>
      <Head title='Up Down' />
      <Suspense fallback={<UpDownPageSkeleton />}>
        <UpDownMode />
      </Suspense>
    </>
  )
}
