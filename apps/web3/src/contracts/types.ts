import { Web3Adress } from 'shared/types/web3'

export interface SignatureParams {
  v: number
  r: Web3Adress
  s: Web3Adress
  deadline: bigint
}
