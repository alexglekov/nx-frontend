import { useReactiveVar } from '@apollo/client'
import { BetsPoolCalloutType } from 'shared/ui/bets-pool-callout'
import { upDownGameVar } from '../store/game.store'

// eslint-disable-next-line max-statements, complexity
export const usePoolInfo = (isLong: boolean) => {
  const game = useReactiveVar(upDownGameVar)
  const userBet = game?.myPredict || null

  const betPool = isLong ? game?.upPool : game?.downPool ?? null
  const oppositePool = isLong ? game?.downPool : game?.upPool ?? null

  const isHaveBet = userBet?.isLong === isLong

  const participantListPoolsEmpty =
    !game?.upPool?.predictsCount && !game?.downPool?.predictsCount
      ? BetsPoolCalloutType.noPlayers
      : null

  const participantListChanceToWin =
    !userBet && oppositePool?.predictsCount && !betPool?.predictsCount
      ? BetsPoolCalloutType.chanceToWin
      : null

  const participantListOppositPoolEmpty =
    !isHaveBet && oppositePool?.predictsCount && !betPool?.predictsCount
      ? BetsPoolCalloutType.emptyPool
      : null

  const participantListMessage =
    participantListPoolsEmpty ||
    participantListChanceToWin ||
    participantListOppositPoolEmpty

  return {
    participantListMessage,
    betPool
  }
}
