import { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'

import { Asset } from '__generated__/graphql'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { AssetId } from 'shared/types'
import { TaskLockIcon } from 'shared/icons'

import styles from '../mode-one-vs-one.module.scss'

interface Props {
  asset: Asset
  isPrivate: boolean
}

export const AssetInfo: FC<Props> = ({ asset, isPrivate }) => {
  const AssetIcon = getAssetIconById(asset.id as AssetId, true)
  return (
    <Flex justify={'between'}>
      <Flex align={'center'}>
        <Flex className={styles.assetIconWrapper}>
          <AssetIcon />
        </Flex>

        <Flex direction={'column'}>
          <Text size={'5'}>{asset.name}</Text>
          <Text
            className={styles.assetIdTitle}
            size={'3'}
          >
            {asset.id}
          </Text>
        </Flex>
      </Flex>

      {isPrivate && (
        <Flex
          className={styles.privateLabel}
          align={'center'}
        >
          <TaskLockIcon className={styles.privateLockIcon} />
          <Text size={'4'}>Private</Text>
        </Flex>
      )}
    </Flex>
  )
}
