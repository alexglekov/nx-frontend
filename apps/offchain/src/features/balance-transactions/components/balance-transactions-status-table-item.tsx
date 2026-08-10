import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

interface Props {
  status: string
}

export const BalanceTransactionsStatusTableItem: React.FC<Props> = ({
  status
}) => {
  const color =
    status === 'APPROVED' ? 'green'
    : status === 'REJECTED' ? 'red'
    : 'orange'

  return (
    <Flex
      align={'center'}
      height={'100%'}
    >
      <Text
        size={'2'}
        color={color}
      >
        {status}
      </Text>
    </Flex>
  )
}
