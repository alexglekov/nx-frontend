import { Suspense, lazy } from 'react'
import { Head } from 'features/head'

const BuyBackBridgeTab = lazy(() =>
  import('features/buy-back').then(module => ({
    default: module.BuyBackBridgeTab
  }))
)

export const BuyBackBridgePage: React.FC = () => {
  return (
    <>
      <Head title='Bridge' />
      <Suspense fallback={<>Loading..</>}>
        <BuyBackBridgeTab />
      </Suspense>
    </>
  )
}
