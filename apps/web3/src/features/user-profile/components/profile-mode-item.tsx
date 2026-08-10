import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import styles from '../user-profile.module.scss'
import { ProfileModeItem } from '../types'

interface Props {
  item: ProfileModeItem
  backgroundElementLeft?: boolean
}

export const ProfileModesItem: React.FC<Props> = ({
  item,
  backgroundElementLeft = false
}) => {
  const { color, title, backgroundElement: ModeIcon } = item
  return (
    <Flex
      className={styles.profileModeItem}
      gap={'5'}
      position={'relative'}
      width={'100%'}
      align={'center'}
    >
      <ModeIcon
        width={'5.5rem'}
        height={'5.5rem'}
        color={color}
      />
      <Flex
        align={'center'}
        justify={'center'}
      >
        <Text
          size={'7'}
          className={styles.profileModeItemText}
        >
          {title}
        </Text>
      </Flex>
      <ModeIcon
        style={backgroundElementLeft ? { right: '-8rem' } : { right: '0' }}
        className={styles.profileModeItemBackgroundElement}
      />
    </Flex>
  )
}
