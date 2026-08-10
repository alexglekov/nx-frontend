import { waitForTransactionReceipt } from '@wagmi/core'
import { APP_CHAIN, wagmiConfig } from 'app/wagmi-config'
import { notificationStateVar } from 'shared/store/notification'
import { Web3Adress } from 'shared/types/web3'
import { zeroAddress } from 'viem'

export const getTransactionStatus = async (
  transactionHash: Web3Adress | null
) => {
  if (!transactionHash || transactionHash === zeroAddress) return null

  const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
    chainId: APP_CHAIN.id,
    hash: transactionHash
  })

  const transactionStatus = transactionReceipt?.status || null

  if (!transactionStatus || transactionStatus !== 'success') {
    notificationStateVar({
      title: 'Transaction rejected',
      description: `Something went wrong. Please try one more time`,
      isOpen: true,
      type: 'error'
    })
  }

  return transactionHash
}
