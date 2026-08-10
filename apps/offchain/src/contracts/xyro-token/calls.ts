import { readContract, getGasPrice, estimateGas } from '@wagmi/core'
import { wagmiConfig } from 'app/wagmi-config'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { Web3Adress } from 'shared/types'
import { formatWeb3Price } from 'shared/utils/format-web3-price'
import { parseUnits } from 'viem'
import { UseAccountReturnType, Config } from 'wagmi'
import { writeContractWithRejectionHandling } from '../with-transaction-rejection'
import { abi } from './abi'
import { ApproveParams } from './types'

export const approve = async ({
  spender,
  contractAddress,
  amount
}: ApproveParams) => {
  const decimals = await readContract(wagmiConfig, {
    abi,
    address: contractAddress,
    functionName: 'decimals'
  })

  const result = await writeContractWithRejectionHandling(wagmiConfig, {
    abi,
    address: contractAddress,
    functionName: 'approve',
    args: [spender, parseUnits(String(amount), decimals)]
  })

  return getTransactionStatus(result)
}

export const balance = async (
  walletAddress: Web3Adress,
  contractAddress: Web3Adress
) =>
  readContract(wagmiConfig, {
    abi,
    address: contractAddress,
    functionName: 'balanceOf',
    args: [walletAddress]
  })

export const estimateFee = async (account: UseAccountReturnType<Config>) => {
  const gasPrice = await getGasPrice(wagmiConfig)

  const gas = await estimateGas(wagmiConfig, {
    account: account.address
  })

  return formatWeb3Price(gas * gasPrice).toFixed(7)
}
