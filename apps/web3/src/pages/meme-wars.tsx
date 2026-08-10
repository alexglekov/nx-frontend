import { lazy, Suspense } from 'react'
import { Head } from 'features/head'
import { BullsEyePageSkeleton } from 'shared/skeletons/page-skeletons/bulls-eye-page-skeleton'

const MemeWarsMode = lazy(() => import('features/mode-meme-wars'))

export const MemeWarsModePage: React.FC = () => {
  return (
    <>
      <Head title='Meme wars' />
      {/* TODO: Replace with proper skeleton */}
      <Suspense fallback={<BullsEyePageSkeleton />}>
        <MemeWarsMode />
      </Suspense>
    </>
  )
}
