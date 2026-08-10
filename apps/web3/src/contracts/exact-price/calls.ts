/* eslint-disable max-lines */
import { wagmiConfig } from 'app/wagmi-config'
import {
  ASSET_PRICE_DIGITALS_NEW,
  ASSET_PRICE_DIGITALS_OLD,
  NEW_CONTRACT_VERSION,
  PREDICT_AMOUNT_MULTIPLIER_NEW,
  PREDICT_AMOUNT_MULTIPLIER_OLD,
  XYRO_TOKEN_MULTIPLIER
} from 'contracts/constants'
import { getSignatureDeadline, getApproveTransactionData } from 'contracts/usdc'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { writeContractWithRejectionHandling } from 'contracts/with-transaction-rejection'
import { Web3Adress } from 'shared/types'
import { parseUnits, zeroAddress } from 'viem'
import { UseAccountReturnType, Config } from 'wagmi'
import { abi_old, abi_new } from './abi'
import {
  AcceptExactGameParams,
  CancelExactGameCallParams,
  CreateExactBetParams
} from './types'

// eslint-disable-next-line max-statements
export const createGame = async (
  {
    feedNumber,
    endTime,
    initiatorPrice,
    amount,
    opponent
  }: CreateExactBetParams,
  address: Web3Adress,
  tokenContractAddress: Web3Adress,
  smartContractVersion: number,
  isXyroTokenSelected: boolean
) => {
  const ASSET_PRICE_DIGITALS =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_DIGITALS_NEW
    : ASSET_PRICE_DIGITALS_OLD

  const PREDICT_PRICE_MULTIPLIER_USDT =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const PREDICT_PRICE_MULTIPLIER =
    isXyroTokenSelected ? XYRO_TOKEN_MULTIPLIER : PREDICT_PRICE_MULTIPLIER_USDT

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedInitiatorPrice = parseUnits(
    initiatorPrice,
    ASSET_PRICE_DIGITALS
  )
  const formattedAmount = Number(amount) * PREDICT_PRICE_MULTIPLIER
  const formattedEndTime = Math.round(endTime)

  const functionName = 'createGame'
  const args =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ([
        feedNumber,
        opponent ? opponent : zeroAddress,
        formattedEndTime,
        formattedInitiatorPrice,
        formattedAmount,
        tokenContractAddress
      ] as const)
    : ([
        feedNumber,
        opponent ? opponent : zeroAddress,
        formattedEndTime,
        formattedInitiatorPrice,
        formattedAmount
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

// eslint-disable-next-line max-statements
export const createGameWithDeposit = async (
  {
    feedNumber,
    endTime,
    initiatorPrice,
    amount,
    opponent
  }: CreateExactBetParams,
  address: Web3Adress,
  tokenContractAddress: Web3Adress,
  smartContractVersion: number,
  isXyroTokenSelected: boolean
) => {
  const ASSET_PRICE_DIGITALS =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_DIGITALS_NEW
    : ASSET_PRICE_DIGITALS_OLD

  const PREDICT_PRICE_MULTIPLIER_USDT =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const PREDICT_PRICE_MULTIPLIER =
    isXyroTokenSelected ? XYRO_TOKEN_MULTIPLIER : PREDICT_PRICE_MULTIPLIER_USDT

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedInitiatorPrice = parseUnits(
    initiatorPrice,
    ASSET_PRICE_DIGITALS
  )
  const formattedAmount = Number(amount) * PREDICT_PRICE_MULTIPLIER
  const formattedEndTime = Math.round(endTime)

  const functionName = 'createGameWithDeposit'
  const args =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ([
        feedNumber,
        opponent ? opponent : zeroAddress,
        formattedEndTime,
        formattedInitiatorPrice,
        formattedAmount,
        tokenContractAddress
      ] as const)
    : ([
        feedNumber,
        opponent ? opponent : zeroAddress,
        formattedEndTime,
        formattedInitiatorPrice,
        formattedAmount
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

// eslint-disable-next-line max-statements
export const createGameWithPermit = async (
  account: UseAccountReturnType<Config>,
  {
    feedNumber,
    endTime,
    initiatorPrice,
    amount,
    opponent
  }: CreateExactBetParams,
  address: Web3Adress,
  tokenContractAddress: Web3Adress,
  treasuryContractAddress: Web3Adress,
  smartContractVersion: number,
  isXyroTokenSelected: boolean
  // eslint-disable-next-line max-params
) => {
  const ASSET_PRICE_DIGITALS =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_DIGITALS_NEW
    : ASSET_PRICE_DIGITALS_OLD

  const PREDICT_PRICE_MULTIPLIER_USDT =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const PREDICT_PRICE_MULTIPLIER =
    isXyroTokenSelected ? XYRO_TOKEN_MULTIPLIER : PREDICT_PRICE_MULTIPLIER_USDT

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedInitiatorPrice = parseUnits(
    initiatorPrice,
    ASSET_PRICE_DIGITALS
  )
  const formattedAmount = Number(amount) * PREDICT_PRICE_MULTIPLIER
  const formattedEndTime = Math.round(endTime)

  const deadline = getSignatureDeadline()

  const { r, s, v } = await getApproveTransactionData(
    account,
    Number(amount),
    deadline,
    tokenContractAddress,
    treasuryContractAddress
  )

  const functionName = 'createGameWithPermit'
  const args =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ([
        feedNumber,
        opponent ? opponent : zeroAddress,
        formattedEndTime,
        formattedInitiatorPrice,
        formattedAmount,
        tokenContractAddress,
        { deadline, v, r, s }
      ] as const)
    : ([
        feedNumber,
        opponent ? opponent : zeroAddress,
        formattedEndTime,
        formattedInitiatorPrice,
        formattedAmount,
        { deadline, v, r, s }
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

export const acceptGame = async (
  { gameId, opponentPrice }: AcceptExactGameParams,
  address: Web3Adress,
  smartContractVersion: number
) => {
  const ASSET_PRICE_DIGITALS =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_DIGITALS_NEW
    : ASSET_PRICE_DIGITALS_OLD

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedOpponentPrice = parseUnits(opponentPrice, ASSET_PRICE_DIGITALS)

  const functionName = 'acceptGame'
  const args = [gameId, formattedOpponentPrice] as const

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

export const acceptGameWithDeposit = async (
  { gameId, opponentPrice }: AcceptExactGameParams,
  address: Web3Adress,
  smartContractVersion: number
) => {
  const ASSET_PRICE_DIGITALS =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_DIGITALS_NEW
    : ASSET_PRICE_DIGITALS_OLD

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedOpponentPrice = parseUnits(opponentPrice, ASSET_PRICE_DIGITALS)

  const functionName = 'acceptGameWithDeposit'
  const args = [gameId, formattedOpponentPrice] as const

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
export const acceptGameWithPermit = async (
  account: UseAccountReturnType<Config>,
  { gameId, opponentPrice, amount }: AcceptExactGameParams,
  address: Web3Adress,
  tokenContractAddress: Web3Adress,
  treasuryContractAddress: Web3Adress,
  smartContractVersion: number
  // eslint-disable-next-line max-params
) => {
  const ASSET_PRICE_DIGITALS =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      ASSET_PRICE_DIGITALS_NEW
    : ASSET_PRICE_DIGITALS_OLD

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const formattedOpponentPrice = parseUnits(opponentPrice, ASSET_PRICE_DIGITALS)
  const formattedAmount = Number(amount)

  const deadline = getSignatureDeadline()

  const { r, s, v } = await getApproveTransactionData(
    account,
    formattedAmount,
    deadline,
    tokenContractAddress,
    treasuryContractAddress
  )

  const functionName = 'acceptGameWithPermit'
  const args = [gameId, formattedOpponentPrice, { deadline, v, r, s }] as const

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

export const cancelBet = async ({
  gameId,
  contractVersion,
  contractAddress
}: CancelExactGameCallParams) => {
  const functionName = 'closeGame'
  const args = [gameId] as const

  const abi = contractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const transactionHash = await writeContractWithRejectionHandling(
    wagmiConfig,
    {
      abi,
      address: contractAddress,
      functionName,
      args
    }
  )

  return getTransactionStatus(transactionHash)
}
