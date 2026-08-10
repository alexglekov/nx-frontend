import { useEffect } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import { ListAssetsQuery, PredictStatus } from '__generated__/graphql'
import { LIST_ASSETS } from 'api/list-assets'
import { FRAGMENT_SETUPS_PREDICT_SHALLOW } from 'api/mode-setups'
import PriceGraph from 'features/price-graph'
import { PriceGraphStub } from 'features/price-graph/components/price-graph-stub'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { AssetId } from 'shared/types'
import { WinnerModal } from 'shared/ui'
import { useChartAnnotationsManager } from '../../../price-graph/hooks/use-chart-annotations-manager'
import { useControlSetupWinnerModalState } from '../../hooks/use-control-setup-winner-modal-state'
import { useSetupWinnerModalBets } from '../../hooks/use-setup-winner-modal-participants-list'
import { selectedSetupVar } from '../../store/selected-setup'
import { setupsChartAnnotationsVar } from '../../store/setups-chart-annotations'
import { SetupsAddPredictForm } from './setups-add-bet-form'
import { SetupsGameStats } from './setups-game-result-stats'
import styles from '../../mode-setups.module.scss'

// eslint-disable-next-line max-statements
export const SetupsAddPredictCard: React.FC = () => {
  const selectedSetup = useReactiveVar(selectedSetupVar)
  const { setAnnotations } = useChartAnnotationsManager(
    setupsChartAnnotationsVar
  )
  const [isMobile] = useResponsive('xs')

  const setupBets = useSetupWinnerModalBets()

  const { isWinnerModalOpen } = useControlSetupWinnerModalState()

  const { data } = useQuery<ListAssetsQuery>(LIST_ASSETS, {
    onError: err => {
      console.error(err)
    }
  })

  const myPredict = useFragment(
    FRAGMENT_SETUPS_PREDICT_SHALLOW,
    selectedSetup?.myPredict
  )

  useEffect(() => {
    if (!selectedSetup?.startPrice) return

    const annotations = [
      { name: 'stopLoss' as const, value: selectedSetup.stopLoss },
      { name: 'takeProfit' as const, value: selectedSetup.takeProfit },
      { name: 'entryPoint' as const, value: selectedSetup?.startPrice }
    ]
    setAnnotations({
      horizontal: annotations
    })
  }, [selectedSetup])

  if (!selectedSetup) return null

  const selectedAssetId =
    data?.listAssets.find(a => a.id === selectedSetup.asset.id)?.id || null

  const isUserWin = myPredict?.status === PredictStatus.Won
  const isUserPlayed = Boolean(myPredict)

  return (
    <Flex
      gap='2'
      position={'relative'}
      height={'100%'}
      className={styles.setupsGameFormWithGraph}
    >
      <WinnerModal
        participantsList={setupBets}
        isOpen={isWinnerModalOpen}
        title='Setup'
        isUserPlayed={isUserPlayed}
        isWin={isUserWin}
      >
        <SetupsGameStats
          assetId={selectedAssetId as AssetId}
          myBet={myPredict || null}
        />
      </WinnerModal>

      {isMobile && (
        <Flex className={styles.graphContainer}>
          {selectedAssetId ?
            <PriceGraph
              assetId={selectedAssetId as AssetId}
              annotations={setupsChartAnnotationsVar()}
              withHeader
              isDark
              assetNameDataTestID={DataTestIDs.setupsSelectedAssetName}
              priceAmountDataTestID={DataTestIDs.setupsSelectedAssetPrice}
            />
          : <PriceGraphStub />}
        </Flex>
      )}

      <SetupsAddPredictForm setup={selectedSetup} />

      {!isMobile && (
        <Flex className={styles.graphContainer}>
          {selectedAssetId ?
            <PriceGraph
              assetId={selectedAssetId as AssetId}
              annotations={setupsChartAnnotationsVar()}
              withHeader
              isDark
              assetNameDataTestID={DataTestIDs.setupsSelectedAssetName}
              priceAmountDataTestID={DataTestIDs.setupsSelectedAssetPrice}
            />
          : <PriceGraphStub />}
        </Flex>
      )}
    </Flex>
  )
}
