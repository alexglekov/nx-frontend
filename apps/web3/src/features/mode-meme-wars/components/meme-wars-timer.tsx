import { FC, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { format } from 'date-fns'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { MS_IN_SEC, SECS_IN_MIN } from 'shared/constants'
import { UpdownTimerContainerSVG } from 'shared/icons'
import { GameStateEnum, Seconds } from 'shared/types'
import { XyroLoadingSpinner, XyroNumeral } from 'shared/ui'
import { getTimerByGameState } from 'shared/utils/get-timer-by-game'
import { getTimerColor } from 'shared/utils/get-timer-color'
import {
  memeWarsGameStateVar,
  memeWarsGameVar
} from '../store/meme-wars-game.store'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsTimer: FC = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)
  const memeWarsGameState = useReactiveVar(memeWarsGameStateVar)

  const timer = getTimerByGameState(
    memeWarsGameState,
    memeWarsGame?.stopPredictAt || null,
    memeWarsGame?.endAt || null
  )
  const [timeRemaining, setTimeRemaining] = useState<Seconds>(
    timer || (0 as Seconds)
  )

  useEffect(() => {
    setTimeRemaining(timer || (0 as Seconds))

    if (timer === 0) return

    const intervalId = setInterval(() => {
      const decrementTime = (prev: Seconds) =>
        (prev > 0 ? prev - 1 : 0) as Seconds

      setTimeRemaining(decrementTime)
    }, MS_IN_SEC)

    return () => clearInterval(intervalId)
  }, [timer])

  const formattedTimer = format(timeRemaining * 1000, 'm:ss')
  const timerBgColor = getTimerColor(memeWarsGameState ?? null)

  const timerMaxValue = getMemeWarsGameTimerMaxValue(memeWarsGameState)

  return (
    <Flex
      gap={'2'}
      className={styles.timerCounter}
    >
      {timer === null ?
        <XyroLoadingSpinner
          iconSize={'0'}
          variant='dark'
        />
      : <>
          <CircularProgressbar
            value={timeRemaining}
            maxValue={timerMaxValue}
            className={styles.timeframeCountdown}
            counterClockwise={true}
            strokeWidth={50}
            background={true}
            styles={PROGRESS_BAR_STYLES}
          />

          <XyroNumeral
            size={{ initial: '6', sm: '7' }}
            weight={'medium'}
            className={styles.timerText}
            isWhite={false}
            isBlack
          >
            {formattedTimer}
          </XyroNumeral>
        </>
      }

      <UpdownTimerContainerSVG
        className={styles.timerBackground}
        fill={timerBgColor}
      />
    </Flex>
  )
}

export const PROGRESS_BAR_STYLES = buildStyles({
  pathColor: 'var(--c-a-light-blue)',
  trailColor: 'var(--c-black)',
  backgroundColor: 'var(--c-black)',
  pathTransitionDuration: 0.3,
  strokeLinecap: 'butt'
})

export const getMemeWarsGameTimerMaxValue = (
  gameState: GameStateEnum | null
) => {
  if (gameState === GameStateEnum.Open) {
    if (STAND === Stand.mainnet) {
      return 1.5 * SECS_IN_MIN // PROD: 5 minutes to make bet
    }

    return 5 * SECS_IN_MIN // DEV: 5 minutes to make bet
  }

  if (gameState === GameStateEnum.Inprogress) {
    if (STAND === Stand.mainnet) {
      return 1.5 * SECS_IN_MIN // PROD: 10 minutes game duration
    }

    return 10 * SECS_IN_MIN // DEV: 1 minute game duration
  }

  return 60
}
