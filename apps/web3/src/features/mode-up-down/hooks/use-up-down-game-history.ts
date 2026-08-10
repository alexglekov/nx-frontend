import { useEffect } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { UpDownGame } from '__generated__/graphql'
import { GET_UP_DOWN_GAME_HISTORY } from 'api/mode-up-down/get-up-down-game-histroy'
import { zeroAddress } from 'viem'
import { historyVar, upDownGameVar } from '../store/game.store'
import { upDownCurrentContractVar } from '../store/up-down-contract-addresses.store'

export const useUpDownGameHistory = () => {
  const upDownGame = useReactiveVar(upDownGameVar)
  const currentUpDownSmartContract = useReactiveVar(upDownCurrentContractVar)

  const { data: gameList } = useQuery(GET_UP_DOWN_GAME_HISTORY, {
    fetchPolicy: 'no-cache',
    variables: {
      data: {
        contractAddress:
          currentUpDownSmartContract?.contractAddress || zeroAddress
      }
    }
  })

  useEffect(() => {
    if (!gameList?.getLastClosedUpDownGames) return

    const games = gameList.getLastClosedUpDownGames?.games || []

    historyVar(games as UpDownGame[])
  }, [gameList?.getLastClosedUpDownGames, upDownGame])
}
