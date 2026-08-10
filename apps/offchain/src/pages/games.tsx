import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { GamesPageSkeleton } from '../shared/skeletons/games/games-page-skeleton'

const GameList = lazy(() => import('../features/games'))

export const GamesPage: React.FC = () => {
  return (
    <>
      <Head title='Games' />
      <Suspense fallback={<GamesPageSkeleton />}>
        <GameList />
      </Suspense>
    </>
  )
}
