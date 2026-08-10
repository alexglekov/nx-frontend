import { Web3Adress } from 'shared/types'

export type ApproveParams = {
  contractAddress: Web3Adress
  spender: Web3Adress
  amount: number
}
