import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Select, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { EmptyAssetPlaceholderRounded } from 'shared/icons'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import { memeWarsSelectedAssetVar } from '../store/meme-wars-ui-values.store'
import { MemeWarsFormAssetSelectItem } from './meme-wars-form-asset-select-item'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsFormAssetSelect: React.FC = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)
  const memeWarsSelectedAsset = useReactiveVar(memeWarsSelectedAssetVar)
  const memeWarsGameAssets = memeWarsGame?.feedsIds || []

  const isMemeWarsAssetSelected = Boolean(memeWarsSelectedAsset)

  const handleValueChange = (assetId: string) => {
    const isSelectedAssetExists = memeWarsGameAssets.includes(assetId)

    if (!isSelectedAssetExists) return

    memeWarsSelectedAssetVar(assetId)
  }

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      align={'center'}
      width={'100%'}
    >
      <Text
        className='color-gray-light'
        weight={'light'}
        size={{ initial: '4', sm: '2' }}
      >
        1. Choose your memecoin:
      </Text>

      <Select.Root
        size={'2'}
        onValueChange={handleValueChange}
        value={memeWarsSelectedAsset || undefined}
        key={memeWarsSelectedAsset}
      >
        <Flex
          position={'relative'}
          width={'100%'}
        >
          <Select.Trigger
            placeholder={'Select an asset'}
            className={cn(styles.assetSelectTrigger, {
              [styles.assetSelectTriggerFull]: isMemeWarsAssetSelected
            })}
          />
          {!isMemeWarsAssetSelected && (
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
              {memeWarsGameAssets.map(f => {
                return (
                  <Select.Item
                    key={f}
                    value={f}
                  >
                    <MemeWarsFormAssetSelectItem feedId={f} />
                  </Select.Item>
                )
              })}
            </Flex>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}
