import { useEffect, useMemo } from 'react'
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client'
import { GameStatus, UpDownGame } from '__generated__/graphql'
import { GET_UPDOWN_GAME } from 'api/mode-up-down/get-up-down-game'
import { SUBSCRIBE_UP_DOWN_STATE } from 'api/mode-up-down/subscribe-up-down-state'
import { useNotifyHighGasFee } from 'shared/hooks/use-notify-high-gas-fee'
import { zeroAddress } from 'viem'
import { historyVar, upDownGameVar } from '../store/game.store'
import { upDownCurrentContractVar } from '../store/up-down-contract-addresses.store'
import { appendGameToHistory } from '../utils/append-game-to-history'
import { useUpDownBetsLoader } from './use-up-down-bets-loader'

// eslint-disable-next-line max-statements
export const useUpDownGame = () => {
  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  const { refetch: refetchUpDownBets } = useUpDownBetsLoader()

  const { data: initialGameData, error: upDownGameQueryError } = useQuery(
    GET_UPDOWN_GAME,
    {
      fetchPolicy: 'no-cache',
      variables: {
        data: {
          contractAddress:
            currentUpDownSmartContract?.contractAddress || zeroAddress
        }
      }
    }
  )

  const { data: subscriptionGameData } = useSubscription(
    SUBSCRIBE_UP_DOWN_STATE,
    {
      fetchPolicy: 'no-cache',
      variables: {
        contractAddress:
          currentUpDownSmartContract?.contractAddress || zeroAddress
      }
    }
  )

  useNotifyHighGasFee(upDownGameQueryError || null)

  const history = useReactiveVar(historyVar)

  const initialUpDownGame = initialGameData?.getCurrentUpDownGame
  const subscriptionUpDownGame = subscriptionGameData?.upDownGameChanged

  const game = useMemo(
    () => ({ ...initialUpDownGame, ...subscriptionUpDownGame }) as UpDownGame,
    [initialUpDownGame, subscriptionUpDownGame]
  )

  useEffect(() => {
    if (game.status !== GameStatus.Close) return

    refetchUpDownBets()
  }, [game, refetchUpDownBets])

  useEffect(() => {
    if (!game) return

    upDownGameVar(game)
  }, [game])

  useEffect(() => {
    if (game.status !== GameStatus.Close || !history) return

    appendGameToHistory(game, history)
  }, [game])
}
