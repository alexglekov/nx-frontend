/* eslint-disable max-lines */
import { FC } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { GameType, Maybe, Predict } from '__generated__/graphql'
import { TetherToken } from 'shared/components'
import { useResponsive } from 'shared/hooks/use-responsive'
import {
  LargestWinIcon,
  ProfileLargestWinBigDot,
  ProfileLargestWinLeftArtifact,
  ProfileLargestWinRightArtifact,
  ProfileLargestWinSmallDot
} from 'shared/icons'
import { formatRegisterDate } from '../utils/format-register-date'
import styles from '../user-profile.module.scss'

interface Props {
  largestWin?: Maybe<Predict>
}

const TypeTitleMap = {
  [GameType.Updown]: 'Up down',
  [GameType.Bullseye]: 'Bulls eye',
  [GameType.Onevsone]: 'One vs one',
  [GameType.Setup]: 'Setup',
  [GameType.Race]: 'Meme wars'
}

export const ProfileLargestWin: FC<Props> = ({ largestWin }) => {
  const [isMobile] = useResponsive('sm')

  if (!largestWin) return

  const { pnl, amount, createdAt, gameType } = largestWin

  const formattedPnl = pnl?.toFixed(2)
  const formattedGame = TypeTitleMap[gameType]
  const winDate = formatRegisterDate(createdAt)

  return (
    <Flex
      className={styles.profileLargestWin}
      p={'6'}
      align={{ initial: 'start', sm: 'center' }}
      direction={{ initial: 'column', sm: 'row' }}
    >
      <Flex
        width={'max-content'}
        gap={{ sm: '1' }}
      >
        <LargestWinIcon />
        <Flex
          align={'start'}
          direction={'column'}
          ml={{ initial: '3', sm: '7' }}
        >
          <Text
            weight={'bold'}
            size={{ initial: '4', sm: '1' }}
            color={'gray'}
          >
            MAXIMUM WIN
          </Text>

          <Flex align={'center'}>
            <TetherToken
              size='5rem'
              color='yellow'
            />
            <Text size={'8'}>{formattedPnl}</Text>
          </Flex>

          {!isMobile && <Text size={'1'}>{winDate}</Text>}
        </Flex>

        {isMobile && (
          <Text
            size={'1'}
            className={styles.profileLargestWinDate}
          >
            {winDate}
          </Text>
        )}
      </Flex>

      {!isMobile && (
        <Box
          ml={'9'}
          mr={'6'}
          className={styles.profileLargestWinDivider}
        />
      )}

      {isMobile && (
        <Flex
          direction={'column'}
          mt={'4'}
        >
          <Text
            size={{ initial: '3', sm: '1' }}
            weight={'bold'}
            color={'gray'}
          >
            GAME
          </Text>
          <Flex>
            <Text
              size={'5'}
              className='color-white'
            >
              {formattedGame}
            </Text>
          </Flex>
        </Flex>
      )}

      <Flex
        gap={'9'}
        mt={{ initial: '4', sm: '0' }}
        width={'100%'}
        justify={'start'}
        pr={{ initial: '9', sm: '0' }}
      >
        {!isMobile && (
          <Flex direction={'column'}>
            <Text
              size={{ initial: '3', sm: '1' }}
              weight={'bold'}
              color={'gray'}
            >
              GAME
            </Text>
            <Flex>
              <Text
                size={'5'}
                className='color-white'
              >
                {formattedGame}
              </Text>
            </Flex>
          </Flex>
        )}

        <Flex direction={'column'}>
          <Text
            size={{ initial: '3', sm: '1' }}
            weight={'bold'}
            color={'gray'}
          >
            SET
          </Text>
          <Flex align={'center'}>
            <TetherToken
              size='3.5rem'
              color='yellow'
            />
            <Text
              size={'5'}
              className='color-white'
            >
              {amount}
            </Text>
          </Flex>
        </Flex>

        <Flex direction={'column'}>
          <Text
            size={{ initial: '3', sm: '1' }}
            weight={'bold'}
            color={'gray'}
          >
            EARNINGS
          </Text>
          <Flex align={'center'}>
            <TetherToken
              size='3.5rem'
              color='yellow'
            />
            <Text
              size={'5'}
              className='color-white'
            >
              {formattedPnl}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <ProfileLargestWinRightArtifact
        className={styles.profileLargestWinRightArtifact}
      />
      <ProfileLargestWinLeftArtifact
        className={styles.profileLargestWinLeftArtifact}
      />
      <ProfileLargestWinBigDot className={styles.profileLargestWinBigDot} />
      <ProfileLargestWinSmallDot className={styles.profileLargestWinSmallDot} />
    </Flex>
  )
}
