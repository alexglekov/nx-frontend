import { Flex } from '@radix-ui/themes'
import { Head } from 'features/head'
import { PriceChart } from 'features/price-chart'

export const DevPage: React.FC = () => {
  return (
    <>
      <Head title='Deposits' />
      <Flex
        style={{ minHeight: '87.5rem' }}
        height={'100%'}
        width={'100%'}
        direction='column'
      >
        <PriceChart assetId={'BTC'} />
      </Flex>
    </>
  )
}
