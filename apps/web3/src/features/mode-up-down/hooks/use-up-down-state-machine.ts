/* eslint-disable max-statements */
import { useEffect, useRef } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useChartAnnotationsManager } from 'features/price-graph/hooks/use-chart-annotations-manager'
import { MS_IN_SEC } from 'shared/constants'
import { GameStateEnum } from 'shared/types'
import { MAX_TIMESTAMP_DELTA } from '../constants'
import { upDownGameStateVar, upDownGameVar } from '../store/game.store'
import { upDownBasePriceVar } from '../store/up-down-base-price'
import { upDownChartAnnotationsVar } from '../store/up-down-chart-annotations'
import { getAnnotationNameByStatus } from '../utils/get-annotation-name-by-status'
import { getTimeStampByGameStatus } from '../utils/get-timestamp-by-game-status'

export const useUpDownStateMachine = () => {
  const upDownGame = useReactiveVar(upDownGameVar)
  const upDownGameState = useReactiveVar(upDownGameStateVar)
  const { addHorizontalAnnotation, addVerticalAnnotation } =
    useChartAnnotationsManager(upDownChartAnnotationsVar)

  const lastStatus = useRef<GameStateEnum | null>(null)

  useEffect(() => {
    return () => {
      upDownGameStateVar(null)
    }
  }, [])

  // NOTE: OPEN: This effect controls OPEN game state, when user will be able to create bets
  useEffect(() => {
    if (!upDownGame?.stopPredictAt) return

    const interval = setInterval(() => {
      const stopPredictAt = upDownGame?.stopPredictAt
      if (!stopPredictAt) return

      const currentTime = Date.now()

      if (stopPredictAt > currentTime && upDownGameState !== Open) {
        upDownChartAnnotationsVar(null)
        upDownBasePriceVar(0)

        upDownGameStateVar(Open)
        clearInterval(interval)
      } else {
        if (stopPredictAt <= currentTime) {
          clearInterval(interval)
        }
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [upDownGame?.stopPredictAt])

  // NOTE: INPROGRESS: This effect controls INPROGRESS game state, this effect will work only of prevous state is OPEN
  useEffect(() => {
    if (!upDownGame?.endAt) return

    // eslint-disable-next-line max-statements
    const interval = setInterval(() => {
      const { startPrice, endAt, stopPredictAt } = upDownGame
      if (!endAt || !stopPredictAt) return

      const currentTime = Date.now()
      const isGameInProgress =
        endAt > currentTime && stopPredictAt <= currentTime

      if (isGameInProgress && startPrice) {
        upDownGameStateVar(Inprogress)

        // NOTE: chart annotation creation
        const annotation = {
          name: 'upDownPredict' as const,
          value: startPrice
        }
        addHorizontalAnnotation(annotation)

        upDownBasePriceVar(startPrice)
        clearInterval(interval)
      } else if (isGameInProgress) {
        upDownGameStateVar(Inprogress)
      } else if (stopPredictAt <= currentTime) {
        clearInterval(interval)
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [upDownGame?.endAt, upDownGame?.stopPredictAt, upDownGame?.startPrice])

  // NOTE: PENDING: This effect controls the PENDING game state; this effect will work only if the previous state is INPROGRESS
  useEffect(() => {
    const endAt = upDownGame?.endAt
    if (!endAt) return

    const interval = setInterval(() => {
      const currentTime = Date.now()

      if (!endAt) return

      if (endAt < currentTime) {
        upDownGameStateVar(Pending)
        clearInterval(interval)
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [upDownGame?.endAt])

  // NOTE: vertical chart annotation creation for game states
  // eslint-disable-next-line max-statements
  useEffect(() => {
    if (lastStatus.current === upDownGameState) return

    lastStatus.current = upDownGameState
    if (lastStatus.current === null) return

    const name = getAnnotationNameByStatus(upDownGameState)
    if (!name) return

    const timestamp = getTimeStampByGameStatus(lastStatus.current, upDownGame)

    if (upDownGameState === GameStateEnum.Inprogress) {
      const gameStartPrice = upDownGame?.startPrice || 0

      const verticalAnnotation = {
        name,
        value: gameStartPrice,
        timestamp: upDownGame?.stopPredictAt || 0
      }

      addVerticalAnnotation(verticalAnnotation)

      return
    }

    if (!timestamp || Math.abs(timestamp - Date.now()) > MAX_TIMESTAMP_DELTA)
      return

    const verticalAnnotation = {
      name,
      value: 0 // NOTE: zero value to draw annotation at last chart point
    }

    addVerticalAnnotation(verticalAnnotation)
  }, [upDownGameState])
}

const { Open, Inprogress, Pending } = GameStateEnum
