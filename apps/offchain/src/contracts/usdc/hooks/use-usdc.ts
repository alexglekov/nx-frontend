import { wagmiConfig } from 'app/wagmi-config'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { Web3Adress } from 'shared/types/web3'
import { useAccount } from 'wagmi'
import { allowance, approve, estimateFee, getBalance, mintUsdc } from '../calls'

// TODO: rename to useUsdt or to useUsdcoin
/* eslint-disable-next-line max-statements */
export const useUsdc = () => {
  const account = useAccount({
    config: wagmiConfig
  })

  const { smartContractAddress } = useGetSmartContract('USDC')
  const { smartContractAddress: treasuryAddress } =
    useGetSmartContract('Treasury')

  if (!account.address) return

  const getActualBalance = () =>
    getBalance(account.address as Web3Adress, smartContractAddress)
  const mint = (amount: string) =>
    mintUsdc(account, amount, smartContractAddress)
  const estimateGas = () => estimateFee(account)
  const getAllowence = () => allowance(account, smartContractAddress)
  const approveAmount = (amount: number) =>
    approve(amount, smartContractAddress, treasuryAddress)
  const approvePure = (amount: number, spender: Web3Adress) =>
    approve(amount, smartContractAddress, spender)

  return {
    approvePure,
    approveAmount,
    getActualBalance,
    getAllowence,
    mint,
    estimateGas
  }
}
