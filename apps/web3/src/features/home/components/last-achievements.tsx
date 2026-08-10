import React from 'react'
import { Button, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { TopLeftArrowIcon } from 'shared/icons'
import { AchievementCard } from 'shared/ui/achievement-card/achievement-card'
import { APP_ACHIEVEMENTS_MOCK } from '../constants'
import { LastAchievementsStats } from './last-achievements-stats'
import styles from '../home.module.scss'

// TODO: Replace this component to profile feature, as it would be used there
export const LastAchievements: React.FC = () => {
  return (
    <Card className={styles.achievemntsContainer}>
      <Flex
        direction='column'
        gap='4'
      >
        <Flex
          px={'3'}
          mt={'3'}
          mb={'1'}
          justify={'between'}
          align={'center'}
        >
          <Heading
            size={{ initial: '3' }}
            weight={'medium'}
            as='h3'
          >
            Last Achievement
          </Heading>
          <Flex gap={'1'}>
            <Button
              variant='ghost'
              type='button'
            >
              <Text
                size={'3'}
                color='blue'
              >
                View all
              </Text>

              <TopLeftArrowIcon color='var(--blue)' />
            </Button>
          </Flex>
        </Flex>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          width={'100%'}
          gap={'3'}
          className={styles.achievementWrapper}
        >
          <AchievementCard>
            {/* 
              // TODO: Modify the way to pass achievement image
              // TODO: Remove image as now it is placeholder
            */}
            <img
              src={APP_ACHIEVEMENTS_MOCK.cryptoOracle.imagePath}
              alt='achievement'
              className={styles.achievementImage}
            />
          </AchievementCard>

          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            gap={'1'}
          >
            <Text
              size='5'
              weight='bold'
            >
              {APP_ACHIEVEMENTS_MOCK.cryptoOracle.title}
            </Text>
            <Text
              size={'1'}
              color={'gray'}
              weight={'light'}
            >
              05 Aug 23
            </Text>
          </Flex>
          <Separator size={'4'} />
          <Text
            align={'center'}
            color={'gray'}
          >
            {APP_ACHIEVEMENTS_MOCK.cryptoOracle.description}
          </Text>
        </Flex>
        <LastAchievementsStats />
      </Flex>
    </Card>
  )
}
