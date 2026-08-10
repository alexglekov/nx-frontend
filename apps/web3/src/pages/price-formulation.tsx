/* eslint-disable max-lines */
import { Flex, Heading, Text } from '@radix-ui/themes'
import { Head } from 'features/head'
import React from 'react'

export const PriceFormulationPage: React.FC = () => {
  return (
    <>
      <Head title='Price formulation' />
      <Flex
        p={'5'}
        direction={'column'}
        gap={'2'}
      >
        <Heading
          mb={'6'}
          as='h1'
        >
          Price formulation
        </Heading>

        <Flex
          direction={'column'}
          gap={'2'}
          mb={'3'}
        >
          <Heading
            size={'4'}
            as='h2'
          >
            XYRO Index Prices
          </Heading>
          <Text>
            We use real-time API data from 7 of the biggest crypto exchanges,
            updated every 0.5 seconds. These individual price quotes are
            combined according to a formula to produce a single reliable index.
            By using data from 7 exchanges, Xyro makes sure that the index
            remains reliable even if one of the exchanges experiences downtime
            or abnormal volatility.
          </Text>
        </Flex>

        <Flex
          direction={'column'}
          gap={'2'}
          mb={'3'}
        >
          <Heading
            size={'4'}
            as='h2'
          >
            INDEX CONSTITUENTS
          </Heading>
          <Text
            size={'3'}
            weight={'bold'}
          >
            The exchanges we source data from are:
          </Text>
          <Text>
            <ul>
              <li>Binance</li>
              <li>KuCoin</li>
              <li>Kraken</li>
              <li>Huobi</li>
              <li>OKEx</li>
              <li>ByBit</li>
              <li>BigGet</li>
            </ul>
          </Text>
          <Text
            size={'3'}
            weight={'bold'}
          >
            Leverage markets
          </Text>
          <Text>
            <ul>
              <li>Binance (Coin-Margined)</li>
              <li>Binance (USDT-Margined)</li>
              <li>Huobi (Coin-Margined)</li>
              <li>Huobi (USDT-Margined)</li>
              <li>OKEx (Coin-Margined)</li>
              <li>OKEx (USDT-Margined)</li>
            </ul>
          </Text>
        </Flex>

        <Text size={'3'}>
          When constructing the price index, we followed the principles listed
          below:
        </Text>
        <Text>
          <ul>
            <li>
              Use all the market depth levels provided as part of the API
              stream;
            </li>
            <li>
              Update the index only when at least 6 active data streams are
              available;
            </li>
            <li>
              Filter out any data stream where the current price differs by 10%
              or more from the median price on other exchanges;
            </li>
            <li>
              Filter out any data stream where there haven&apos;t been any
              updates for the past 30 seconds;
            </li>
            <li>
              Merge all active buy and sell limit orders on each exchange into a
              single compound order book, while capping each order at $1
              million.
            </li>
          </ul>
        </Text>

        <Text>
          The index price methodology has been designed to satisfy two important
          statistical properties of time series: the Markov and martingale
          properties. The Markov property refers to the memoryless nature of a
          stochastic process, which ensures that the conditional probability
          distribution of future values only depends on the current value. The
          martingale property implies that the current value of a stochastic
          process is also the expected value of future values. These two
          properties make XYRO&apos;s index prices unbiased estimators of future
          prices, so that users can choose the changes in value of the
          underlying cryptocurrencies without having to worry about the
          microstructure effects of individual exchanges.
        </Text>

        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Text
            size={'3'}
            weight={'bold'}
          >
            Index formulas
          </Text>
          <ol>
            <li>
              {`
                The composite buy price is defined as:
                Price_buy(Size) = max{price_n | sum_{n in 1..N}{size_n} <= Size}
                where price_n | sum_{n in 1..N} are the buy prices in the composite book sorted by increasing difference from the highest bid price, while {size_n} are order sizes that correspond to those buy prices.
                
                The result of the function is the highest bid price for a specific order
                size. Similarly, the function for the lowest ask price to sell a size is 
                
                Price_sell = max{price_n | sum_{n in 1..N}{size_n} <= Size}
              `}
            </li>
            <li>
              {`
                Using the two functions above, we can calculate the composite mid-price for a set size:
                Price_mid(Size) = (Price_buy(Size) + Price_sell(size)) / 2                
              `}
            </li>
            <li>
              {`
                The function above is calculated for each of the sizes in the composite order book. The resulting mid-price values are weighted  according to the formula
                Weight_i = ScF * exp(-L * ComSize_i),
                where ComSize_i are the combined buy and sell sizes for each price level and ScF is the scaling factor calculated as 1/(MaxSize), where MaxSize is the maximum size used to calculate the mid-price. 
              `}
            </li>
          </ol>
        </Flex>
        <Text size={'2'}>
          The final result is a single price quote that is used in all gaming
          modes on Xyro.
        </Text>
      </Flex>
    </>
  )
}
