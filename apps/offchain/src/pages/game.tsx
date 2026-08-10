import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { HomePageSkeleton } from 'shared/skeletons/page-skeletons/home-page-skeleton'

const Game = lazy(() => import('../features/game'))

export const GamePage: React.FC = () => {
  return (
    <>
      <Head title='Game' />
      <Suspense fallback={<HomePageSkeleton />}>
        <Game />
      </Suspense>
    </>
  )
}
