import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import styles from './mode-headers.module.scss'

type RoomItem = { title: string; value: string | null }

interface Props {
  items: RoomItem[]
}
export const ModeInfoHeader: React.FC<Props> = ({ items }) => {
  return (
    <Flex
      width={'100%'}
      align={'center'}
      gap={'5'}
      className={styles.modeHeaderWrapper}
    >
      {items.map(i => {
        const { title, value } = i

        if (!value) return null

        return (
          <Flex
            key={title}
            direction={'column'}
          >
            <Text
              className='color-gray-light'
              size={'1'}
              weight={'medium'}
            >
              {title}
            </Text>

            <Text
              size={'4'}
              weight={'light'}
              className={styles.contractAddressLink}
            >
              {value}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}
