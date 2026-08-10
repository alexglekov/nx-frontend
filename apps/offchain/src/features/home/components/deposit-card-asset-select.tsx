import React from 'react'
import { Flex, Select, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useAvailableAssets } from 'features/balance-transactions/hooks/use-available-assets'
import { EmptyAssetPlaceholderRounded } from 'shared/icons'
import { AssetId } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import styles from '../home.module.scss'

interface Props {
  selectedPaymentAsset: string
  setSelectedPaymentAsset: React.Dispatch<React.SetStateAction<string>>
}

export const DepositCardAssetSelect: React.FC<Props> = ({
  selectedPaymentAsset,
  setSelectedPaymentAsset
}) => {
  const isAssetSelected = Boolean(selectedPaymentAsset)

  const { availableAssets } = useAvailableAssets()

  return (
    <Select.Root
      size={'2'}
      value={selectedPaymentAsset}
      onValueChange={value => setSelectedPaymentAsset(value)}
    >
      <Flex
        position={'relative'}
        width={'100%'}
      >
        <Select.Trigger
          placeholder={'Select an asset'}
          className={cn(styles.assetSelectTrigger, {
            [styles.assetSelectTriggerFull]: isAssetSelected
          })}
        />
        {!isAssetSelected && (
          <Flex className={styles.selectTriggerNewIcon}>
            <EmptyAssetPlaceholderRounded width={'5rem'} />
          </Flex>
        )}
      </Flex>
      <Select.Content className={styles.assetSelectContent}>
        <Select.Group>
          <Flex
            direction='column'
            gap='1'
          >
            {availableAssets.map(asset => {
              const AssetIcon = getAssetIconById(asset.id as AssetId)

              const finalAssetIcon =
                asset.id.includes('USD') ?
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <AssetIcon color='var(--yellow)' />
                : <AssetIcon />

              return (
                <Select.Item
                  key={asset.id}
                  value={asset.name}
                >
                  <Flex
                    align={'center'}
                    gap={'2'}
                  >
                    {finalAssetIcon}

                    <Text
                      size={'2'}
                      weight='medium'
                      className='color-white'
                    >
                      {asset.name}
                    </Text>
                  </Flex>
                </Select.Item>
              )
            })}
          </Flex>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
