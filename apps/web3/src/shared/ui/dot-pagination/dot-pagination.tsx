import { FC, useCallback, useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { XyroButton } from 'shared/components'
import styles from './dot-pagination.module.scss'

interface Props {
  skip: number
  total: number
  take: number
  onChange?: (index: number) => void
}

export const DotPagination: FC<Props> = ({ onChange, skip, total, take }) => {
  const count = Math.ceil(total / take)
  const activeIndex = skip / take

  const handleForwardClick = useCallback(() => {
    if (onChange) {
      onChange(activeIndex + 1)
    }
  }, [activeIndex, onChange])

  const handleBackClick = useCallback(() => {
    if (onChange) {
      onChange(activeIndex - 1)
    }
  }, [activeIndex, onChange])

  return (
    <Flex align={'center'}>
      {Array.from({ length: count }).map((_, index) => (
        <Flex
          justify={'center'}
          align={'center'}
          key={index}
          className={cn(styles.dotWrap, {
            [styles.dotWrapActive]: index === activeIndex
          })}
        >
          <Box className={styles.dot} />
        </Flex>
      ))}
      <Flex>
        <XyroButton
          disabled={activeIndex === 0}
          size={'3'}
          className={cn(styles.button, 'color-white')}
          onClick={handleBackClick}
        >
          <Text
            size={'6'}
            className='color-white'
          >
            {'<'}
          </Text>
        </XyroButton>
        <XyroButton
          disabled={activeIndex === count - 1}
          size={'3'}
          className={cn(styles.button, 'color-white')}
          onClick={handleForwardClick}
        >
          <Text
            size={'6'}
            className='color-white'
          >
            {'>'}
          </Text>
        </XyroButton>
      </Flex>
    </Flex>
  )
}
