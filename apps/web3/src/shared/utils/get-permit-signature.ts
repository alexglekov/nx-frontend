import { signTypedData } from '@wagmi/core'
import { APP_CHAIN, wagmiConfig } from 'app/wagmi-config'
import { Web3Adress } from 'shared/types/web3'
import { Config, UseAccountReturnType } from 'wagmi'
import { splitSignatureToVRS } from './split-signature-to-VRS'

// TODO: describe each field and name
interface VRS {
  v: number
  r: Web3Adress
  s: Web3Adress
}

// eslint-disable-next-line max-params
export async function getPermitSignature(
  account: UseAccountReturnType<Config>,
  tokenAddress: string,
  spender: Web3Adress,
  value: bigint,
  deadline: bigint,
  nonce: bigint,
  name: string
): Promise<VRS> {
  const signature = await signTypedData(wagmiConfig, {
    primaryType: 'Permit',
    domain: {
      name,
      version: '1',
      chainId: APP_CHAIN.id,
      verifyingContract: tokenAddress as Web3Adress
    },
    types: {
      Permit: [
        {
          name: 'owner',
          type: 'address'
        },
        {
          name: 'spender',
          type: 'address'
        },
        {
          name: 'value',
          type: 'uint256'
        },
        {
          name: 'nonce',
          type: 'uint256'
        },
        {
          name: 'deadline',
          type: 'uint256'
        }
      ]
    },
    message: {
      owner: account.address as Web3Adress,
      spender,
      value,
      nonce,
      deadline
    }
  })

  return splitSignatureToVRS(signature)
}
