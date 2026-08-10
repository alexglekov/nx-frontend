import { Flex, Heading, Text } from '@radix-ui/themes'
import { Head } from 'features/head'
import React from 'react'

export const FundingPaymentsPage: React.FC = () => {
  return (
    <>
      <Head title='Funding payments' />
      <Flex
        direction={'column'}
        gap={'3'}
        p={'5'}
      >
        <Heading as='h1'>FUNDING FEES</Heading>
        <Text
          size={'2'}
          style={{ maxWidth: '100rem' }}
        >
          Similar to futures exchanges, Xyro charges a 0.1%/hour funding fee for
          keeping a position open in the x1000 gaming mode for over 8 hours. In
          a bullish market, players with open long positions pay those with
          short positions; by contrast, in a bearish market it&apos;s the
          players with open short positions who pay the long traders. A game
          that is closed within 8 hours doesn&apos;t incur a funding fee.
        </Text>
        <Heading
          as='h3'
          mt={'5'}
        >
          Liquidation and SL price
        </Heading>
        <Text
          size={'2'}
          style={{ maxWidth: '100rem' }}
        >
          Any position in the Futures x1000 mode comes with a liquidation price
          that is determined when the position is opened. If that price is
          reached, the player loses the whole original bid amount (but no more
          than that). The player is also encouraged to set an SL (stop loss)
          price that is between the position open price and the liquidation
          price, in order to limit the potential losses.
        </Text>
      </Flex>
    </>
  )
}
