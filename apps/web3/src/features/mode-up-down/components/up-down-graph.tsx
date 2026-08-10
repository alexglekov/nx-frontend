import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import PriceGraph from 'features/price-graph'
import { AssetId } from 'shared/types'
import { upDownBasePriceVar } from '../store/up-down-base-price'
import { upDownChartAnnotationsVar } from '../store/up-down-chart-annotations'
import { upDownCurrentContractVar } from '../store/up-down-contract-addresses.store'
import { UpDownHistory } from './game-history'
import { UpDownGraphHeader } from './up-down-graph-header'
import { UpDownWinnersModal } from './up-down-winners-modal'
import styles from '../mode-up-down.module.scss'

export const UpDownGraph = () => {
  const annotations = useReactiveVar(upDownChartAnnotationsVar)
  const basePrice = useReactiveVar(upDownBasePriceVar)

  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  const graphAssetId = currentUpDownSmartContract?.meta?.asset || 'BTC'

  return (
    <Flex
      position={'relative'}
      className={styles.upDownGraph}
    >
      <UpDownWinnersModal />

      <Flex
        className={styles.graphInnerWrapper}
        direction={'column'}
        width={'100%'}
      >
        <UpDownGraphHeader />

        <PriceGraph
          assetId={graphAssetId as AssetId}
          withPadding={true}
          annotations={annotations}
          isDark
          basePrice={basePrice}
        />

        <UpDownHistory />
      </Flex>
    </Flex>
  )
}
