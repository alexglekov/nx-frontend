import { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
import { SetupGamePoolInfo } from '__generated__/graphql'
import { Maybe } from 'shared/types'
import { RadixText } from 'shared/ui'
import { SetupsExitStrategyOption } from '../setups-exit-strategy-option/exit-strategy-option'

export const GameDetail = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <Flex justify={'between'}>
      <RadixText color='gray'>{title}:</RadixText>
      <RadixText>{children}</RadixText>
    </Flex>
  )
}

export const SetupsViewBetPools = ({
  takeProfitPool,
  stopLossPool,
  startPrice,
  tpPrice,
  slPrice
}: {
  takeProfitPool: SetupGamePoolInfo
  stopLossPool: SetupGamePoolInfo
  startPrice: Maybe<number>
  tpPrice: number
  slPrice: number
}) => {
  return (
    <Flex
      align={'start'}
      gap={'1'}
    >
      <SetupsExitStrategyOption
        pool={takeProfitPool}
        priceType='TP'
        startPrice={startPrice}
        price={tpPrice}
      />
      <SetupsExitStrategyOption
        pool={stopLossPool}
        priceType='SL'
        startPrice={startPrice}
        price={slPrice}
      />
    </Flex>
  )
}
