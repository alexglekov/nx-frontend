import React from 'react'
import { Avatar, Flex, Grid, Text } from '@radix-ui/themes'
import { TetherRoundedIcon } from 'shared/icons'
import { AssetId } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'

interface Props {
  name: string
  amount: number
  avatar: string
  assetId: string
}
export const MemeWarsFormPredictItem: React.FC<Props> = ({
  name,
  amount,
  assetId,
  avatar
}) => {
  const formattedName = name.length > 10 ? `${name.slice(0, 8)}...` : name

  const Icon = getAssetIconById(assetId as AssetId)

  return (
    <Grid
      align={'center'}
      justify={'between'}
      width={'100%'}
      columns={'2.5fr 1.5fr 0.7fr'}
    >
      <Flex
        align={'center'}
        gap={'2'}
      >
        <Avatar
          src={avatar}
          fallback={name[0] || 'A'}
          size={'2'}
          variant='solid'
        />

        <Text
          className='color-white'
          size={{ initial: '4', sm: '2' }}
          weight={'medium'}
        >
          @{formattedName}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        gap={'2'}
      >
        {<Icon />}

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
    </Grid>
  )
}
