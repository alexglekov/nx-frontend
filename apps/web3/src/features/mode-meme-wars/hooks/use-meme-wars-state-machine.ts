/* eslint-disable max-statements */
import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { MS_IN_SEC } from 'shared/constants'
import { GameStateEnum } from 'shared/types'
import {
  memeWarsGameVar,
  memeWarsGameStateVar
} from '../store/meme-wars-game.store'

export const useMemeWarsStateMachine = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)
  const memeWarsGameState = useReactiveVar(memeWarsGameStateVar)

  useEffect(() => {
    return () => {
      memeWarsGameStateVar(null)
    }
  }, [])

  // NOTE: OPEN: This effect controls OPEN game state, when user will be able to create bets
  useEffect(() => {
    if (!memeWarsGame?.stopPredictAt) return

    const interval = setInterval(() => {
      const stopPredictAt = memeWarsGame?.stopPredictAt
      if (!stopPredictAt) return

      const currentTime = Date.now()

      if (stopPredictAt > currentTime && memeWarsGameState !== Open) {
        memeWarsGameStateVar(Open)
        clearInterval(interval)
      } else {
        if (stopPredictAt <= currentTime) {
          clearInterval(interval)
        }
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [memeWarsGame?.stopPredictAt])

  // NOTE: INPROGRESS: This effect controls INPROGRESS game state, this effect will work only of prevous state is OPEN
  useEffect(() => {
    if (!memeWarsGame?.endAt) return

    // eslint-disable-next-line max-statements
    const interval = setInterval(() => {
      const { endAt, stopPredictAt, startPrices } = memeWarsGame
      if (!endAt || !stopPredictAt) return

      const currentTime = Date.now()
      const isGameInProgress =
        endAt > currentTime && stopPredictAt <= currentTime

      if (isGameInProgress || startPrices.length > 0) {
        memeWarsGameStateVar(Inprogress)

        clearInterval(interval)
      } else if (stopPredictAt <= currentTime) {
        clearInterval(interval)
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [
    memeWarsGame?.endAt,
    memeWarsGame?.stopPredictAt,
    memeWarsGame?.startPrices
  ])

  // NOTE: PENDING: This effect controls the PENDING game state; this effect will work only if the previous state is INPROGRESS
  useEffect(() => {
    const endAt = memeWarsGame?.endAt
    if (!endAt) return

    const interval = setInterval(() => {
      const currentTime = Date.now()

      if (!endAt) return

      if (endAt < currentTime) {
        memeWarsGameStateVar(Pending)
        clearInterval(interval)
      }
    }, MS_IN_SEC)

    return () => clearInterval(interval)
  }, [memeWarsGame?.endAt, memeWarsGame?.endPrices])
}

const { Open, Inprogress, Pending } = GameStateEnum
