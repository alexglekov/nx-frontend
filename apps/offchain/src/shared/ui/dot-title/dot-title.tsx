import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { RadixColorType } from 'shared/types'
import styles from './dot-title.module.scss'

// TODO: inherit from Text component
interface Props {
  children: React.ReactNode
  weight?: 'light' | 'bold' | 'medium'
  withDot?: boolean
  textClassname?: string
  dotClassname?: string
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7'
  color?: RadixColorType | 'black'
}
export const DotTitle: React.FC<Props> = ({
  children,
  size,
  weight = 'medium',
  color = 'white',
  // TODO: Set default value to `false` because the UI layout does not have it now
  withDot = false,
  // TODO: remove this props
  dotClassname,
  textClassname
}) => {
  const colorMap = {
    'color-gray-dark': color === 'gray',
    'color-white': color === 'white',
    'color-black': color === 'black'
  }

  return (
    <Flex
      gap={'1'}
      align={'center'}
    >
      {withDot && (
        <Box
          // color={color}
          className={cn(styles.dot, dotClassname ? dotClassname : '', colorMap)}
        />
      )}

      <Text
        size={size}
        color={color as RadixColorType}
        weight={weight}
        className={cn(
          styles.dotTitle,
          textClassname ? textClassname : '',
          colorMap
        )}
      >
        {children}
      </Text>
    </Flex>
  )
}
