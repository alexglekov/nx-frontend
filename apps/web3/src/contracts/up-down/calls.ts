/* eslint-disable max-params, max-statements */
import { Config, getPublicClient } from '@wagmi/core'
import { SmartContractEntity } from '__generated__/graphql'
import { wagmiConfig } from 'app/wagmi-config'
import {
  NEW_CONTRACT_VERSION,
  PREDICT_AMOUNT_MULTIPLIER_NEW,
  PREDICT_AMOUNT_MULTIPLIER_OLD,
  XYRO_TOKEN_MULTIPLIER
} from 'contracts/constants'
import { getSignatureDeadline, getApproveTransactionData } from 'contracts/usdc'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { writeContractWithRejectionHandling } from 'contracts/with-transaction-rejection'
import { Web3Adress } from 'shared/types'
import { UseAccountReturnType } from 'wagmi'
import { abi_new, abi_old } from './abi'

export const makeUpDownPredict = async (
  account: UseAccountReturnType<Config>,
  isUp: boolean,
  amount: number,
  contractAddress: SmartContractEntity['contractAddress'],
  contractVersion: number,
  isTokenXyro: boolean
) => {
  const PREDICT_PRICE_MULTIPLIER_TETHER =
    contractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const PREDICT_PRICE_MULTIPLIER =
    isTokenXyro ? XYRO_TOKEN_MULTIPLIER : PREDICT_PRICE_MULTIPLIER_TETHER

  const abi = contractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedBetAmount = BigInt(amount * PREDICT_PRICE_MULTIPLIER)

  const client = getPublicClient(wagmiConfig)

  const functionName = 'play'
  const args = [isUp, formattedBetAmount] as const

  const estimated = await client.estimateContractGas({
    account: account.address,
    abi,
    address: contractAddress as Web3Adress,
    functionName,
    args
  })

  const addition = (estimated * 25n) / 100n

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: contractAddress as Web3Adress,
      gas: estimated + addition,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

export const makeUpDownPredictWithDeposit = async (
  account: UseAccountReturnType<Config>,
  isUp: boolean,
  amount: number,
  contractAddress: SmartContractEntity['contractAddress'],
  contractVersion: number,
  isTokenXyro: boolean
) => {
  const PREDICT_PRICE_MULTIPLIER_TETHER =
    contractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const PREDICT_PRICE_MULTIPLIER =
    isTokenXyro ? XYRO_TOKEN_MULTIPLIER : PREDICT_PRICE_MULTIPLIER_TETHER

  const abi = contractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedBetAmount = BigInt(amount * PREDICT_PRICE_MULTIPLIER)

  const client = getPublicClient(wagmiConfig)

  const functionName = 'playWithDeposit'
  const args = [isUp, formattedBetAmount] as const

  const estimated = await client.estimateContractGas({
    account: account.address,
    abi,
    address: contractAddress as Web3Adress,
    functionName,
    args
  })

  const addition = (estimated * 25n) / 100n

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: contractAddress as Web3Adress,
      gas: estimated + addition,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}

// eslint-disable-next-line max-statements
export const makeUpDownPredictWithPermit = async (
  account: UseAccountReturnType<Config>,
  isUp: boolean,
  amount: number,
  contractAddress: SmartContractEntity['contractAddress'],
  tokenContractAddress: Web3Adress,
  treasuryContractAddress: Web3Adress,
  contractVersion: number,
  isTokenXyro: boolean
  // eslint-disable-next-line max-params
) => {
  const PREDICT_PRICE_MULTIPLIER_TETHER =
    contractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const PREDICT_PRICE_MULTIPLIER =
    isTokenXyro ? XYRO_TOKEN_MULTIPLIER : PREDICT_PRICE_MULTIPLIER_TETHER

  const abi = contractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const deadline = getSignatureDeadline()

  const { r, s, v } = await getApproveTransactionData(
    account,
    amount,
    deadline,
    tokenContractAddress,
    treasuryContractAddress
  )

  const client = getPublicClient(wagmiConfig)

  const functionName = 'playWithPermit'
  const args = [
    isUp,
    BigInt(amount * PREDICT_PRICE_MULTIPLIER),
    {
      deadline,
      v,
      r,
      s
    }
  ] as const

  const estimated = await client.estimateContractGas({
    account: account.address,
    abi,
    address: contractAddress as Web3Adress,
    functionName,
    args
  })

  const addition = (estimated * 25n) / 100n

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: contractAddress as Web3Adress,
      gas: estimated + addition,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}
