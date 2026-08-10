import { Suspense, lazy } from 'react'
import { Head } from 'features/head'

const BuyBackTokenTab = lazy(() =>
  import('features/buy-back').then(module => ({
    default: module.BuyBackTokenTab
  }))
)

export const BuyBackTokenPage: React.FC = () => {
  return (
    <>
      <Head title='Token' />
      <Suspense fallback={<>Loading..</>}>
        <BuyBackTokenTab />
      </Suspense>
    </>
  )
}
