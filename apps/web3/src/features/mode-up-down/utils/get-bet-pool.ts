import { UpDownGame } from '__generated__/graphql'

export function getBetPool(isUp: boolean, game: UpDownGame) {
  return isUp ? game.upPool : game.downPool
}

export function getOppositeBetPool(isUp: boolean, game: UpDownGame) {
  return isUp ? game.downPool : game.upPool
}
