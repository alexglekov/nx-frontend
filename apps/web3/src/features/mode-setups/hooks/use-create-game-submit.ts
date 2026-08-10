import { useCallback, useState } from 'react'
import { CreateSetupGameInput, Asset, Maybe } from '__generated__/graphql'
import { sendCreateSetupsGame } from 'contracts/setups/calls'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { getFormValues } from 'shared/utils/get-form-values'
import { showNotificationToast } from 'shared/utils/notify'
import { useAccount } from 'wagmi'
import { isCreateSetupDialogOpenVar } from '../store/dialogs'
import { CreateSetupForm } from '../types'
import { getCreateSetupVariables } from '../utils/get-create-setup-variables'
import { useUserSetupGamesLoader } from './use-user-setup-games-loader'

export const useSetupCreationSubmit = (
  selectedAsset: Maybe<Asset>,
  selectedAssetPayload: `0x${string}`
) => {
  const [loading, setLoading] = useState(false)

  const account = useAccount()

  const { smartContractAddress, smartContractVersion } =
    useGetSmartContract('Setup')

  const { smartContractAddress: usdcContractAddress } =
    useGetSmartContract('USDC')

  const { refetch: refetchGames } = useUserSetupGamesLoader(true)

  const handleSetupCreationSubmit = useCallback(
    // eslint-disable-next-line max-statements
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formValues = getFormValues<CreateSetupGameInput, CreateSetupForm>(
        event.target as HTMLFormElement
      )

      if (!selectedAsset) {
        showNotificationToast({
          type: 'warning',
          title: 'Asset not selected',
          description: 'Please select an asset to create a game'
        })
        return
      }

      if (!account?.address) {
        showNotificationToast({
          type: 'warning',
          title: 'There is no active Metamask account',
          description:
            'Please, activate your Metamask account to create a game.'
        })
        return
      }

      const transactionPayload = getCreateSetupVariables(
        formValues,
        selectedAsset,
        selectedAssetPayload
      )

      setLoading(true)
      await sendCreateSetupsGame(
        transactionPayload,
        smartContractAddress,
        usdcContractAddress,
        smartContractVersion
      )
        .then(() => isCreateSetupDialogOpenVar(false))
        .catch(e => {
          console.error(e)
          showNotificationToast({
            title: 'Error! Game not created',
            type: 'error',
            description: e.message
          })
        })
        .finally(() => {
          setLoading(false)
        })

      await refetchGames()
      isCreateSetupDialogOpenVar(false)

      /** WARN: find the way to get gameId from the response
     * TODO: uncomment to return "copy to clipboard" functionality
      const { data } = await commitCreateSetup(mutationPayload)
      const gameId = data?.createSetupGame?.id
      if (!gameId) return showNotificationToast({
        title: 'Error! Game not created',
        type: 'error'
      })
      
      saveLinkToGameInClipboard(gameId, RouterPathes.setups)
    */
    },
    [
      selectedAsset,
      account,
      refetchGames,
      selectedAssetPayload,
      smartContractAddress,
      usdcContractAddress,
      smartContractVersion
    ]
  )

  return { handleSetupCreationSubmit, loading }
}
