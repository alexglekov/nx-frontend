import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CoinsIcon } from 'shared/icons'
import { RadixColorType } from 'shared/types'
import { XyroButton } from 'shared/ui/xyro-button/xyro-button'

interface Props {
  onClick?: () => void
  text: string
  disabled?: boolean
}

export const TableItemActionButton: React.FC<Props> = ({
  text,
  onClick,
  disabled = false
}) => {
  return (
    <Flex
      height={'100%'}
      align={'center'}
    >
      <XyroButton
        onClick={onClick}
        size={'2'}
        color={'green' as RadixColorType}
        disabled={disabled}
        isWide
      >
        <CoinsIcon color='var(--c-black)' />
        <Text
          weight={'medium'}
          className='color-black no-wrap'
        >
          {text}
        </Text>
      </XyroButton>
    </Flex>
  )
}
