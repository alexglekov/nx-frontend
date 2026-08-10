import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { DownIcon, UpIcon } from 'shared/icons'
import styles from './bet-direction-badge.module.scss'

interface Props {
  direction: string | null
}

export const BetDirectionBadge: React.FC<Props> = ({ direction }) => {
  if (!direction) return
  const isDirectionUp = direction === 'UP'
  return (
    <Flex
      className={styles.directionBadge}
      align={'center'}
      justify={'center'}
      gap={'1'}
    >
      {isDirectionUp ? (
        <UpIcon color='var(--green)' />
      ) : (
        <DownIcon color='var(--pink])' />
      )}
      <Text color={isDirectionUp ? 'green' : 'pink'}>
        {direction?.toLocaleLowerCase()}
      </Text>
    </Flex>
  )
}
