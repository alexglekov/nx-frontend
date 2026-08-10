import { readContract } from '@wagmi/core'
import { wagmiConfig } from 'app/wagmi-config'
import { MS_IN_SEC, SECS_IN_MIN } from 'shared/constants'
import { Web3Adress } from 'shared/types/web3'
import { getPermitSignature } from 'shared/utils/get-permit-signature'
import { Config, UseAccountReturnType } from 'wagmi'
import { abi } from '../abi'

export const getSignatureDeadline = () =>
  BigInt(Math.floor(Date.now() / MS_IN_SEC) + 5 * SECS_IN_MIN)

export const getApproveTransactionData = async (
  account: UseAccountReturnType<Config>,
  amount: number,
  deadline: bigint,
  tokenContractAddress: Web3Adress,
  treasuryContractAddress: Web3Adress
) => {
  const nonce = await readContract(wagmiConfig, {
    abi,
    address: tokenContractAddress,
    functionName: 'nonces',
    args: [account.address as Web3Adress]
  })

  const name = await readContract(wagmiConfig, {
    abi,
    address: tokenContractAddress,
    functionName: 'name'
  })

  const decimals = await readContract(wagmiConfig, {
    abi,
    address: tokenContractAddress,
    functionName: 'decimals'
  })

  return getPermitSignature(
    account,
    tokenContractAddress,
    treasuryContractAddress,
    BigInt(amount * 10 ** decimals),
    deadline,
    nonce,
    name
  )
}
