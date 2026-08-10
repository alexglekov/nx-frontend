import { Flex, Text } from '@radix-ui/themes'
import { Bet, BetType } from '__generated__/graphql'
import React from 'react'
import { BtcAssetIcon } from 'shared/icons'
import { XyroBadge } from 'shared/ui'

interface Props {
  bet: Bet
}

export const MyBetsItemCondition: React.FC<Props> = ({ bet }) => {
  const betDirection = bet.isUp ? 'UP' : 'DOWN'
  const betCondition = bet.type === BetType.Price ? bet.price : betDirection

  return (
    <Flex
      align={'center'}
      gap={'2'}
      height={'100%'}
    >
      <BtcAssetIcon />
      <Text
        size={'4'}
        weight={'medium'}
      >
        {bet.game?.assetId}
      </Text>

      <XyroBadge>{betCondition}</XyroBadge>
    </Flex>
  )
}
