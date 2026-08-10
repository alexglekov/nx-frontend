/* eslint-disable max-lines */
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { DataTestIDs, RouterPathes } from 'shared/constants'
import {
  ArbitrumRoundedIcon,
  EthAssetIcon,
  SwapTetherToken,
  SwapXyroToken
} from 'shared/icons'
import { Web3Adress } from 'shared/types'
import {
  BridgeOption,
  BuybackInputPercent,
  BuyBackReviewDialogAssetItem,
  OverviewItemType
} from './types'

export const BUYBACK_TABS = [
  {
    title: 'Token',
    href: RouterPathes.buyback,
    dataTestId: DataTestIDs.tokenNavButton
  },
  {
    title: 'Trade',
    href: RouterPathes.buybackSwap,
    dataTestId: DataTestIDs.tradeNavButton
  },
  {
    title: 'Bridge',
    href: RouterPathes.buybackBridge,
    dataTestId: DataTestIDs.bridgeNavButton
  }
  // TODO: Remove comment when holders page will be ready
  // {
  //   title: 'Holders',
  //   href: RouterPathes.buybackHolders
  // }
]

export const BuybackInputPercentsList: BuybackInputPercent[] = [
  {
    title: '25%',
    multiplier: 0.25,
    dataTestId: DataTestIDs.buttonInputPercentQuarter
  },
  {
    title: '50%',
    multiplier: 0.5,
    dataTestId: DataTestIDs.buttonInputPercentHalf
  },
  {
    title: '75%',
    multiplier: 0.75,
    dataTestId: DataTestIDs.buttonInputPercent75
  },
  {
    title: 'MAX',
    multiplier: 1,
    dataTestId: DataTestIDs.buttonInputPercentMax
  }
]

export const BRIDGE_OPTIONS_MAP: Record<string, BridgeOption> = {
  ARBITRUM:
    STAND === Stand.mainnet ?
      {
        tokenAddress: '0xAeAC3b55c3522157ecdA7EC8fcB86C832fAA28aF',
        routerAddress: '0x141fa059441E0ca23ce184B6A78bafD2A517DdE8',
        chainSelector: '4949039107694359620'
      }
    : {
        tokenAddress: '0xdB200e0Ccdb4d2C0881E7dF24F7dAc935F6B7669',
        routerAddress: '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165',
        chainSelector: '3478487238524512106'
      },
  ETH:
    STAND === Stand.mainnet ?
      {
        tokenAddress: '0x4eDDb15A0abfa2c349e8065aF9214E942d9A6D36',
        routerAddress: '0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D',
        chainSelector: '5009297550715157269'
      }
    : {
        tokenAddress: '0x17c0f1D18FbD7F95e0C277c07A0942D05AAf1E73',
        routerAddress: '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59',
        chainSelector: '16015286601757825753'
      }
}

export const REVIEW_SWAP_DATA_LIST: OverviewItemType[] = [
  {
    title: 'Expected output',
    dataSource: 'expectedOutput',
    tooltipTitle:
      'The estimated amount of tokens you are likely to receive from the swap under current market conditions',
    token: 'xyro'
  },
  {
    title: 'Minimum received',
    dataSource: 'minReceived',
    tooltipTitle:
      'The minimum amount of tokens you will receive from the swap, accounting for slippage and fees',
    token: 'xyro'
  },
  {
    title: 'Network fee',
    dataSource: 'networkFee',
    tooltipTitle: 'The Uniswap transaction fee',
    token: 'usdt'
  }
]

export const REVIEW_BRIDGE_DATA_LIST: OverviewItemType[] = [
  {
    title: 'Expected output',
    dataSource: 'expectedOutput',
    tooltipTitle:
      'The estimated amount of tokens you are likely to receive from the swap under current market conditions',
    token: 'xyro'
  },
  {
    title: 'Minimum received',
    dataSource: 'minReceived',
    tooltipTitle:
      'The minimum amount of tokens you will receive from the swap, accounting for slippage and fees',
    token: 'xyro'
  },
  {
    title: 'Network fee',
    dataSource: 'networkFee',
    tooltipTitle: 'The Chainlink transaction fee',
    token: 'eth'
  }
]

export const BURN_ADDRESS = '0x970b2c7BB1b68e2ceADccCa329d5F533b0459184'

export const ROUTER_ADDRESS_MAINNET: Web3Adress =
  '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

export const ROUTER_ADDRESS_DEV = '0x101F443B4d1b059569D643917553c771E1b9663E'

export const ROUTER_ADDRESS: Web3Adress =
  STAND === Stand.mainnet ? ROUTER_ADDRESS_MAINNET : ROUTER_ADDRESS_DEV

export const TOKEN_BRIDGE_ASSETS: Record<string, BuyBackReviewDialogAssetItem> =
  {
    ARBITRUM: {
      assetIcon: (
        <ArbitrumRoundedIcon
          width={'6rem'}
          height={'6rem'}
        />
      ),
      assetName: 'XYRO Arbitrum'
    },
    ETH: {
      assetIcon: (
        <EthAssetIcon
          width={'6rem'}
          height={'6rem'}
        />
      ),
      assetName: 'XYRO Ethereum'
    }
  }

export const TOKEN_SWAP_ASSETS: Record<string, BuyBackReviewDialogAssetItem> = {
  XYRO: {
    assetIcon: (
      <SwapXyroToken
        width={48}
        height={48}
      />
    ),
    assetName: 'XYRO'
  },
  USDT: {
    assetIcon: (
      <SwapTetherToken
        width={48}
        height={48}
      />
    ),
    assetName: 'USDT'
  }
}
