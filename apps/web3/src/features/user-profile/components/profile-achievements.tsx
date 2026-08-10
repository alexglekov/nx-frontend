import React, { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Card, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { ArrowUpIcon } from 'shared/icons'
import { XyroButton } from 'shared/ui'
import { PROFILE_ACHIEVEMENTS_MOCK } from '../constants'
import { ProfileAchievementItem } from '../types'
import { ProfileAchievementsContainer } from './profile-achievements-container'
import styles from '../user-profile.module.scss'

export const ProfileAchievements: React.FC = () => {
  const [isContentOpened, setContentOpened] = useState<boolean>(false)
  const [selectedAchievements, setSelectedAchievements] = useState<
    ProfileAchievementItem[]
  >([])
  const currentProfileAchievements = isContentOpened
    ? PROFILE_ACHIEVEMENTS_MOCK
    : PROFILE_ACHIEVEMENTS_MOCK.slice(0, 3)

  const handleAchievementSelect = (achievement: ProfileAchievementItem) => {
    // TODO: Replace icon check with id check
    const isAchievementExists = selectedAchievements.find(
      a => a.icon === achievement.icon
    )

    if (isAchievementExists) {
      // TODO: Replace icon check with id check
      const filteredItems = selectedAchievements.filter(
        a => a.icon !== achievement.icon
      )

      setSelectedAchievements(filteredItems)
      return
    }

    if (selectedAchievements.length === 3) return

    setSelectedAchievements(prev => [...prev, achievement])
  }

  return (
    <Card
      size={'4'}
      className={styles.profileAchievementsWrapper}
    >
      <Collapsible.Root defaultOpen={false}>
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Flex
            align={'start'}
            justify={'between'}
          >
            <Flex
              direction={'column'}
              gap={'2'}
            >
              <Text
                size={'7'}
                className={styles.winrateGraphTitle}
              >
                Achievments
              </Text>
              <Text
                size={'2'}
                className={styles.profileAchievementsInfo}
              >
                You can mark up to 3 achievments to show them near your
                nickname.
              </Text>
            </Flex>
            <Flex>
              <Collapsible.Trigger asChild>
                <XyroButton
                  isIconOnly
                  onClick={() => setContentOpened(!isContentOpened)}
                  className={styles.xyroButton}
                >
                  <ArrowUpIcon
                    color='white'
                    width={'2.5rem'}
                    height={'2.5rem'}
                    className={cn(
                      styles.toggle,
                      !isContentOpened ? styles.toggleReversed : ''
                    )}
                  />
                </XyroButton>
              </Collapsible.Trigger>
            </Flex>
          </Flex>
          <ProfileAchievementsContainer
            isContentOpened={isContentOpened}
            currentProfileAchievements={currentProfileAchievements}
            handleAchievementSelect={handleAchievementSelect}
            selectedAchievements={selectedAchievements}
          />
        </Flex>
      </Collapsible.Root>
    </Card>
  )
}
