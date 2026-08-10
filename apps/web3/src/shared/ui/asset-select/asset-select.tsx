/* eslint-disable max-lines */
import { FC, useEffect, useMemo } from 'react'
import { ApolloError, useQuery, useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Flex, Text, Select } from '@radix-ui/themes'
import { Asset, ListAssetsQuery } from '__generated__/graphql'
import { LIST_ASSETS } from 'api/list-assets'
import cn from 'classnames'
import { format } from 'date-fns'
import { DataTestIDs } from 'shared/constants'
import { FormAssetPlaceholder } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { AssetSelectItem } from './asset-select-item'
import styles from './asset-select.module.scss'

interface Props {
  name: string
  label?: string
  labelWithPadding?: boolean
  isPriceShown?: boolean
  itemsDataTestID?: DataTestIDs | ''
  triggerDataTestID?: DataTestIDs | ''
}
export const AssetSelect: React.FC<Props> = ({
  name,
  label = 'Choose asset for gaming:',
  labelWithPadding = true,
  isPriceShown = true,
  itemsDataTestID = '',
  triggerDataTestID = ''
}) => {
  const selectedAsset = useReactiveVar(selectedAssetVar)

  const { data, error, loading } = useQuery<ListAssetsQuery>(LIST_ASSETS, {
    onError: notifyOnError
  })

  const assets = data?.listAssets || []

  const handleValueChange = (assetId: string) => {
    const asset = data?.listAssets?.find(a => a.id === assetId)
    selectedAssetVar((asset as Asset) || null)
  }

  useEffect(() => {
    return () => {
      // NOTE: reset selected asset on unmount
      selectedAssetVar(null)
    }
  }, [])

  const onMountDate = useMemo(() => {
    return new Date()
  }, [])

  const priceAt = format(onMountDate, 'HH:mm')

  return (
    <RadixForm.Field name={name}>
      <AssetSelectLabel
        label={label}
        labelWithPadding={labelWithPadding}
      />

      <Select.Root
        required
        size={'2'}
        name={name}
        onValueChange={handleValueChange}
        disabled={Boolean(error)}
        value={selectedAsset?.id}
        defaultValue={selectedAsset?.id}
        key={selectedAsset?.id ?? 'reset'}
        // open={true} // NOTE: usefull for select debugging
      >
        <Flex
          position={'relative'}
          width={'100%'}
        >
          <Select.Trigger
            value={selectedAsset?.id}
            placeholder={loading ? 'Loading...' : 'Select an asset'}
            className={cn(styles.assetSelectNewTrigger, {
              [styles.assetSelectNewTriggerSelected]: Boolean(selectedAsset?.id)
            })}
            data-testid={triggerDataTestID}
          />

          {!selectedAsset?.id ?
            <Flex className={styles.selectTriggerNewIcon}>
              <FormAssetPlaceholder
                width={'8.5rem'}
                height={'8.5rem'}
              />
            </Flex>
          : null}
        </Flex>
        <Select.Content className={styles.assetSelectContent}>
          <Select.Group>
            <Select.Label
              className={cn(styles.assetSelectLabel, {
                [styles.assetSelectLabelWithPrice]: isPriceShown
              })}
            >
              <Text
                className='color-white'
                size={'1'}
              >
                Asset
              </Text>

              {isPriceShown && (
                <Text
                  className='color-white'
                  size={'1'}
                  align={'center'}
                >
                  Price at: {priceAt}
                </Text>
              )}

              <Text
                className='color-white'
                size={'1'}
                align={'right'}
              >
                Last 7 days (+/- n%)
              </Text>
            </Select.Label>

            <Flex
              direction='column'
              gap='1'
            >
              {assets.map(a => (
                <AssetSelectItem
                  asset={a as Asset}
                  isPriceShown={isPriceShown}
                  key={a.id}
                  dataTestID={itemsDataTestID}
                />
              ))}
            </Flex>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </RadixForm.Field>
  )
}

interface SelectAssetLabel {
  label: string
  labelWithPadding: boolean
}
const AssetSelectLabel: FC<SelectAssetLabel> = ({
  label,
  labelWithPadding
}) => {
  return (
    <Flex mb={'1'}>
      <RadixForm.Label>
        <Text
          weight={'regular'}
          size={{ initial: '3', sm: '1' }}
          ml={labelWithPadding ? '2' : '0'}
        >
          {label}
        </Text>
      </RadixForm.Label>

      <RadixForm.Message match='valueMissing'>
        Please choose your asset
      </RadixForm.Message>
    </Flex>
  )
}

const notifyOnError = (error: ApolloError) => {
  notificationStateVar({
    isOpen: true,
    title: 'Error',
    description: `Asset select: failed to load assets: ${error.message}`,
    type: 'error'
  })
}
