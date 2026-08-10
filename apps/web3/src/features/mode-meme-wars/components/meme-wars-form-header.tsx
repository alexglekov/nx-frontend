import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsFormHeader: React.FC = () => {
  return (
    <Flex
      className={styles.memeWarsFormHeader}
      align={'center'}
      gap={'1'}
    >
      <Text
        className='color-white'
        weight={'bold'}
        size={{ initial: '7', sm: '5' }}
      >
        Meme Wars
      </Text>
    </Flex>
  )
}
