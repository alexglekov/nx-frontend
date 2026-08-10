import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { HomePageSkeleton } from 'shared/skeletons/page-skeletons/home-page-skeleton'

const GameList = lazy(() => import('../features/games'))

export const FavoriteGamesPage: React.FC = () => {
  return (
    <>
      <Head title='Games' />
      <Suspense fallback={<HomePageSkeleton />}>
        <GameList isFavoriteList />
      </Suspense>
    </>
  )
}
