import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { BullsEyePageSkeleton } from 'shared/skeletons/page-skeletons/bulls-eye-page-skeleton'

const ModeBullsEye = lazy(() => import('features/mode-bulls-eye'))

export const BullsEyeModePage: React.FC = () => {
  return (
    <>
      <Head title='Bulls Eye' />
      <Suspense fallback={<BullsEyePageSkeleton />}>
        <ModeBullsEye />
      </Suspense>
    </>
  )
}
