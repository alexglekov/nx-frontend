import React from 'react'
import { Grid } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { PROFILE_STATISTIC_MODES } from '../constants'
import { ProfileModeStatsItem } from './profile-mode-stats-item'
import { ProfileModeStatsSetupsCreated } from './profile-mode-stats-setups-created'

interface Props {
  userId: User['id']
}
export const ProfileModeStats: React.FC<Props> = ({ userId }) => {
  return (
    <Grid
      columns={{ initial: '1fr', sm: '2fr 1fr' }}
      width={'100%'}
      gap={'2'}
    >
      <Grid
        columns={{ initial: '1fr', sm: '1fr 1fr' }}
        gap={'2'}
      >
        {PROFILE_STATISTIC_MODES.map(m => {
          return (
            <ProfileModeStatsItem
              key={m}
              mode={m}
              userId={userId}
            />
          )
        })}
      </Grid>

      <ProfileModeStatsSetupsCreated userId={userId} />
    </Grid>
  )
}
