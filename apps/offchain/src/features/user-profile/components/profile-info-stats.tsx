import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Predict } from '__generated__/graphql'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { PROFILE_INFO_STATS } from '../constants'
import { useHomeBetStatistics } from '../hooks/use-bet-statistics'
import { ProfileInfoStatsItem } from './profile-info-stat-item'
import { ProfileLargestWin } from './profile-largest-win'
import styles from '../user-profile.module.scss'

interface Props {
  userId: string
}

export const ProfileInfoStats: React.FC<Props> = ({ userId }) => {
  const { statistics } = useHomeBetStatistics(userId)

  if (!statistics) return

  const largestWin = statistics.largestWin

  return (
    <>
      <Flex
        align={{ initial: 'start', sm: 'center' }}
        direction={'row'}
        wrap={'wrap'}
        className={styles.profileInfoStatsWrapper}
      >
        {PROFILE_INFO_STATS.map(el => {
          const field = statistics[el.id as keyof typeof statistics]

          const value =
            typeof field === 'number' ? field
            : isNotNullOrUndef(el.getter) ? el.getter(field as Predict)
            : null

          return (
            <ProfileInfoStatsItem
              key={el.name}
              icon={el.icon}
              name={el.name}
              isEqualsXyroToken={el.isEqualsXyroToken}
              isPercentage={el.isPercentage}
              value={value}
            />
          )
        })}
      </Flex>

      <ProfileLargestWin largestWin={largestWin as Predict} />
    </>
  )
}
