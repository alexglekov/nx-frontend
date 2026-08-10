import { Web3Adress } from 'shared/types/web3'

export const splitSignatureToVRS = (signature: string) => {
  const r = '0x' + signature.substring(2).substring(0, 64) as Web3Adress
  const s = '0x' + signature.substring(2).substring(64, 128) as Web3Adress
  const v = parseInt(signature.substring(2).substring(128, 130), 16)

  return { r, s, v }
}