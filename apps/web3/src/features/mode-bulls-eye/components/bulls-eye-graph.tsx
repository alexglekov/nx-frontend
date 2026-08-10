import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import PriceGraph from 'features/price-graph'
import { useResponsive } from 'shared/hooks/use-responsive'
import { AssetId } from 'shared/types'
import { useBullsEyeAnnotation } from '../hooks/use-bulls-eye-annotation'
import { bullsEyeChartAnnotationsVar } from '../store/bulls-eye-chart-annotations'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import { BullsEyeFormMyBets } from './bulls-eye-form-my-bets'
import { BullsEyeFormSubmitFields } from './bulls-eye-form-submit-fields'
import { BullsEyeGameInfo } from './bulls-eye-game-info'
import { BullsEyeGraphHeader } from './bulls-eye-graph-header'
import { BullsEyeWinnerModal } from './bulls-eye-winner-modal'
import styles from '../mode-bulls-eye.module.scss'

export const BullsEyeGraph: React.FC = () => {
  const [isMobile] = useResponsive('xs')

  useBullsEyeAnnotation()
  const annotations = useReactiveVar(bullsEyeChartAnnotationsVar)

  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )

  const graphAssetId = currentBullsEyeSmartContract?.meta?.asset || 'BTC'

  return (
    <Flex
      className={styles.bullsEyeGraph}
      direction={{ xs: 'row', sm: 'row', initial: 'column' }}
      position={'relative'}
    >
      {isMobile && <BullsEyeGameInfo />}

      <BullsEyeWinnerModal />

      <Flex
        className={styles.graphInnerWrapper}
        direction={'column'}
        width={'100%'}
        justify={'between'}
      >
        <BullsEyeGraphHeader />

        <PriceGraph
          assetId={graphAssetId as AssetId}
          withPadding={true}
          annotations={annotations}
          isDark={Boolean(isMobile)}
        />
      </Flex>

      {isMobile && (
        <>
          <BullsEyeFormSubmitFields />

          <BullsEyeFormMyBets />
        </>
      )}
    </Flex>
  )
}
