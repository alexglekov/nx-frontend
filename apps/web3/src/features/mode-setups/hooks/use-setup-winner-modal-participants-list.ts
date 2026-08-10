import { useEffect } from 'react'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import { useFragment } from '__generated__'
import {
  FRAGMENT_SETUPS_PREDICT,
  GET_SETUPS_GAME_PREDICTS
} from 'api/mode-setups'
import { setupsWinnerModalGameVar } from '../store/winner-modal'

export const useSetupWinnerModalBets = () => {
  const winnerModalGame = useReactiveVar(setupsWinnerModalGameVar)

  const [getSetupsGameBets, { data: setupsGameBetsData }] = useLazyQuery(
    GET_SETUPS_GAME_PREDICTS
  )

  const setupGameBets = useFragment(
    FRAGMENT_SETUPS_PREDICT,
    setupsGameBetsData?.getSetupPredicts.predicts
  )

  useEffect(() => {
    if (!winnerModalGame?.id) return

    getSetupsGameBets({
      variables: {
        id: winnerModalGame.id,
        pagination: {
          skip: 0,
          take: 20
        }
      }
    })
  }, [getSetupsGameBets, winnerModalGame])

  return setupGameBets ?? null
}
