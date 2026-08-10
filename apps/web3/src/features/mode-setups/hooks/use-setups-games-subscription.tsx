import { useEffect } from 'react'
import { useQuery, useReactiveVar, useSubscription } from '@apollo/client'
import { useFragment } from '__generated__'
import { GameStatus } from '__generated__/graphql'
import { FRAGMENT_SETUPS_GAME } from 'api/mode-setups'
import { GET_SETUPS_GAMES } from 'api/mode-setups/get-setups-games'
import { SETUPS_GAME_CREATED } from 'api/mode-setups/subscription-setups-game-created'
import { selectedSetupVar } from '../store/selected-setup'

export function useSetupsGamesSubscription() {
  const selectedSetup = useReactiveVar(selectedSetupVar)

  const {
    data,
    loading,
    error,
    refetch: refetchSetups
  } = useQuery(GET_SETUPS_GAMES, {
    variables: {
      filters: {
        status: [Open]
      },
      pagination: {
        take: 20,
        skip: 0
      }
    }
  })

  const { data: createdSetupGameSub } = useSubscription(SETUPS_GAME_CREATED)

  useEffect(() => {
    if (!createdSetupGameSub?.setupGameCreated) return

    refetchSetups()
  }, [createdSetupGameSub?.setupGameCreated, refetchSetups])

  const setups = useFragment(FRAGMENT_SETUPS_GAME, data?.getSetupGames.games)

  useEffect(() => {
    if (!setups || !selectedSetup) return

    const updatedSelectedSetup = setups.find(s => s.id === selectedSetup.id)
    if (!updatedSelectedSetup) return

    selectedSetupVar(updatedSelectedSetup)
  }, [setups])

  return {
    setups,
    loading,
    error,
    refetch: refetchSetups
  }
}

const { Open } = GameStatus
