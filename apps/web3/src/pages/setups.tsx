import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { SetupsPageSkeleton } from 'shared/skeletons/page-skeletons/setups-page-skeleton'

const ModeSetups = lazy(() => import('features/mode-setups'))

export const SetupsModePage: React.FC = () => {
  return (
    <>
      <Head title='Setups' />
      <Suspense fallback={<SetupsPageSkeleton />}>
        <ModeSetups />
      </Suspense>
    </>
  )
}
