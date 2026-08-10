import { FC } from 'react'
import { Flex, Separator } from '@radix-ui/themes'
import { RadixColorType } from 'shared/types'
import { RadixText } from './radix-text'

export const OrSeparator: FC<Props> = ({
  mb = '5',
  mt = '5',
  color = 'gray',
  label = 'OR'
}) => {
  return (
    <Flex
    width={'100%'}
    align={'center'}
    gap={'2'}
    mb={mb}
    mt={mt}
    >
      <Separator
        size={'4'}
        className={'background-gray-dark'}
        color={color}
      />

      <RadixText
        weight={'light'}
        size={'1'}
        className={'color-gray'}
        color={color}
        >
        {label}
      </RadixText>

      <Separator
        size={'4'}
        className={'background-gray-dark'}
        color={color}
        />
    </Flex>
  )
}

interface Props {
  mb?: '1' | '2' | '3' | '4' | '5' | '6' | '7'
  mt?: '1' | '2' | '3' | '4' | '5' | '6' | '7'
  color?: RadixColorType
  label?: string
}
