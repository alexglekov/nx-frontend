import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { DepositIcon, WithdrawIcon } from 'shared/icons'

interface Props {
  type: string
}
export const BalanceTransactionTypeTableItem: React.FC<Props> = ({ type }) => {
  const [isMobile] = useResponsive('xs')

  const isDepostit = type === 'DEPOSIT'
  const iconSize = isMobile ? '2.5rem' : '3rem'

  return (
    <Flex
      height='100%'
      align={'center'}
      gap={'2'}
    >
      {isDepostit ?
        <DepositIcon
          width={iconSize}
          height={iconSize}
        />
      : <WithdrawIcon
          width={iconSize}
          height={iconSize}
        />
      }
      <Text
        className='color-white'
        size={'2'}
        weight={'bold'}
        wrap={'nowrap'}
      >
        {type}
      </Text>
    </Flex>
  )
}
