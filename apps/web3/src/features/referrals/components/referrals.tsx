import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import { InviteFriends } from 'features/rewards/components/invite-friends'
import { MyReferralsTable } from './my-referrals-table'
import { ReferralProgramCard } from './referral-program-card'

export const Referrals: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'2'}
    >
      <Grid
        columns={{ initial: '1fr', sm: '2fr 1fr' }}
        gap={'1'}
      >
        <ReferralProgramCard />
        <InviteFriends />
      </Grid>

      <MyReferralsTable />
    </Flex>
  )
}
