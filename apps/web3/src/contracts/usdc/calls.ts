import {
  readContract as readContractWagmi,
  estimateGas as estimateGasWagmi,
  getGasPrice,
  readContract
} from '@wagmi/core'
import { wagmiConfig } from 'app/wagmi-config'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { writeContractWithRejectionHandling } from 'contracts/with-transaction-rejection'
import { Web3Adress } from 'shared/types/web3'
import { formatWeb3Price } from 'shared/utils/format-web3-price'
import { parseEther, parseUnits } from 'viem'
import { Config, UseAccountReturnType } from 'wagmi'
import { abi } from './abi'

export const mintUsdc = async (
  account: UseAccountReturnType<Config>,
  amount: string,
  address: Web3Adress
) => {
  await writeContractWithRejectionHandling(wagmiConfig, {
    abi,
    address: address,
    args: [account.address as Web3Adress, parseEther(amount)],
    functionName: 'mint'
  })

  return readContractWagmi(wagmiConfig, {
    abi,
    address: address,
    functionName: 'balanceOf',
    args: [account.address as Web3Adress]
  })
}

export const allowance = async (
  account: UseAccountReturnType<Config>,
  address: Web3Adress
) => {
  return readContractWagmi(wagmiConfig, {
    abi,
    address,
    functionName: 'allowance',
    args: [account.address as Web3Adress, address]
  })
}

export const approve = async (
  amount: number,
  address: Web3Adress,
  spender: Web3Adress
) => {
  const decimals = await readContract(wagmiConfig, {
    abi,
    address,
    functionName: 'decimals'
  })

  const result = await writeContractWithRejectionHandling(wagmiConfig, {
    abi,
    address,
    functionName: 'approve',
    args: [spender, parseUnits(String(amount), decimals)]
  })

  return getTransactionStatus(result)
}

export const estimateFee = async (account: UseAccountReturnType<Config>) => {
  const gasPrice = await getGasPrice(wagmiConfig)

  const gas = await estimateGasWagmi(wagmiConfig, {
    account: account.address
  })

  return formatWeb3Price(gas * gasPrice).toFixed(7)
}

export const getBalance = (address: string, contractAddress: Web3Adress) =>
  readContractWagmi(wagmiConfig, {
    abi,
    address: contractAddress,
    functionName: 'balanceOf',
    args: [address as Web3Adress]
  })
