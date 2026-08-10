import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import { RewardsChallengeList } from './rewards-challenge-list'
import { RewardsLevels } from './rewards-levels'
import { RewardsStatistics } from './rewards-statistics'
import { SeasonCard } from './season-card'
import { SeasonLeaderboard } from './season-leaderboard'

export const Rewards: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'2'}
    >
      {/* <Grid
        columns={{ initial: '1fr', sm: '2fr 1fr' }}
        gap={'1'}
      >
        <SeasonCard />
        <RewardsLevels />
      </Grid>

      <RewardsStatistics />

      <RewardsChallengeList /> */}

      <SeasonLeaderboard />
    </Flex>
  )
}
