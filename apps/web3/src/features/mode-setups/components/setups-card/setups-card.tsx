import { Card, Flex } from '@radix-ui/themes'
import { SetupsGameFragment } from '__generated__/graphql'
import classNames from 'classnames'
import { DataTestIDs, MS_IN_SEC } from 'shared/constants'
import { Seconds } from 'shared/types'
import { useSetupGameSubscription } from '../../hooks/use-setup-game-subscription'
import { isAddPredictDialogOpenVar } from '../../store/dialogs'
import { SetupsExitStrategyOption } from '../setups-exit-strategy-option/exit-strategy-option'
import { SetupsCardHeader } from './setups-card-header'
import { SetupsInfluencerPreview } from './setups-card-influencer-preview'
import { SetupsCardLabel } from './setups-card-label'
import { SetupsCardStats } from './setups-card-stats'
import styles from '../../mode-setups.module.scss'

interface Props {
  setup: SetupsGameFragment
  onSetupSelect: (setupId: string) => void
  refetch?: () => void
}
// eslint-disable-next-line max-statements
export const SetupsCard: React.FC<Props> = ({
  setup: {
    id,
    isLong,
    startPrice,
    stopLossPool,
    startAt,
    takeProfitPool,
    owner,
    endAt,
    stopPredictAt,
    stopLoss,
    takeProfit,
    asset
  },
  onSetupSelect: handleSetupSelect
}) => {
  const { pools: updatedPools } = useSetupGameSubscription(id, {
    takeProfitPool: takeProfitPool,
    stopLossPool: stopLossPool
  })

  const handleCardClick = () => {
    if (!id) return
    handleSetupSelect(id)
    isAddPredictDialogOpenVar(true)
  }

  const timeframe = endAt && startAt ? (endAt - startAt) / MS_IN_SEC : null

  const cardClassName = classNames(styles.setupCard)

  return (
    <Flex
      onClick={handleCardClick}
      className={cardClassName}
      p={'4'}
      data-testid={DataTestIDs.cardOpenedSetup}
    >
      <Flex
        direction={'column'}
        position={'relative'}
      >
        {owner ?
          <SetupsInfluencerPreview user={owner} />
        : null}

        <SetupsCardHeader
          assetId={asset.id}
          isLong={isLong}
          timeframe={timeframe as Seconds}
        />

        <SetupsCardStats
          startPrice={startPrice ?? null}
          stopPredictAt={stopPredictAt ?? null}
          timeframe={(timeframe as Seconds) ?? null}
        />

        {updatedPools && (
          <Flex
            align={'stretch'}
            gap={'1'}
          >
            <SetupsExitStrategyOption
              pool={updatedPools?.takeProfit}
              priceType='TP'
              startPrice={startPrice}
              price={takeProfit}
            />
            <SetupsExitStrategyOption
              pool={updatedPools.stopLoss}
              priceType='SL'
              startPrice={startPrice}
              price={stopLoss}
            />
          </Flex>
        )}

        <SetupsCardLabel />
      </Flex>
    </Flex>
  )
}
