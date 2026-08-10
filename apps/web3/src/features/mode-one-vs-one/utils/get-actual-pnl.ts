import { Maybe, MeFragment, OneVsOneGame } from '__generated__/graphql'

export const getActualPnl = (game: OneVsOneGame, user?: Maybe<MeFragment>) => {
  if (!user) return game.ownerPredict?.pnl

  if (
    user.id !== game.ownerPredict?.ownerId &&
    user.id !== game.opponentPredict?.ownerId
  )
    return game.ownerPredict?.pnl

  if (user.id === game.ownerPredict?.ownerId) return game.ownerPredict?.pnl

  return game.opponentPredict?.pnl ?? 0
}
