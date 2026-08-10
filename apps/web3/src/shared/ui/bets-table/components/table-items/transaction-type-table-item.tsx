import { Flex, Text } from '@radix-ui/themes'
import { BalanceOperationType } from '__generated__/graphql'
import { BALANCE_CHANGE_ITEM_TYPE_VARIATIONS } from 'shared/constants'

interface Props {
  type: BalanceOperationType
}

export const TransactionTypeTableItem: React.FC<Props> = ({ type }) => {
  const Icon = BALANCE_CHANGE_ITEM_TYPE_VARIATIONS[type]?.icon || ''
  const title = BALANCE_CHANGE_ITEM_TYPE_VARIATIONS[type]?.title || ''

  return (
    <Flex
      align={'center'}
      gap='3'
      height={'100%'}
    >
      <Icon />
      <Text
        size={'3'}
        weight={'medium'}
        className='color-white'
      >
        {title}
      </Text>
    </Flex>
  )
}
