import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { showNotificationToast } from 'shared/utils/notify'
import { useAccount } from 'wagmi'
import { sendCreateSetupsGame } from '../calls'
import { CreateSetupsGameParams } from '../types'

export const useSetupsFactoryContracts = () => {
  const { address } = useAccount()

  const { smartContractAddress, smartContractVersion } =
    useGetSmartContract('Setup')

  const { smartContractAddress: usdcContractAddress } =
    useGetSmartContract('USDC')

  if (!address) {
    showNotificationToast({
      type: 'warning',
      title: 'There is no active Metamask account',
      description: 'Please, activate your Metamask account or sign in.'
    })
    return null
  }

  const createNewSetup = (params: CreateSetupsGameParams) =>
    sendCreateSetupsGame(
      params,
      smartContractAddress,
      usdcContractAddress,
      smartContractVersion
    )

  return { createNewSetup }
}
