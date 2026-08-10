import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { MAP_LEVEL_ID_TO_ICON } from 'features/referral/constants'
import styles from '../../table.module.scss'

interface Props {
  level: number
  name: string
}

export const TableItemReferralLevel: React.FC<Props> = ({ level, name }) => {
  const LevelIcon = MAP_LEVEL_ID_TO_ICON[level]

  return (
    <Flex
      align={'center'}
      height={'100%'}
      gap={'4'}
    >
      <Text
        size={'4'}
        weight={'medium'}
      >
        #{level}
      </Text>

      <LevelIcon
        width={'6rem'}
        height={'6rem'}
      />

      <Text
        size={'4'}
        weight={'medium'}
        className={styles.tableItemLevelName}
      >
        {name}
      </Text>
    </Flex>
  )
}
