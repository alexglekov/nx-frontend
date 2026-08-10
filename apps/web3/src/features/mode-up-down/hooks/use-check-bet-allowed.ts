import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { GameStateEnum } from 'shared/types'
import {
  upDownButtonsPendingVar,
  upDownGameStateVar,
  upDownGameVar
} from '../store/game.store'

export function useCheckBetAllowed() {
  const upDownGame = useReactiveVar(upDownGameVar)
  const upDownGameState = useReactiveVar(upDownGameStateVar)
  const upDownButtonsPending = useReactiveVar(upDownButtonsPendingVar)

  const isBetAllowed = upDownGameState === GameStateEnum.Open
  const userBet = upDownGame?.myPredict || null

  useEffect(() => {
    if (userBet) return

    upDownButtonsPendingVar(false)
  }, [userBet])

  return isBetAllowed && !userBet && !upDownButtonsPending
}
