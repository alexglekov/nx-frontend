import { FC, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { format } from 'date-fns'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { MS_IN_SEC } from 'shared/constants'
import { UpdownTimerContainerSVG } from 'shared/icons'
import { Seconds } from 'shared/types'
import { XyroLoadingSpinner, XyroNumeral } from 'shared/ui'
import { getTimerByGameState } from 'shared/utils/get-timer-by-game'
import { getTimerColor } from 'shared/utils/get-timer-color'
import { MAX_TIMER_VALUE } from '../constants'
import { upDownGameStateVar, upDownGameVar } from '../store/game.store'
import styles from '../mode-up-down.module.scss'

export const UpDownTimer: FC = () => {
  const game = useReactiveVar(upDownGameVar)
  const upDownGameState = useReactiveVar(upDownGameStateVar)

  const timer = getTimerByGameState(
    upDownGameState,
    game?.stopPredictAt || null,
    game?.endAt || null
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
  const timerBgColor = getTimerColor(upDownGameState ?? null)

  return (
    <Flex
      gap={'2'}
      className={styles.timerCounter}
    >
      {timer === null ? (
        <XyroLoadingSpinner
          iconSize={'0'}
          variant='dark'
        />
      ) : (
        <>
          <CircularProgressbar
            value={timeRemaining}
            maxValue={MAX_TIMER_VALUE}
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
      )}

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
