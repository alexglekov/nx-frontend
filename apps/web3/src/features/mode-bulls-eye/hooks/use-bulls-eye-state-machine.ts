import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { MS_IN_SEC } from 'shared/constants'
import { GameStateEnum } from 'shared/types'
import { bullsEyeChartAnnotationsVar } from '../store/bulls-eye-chart-annotations'
import { bullsEyeGameStateVar, bullsEyeGameVar } from '../store/game.store'

export const useBullsEyeStateMachine = () => {
  const bullsEyeGame = useReactiveVar(bullsEyeGameVar)
  const bullsEyeGameState = useReactiveVar(bullsEyeGameStateVar)

  // NOTE: to avoid status caching or duplicating
  useEffect(() => {
    return () => {
      bullsEyeGameStateVar(null)
    }
  }, [])

  // NOTE: OPEN: This effect controls OPEN game state, when user will be able to create bets
  useEffect(() => {
    if (!bullsEyeGame?.stopPredictAt) return

    // eslint-disable-next-line max-statements
    const interval = setInterval(() => {
      const stopPredictAt = bullsEyeGame?.stopPredictAt
      if (!stopPredictAt) return

      const currentTime = Date.now()
      const isGameOpen =
        stopPredictAt > currentTime && bullsEyeGameState !== Open

      if (isGameOpen) {
        bullsEyeGameStateVar(Open)
      } else {
        if (stopPredictAt <= currentTime) {
          clearInterval(interval)
        }
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [bullsEyeGame?.stopPredictAt])

  // NOTE: INPROGRESS: This effect controls INPROGRESS game state, this effect will work only of prevous state is OPEN
  useEffect(() => {
    if (!bullsEyeGame?.endAt) return

    // eslint-disable-next-line max-statements
    const interval = setInterval(() => {
      const { endAt, stopPredictAt } = bullsEyeGame

      const currentTime = Date.now()
      if (!endAt || !stopPredictAt) return

      const isGameInProgress =
        endAt > currentTime &&
        stopPredictAt <= currentTime &&
        bullsEyeGameState !== Inprogress

      if (isGameInProgress) {
        bullsEyeGameStateVar(Inprogress)
      } else {
        stopPredictAt <= currentTime && clearInterval(interval)
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [bullsEyeGame?.endAt, bullsEyeGame?.stopPredictAt])

  // NOTE: PENDING: This effect controls the PENDING game state; this effect will work only if the previous state is INPROGRESS.
  useEffect(() => {
    const endAt = bullsEyeGame?.endAt
    if (!endAt) return

    const interval = setInterval(() => {
      const currentTime = Date.now()

      if (!endAt) return

      if (endAt < currentTime) {
        bullsEyeGameStateVar(Pending)
        bullsEyeChartAnnotationsVar(null)
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [bullsEyeGame?.endAt])
}

const { Open, Inprogress, Pending } = GameStateEnum
