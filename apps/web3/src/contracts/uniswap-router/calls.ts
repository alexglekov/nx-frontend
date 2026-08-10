import { wagmiConfig } from 'app/wagmi-config'
import { getTransactionStatus } from 'contracts/utils/get-transaction-status'
import { writeContractWithRejectionHandling } from 'contracts/with-transaction-rejection'
import { ROUTER_ADDRESS } from 'features/buy-back/constants'
import { abi } from './abi'
import { SwapParams } from './types'

export const swap = async ({
  tokenIn,
  tokenOut,
  fee,
  recipient,
  amountIn,
  amountOutMinimum,
  sqrtPriceLimitX96
}: SwapParams) => {
  const res = await writeContractWithRejectionHandling(wagmiConfig, {
    abi,
    address: ROUTER_ADDRESS,
    functionName: 'exactInputSingle',
    args: [
      {
        tokenIn,
        tokenOut,
        fee,
        recipient,
        amountIn,
        amountOutMinimum,
        sqrtPriceLimitX96
      }
    ]
  })

  return getTransactionStatus(res)
}
