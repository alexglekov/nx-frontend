import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TetherRoundedIcon } from 'shared/icons'
import { AssetId } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import styles from '../mode-meme-wars.module.scss'

interface Props {
  amount: number
  assetId: string
}
export const MemeWarsFormMyPredictItem: React.FC<Props> = ({
  amount,
  assetId
}) => {
  const Icon = getAssetIconById(assetId as AssetId)

  return (
    <Flex
      className={styles.memeWarsFormMyPredictItem}
      align={'center'}
      justify={'between'}
      p={{ initial: '4', sm: '2' }}
    >
      <Flex
        align={'center'}
        gap={'2'}
      >
        <Icon />

        <Text
          className='color-white'
          size={{ initial: '4', sm: '2' }}
          weight={'medium'}
        >
          {assetId}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        gap={'2'}
      >
        <TetherRoundedIcon color='var(--lime)' />

        <Text
          className='color-white'
          size={{ initial: '6', sm: '4' }}
          weight={'medium'}
        >
          {amount}
        </Text>
      </Flex>
    </Flex>
  )
}
