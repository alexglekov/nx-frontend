import { useCallback, useState } from 'react'
import { ApolloError, useReactiveVar, useSubscription } from '@apollo/client'
import { AddSetupPredictInput } from '__generated__/graphql'
import { SUBSCRIPTION_SETUPS_GAME_CHANGED } from 'api/mode-setups/subscribe-setup'
import { useSetupsContract } from 'contracts/setups/hooks/use-setups-contract'
import { getFormValues } from 'shared/utils/get-form-values'
import { showNotificationToast } from 'shared/utils/notify'
import { zeroAddress } from 'viem'
import { Web3Adress } from '../../../shared/types'
import { selectedSetupVar } from '../store/selected-setup'
import { AddSetupPredictForm, SetupPredictType } from '../types'
import { getAddSetupVariables } from '../utils/get-add-setup-variables'
import { useSetupsGamesSubscription } from './use-setups-games-subscription'
import { useSetupsLoader } from './use-setups-loader'

// eslint-disable-next-line max-statements
export const useSetupAddBetForm = (
  setupId: string,
  activeBetType: SetupPredictType
) => {
  const selectedSetup = useReactiveVar(selectedSetupVar)
  const [isUserFriellyLogicBetAdded, setIsUserFriellyLogicBetAdded] =
    useState(false)
  const [loading, setLoading] = useState(false)

  const { refetch: refetchGames } = useSetupsGamesSubscription()
  const { refetch: refetchBets } = useSetupsLoader()

  const { data } = useSubscription(SUBSCRIPTION_SETUPS_GAME_CHANGED, {
    variables: {
      gameId: setupId
    },
    skip: !setupId
  })

  const addSetupsPredict = useSetupsContract()?.addSetupsPredict

  const contractAddress = selectedSetup?.contractAddress || zeroAddress

  const handleAddBetSubmit = useCallback(
    // eslint-disable-next-line max-statements
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!addSetupsPredict) {
        showNotificationToast({
          type: 'error',
          title: 'Setup is not created',
          description: 'Contract is not initialized'
        })
        return null
      }

      const formTarget = e.target as HTMLFormElement
      const formValues = getFormValues<
        AddSetupPredictInput,
        AddSetupPredictForm
      >(formTarget)

      setLoading(true)
      const variables = getAddSetupVariables(formValues, activeBetType, setupId)
      await addSetupsPredict({
        depositAmount: variables.data.amount.toString(),
        isStopLoss: !variables.data.takeProfit,
        gameId: setupId,
        contractAddress: contractAddress as Web3Adress
      })
        .then(tx => {
          if (!tx) return

          setIsUserFriellyLogicBetAdded(true)
        })
        .catch((e: ApolloError) =>
          showNotificationToast({
            type: 'error',
            title: 'Setup is not created',
            description: e.message
          })
        )
        .finally(() => setLoading(false))

      refetchGames()
      refetchBets()
    },
    [addSetupsPredict, activeBetType, setupId, refetchGames, refetchBets]
  )

  return {
    handleAddBetSubmit,
    subscriptionData: data,
    loading,
    isUserFriellyLogicBetAdded
  }
}
