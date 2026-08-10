import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { SeasonChallenge } from '__generated__/graphql'
import { RewardsChallengeListSkeleton } from 'shared/skeletons/common-skeletons/rewards-challenge-list-skeleton'
import { useRewardsState } from '../hooks/use-rewards-state'
import { challengeModalStateVar } from '../store/challenge-modal'
import { RewardsChallengeItem } from './rewards-challenge-item'
import { RewardsChallengeItemModal } from './rewards-challenge-item-modal'
import { RewardsDailyChallenges } from './rewards-daily-challenges'

export const RewardsChallengeList: React.FC = () => {
  const { seasonState, seasonStateLoading } = useRewardsState()

  const handleSetChallenge = (challenge: SeasonChallenge) => {
    challengeModalStateVar(challenge)
  }

  return (
    <Flex
      direction={'column'}
      mt={'7'}
    >
      <Flex
        px={'5'}
        pt={'5'}
        pb={'5'}
      >
        <Text
          size={'8'}
          className='color-white'
          weight={'medium'}
        >
          Challenges
        </Text>
      </Flex>

      <RewardsDailyChallenges />

      {seasonStateLoading ? (
        <RewardsChallengeListSkeleton />
      ) : (
        <Grid
          columns={{ initial: '1fr', sm: '1fr 1fr 1fr' }}
          gap={'1'}
        >
          {seasonState?.challenges.map(challenge => {
            return (
              <RewardsChallengeItem
                key={challenge.id}
                name={challenge.name}
                desciption={challenge.description}
                tasks={challenge.tasks}
                handleClick={() => handleSetChallenge(challenge)}
              />
            )
          })}
        </Grid>
      )}

      <RewardsChallengeItemModal />
    </Flex>
  )
}
