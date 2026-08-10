import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Milliseconds } from 'shared/types'
import { TimeframeCountdown } from '../timeframe-countdown/timeframe-countdown'
import { XyroCard } from '../xyro-card/xyro-card'
import styles from './winner-modal.module.scss'

interface Props {
  title: string
  isUserPlayed: boolean
  isWin?: boolean
  elementsColor: string
  isCountdownDisabled?: boolean
  modeCardIcon?: string
}
export const WinnerModalHeader: React.FC<Props> = ({
  title,
  modeCardIcon,
  isUserPlayed,
  isWin,
  elementsColor,
  isCountdownDisabled = false
}) => {
  return (
    <Flex
      className={styles.mainWindowHeader}
      align={'center'}
      justify={'between'}
      width={'100%'}
    >
      <Flex
        align={'center'}
        gap={'1'}
      >
        <XyroCard
          bgColor={elementsColor}
          size='6rem'
        >
          {modeCardIcon && (
            <img
              src={modeCardIcon}
              alt={`${title} card icon`}
            />
          )}
        </XyroCard>

        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            size={'5'}
            weight={'bold'}
            className={styles.whiteColor}
          >
            {title} results
          </Text>

          {isUserPlayed ? (
            <Text
              className={styles.grayColor}
              size={'1'}
              weight={'bold'}
            >
              {isWin ? 'You win!' : "You didn't win..."}
            </Text>
          ) : null}
        </Flex>
      </Flex>
      {!isCountdownDisabled ? (
        <Flex
          mb={'3'}
          align={'center'}
        >
          <Text
            className={styles.refreshPoolsTimerText}
            size={'1'}
            weight={'medium'}
          >
            Time until pools refresh:
          </Text>

          <Flex>
            {/* TODO: Fix countdown */}
            <TimeframeCountdown endAt={1699998568184 as Milliseconds} />
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  )
}
