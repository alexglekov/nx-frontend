import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import classNames from 'classnames'
import { useAssetPriceSubscription } from 'shared/hooks/use-asset-price-subscription'
import { TetherAssetIcon, UserIcon } from 'shared/icons'
import { assetsGlobalVar } from 'shared/store/assets-store'
import { AssetId } from 'shared/types'
import { formatToUSD } from 'shared/utils/format-price'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import {
  memeWarsGameStateVar,
  memeWarsGameVar
} from '../store/meme-wars-game.store'
import styles from '../mode-meme-wars.module.scss'

interface Props {
  assetId: AssetId
}

// eslint-disable-next-line complexity, max-statements
export const MemeWarsAssetInfo: React.FC<Props> = ({ assetId }) => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)
  const assetsList = useReactiveVar(assetsGlobalVar)
  const memeWarsGameState = useReactiveVar(memeWarsGameStateVar)
  const liveAssetPrice = useAssetPriceSubscription(assetId)

  const AssetIcon = getAssetIconById(assetId)

  const assetPrecision =
    assetsList?.find(asset => asset.id === assetId)?.precision || 3

  const assetFeedIndex = memeWarsGame?.feedsIds.findIndex(
    feedId => feedId === assetId
  )
  const assetStartPrice = memeWarsGame?.startPrices[assetFeedIndex || 0] || 0
  const assetEndDiff = memeWarsGame?.priceDiffs[assetFeedIndex || 0] || 0

  const livePriceDiff = (liveAssetPrice / assetStartPrice - 1) * 100
  const resultedPriceDiff = assetEndDiff ? assetEndDiff : livePriceDiff

  const formattedPriceDiff =
    resultedPriceDiff > 0 ?
      `+${resultedPriceDiff.toFixed(2)}%`
    : `${resultedPriceDiff.toFixed(2)}%`

  const priceDiffToShow =
    (
      (memeWarsGameState === 'INPROGRESS' || memeWarsGameState === 'PENDING') &&
      isFinite(resultedPriceDiff) &&
      !isNaN(resultedPriceDiff)
    ) ?
      formattedPriceDiff
    : formatToUSD(liveAssetPrice, assetPrecision)

  const assetPoolSize =
    memeWarsGame?.predicts.filter(predict => predict.feedId === assetId)
      .length || 0
  const assetPoolAmount = memeWarsGame?.predicts.reduce((acc, predict) => {
    if (predict.feedId === assetId) {
      return acc + predict.amount
    }

    return acc
  }, 0)

  const isPriceDiffPositive =
    resultedPriceDiff >= 0 && memeWarsGameState !== 'OPEN'
  const isPriceDiffNegative =
    resultedPriceDiff < 0 && memeWarsGameState !== 'OPEN'

  const formattedAssetPoolAmount = formatToUSD(assetPoolAmount)

  return (
    <Flex
      className={styles.memeWarsAssetInfo}
      gap='2'
    >
      <AssetIcon
        width={'4rem'}
        height={'4rem'}
      />

      <Flex
        direction={'column'}
        gap={'1'}
        width={'100%'}
      >
        <Text
          mb={'1'}
          size={{ initial: '6', sm: '2' }}
        >
          {assetId}
        </Text>

        <Flex
          className={styles.assetPriceDiff}
          width={'100%'}
        >
          <Text
            className={classNames(styles.priceDiffText, {
              [styles.priceDiffTextPositive]: isPriceDiffPositive,
              [styles.priceDiffTextNegative]: isPriceDiffNegative
            })}
            size={{ initial: '4', sm: '1' }}
          >
            {priceDiffToShow}
          </Text>
        </Flex>

        <Flex
          align={'center'}
          gap={{ initial: '5', sm: '2' }}
          width={'100%'}
        >
          <Flex
            align={'center'}
            gap={'1'}
          >
            <UserIcon
              width={'2rem'}
              height={'2rem'}
            />

            <Text size={{ initial: '5', sm: '2' }}>{assetPoolSize}</Text>
          </Flex>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <TetherAssetIcon
              width={'2rem'}
              height={'2rem'}
              color='yellow'
            />

            <Text size={{ initial: '5', sm: '2' }}>
              {formattedAssetPoolAmount}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
