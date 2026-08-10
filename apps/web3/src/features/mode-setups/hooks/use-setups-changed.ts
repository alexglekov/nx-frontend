import { useCallback } from 'react'
import { OnDataOptions, useSubscription } from '@apollo/client'
import {
  SetupGamesChangedSubscription,
  SetupsGameFragment
} from '__generated__/graphql'
import { SETUPS_GAMES_CHANGED } from 'api/mode-setups/subscription-setup-games-changed'
import { useAllActiveSetupsLoader } from './use-all-active-setups-loader'
import { useUserSetupGamesLoader } from './use-user-setup-games-loader'

export const useSetupsChanged = () => {
  const { setups: allActiveSetups, refetch: refetchActiveSetups } =
    useAllActiveSetupsLoader(true)

  const { result: activeCreatedSetups, refetch: refetchUserSetups } =
    useUserSetupGamesLoader(true)

  const handleExistingCreatedSetup = useCallback(
    (existingSetup: SetupsGameFragment, setup: SetupsGameFragment) => {
      if (setup.status !== existingSetup.status) {
        refetchUserSetups()
      }
    },
    [refetchUserSetups]
  )

  const handleExistingSetup = useCallback(
    (existingSetup: SetupsGameFragment, setup: SetupsGameFragment) => {
      if (setup.status !== existingSetup.status) {
        refetchActiveSetups()
      }
    },
    [refetchActiveSetups]
  )

  const onData = useCallback(
    ({ data: { data } }: OnDataOptions<SetupGamesChangedSubscription>) => {
      if (!data?.setupGamesChanged) return

      const setup = data.setupGamesChanged as SetupsGameFragment

      const existingActiveCreatedSetup = activeCreatedSetups.find(
        ({ id }) => id === setup.id
      ) as SetupsGameFragment
      const existingSetup = allActiveSetups.find(({ id }) => id === setup.id)

      if (existingActiveCreatedSetup) {
        handleExistingCreatedSetup(existingActiveCreatedSetup, setup)
      }

      if (existingSetup) {
        handleExistingSetup(existingSetup, setup)
      }
    },
    [
      allActiveSetups,
      activeCreatedSetups,
      handleExistingCreatedSetup,
      handleExistingSetup
    ]
  )

  useSubscription<SetupGamesChangedSubscription>(SETUPS_GAMES_CHANGED, {
    onData
  })
}
