import { wagmiConfig } from 'app/wagmi-config'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { Web3Adress } from 'shared/types'
import { zeroAddress } from 'viem'
import { useAccount } from 'wagmi'
import { approve, balance, estimateFee } from './calls'

interface ApproveAmountParams {
  amount: number
  spender: Web3Adress
}

export const useXyroToken = () => {
  const { smartContractAddress: tokenAddress } =
    useGetSmartContract('XyroToken')

  const account = useAccount({ config: wagmiConfig })

  const approveAmount = ({ amount, spender }: ApproveAmountParams) =>
    approve({
      contractAddress: tokenAddress,
      amount,
      spender
    })

  const getBalance = () =>
    balance(account?.address || zeroAddress, tokenAddress)

  const estimateGas = () => estimateFee(account)

  return { approveAmount, estimateGas, getBalance }
}
