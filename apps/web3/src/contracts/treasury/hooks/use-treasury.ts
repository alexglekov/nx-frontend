import { wagmiConfig } from 'app/wagmi-config'
import { Web3Adress } from 'shared/types'
import { useAccount } from 'wagmi'
import { claim, deposit, deposits, withdraw, withdrawRakeback } from '../calls'

export const useTreasury = (
  smartContractAddress: Web3Adress,
  smartContractVersion: number
) => {
  const account = useAccount({
    config: wagmiConfig
  })

  if (!account.address) return

  const loadTreasuryBalance = () =>
    deposits(
      account.address as Web3Adress,
      smartContractAddress,
      smartContractVersion
    )

  const claimTreasury = (amount: string, token: Web3Adress, decimals: number) =>
    claim(amount, smartContractAddress, token, decimals)

  const claimOldTreasury = (amount: string, token?: Web3Adress) =>
    withdraw(amount, smartContractAddress, smartContractVersion, token)

  const depositAmount = (amount: bigint, token: Web3Adress) =>
    deposit({ amount, contractAddress: smartContractAddress, token })

  const claimRakebackBatch = (gameIds: Web3Adress[], depositIds: bigint[]) =>
    withdrawRakeback(
      gameIds,
      depositIds,
      smartContractAddress,
      smartContractVersion
    )

  return {
    claimTreasury,
    claimOldTreasury,
    claimRakebackBatch,
    depositAmount,
    loadTreasuryBalance
  }
}
