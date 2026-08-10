import { Flex } from '@radix-ui/themes'
import { ContractAddressHeader } from 'shared/ui'
import { BURN_ADDRESS } from '../constants'
import { useGetBuybackTXS } from '../hooks/use-get-buyback-txs'
import { useGetRevenueTXS } from '../hooks/use-get-revenue-txs'
import { BuyBackWrapper } from './buy-back-wrapper'
import { BuybackHistory } from './buyback-history'
import { BuybackedStats } from './buybacked-stats'
import { Revenue } from './revenue'
import { Supply } from './supply'

export const BuyBackTokenTab = () => {
  useGetBuybackTXS('xyro')
  useGetRevenueTXS()

  return (
    <BuyBackWrapper>
      <Flex
        width={'100%'}
        gap={'4'}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <Revenue />

        <BuybackedStats />

        <Flex
          direction={'column'}
          gap={'3'}
          maxWidth={{ initial: '100%', sm: '45rem' }}
        >
          <ContractAddressHeader
            title={'Wallet address'}
            address={BURN_ADDRESS}
          />

          <Supply />
        </Flex>
      </Flex>

      <BuybackHistory />
    </BuyBackWrapper>
  )
}
