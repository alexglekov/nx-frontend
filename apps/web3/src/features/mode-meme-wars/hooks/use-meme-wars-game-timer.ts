import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { format } from 'date-fns'
import { MS_IN_SEC } from 'shared/constants'
import { GameStateEnum, Seconds } from 'shared/types'
import { getTimerByGameState } from 'shared/utils/get-timer-by-game'
import { memeWarsGameVar } from '../store/meme-wars-game.store'

export const useMemeWarsGameTimer = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  const timer = getTimerByGameState(
    (memeWarsGame?.status || null) as GameStateEnum | null,
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

  return {
    timeRemaining,
    formattedTimer
  }
}
