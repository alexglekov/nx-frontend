import React from 'react'
import { useQuery } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import { FRAGMENT_REWARD_STATS } from 'api/rewards/fragment-reward-stats'
import { GET_USER_REWARD_STATS } from 'api/rewards/get-user-reward-stats'
import { CupIcon, ParticipantsBadge, TotalPrizePoolBadge } from 'shared/icons'
import { RoundedSquareSkeleton } from 'shared/skeletons'
import { formatBalance } from '../../approved-balance/format-balance'
import { RewardsStatisticItem } from './rewards-statistic-item'

// TODO: Replace mock data when server will be ready to send statistics
export const RewardsStatistics: React.FC = () => {
  const { data, loading } = useQuery(GET_USER_REWARD_STATS)

  const rewardStats = useFragment(FRAGMENT_REWARD_STATS, data?.getUserReward)

  const referralRewards = rewardStats?.referralRewards
  const rewardsChallenges = rewardStats?.rewardsForChallenges
  const rewardsCurrentPlace = rewardStats?.currentPlace

  const rewardsFromInvites = `${referralRewards === null ? '—' : formatBalance(referralRewards || 0)} Points`
  const rewardsForChallenges = `${rewardsChallenges === null ? '-' : formatBalance(rewardsChallenges || 0)}`
  const rewardsPlace = `${rewardsCurrentPlace ? rewardsCurrentPlace : '-'} / ${rewardStats?.lastPlaceOnLeaderboard || '-'}`

  return !loading ?
      <Flex
        align={'center'}
        justify={'between'}
        width={'100%'}
        px={'6'}
        mt={'6'}
        gap={{ initial: '7', sm: '0' }}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <>
          {rewardsFromInvites ?
            <RewardsStatisticItem
              icon={<CupIcon color='var(--black)' />}
              title={'Rewards from Invites'}
              statisticInfo={rewardsFromInvites}
              backgroundIconColor='pink'
            />
          : null}

          {rewardsForChallenges ?
            <RewardsStatisticItem
              icon={<ParticipantsBadge />}
              title={'Challenges Rewards'}
              statisticInfo={rewardsForChallenges}
              backgroundIconColor='cyan'
            />
          : null}

          {rewardsPlace ?
            <RewardsStatisticItem
              icon={<TotalPrizePoolBadge />}
              title={'Your Place'}
              statisticInfo={rewardsPlace}
              backgroundIconColor='yellow'
            />
          : null}
        </>
      </Flex>
    : <RoundedSquareSkeleton height={'70px'} />
}
