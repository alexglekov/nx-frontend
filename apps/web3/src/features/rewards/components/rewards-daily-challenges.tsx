import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { useDailyTasks } from '../hooks/use-daily-tasks'
import { RewardsDailyChallengeItem } from './rewards-daily-challenge-item'
import { RewardDailyChallengeSerialItem } from './rewards-daily-challenge-serial-item'
import styles from '../rewards.module.scss'

export const RewardsDailyChallenges: React.FC = () => {
  const { facetedTasks, serialTasks, simpleTasks } = useDailyTasks()

  return (
    <Flex
      width={'100%'}
      className={styles.dailyTasksContainer}
      direction={'column'}
      gap={'4'}
      mb={'2'}
    >
      <Text
        weight={'medium'}
        size={'7'}
        className='color-white'
        ml={'7'}
      >
        Your Daily Tasks
      </Text>

      <Grid
        columns={{
          initial: '1fr',
          sm: '1fr 1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr'
        }}
        gap={'2'}
        height={'100%'}
        width={'100%'}
        p={'5'}
      >
        {facetedTasks.map(el => {
          return (
            <RewardsDailyChallengeItem
              key={el.id}
              task={el}
              type='facet'
            />
          )
        })}

        {simpleTasks.map(el => {
          return (
            <RewardsDailyChallengeItem
              key={el.id}
              task={el}
            />
          )
        })}

        {serialTasks.map(el => {
          return (
            <RewardDailyChallengeSerialItem
              key={el[0].id}
              tasks={el}
            />
          )
        })}
      </Grid>
    </Flex>
  )
}
