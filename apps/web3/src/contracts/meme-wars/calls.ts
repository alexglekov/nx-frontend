import { Config, getPublicClient } from '@wagmi/core'
import { SmartContractEntity } from '__generated__/graphql'
import { wagmiConfig } from 'app/wagmi-config'
import { PREDICT_AMOUNT_MULTIPLIER_NEW } from 'contracts/constants'
import { getApproveTransactionData, getSignatureDeadline } from 'contracts/usdc'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { writeContractWithRejectionHandling } from 'contracts/with-transaction-rejection'
import { Web3Adress } from 'shared/types'
import { UseAccountReturnType } from 'wagmi'
import { abi } from './abi'

export const makeMemeWarsPredict = async (
  amount: number,
  assetId: number,
  contractAddress: SmartContractEntity['contractAddress']
) => {
  const functionName = 'play'

  const formattedBetAmount = BigInt(amount * PREDICT_AMOUNT_MULTIPLIER_NEW)

  const args = [formattedBetAmount, assetId] as const

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

// eslint-disable-next-line max-statements
export const makeMemeWarsPredictWithDeposit = async (
  amount: number,
  assetId: number,
  contractAddress: SmartContractEntity['contractAddress'],
  account: UseAccountReturnType<Config>
) => {
  const functionName = 'playWithDeposit'

  const formattedBetAmount = BigInt(amount * PREDICT_AMOUNT_MULTIPLIER_NEW)

  const client = getPublicClient(wagmiConfig)

  const args = [formattedBetAmount, assetId] as const

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
export const makeMemeWarsPredictWithPermit = async (
  amount: number,
  assetId: number,
  contractAddress: SmartContractEntity['contractAddress'],
  account: UseAccountReturnType<Config>,
  tokenContractAddress: Web3Adress,
  treasuryContractAddress: Web3Adress
  // eslint-disable-next-line max-params
) => {
  const functionName = 'playWithPermit'

  const deadline = getSignatureDeadline()

  const { r, s, v } = await getApproveTransactionData(
    account,
    amount,
    deadline,
    tokenContractAddress,
    treasuryContractAddress
  )

  const formattedpredictAmount = BigInt(amount * PREDICT_AMOUNT_MULTIPLIER_NEW)

  const client = getPublicClient(wagmiConfig)
  const args = [
    formattedpredictAmount,
    assetId,
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
