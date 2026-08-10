import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import {
  OneVsOneGame,
  OneVsOneExactPricePredict,
  OneVsOneUpDownGame,
  OneVsOneUpDownPredict
} from '__generated__/graphql'
import { assetsGlobalVar } from 'shared/store/assets-store'
import { AssetId, OneVsOnePredict } from 'shared/types'
import { getAssetByFeedId } from 'shared/utils/get-asset-by-feed-id'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { PredictCondition } from './predict-condition'
import styles from './table.module.scss'

interface Props {
  predict: OneVsOneUpDownPredict | OneVsOneExactPricePredict
  game: OneVsOneUpDownGame | OneVsOneGame
}

export const TableItemPredictCondition: FC<Props> = ({ game, predict }) => {
  const assets = useReactiveVar(assetsGlobalVar)
  const currentAsset = getAssetByFeedId(game.feedId, assets)
  const currentAssetId = currentAsset ? (currentAsset.id as AssetId) : 'BTC'
  const AssetIcon = getAssetIconById(currentAssetId)

  return (
    <Flex
      align={'center'}
      height={'100%'}
      style={{ minWidth: '12rem' }}
      gap={'2'}
    >
      <AssetIcon />
      <Text
        size={'3'}
        weight={'light'}
        className={styles.tableItemAssetShortName}
      >
        {currentAssetId}
      </Text>

      <Flex
        className={styles.tableItemDirectionWrapper}
        align={'center'}
        gap={'1'}
      >
        <PredictCondition predict={predict as OneVsOnePredict} />
      </Flex>
    </Flex>
  )
}
