import { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { AssetId, Seconds } from 'shared/types'
import { formatTimeframe } from 'shared/utils/formatTimeframe'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import styles from '../../mode-setups.module.scss'

interface Props {
  timeframe?: number
  assetId: AssetId
}
export const SetupsAddPredictFormHeader: FC<Props> = ({
  timeframe = 0,
  assetId
}) => {
  const AssetIcon = getAssetIconById(assetId as AssetId)
  const formattedTimeframe = formatTimeframe(timeframe as Seconds)

  return (
    <Flex
      align='center'
      gap='2'
      direction={'column'}
      className={styles.setupsAddPredictFormHeader}
    >
      <AssetIcon
        width={'10rem'}
        height={'10rem'}
      />

      <Flex
        align={'center'}
        gap={'1'}
      >
        <Text
          weight={'bold'}
          size={'7'}
          className={classnames(styles.assetId, 'color-white')}
        >
          {assetId}
        </Text>

        {timeframe ?
          <Text
            size={'7'}
            ml={'1'}
            weight={'medium'}
            className='color-gray'
          >
            {formattedTimeframe}
          </Text>
        : null}
      </Flex>
    </Flex>
  )
}
