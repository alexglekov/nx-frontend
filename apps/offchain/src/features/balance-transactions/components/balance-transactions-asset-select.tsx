import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Select, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { EmptyAssetPlaceholderRounded } from 'shared/icons'
import { AssetId } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { useAvailableAssets } from '../hooks/use-available-assets'
import { selectedPaymentAssetVar } from '../store/balance-flow-values.store'
import styles from '../balance-transactions.module.scss'

export const BalanceTransactionAssetSelect: React.FC = () => {
  const selectedPaymentAsset = useReactiveVar(selectedPaymentAssetVar)

  const { availableAssets } = useAvailableAssets()

  const isAssetSelected = Boolean(selectedPaymentAsset)

  return (
    <Select.Root
      size={'2'}
      value={selectedPaymentAsset}
      onValueChange={value => selectedPaymentAssetVar(value)}
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
                      {asset.name} ({asset.network})
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
