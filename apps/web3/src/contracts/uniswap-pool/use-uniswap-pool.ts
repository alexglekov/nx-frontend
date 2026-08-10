import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { XYRO_TOKEN_DECIMALS, USDT_DECIMALS } from 'contracts/constants'
import { slot0 } from './calls'

const IS_MAINNET_STAND = STAND === Stand.mainnet

export const useUniswapPool = () => {
  const getTokenPrice = async () => {
    const slot = (await slot0()) as [bigint]

    const price = (Number(slot[0]) / 2 ** 96) ** 2

    return IS_MAINNET_STAND ?
        {
          price: price * 10 ** (XYRO_TOKEN_DECIMALS - USDT_DECIMALS),
          sqrtPriceX96: slot[0]
        }
      : {
          price: price / 10 ** (XYRO_TOKEN_DECIMALS - USDT_DECIMALS),
          sqrtPriceX96: slot[0]
        }
  }

  return { getTokenPrice }
}
