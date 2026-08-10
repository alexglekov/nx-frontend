import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { userVar } from 'shared/store/user'
import { XyroToken } from 'shared/ui/xyro-token'
import { useHomeBetStatistics } from '../../user-profile/hooks/use-bet-statistics'

// TODO: Replace this component to profile feature, as it would be used there
export const LastAchievementsStats: React.FC = () => {
  const user = useReactiveVar(userVar)
  const { statistics } = useHomeBetStatistics(user?.id)

  const formattedLargestWin =
    statistics?.largestWin ? Number(statistics.largestWin).toFixed(4) : 0
  const totalGames = statistics?.totalGames ? statistics.totalGames : 0
  const winPercentage = `${statistics?.winPercentage ? statistics.winPercentage : 0}%`

  return (
    <Flex
      p={'4'}
      direction={'column'}
      gap={'3'}
    >
      <Text
        size={'2'}
        color='gray'
      >
        Your stats
      </Text>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Text
          size={'3'}
          weight={'light'}
        >
          Total games:
        </Text>
        <Text
          size={'6'}
          weight={'light'}
        >
          {totalGames}
        </Text>
      </Flex>
      <Separator size={'4'} />
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Text
          size={'3'}
          weight={'light'}
        >
          Winrate:
        </Text>
        <Text
          size={'6'}
          weight={'light'}
        >
          {winPercentage}%
        </Text>
      </Flex>
      <Separator size={'4'} />
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Text
          size={'3'}
          weight={'light'}
        >
          Largest win:
        </Text>
        <Flex
          align={'center'}
          gap={'1'}
        >
          <XyroToken color='yellow' />
          <Text
            size={'6'}
            weight={'light'}
          >
            {formattedLargestWin}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
