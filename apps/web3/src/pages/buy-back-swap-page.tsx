import { Suspense, lazy } from 'react'
import { Head } from 'features/head'

const BuybackSwapTab = lazy(() =>
  import('features/buy-back').then(module => ({
    default: module.BuybackSwapTab
  }))
)

export const BuyBackSwapPage: React.FC = () => {
  return (
    <>
      <Head title='Trade' />
      <Suspense fallback={<>Loading..</>}>
        <BuybackSwapTab />
      </Suspense>
    </>
  )
}
