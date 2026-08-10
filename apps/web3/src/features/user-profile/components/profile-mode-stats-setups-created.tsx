/* eslint-disable complexity, max-statements, max-lines */
import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import {
  DownIcon,
  SetupsNavIcon,
  TetherRoundedIcon,
  UpIcon
} from 'shared/icons'
import { useModeStats } from '../hooks/use-mode-stats'
import styles from '../user-profile.module.scss'

interface Props {
  userId: User['id']
}
export const ProfileModeStatsSetupsCreated: React.FC<Props> = ({ userId }) => {
  const { createdSetupsData } = useModeStats(userId)

  const totalPlayersOnGames = createdSetupsData?.totalPlayersOnGames || 0
  const totalGames = createdSetupsData?.totalGames || 0
  const totalTakeProfitClosedGames =
    createdSetupsData?.totalTakeProfitClosedGames || 0
  const totalTakeProfitClosedGamesPercentage =
    createdSetupsData?.totalTakeProfitClosedGamesPercentage?.toFixed(2) || 0
  const totalStopLossClosedGames =
    createdSetupsData?.totalStopLossClosedGames || 0
  const totalStopLossClosedGamesPercentage =
    createdSetupsData?.totalStopLossClosedGamesPercentage?.toFixed(2) || 0
  const totalRejectedGames = createdSetupsData?.totalRejectedGames || 0
  const totalRejectedGamesPercentage =
    createdSetupsData?.totalRejectedGamesPercentage?.toFixed(2) || 0
  const earned = createdSetupsData?.earned

  return (
    <Flex
      width={'100%'}
      className={styles.profileModeStatsSetupsCreatedContainer}
      direction={'column'}
    >
      <Flex
        direction={'column'}
        width={'100%'}
        gap={'3'}
      >
        <SetupsNavIcon className={styles.setupsNavIcon} />

        <Flex
          align={'center'}
          justify={'between'}
        >
          <Text
            className='color-white'
            weight={'bold'}
            size={{ initial: '6', sm: '4' }}
          >
            Setups Created:
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
            PLAYERS:
          </Text>

          <Text
            className='color-white'
            weight={'light'}
            size={{ initial: '4', sm: '2' }}
          >
            {totalPlayersOnGames}
          </Text>
        </Flex>

        <Flex
          align={'center'}
          width={'100%'}
          justify={'between'}
        >
          <Flex
            align={'center'}
            gap={'1'}
          >
            <UpIcon className='color-green' />

            <Text
              className='color-green'
              weight={'bold'}
              size={{ initial: '4', sm: '2' }}
            >
              TAKE PROFIT:
            </Text>
          </Flex>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <Text
              className='color-white'
              weight={'light'}
              size={{ initial: '4', sm: '2' }}
            >
              {totalTakeProfitClosedGames}
            </Text>

            <Flex className={styles.statisticWinrateBadge}>
              <Text
                weight={'medium'}
                size={{ initial: '2', sm: '1' }}
              >
                {totalTakeProfitClosedGamesPercentage}%
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          align={'center'}
          width={'100%'}
          justify={'between'}
        >
          <Flex
            align={'center'}
            gap={'1'}
          >
            <DownIcon className='color-pink' />

            <Text
              className='color-pink'
              weight={'bold'}
              size={{ initial: '4', sm: '2' }}
            >
              STOP LOSS:
            </Text>
          </Flex>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <Text
              className='color-white'
              weight={'light'}
              size={{ initial: '4', sm: '2' }}
            >
              {totalStopLossClosedGames}
            </Text>

            <Flex className={styles.statisticWinrateBadge}>
              <Text
                weight={'medium'}
                size={{ initial: '2', sm: '1' }}
              >
                {totalStopLossClosedGamesPercentage}%
              </Text>
            </Flex>
          </Flex>
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
            REJECTED:
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
              {totalRejectedGames}
            </Text>

            <Flex className={styles.statisticWinrateBadge}>
              <Text
                weight={'medium'}
                size={{ initial: '2', sm: '1' }}
              >
                {totalRejectedGamesPercentage}%
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

      <Flex
        className={styles.setupsCallToActionContainer}
        width={'100%'}
        align={'center'}
        justify={'center'}
        gap={'4'}
        direction={'column'}
      >
        <Flex
          width={'100%'}
          align={'center'}
          justify={'center'}
          direction={'column'}
        >
          <Text
            className='color-white'
            size={'3'}
            weight={'bold'}
          >
            Create new setup and
          </Text>

          <Text
            className='color-yellow'
            size={'3'}
            weight={'bold'}
          >
            take profit!
          </Text>
        </Flex>

        <Link to={RouterPathes.setups}>
          <Button
            variant='outline'
            color='blue'
            size={'4'}
            className={styles.setupsCallToActionButton}
          >
            <Text
              size={'2'}
              weight={'bold'}
            >
              CREATE SETUP
            </Text>
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
