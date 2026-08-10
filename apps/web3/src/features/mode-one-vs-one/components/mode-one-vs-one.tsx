import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import PriceGraph from 'features/price-graph'
import { PriceGraphStub } from 'features/price-graph/components/price-graph-stub'
import { DataTestIDs } from 'shared/constants'
import { useContractVolume } from 'shared/hooks/use-contract-volume'
import { useResponsive } from 'shared/hooks/use-responsive'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { OnboardingOneVsOne } from 'shared/icons'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { userVar } from 'shared/store/user'
import { AssetId } from 'shared/types'
import {
  ContractAddressHeader,
  ModeInfoHeader,
  ModeOnboarding
} from 'shared/ui'
import { formatToUSD } from 'shared/utils/format-price'
import { ChartStyle } from '../../price-chart/tradingview'
import { useOneVsOneGamesChanged } from '../hooks/use-one-vs-one-games-changed'
import { useOneVsOneTableCounters } from '../hooks/use-one-vs-one-table-counters'
import { oneVsOneChartTypeVar } from '../store/game-chart-type-store'
import { GameCreateButton } from './game-create-button'
import { GameCreateDialog } from './game-create-dialog'
import { CreateBetForm } from './one-vs-one-create-form'
import { OneVsOneMyBetsTable } from './one-vs-one-my-bets-table'
import { OneVsOneOpenBetsTable } from './one-vs-one-open-bets-table'
import styles from '../mode-one-vs-one.module.scss'

// eslint-disable-next-line max-statements
export const OneVsOneMode = () => {
  const selectedAsset = useReactiveVar(selectedAssetVar)
  const user = useReactiveVar(userVar)
  const currentChartType = useReactiveVar(oneVsOneChartTypeVar)
  const assetId = selectedAsset?.id ?? null

  const { smartContractAddress, smartContractEntry } =
    useGetSmartContract('OneVsOne')

  useOneVsOneGamesChanged()
  useOneVsOneTableCounters()

  const [isMobile] = useResponsive('xs')

  const currentGameFee =
    (Number(smartContractEntry?.contracts?.[0]?.meta?.fee) || 0) * 100

  const { gameModeVolume, loading } = useContractVolume(smartContractAddress)

  const gameModeVolumeValue =
    loading ? 'Loading...' : formatToUSD(gameModeVolume)

  return (
    <div className={styles.wrapper}>
      <ModeOnboarding
        mode={'oneVsOne'}
        headingIcon={<OnboardingOneVsOne />}
      />

      <GameCreateButton />

      <Flex
        direction={{ initial: 'column', sm: 'row' }}
        align={'stretch'}
        width={'100%'}
        gap={'2'}
      >
        <ModeInfoHeader
          items={[
            { title: 'Fee for this game', value: `${currentGameFee}%` },
            { title: 'Volume, 24h', value: gameModeVolumeValue }
          ]}
        />
        <ContractAddressHeader address={smartContractAddress} />
      </Flex>

      {!isMobile && (
        <div className={styles.container}>
          <CreateBetForm />

          {assetId ?
            <PriceGraph
              assetId={assetId as AssetId}
              withHeader
              chartLineType={ChartStyle.Candle}
              chartType={currentChartType}
              assetNameDataTestID={DataTestIDs.oneVsOneSelectedAssetName}
              priceAmountDataTestID={DataTestIDs.oneVsOneSelectedAssetPrice}
              setChartType={() =>
                oneVsOneChartTypeVar(
                  currentChartType === 'gamified' ? 'tradingview' : 'gamified'
                )
              }
            />
          : <PriceGraphStub />}
        </div>
      )}

      <OneVsOneOpenBetsTable />

      {Boolean(user) && <OneVsOneMyBetsTable />}
      <GameCreateDialog />
    </div>
  )
}
