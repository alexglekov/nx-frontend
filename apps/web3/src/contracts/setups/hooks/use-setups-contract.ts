import { useReactiveVar } from '@apollo/client'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { balanceVar } from 'shared/store/balance-store'
import { Web3Adress } from 'shared/types'
import { useAccount } from 'wagmi'
import {
  addSetupsPredict as prepareAddSetupsPredict,
  addSetupsPredictWithPermit as prepareAddSetupsPredictWithPermit,
  addSetupsPredictWithDeposit as prepareAddSetupsPredictWithDeposit,
  retrieveRewards,
  getRefund,
  retrieveBatch
} from '../calls'
import { PlaySetupParams } from '../types'

// eslint-disable-next-line max-statements
export const useSetupsContract = () => {
  const account = useAccount()
  const balance = useReactiveVar(balanceVar)

  const {
    smartContractAddress,
    smartContractVersion,
    getContractVersionByAddress
  } = useGetSmartContract('Setup')
  const { smartContractAddress: usdcContractAddress } =
    useGetSmartContract('USDC')
  const { smartContractAddress: treasuryContractAddress } =
    useGetSmartContract('Treasury')

  if (!account?.address) return

  const addSetupsPredict = (params: PlaySetupParams) => {
    const { depositAmount, contractAddress } = params
    const contractVersion = getContractVersionByAddress(smartContractAddress)

    if (Number(depositAmount) <= balance.treasuryDeposit) {
      return prepareAddSetupsPredictWithDeposit(
        params,
        contractAddress,
        contractVersion
      )
    }

    if (Number(depositAmount) <= balance.treasuryAllowance) {
      return prepareAddSetupsPredict(params, contractAddress, contractVersion)
    }

    return prepareAddSetupsPredictWithPermit(
      account,
      params,
      contractAddress,
      usdcContractAddress,
      treasuryContractAddress,
      contractVersion
    )
  }

  const retrieve = (gameId: Web3Adress, contractAddress: Web3Adress) => {
    const contractVersion = getContractVersionByAddress(contractAddress)

    retrieveRewards(gameId, contractAddress, contractVersion)
  }

  const retrieveSetupsBatch = (batch: Web3Adress[]) =>
    retrieveBatch(batch, smartContractAddress, smartContractVersion)

  const refund = (gameId: Web3Adress, contractAddress: Web3Adress) => {
    const contractVersion = getContractVersionByAddress(contractAddress)

    getRefund(gameId, contractAddress, contractVersion)
  }

  return { addSetupsPredict, retrieve, retrieveSetupsBatch, refund }
}
