import { Box, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import cn from 'classnames'
import { AchievementCard } from 'shared/ui/achievement-card/achievement-card'
import { DiamondIcon } from 'shared/icons'
import { ProfileAchievementItem } from '../types'
import styles from '../user-profile.module.scss'

interface Props {
  achievement: ProfileAchievementItem
  selectedNumber: number
  handleSelectAchievement: (achievement: ProfileAchievementItem) => void
}

export const ProfileAchievementsItem: React.FC<Props> = ({
  achievement,
  selectedNumber = 0,
  handleSelectAchievement
}) => {
  const { name, description, rarity } = achievement
  const currentRarity = rarity ? rarity : 0
  const isAachievementSelected = Boolean(selectedNumber)

  return (
    <Flex
      className={styles.profileAchievementItemWrapper}
      direction={'column'}
      align={'center'}
      position={'relative'}
      onClick={() => handleSelectAchievement(achievement)}
      width={'100%'}
    >
      <AchievementCard
        width={'10rem'}
        height={'10rem'}
        opacity={isAachievementSelected ? '1' : '.4'}
      >
        {/* 
          // TODO: Modify the way to pass achievement image
          // TODO: Remove image as now it is placeholder
        */}
        <DiamondIcon
          width={'8rem'}
          height={'8rem'}
        />
      </AchievementCard>
      <Text
        mt={'4'}
        size={'5'}
        className={styles.profileAchievementName}
      >
        {name}
      </Text>
      <Text
        size={'2'}
        weight={'light'}
        className={styles.profileAchievementDate}
      >
        {/* TODO: remove mock date */}
        4:24 PM, 10 Aug 23
      </Text>
      <Box className={styles.separator} />
      <Text
        className={styles.profileAchievementDescription}
        align={'center'}
        weight={'light'}
        size={'2'}
      >
        {description}
      </Text>
      <Flex
        align={'center'}
        gap={'1'}
        mt={'2'}
      >
        <Text
          className={styles.profileAchievementRarity}
          weight={'bold'}
        >
          {currentRarity}%
        </Text>
        <Text
          className={styles.profileAchievementRarity}
          color='pink'
        >
          have this
        </Text>
      </Flex>
      <Flex
        position={'absolute'}
        align={'center'}
        justify={'center'}
        className={cn(
          styles.valueCheckbox,
          isAachievementSelected ? styles.valueCheckboxSelected : ''
        )}
      >
        <Text
          weight={'bold'}
          size={'2'}
        >
          {Boolean(selectedNumber) ? selectedNumber : ''}
        </Text>
      </Flex>
    </Flex>
  )
}
