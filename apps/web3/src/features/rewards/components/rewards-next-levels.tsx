import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useRewardsLevels } from '../hooks/use-rewards-levels'
import { RewardsNextLevelItem } from './rewards-next-level-item'

export const RewardsNextLevels: React.FC = () => {
  const { levels } = useRewardsLevels()

  const sliceIndex = levels.length / 2
  const firstColumnLevels = levels.slice(0, sliceIndex)
  const secondColumnLevels = levels.slice(sliceIndex)

  return (
    <Flex
      direction={'column'}
      mt={'5'}
      gap={'2'}
    >
      <Text
        weight={'bold'}
        className='color-white'
        size={'2'}
      >
        NEXT LEVELS
      </Text>

      <Flex
        align={'center'}
        justify={'between'}
        gap={'6'}
      >
        <Flex
          direction={'column'}
          width={'100%'}
          gap={'1'}
        >
          {firstColumnLevels.map(el => {
            return (
              <RewardsNextLevelItem
                key={el.id}
                level={el.id}
                reward={el.pointReward}
              />
            )
          })}
        </Flex>

        <Flex
          direction={'column'}
          width={'100%'}
          gap={'1'}
        >
          {secondColumnLevels.map(el => {
            return (
              <RewardsNextLevelItem
                key={el.id}
                level={el.id}
                reward={el.pointReward}
              />
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}
