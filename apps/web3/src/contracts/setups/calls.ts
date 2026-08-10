/* eslint-disable max-lines */
import { wagmiConfig } from 'app/wagmi-config'
import {
  ASSET_PRICE_MULTIPLIER_NEW,
  ASSET_PRICE_MULTIPLIER_OLD,
  NEW_CONTRACT_VERSION,
  PREDICT_AMOUNT_MULTIPLIER_NEW,
  PREDICT_AMOUNT_MULTIPLIER_OLD
} from 'contracts/constants'
import { PlaySetupParams } from 'contracts/setups/types'
import { getSignatureDeadline, getApproveTransactionData } from 'contracts/usdc'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { Web3Adress } from 'shared/types'
import { showNotificationToast } from 'shared/utils/notify'
import { UseAccountReturnType, Config } from 'wagmi'
import { writeContractWithRejectionHandling } from '../with-transaction-rejection'
import { abi_old, abi_new } from './abi'
import { CreateSetupsGameParams } from './types'

export const sendCreateSetupsGame = async (
  {
    endTime,
    takeProfitPrice,
    stopLossPrice,
    isLong,
    feedNumber,
    unverifiedReport
  }: CreateSetupsGameParams,
  address: Web3Adress,
  usdcContractAddress: Web3Adress,
  smartContractVersion: number
) => {
  const functionName = 'createSetup'

  const ASSET_PRICE_MULTIPLIER =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_MULTIPLIER_NEW
    : ASSET_PRICE_MULTIPLIER_OLD

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const takeProfitFormattedPrice = takeProfitPrice * ASSET_PRICE_MULTIPLIER
  const stopLossFormattedPrice = stopLossPrice * ASSET_PRICE_MULTIPLIER

  const args =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ([
        isLong,
        endTime,
        BigInt(Number(takeProfitFormattedPrice.toFixed(0))),
        BigInt(Number(stopLossFormattedPrice.toFixed(0))),
        feedNumber,
        usdcContractAddress,
        unverifiedReport
      ] as const)
    : ([
        isLong,
        endTime,
        Number(takeProfitFormattedPrice.toFixed(0)),
        Number(stopLossFormattedPrice.toFixed(0)),
        feedNumber,
        unverifiedReport
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any)

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

export const addSetupsPredict = async (
  { isStopLoss, depositAmount, gameId }: PlaySetupParams,
  address: Web3Adress,
  smartContractVersion: number
) => {
  const PREDICT_PRICE_MULTIPLIER =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedDepositAmount = BigInt(
    Number(depositAmount) * PREDICT_PRICE_MULTIPLIER
  )

  const functionName = 'play'
  const args = [
    !isStopLoss,
    formattedDepositAmount,
    gameId as `0x${string}`
  ] as const

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

export const addSetupsPredictWithDeposit = async (
  { isStopLoss, depositAmount, gameId }: PlaySetupParams,
  address: Web3Adress,
  smartContractVersion: number
) => {
  const PREDICT_PRICE_MULTIPLIER =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedDepositAmount = BigInt(
    Number(depositAmount) * PREDICT_PRICE_MULTIPLIER
  )

  const functionName = 'playWithDeposit'
  const args = [
    !isStopLoss,
    formattedDepositAmount,
    gameId as `0x${string}`
  ] as const

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

// eslint-disable-next-line max-statements
export const addSetupsPredictWithPermit = async (
  account: UseAccountReturnType<Config>,
  { isStopLoss, depositAmount, gameId }: PlaySetupParams,
  address: Web3Adress,
  usdcContractAddress: Web3Adress,
  treasuryContractAddress: Web3Adress,
  smartContractVersion: number
  // eslint-disable-next-line max-params
) => {
  try {
    const PREDICT_PRICE_MULTIPLIER =
      smartContractVersion >= NEW_CONTRACT_VERSION ?
        PREDICT_AMOUNT_MULTIPLIER_NEW
      : PREDICT_AMOUNT_MULTIPLIER_OLD

    const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

    const formattedDepositAmount = BigInt(
      Number(depositAmount) * PREDICT_PRICE_MULTIPLIER
    )

    const deadline = getSignatureDeadline()

    const { v, r, s } = await getApproveTransactionData(
      account,
      Number(depositAmount),
      deadline,
      usdcContractAddress,
      treasuryContractAddress
    )
    const functionName = 'playWithPermit'
    const args = [
      !isStopLoss,
      formattedDepositAmount,
      gameId as `0x${string}`,
      {
        deadline,
        v,
        r,
        s
      }
    ] as const

    const transactionHash = await writeContractWithRejectionHandling(
      wagmiConfig,
      {
        abi,
        address,
        functionName,
        args
      }
    )

    return getTransactionStatus(transactionHash)
  } catch (error) {
    showNotificationToast({
      title: 'Error',
      description:
        'Failed to add setups predict. See more details in the browser console.',
      type: 'error'
    })
    console.error('Error:', error)
  }
}

export const retrieveRewards = async (
  gameId: Web3Adress,
  address: Web3Adress,
  smartContractVersion: number
) => {
  const functionName = 'retrieveRewards'
  // NOTE: Remove it on refactoring
  const args =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      [[gameId]]
    : ([gameId] as any)

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

export const retrieveBatch = async (
  batch: Web3Adress[],
  address: Web3Adress,
  smartContractVersion: number
) => {
  const functionName = 'retrieveRewards'

  // NOTE: Remove it on refactoring
  const args =
    smartContractVersion >= NEW_CONTRACT_VERSION ? [batch] : ([batch[0]] as any)

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

export const getRefund = async (
  gameId: Web3Adress,
  address: Web3Adress,
  smartContractVersion: number
) => {
  const functionName = 'getRefund'
  const args = [gameId] as const

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: address,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}
