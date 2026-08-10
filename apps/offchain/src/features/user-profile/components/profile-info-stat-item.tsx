import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TetherToken } from 'shared/components'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { formatAmountLong } from 'shared/utils/format-price'
import { ProfileInfoStatItem } from '../types'
import styles from '../user-profile.module.scss'

export const ProfileInfoStatsItem: React.FC<
  Omit<ProfileInfoStatItem, 'id'> & {
    value: number | 'UserBetsStatistic' | null
  }
> = ({
  icon,
  name,
  isEqualsXyroToken = false,
  isPercentage = false,
  value
}) => {
  if (value === null) return null

  const valueSymbol = isPercentage ? '%' : ''
  const formattedValue = formatAmountLong(value || 0)

  return (
    <Flex
      align={'center'}
      gap={'4'}
    >
      <img
        src={icon}
        alt={`${name} icon`}
        className={styles.profileInfoStatsItemIcon}
      />
      <Flex
        direction={'column'}
        gap={{ initial: '0', sm: '2' }}
      >
        <DotTitle>{name}</DotTitle>
        <Flex
          align={'center'}
          gap={'1'}
        >
          {isEqualsXyroToken && (
            <TetherToken
              size={'5rem'}
              color='white'
            />
          )}
          <Text
            size={{ initial: '6', sm: '8' }}
            weight={'light'}
            className={styles.profileInfoStatsItemText}
          >
            {formattedValue}
            {valueSymbol}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
