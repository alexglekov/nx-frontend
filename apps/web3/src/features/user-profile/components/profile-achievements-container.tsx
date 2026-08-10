import { Flex, Grid } from '@radix-ui/themes'
import React from 'react'
import styles from '../user-profile.module.scss'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ProfileAchievementItem } from '../types'
import { ProfileAchievementsItem } from './profile-achievements-item'

interface Props {
  isContentOpened: boolean
  currentProfileAchievements: ProfileAchievementItem[]
  selectedAchievements: ProfileAchievementItem[]
  handleAchievementSelect: (achievement: ProfileAchievementItem) => void
}

export const ProfileAchievementsContainer: React.FC<Props> = ({
  currentProfileAchievements,
  isContentOpened,
  selectedAchievements,
  handleAchievementSelect
}) => {
  return (
    <Flex>
      {!isContentOpened ? (
        <Grid
          columns={'3'}
          rows={'auto'}
          gap={'1'}
          width={'100%'}
          mt={'3'}
        >
          {currentProfileAchievements.map(el => {
            const selectedNumber = selectedAchievements.indexOf(el) + 1
            return (
              <ProfileAchievementsItem
                // TODO: Replace icon with id
                key={el.icon}
                achievement={el}
                selectedNumber={selectedNumber}
                handleSelectAchievement={handleAchievementSelect}
              />
            )
          })}
        </Grid>
      ) : (
        <Collapsible.Content className={styles.collapsibleContent}>
          <Grid
            columns={'3'}
            rows={'auto'}
            gap={'1'}
            width={'100%'}
            mt={'3'}
          >
            {currentProfileAchievements.map(el => {
              const selectedNumber = selectedAchievements.indexOf(el) + 1
              return (
                <ProfileAchievementsItem
                  // TODO: Replace icon with id
                  key={el.icon}
                  achievement={el}
                  selectedNumber={selectedNumber}
                  handleSelectAchievement={handleAchievementSelect}
                />
              )
            })}
          </Grid>
        </Collapsible.Content>
      )}
    </Flex>
  )
}
