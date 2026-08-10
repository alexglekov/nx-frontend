import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Maybe } from 'shared/types'
import { formatToUSD } from 'shared/utils/format-price'
import styles from '../../table.module.scss'

interface Props {
  stopLoss: Maybe<number>
  startPrice: Maybe<number>
  takeProfit: Maybe<number>
}
export const TableItemTarget: React.FC<Props> = ({
  stopLoss,
  startPrice,
  takeProfit
}) => {
  const formattedStopLoss = stopLoss ? formatToUSD(stopLoss) : '—'
  const formattedStartPrice = startPrice ? formatToUSD(startPrice) : '—'
  const formattedTakeProfit = takeProfit ? formatToUSD(takeProfit) : '—'

  return (
    <Flex
      direction='column'
      gap={'1'}
      height={'100%'}
      className={styles.tableItemTarget}
    >
      <Flex
        align={'center'}
        gap={'6'}
        height={'100%'}
      >
        <Text
          size={'3'}
          color='gray'
        >
          EP
        </Text>
        <Text size={'3'}>{formattedStartPrice}</Text>
      </Flex>

      {takeProfit ? (
        <Flex
          align={'center'}
          gap={'6'}
        >
          <Text
            size={'3'}
            color='green'
          >
            TP
          </Text>
          <Text size={'3'}>{formattedTakeProfit}</Text>
        </Flex>
      ) : null}

      {stopLoss ? (
        <Flex
          align={'center'}
          gap={'6'}
        >
          <Text
            size={'3'}
            color='pink'
          >
            SL
          </Text>
          <Text size={'3'}>{formattedStopLoss}</Text>
        </Flex>
      ) : null}
    </Flex>
  )
}
