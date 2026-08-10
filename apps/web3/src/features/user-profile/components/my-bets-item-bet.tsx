import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { XyroToken } from 'shared/ui/xyro-token'

interface Props {
  amount: number
}

export const MyBetsItemBet: React.FC<Props> = ({ amount }) => {
  return (
    <Flex
      align={'center'}
      gap={'2'}
      height={'100%'}
    >
      <XyroToken color='yellow' />
      <Text
        weight={'light'}
        size={'4'}
      >
        {amount}
      </Text>
    </Flex>
  )
}
