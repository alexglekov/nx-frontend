import { Flex } from '@radix-ui/themes'
import { Maybe, SetupsGameFragment } from '__generated__/graphql'
import PriceGraph from 'features/price-graph'
import { PriceGraphStub } from 'features/price-graph/components/price-graph-stub'
import { ChartAnnotations } from 'features/price-graph/types'
import { DataTestIDs } from 'shared/constants'
import { AssetId } from 'shared/types'
import styles from '../../mode-setups.module.scss'

export const SetupsPriceGraph = ({
  game,
  annotations
}: {
  game?: Maybe<SetupsGameFragment>
  annotations: Maybe<ChartAnnotations>
}) => {
  const assetId = game?.asset?.id

  return (
    <>
      {assetId ?
        <PriceGraph
          assetId={assetId as AssetId}
          annotations={annotations}
          withHeader
          isDark
          assetNameDataTestID={DataTestIDs.setupsSelectedAssetName}
          priceAmountDataTestID={DataTestIDs.setupsSelectedAssetPrice}
        />
      : <PriceGraphStub />}
    </>
  )
}
