import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import { roundPriceWithRelativePrecision } from 'features/price-graph/utils/round-price-with-relative-precision'
import { Maybe } from 'graphql/jsutils/Maybe'
import { DotTitle, RadixText } from 'shared/ui'
import { SetupsPriceChangeBadge } from '../setups-game-view/setups-price-change-badge'

interface Props {
  isLightAppearance: boolean
  isTakeProfit: boolean
  startPrice: Maybe<number>
  price: Maybe<number>
}
export const SetupsExitStrategyPrice: FC<Props> = ({
  isLightAppearance,
  startPrice,
  price,
  isTakeProfit
}) => {
  const label = isTakeProfit ? 'TAKE PROFIT:' : 'STOP LOSS:'
  const changePercent =
    price && startPrice ? ((price - startPrice) / startPrice) * 100 : null

  return (
    <Flex
      direction={'column'}
      gap='2'
    >
      <DotTitle
        color={isLightAppearance ? 'black' : 'gray'}
        withDot={false}
      >
        {label}
      </DotTitle>

      <Flex
        gap='1'
        align='center'
        wrap={'wrap'}
      >
        {price ? (
          <RadixText
            size={'3'}
            weight={'light'}
          >
            {roundPriceWithRelativePrecision(price)}
          </RadixText>
        ) : null}

        {changePercent && (
          <SetupsPriceChangeBadge
            changePercent={changePercent}
            isTakeProfit={isTakeProfit}
            isLight={isLightAppearance}
          />
        )}
      </Flex>
    </Flex>
  )
}
