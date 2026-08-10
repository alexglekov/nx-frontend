import { lazy, Suspense } from 'react'
import { Head } from 'features/head'
import { gameIdViewVar } from 'features/mode-one-vs-one/store/game-view-store'
import { useQueryParams } from 'shared/hooks/use-query'
import { OneVsOnePageSkeleton } from 'shared/skeletons/page-skeletons/one-vs-one-page-skeleton'

const OneVsOneMode = lazy(() => import('features/mode-one-vs-one'))

export const OneVsOneModePage: React.FC = () => {
  const query = useQueryParams()
  const gameId = query.get('gameId')

  if (gameId) {
    gameIdViewVar(gameId)
  }

  return (
    <>
      <Head title='One versus One' />
      <Suspense fallback={<OneVsOnePageSkeleton />}>
        <OneVsOneMode />
      </Suspense>
    </>
  )
}
