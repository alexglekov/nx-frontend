import { Flex, Text } from '@radix-ui/themes'
import { Asset } from '__generated__/graphql'
import { SparklineChart } from 'features/price-graph/components/sparkline-chart'
import { AssetId } from 'shared/types'
import { formatToUSD } from 'shared/utils/format-price'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  asset: Asset | null
}
export const GameAssetSparkline: React.FC<Props> = ({ asset }) => {
  if (!asset) return null

  const AssetIcon = getAssetIconById(asset.id as AssetId)
  const price = formatToUSD(asset.price.formattedValue)

  const chartData = asset.last7days.map(p => p.formattedValue)

  return (
    <Flex
      width={'100%'}
      justify={'between'}
      align={'center'}
    >
      <Flex
        align='center'
        gap='3'
      >
        <AssetIcon />
        <Text
          className={'color-gray'}
          size={'2'}
          weight={'bold'}
        >
          {asset.id}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        gap={'5'}
      >
        <Text
          className={'color-gray'}
          size={'2'}
          weight={'bold'}
          align={'right'}
        >
          {price}
        </Text>

        <SparklineChart
          chartData={chartData}
          className={styles.selectChart}
        />
      </Flex>
    </Flex>
  )
}
