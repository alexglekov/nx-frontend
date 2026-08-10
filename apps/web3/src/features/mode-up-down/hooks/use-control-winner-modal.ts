import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { GameStatus } from '__generated__/graphql'
import { upDownGameVar } from '../store/game.store'

export const useControlWinnerModal = () => {
  const game = useReactiveVar(upDownGameVar)
  const userPredict = game?.myPredict || null
  const userWinAmount = Number(userPredict?.pnl?.toFixed(2)) || 0
  const userPredictAmount = userPredict?.amount ?? 0

  const [isWinnerModalOpen, setWinnerModalOpen] = useState(false)

  useEffect(() => {
    if (
      game?.status === GameStatus.Close ||
      game?.status === GameStatus.Reject
    ) {
      setWinnerModalOpen(true)
    }

    if (game?.status === GameStatus.Open) {
      setWinnerModalOpen(false)
    }
  }, [game])

  return {
    isWinnerModalOpen,
    userPayout: userWinAmount + userPredictAmount
  }
}
