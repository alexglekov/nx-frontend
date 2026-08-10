import { SmartContractEntity } from '__generated__/graphql'
import { wagmiConfig } from 'app/wagmi-config'
import {
  ASSET_PRICE_MULTIPLIER_NEW,
  ASSET_PRICE_MULTIPLIER_OLD,
  NEW_CONTRACT_VERSION,
  XYRO_TOKEN_MULTIPLIER
} from 'contracts/constants'
import { getSignatureDeadline, getApproveTransactionData } from 'contracts/usdc'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { Web3Adress } from 'shared/types'
import { UseAccountReturnType, Config } from 'wagmi'
import { writeContractWithRejectionHandling } from '../with-transaction-rejection'
import { abi_old, abi_new } from './abi'

export const makeBullsEyePredict = async (
  assetPrice: number,
  contractAddress: SmartContractEntity['contractAddress'],
  contractVersion: number,
  isTokenXyro: boolean
) => {
  const functionName = 'play'
  const ASSET_PRICE_MULTIPLIER_USDT =
    contractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_MULTIPLIER_NEW
    : ASSET_PRICE_MULTIPLIER_OLD

  const ASSET_PRICE_MULTIPLIER =
    isTokenXyro ? XYRO_TOKEN_MULTIPLIER : ASSET_PRICE_MULTIPLIER_USDT

  const abi = contractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const args = [
    Number((assetPrice * ASSET_PRICE_MULTIPLIER).toFixed(0))
  ] as const

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: contractAddress as Web3Adress,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

export const makeBullsEyePredictWithPermit = async (
  account: UseAccountReturnType<Config>,
  assetPrice: number,
  betAmount: number,
  contractAddress: SmartContractEntity['contractAddress'],
  tokenContractAddress: Web3Adress,
  treasuryContractAddress: Web3Adress,
  contractVersion: number,
  isTokenXyro: boolean
  // eslint-disable-next-line max-params
) => {
  const deadline = getSignatureDeadline()
  const { r, s, v } = await getApproveTransactionData(
    account,
    betAmount,
    deadline,
    tokenContractAddress,
    treasuryContractAddress
  )

  const functionName = 'playWithPermit'
  const ASSET_PRICE_MULTIPLIER_USDT =
    contractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_MULTIPLIER_NEW
    : ASSET_PRICE_MULTIPLIER_OLD

  const ASSET_PRICE_MULTIPLIER =
    isTokenXyro ? XYRO_TOKEN_MULTIPLIER : ASSET_PRICE_MULTIPLIER_USDT

  const abi = contractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const args = [
    Number((assetPrice * ASSET_PRICE_MULTIPLIER).toFixed(0)),
    { deadline, v, r, s }
  ] as const

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: contractAddress as Web3Adress,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

export const makeBullsEyePredictFromTreasury = async (
  assetPrice: number,
  contractAddress: SmartContractEntity['contractAddress'],
  contractVersion: number,
  isTokenXyro: boolean
) => {
  const functionName = 'playWithDeposit'
  const ASSET_PRICE_MULTIPLIER_USDT =
    contractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_MULTIPLIER_NEW
    : ASSET_PRICE_MULTIPLIER_OLD

  const ASSET_PRICE_MULTIPLIER =
    isTokenXyro ? XYRO_TOKEN_MULTIPLIER : ASSET_PRICE_MULTIPLIER_USDT

  const abi = contractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const args = [
    Number((assetPrice * ASSET_PRICE_MULTIPLIER).toFixed(0))
  ] as const

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: contractAddress as Web3Adress,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}
