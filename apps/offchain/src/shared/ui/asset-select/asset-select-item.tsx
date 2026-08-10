import { FC } from 'react'
import { Flex, Select, Text } from '@radix-ui/themes'
import { Asset } from '__generated__/graphql'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { AssetId } from 'shared/types'
import { formatToUSD } from 'shared/utils/format-price'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import styles from './asset-select.module.scss'

interface AssetSelectItemProps {
  asset: Asset
  isPriceShown?: boolean
  dataTestID?: DataTestIDs | ''
}
export const AssetSelectItem: FC<AssetSelectItemProps> = ({
  asset,
  isPriceShown = true,
  dataTestID
}) => {
  const AssetIcon = getAssetIconById(asset.id as AssetId, true)
  const formattedPrice = formatToUSD(
    asset.price.formattedValue,
    asset.precision
  )

  return (
    <Select.Item
      value={asset.id}
      className={cn(styles.assetSelectItem, {
        [styles.assetItemTwoColumns]: !isPriceShown
      })}
      data-testid={dataTestID}
    >
      <Flex
        align='center'
        gap='2'
      >
        <AssetIcon />
        {asset.id}
      </Flex>

      {isPriceShown && (
        <Text
          color='gray'
          align={'center'}
        >
          {formattedPrice}
        </Text>
      )}
    </Select.Item>
  )
}
