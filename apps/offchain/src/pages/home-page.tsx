import { Suspense, lazy } from 'react'
import { Head } from 'features/head'
import { HomePageSkeleton } from 'shared/skeletons/page-skeletons/home-page-skeleton'

const Home = lazy(() => import('features/home'))

export const HomePage: React.FC = () => {
  return (
    <>
      <Head title='XYRO' />
      <Suspense fallback={<HomePageSkeleton />}>
        <Home />
      </Suspense>
    </>
  )
}
