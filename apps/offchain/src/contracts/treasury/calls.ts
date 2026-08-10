import { readContract } from '@wagmi/core'
import { wagmiConfig } from 'app/wagmi-config'
import {
  NEW_CONTRACT_VERSION,
  PREDICT_AMOUNT_MULTIPLIER_NEW,
  PREDICT_AMOUNT_MULTIPLIER_OLD
} from 'contracts/constants'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { writeContractWithRejectionHandling } from 'contracts/with-transaction-rejection'
import { Web3Adress } from 'shared/types'
import { parseUnits } from 'viem'
import { abi_old, abi_new } from './abi'

export const deposits = (
  address: Web3Adress,
  contractAddress: Web3Adress,
  smartContractVersion: number
) => {
  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  readContract(wagmiConfig, {
    abi,
    functionName: 'deposits',
    address: contractAddress,
    args: [address]
  })
}

export const deposit = async ({
  amount,
  contractAddress,
  token
}: {
  amount: bigint
  contractAddress: Web3Adress
  token: Web3Adress
}) => {
  const result = await writeContractWithRejectionHandling(wagmiConfig, {
    abi: abi_new,
    address: contractAddress,
    functionName: 'deposit',
    args: [amount, token]
  })

  return getTransactionStatus(result)
}

export const claim = async (
  amount: string,
  address: Web3Adress,
  token: Web3Adress,
  decimals: number
) => {
  const abi = abi_new
  const formattedPredictAmount = parseUnits(amount, decimals)

  const args = [formattedPredictAmount, token] as const

  const result = await writeContractWithRejectionHandling(wagmiConfig, {
    abi,
    address,
    args,
    functionName: 'withdraw'
  })

  return getTransactionStatus(result)
}

export const withdraw = async (
  amount: string,
  address: Web3Adress,
  smartContractVersion: number,
  token?: Web3Adress
) => {
  const PREDICT_PRICE_MULTIPLIER =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      PREDICT_AMOUNT_MULTIPLIER_NEW
    : PREDICT_AMOUNT_MULTIPLIER_OLD

  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old
  const formattedPredictAmount = BigInt(
    Number(amount) * PREDICT_PRICE_MULTIPLIER
  )

  // NOTE: Remove it on refactoring
  const args =
    smartContractVersion >= NEW_CONTRACT_VERSION ?
      [formattedPredictAmount, token]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : ([formattedPredictAmount] as any)

  const result = await writeContractWithRejectionHandling(wagmiConfig, {
    abi,
    address,
    args,
    functionName: 'withdraw'
  })

  return getTransactionStatus(result)
}

export const withdrawRakeback = async (
  gameIds: Web3Adress[],
  depositIds: bigint[],
  address: Web3Adress,
  smartContractVersion: number
) => {
  const abi = smartContractVersion >= NEW_CONTRACT_VERSION ? abi_new : abi_old

  const result = await writeContractWithRejectionHandling(wagmiConfig, {
    abi,
    address,
    args: [gameIds, depositIds],
    functionName: 'withdrawRakeback'
  })

  return getTransactionStatus(result)
}
