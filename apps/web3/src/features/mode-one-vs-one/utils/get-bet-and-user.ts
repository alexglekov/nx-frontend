import { OneVsOneGameCustomType } from 'shared/types'

export function getOneVsOneOpponent(
  game: OneVsOneGameCustomType,
  userId?: string
) {
  if (!userId) return game?.opponent ?? null

  if (game?.ownerId === userId) {
    return game?.opponent
  } else {
    return game?.owner ?? null
  }
}

export function get1vs1UserPredict(
  game: OneVsOneGameCustomType,
  userId?: string
) {
  if (!userId) return game?.ownerPredict ?? null

  if (game?.ownerId === userId) {
    return game.ownerPredict
  } else {
    return game?.opponentPredict ?? game?.ownerPredict
  }
}

export function get1vs1OpponentPredict(game: OneVsOneGameCustomType, userId?: string) {
  const { ownerId } = game

  if (!userId) return game.opponentPredict

  if (ownerId === userId) {
    return game.opponentPredict
  } else {
    return game.ownerPredict
  }
}
