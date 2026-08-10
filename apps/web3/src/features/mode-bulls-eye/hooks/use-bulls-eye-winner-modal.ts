import { useReactiveVar } from '@apollo/client'
import { GameStatus, PredictStatus } from '__generated__/graphql'
import { userVar } from 'shared/store/user'
import { bullsEyeGameVar } from '../store/game.store'

export const useBullsEyeWinnerModal = () => {
  const user = useReactiveVar(userVar)
  const game = useReactiveVar(bullsEyeGameVar)

  const winnersList =
    game?.predicts
      ?.filter(p => p.status === PredictStatus.Won)
      .sort((a, b) => a.place - b.place) || null

  const userBetExists = Boolean(game?.myPredicts?.[0])
  const currentUserWinBets = winnersList?.filter(b => b.owner?.id === user?.id)

  const isWinnerModalOpen =
    (game?.status === GameStatus.Close && userBetExists) ||
    game?.status === GameStatus.Reject

  const isWinnersListOpen = game?.status === GameStatus.Close

  return {
    status: game?.status,
    isWinnerModalOpen,
    isWinnersListOpen,
    winnersList,
    currentUserWinBet: currentUserWinBets?.[0],
    currentUserWinBets
  }
}
