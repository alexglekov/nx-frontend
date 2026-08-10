import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import cn from 'classnames'
import { TetherRoundedIcon } from 'shared/icons'
import { GameModes } from 'shared/types'
import { PROFILE_STATISTIC_MODES_DATA } from '../constants'
import { useModeStats } from '../hooks/use-mode-stats'
import styles from '../user-profile.module.scss'

interface Props {
  mode: GameModes
  userId: User['id']
}
export const ProfileModeStatsItem: React.FC<Props> = ({ mode, userId }) => {
  const {
    modeTitle,
    modeIcon: ModeIcon,
    modeRune: ModeRune
  } = PROFILE_STATISTIC_MODES_DATA[mode]

  const { modesStatsData } = useModeStats(userId)

  const currentModeStats = modesStatsData[mode]

  const totalGames = currentModeStats?.totalGames || 0
  const totalWins = currentModeStats?.totalWins || 0
  const winPercentage = currentModeStats?.winPercentage?.toFixed(2) || 0
  const earned = currentModeStats?.earned?.toFixed(2)

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      className={styles.profileModeStatsItemContainer}
      position={'relative'}
      justify={'between'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        position={'absolute'}
        className={cn(styles.profileModeStatsItemBackground, styles[mode])}
      >
        <ModeRune />
      </Flex>

      <Flex className={cn(styles.profileModeStatsItemBadge, styles[mode])}>
        <ModeIcon
          className='color-black'
          width={'4rem'}
          height={'4rem'}
        />
      </Flex>

      <Flex
        width={'100%'}
        direction={'column'}
        gap={'3'}
        className={styles.profileModeStatsItemInfo}
      >
        <Flex
          align={'center'}
          justify={'between'}
        >
          <Text
            className='color-white'
            weight={'bold'}
            size={{ initial: '6', sm: '4' }}
          >
            {modeTitle} Played:
          </Text>

          <Text
            weight={'light'}
            className='color-white'
            size={{ initial: '6', sm: '4' }}
          >
            {totalGames}
          </Text>
        </Flex>

        <Flex
          align={'center'}
          width={'100%'}
          justify={'between'}
        >
          <Text
            className='color-gray'
            weight={'bold'}
            size={{ initial: '4', sm: '2' }}
          >
            WINS:
          </Text>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <Text
              className='color-white'
              weight={'light'}
              size={{ initial: '4', sm: '2' }}
            >
              {totalWins}
            </Text>

            <Flex className={styles.statisticWinrateBadge}>
              <Text
                weight={'medium'}
                size={{ initial: '2', sm: '1' }}
              >
                {winPercentage}%
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {earned !== null && (
          <Flex
            align={'center'}
            width={'100%'}
            justify={'between'}
          >
            <Text
              className='color-gray'
              weight={'bold'}
              size={{ initial: '4', sm: '2' }}
            >
              EARNED:
            </Text>

            <Flex
              align={'center'}
              gap={'1'}
            >
              <TetherRoundedIcon
                className='color-yellow'
                width={'2rem'}
                height={'2rem'}
              />

              <Text
                className='color-white'
                weight={'light'}
                size={{ initial: '4', sm: '2' }}
              >
                {earned}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
