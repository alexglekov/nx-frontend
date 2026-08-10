/* eslint-disable max-statements */

import { writeContract, WriteContractReturnType } from '@wagmi/core'
import type { WriteContractParameters } from '@wagmi/core/src/actions/writeContract'
import type { Config } from '@wagmi/core/src/createConfig'
import {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  zeroAddress
} from 'viem'
import { BaseError } from 'wagmi'
import { Web3Adress } from '../shared/types'
import { showNotificationToast } from '../shared/utils/notify'

interface ContractParams<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>
> {
  abi: abi
  address: string
  functionName: functionName
  gas?: bigint
  args: ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>
}

export const withTransactionRejection = <
  config extends Config,
  abi extends Abi,
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id']
>(
  writeContractFn: (
    config: config,
    parameters: WriteContractParameters<
      abi,
      functionName,
      args,
      config,
      chainId
    >
  ) => Promise<WriteContractReturnType>
) => {
  return async (
    wagmiConfig: config,
    contractParams: ContractParams<abi, functionName>
  ) => {
    const { abi, address, functionName, args, gas } = contractParams

    try {
      // @ts-expect-error cannot infer correct types from wagmi
      const tx = await writeContractFn(wagmiConfig, {
        abi,
        address,
        functionName,
        gas,
        args
      })

      return tx
    } catch (error) {
      const err = error as BaseError

      if (err?.shortMessage?.trim()?.toLowerCase()?.includes('user rejected')) {
        showNotificationToast({
          title: `User denied transaction`,
          description: 'Please try again',
          type: 'error'
        })
      } else {
        throw err
      }
    }

    return null
  }
}

export const writeContractWithRejectionHandling =
  withTransactionRejection(writeContract)
