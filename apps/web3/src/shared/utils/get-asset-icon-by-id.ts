import { FC, SVGProps } from 'react'
import {
  AdaAssetIcon,
  AvalancheAssetIcon,
  BnbAssetIcon,
  BnbLargeAssetIcon,
  BtcAssetIcon,
  BtcLargeAssetIcon,
  DogeAssetIcon,
  EthAssetIcon,
  EthLargeAssetIcon,
  LtcAssetIcon,
  LtcLargeAssetIcon,
  UnknownAssetIcon,
  TronAssetIcon,
  PolkadotAssetIcon,
  PolygonAssetIcon,
  CosmosAssetIcon,
  FilecoinAssetIcon,
  ChainlinkAssetIcon,
  ChainlinkLargeAssetIcon,
  SolanaAssetIcon,
  SolanaLargeAssetIcon,
  UniswapAssetIcon,
  UniswapLargeAssetIcon,
  MoneroAssetIcon,
  XrpAssetIcon,
  XrpLargeAssetIcon,
  StellarAssetIcon,
  AptosAssetIcon,
  NearAssetIcon,
  NearLargeAssetIcon,
  FormAssetPlaceholder,
  TrumpAssetIcon,
  ShibAssetIcon,
  PepeAssetIcon,
  MemeAssetIcon,
  BonkAssetIcon,
  MewAssetIcon,
  DogsAssetIcon,
  BrettAssetIcon,
  GoatAssetIcon,
  CoqAssetIcon,
  TurboAssetIcon,
  MoodengAssetIcon,
  FartcoinAssetIcon,
  PenguAssetIcon
} from 'shared/icons'
import { AssetId } from 'shared/types'
import { XyroToken } from 'shared/ui'

const ASSET_ID_TO_ICON_MAP: Record<AssetId, FC<SVGProps<SVGSVGElement>>> = {
  ADA: AdaAssetIcon, // ada
  AVAX: AvalancheAssetIcon, // avalanche
  BNB: BnbAssetIcon, // binance
  BTC: BtcAssetIcon, // bitcoin
  DOGE: DogeAssetIcon, // doge coin
  ETH: EthAssetIcon, // ethereum
  LTC: LtcAssetIcon, //
  DOT: PolkadotAssetIcon, // polkadot
  MATIC: PolygonAssetIcon, // polygon
  TRX: TronAssetIcon, // tron
  ATOM: CosmosAssetIcon, // cosmos
  FIL: FilecoinAssetIcon, // filecoin
  LINK: ChainlinkAssetIcon, // chainlink
  SOL: SolanaAssetIcon, // solana
  UNI: UniswapAssetIcon, // uniswap
  XLM: StellarAssetIcon, // stellar
  XMR: MoneroAssetIcon, // monero
  XRP: XrpAssetIcon, // xrp
  APT: AptosAssetIcon, // Aptos
  NEAR: NearAssetIcon, // Near
  TRUMP: TrumpAssetIcon, // Trump
  SHIB: ShibAssetIcon, // SHIB
  PEPE: PepeAssetIcon, // PEPE
  MEME: MemeAssetIcon, // MEME
  BONK: BonkAssetIcon, // BONK
  MEW: MewAssetIcon, // MEW
  DOGS: DogsAssetIcon, // DOGS
  BRETT: BrettAssetIcon, // BRETT
  GOAT: GoatAssetIcon, // GOAT
  COQ: CoqAssetIcon, // COQ
  TURBO: TurboAssetIcon, // TURBO
  MOODENG: MoodengAssetIcon, // MOODENG
  FARTCOIN: FartcoinAssetIcon, // FARTCOIN
  PENGU: PenguAssetIcon // PENGU
}

const ASSET_ID_TO_LARGE_ICON_MAP: Record<
  AssetId,
  FC<SVGProps<SVGSVGElement>>
> = {
  BNB: BnbLargeAssetIcon, // binance
  BTC: BtcLargeAssetIcon, // bitcoin
  ETH: EthLargeAssetIcon, // ethereum
  LTC: LtcLargeAssetIcon, // litecoin
  LINK: ChainlinkLargeAssetIcon, // chainlink
  SOL: SolanaLargeAssetIcon, // solana
  UNI: UniswapLargeAssetIcon, // uniswap
  XRP: XrpLargeAssetIcon, // xrp
  NEAR: NearLargeAssetIcon, // near
  TRUMP: TrumpAssetIcon, // Trump
  SHIB: ShibAssetIcon, // SHIB
  PEPE: PepeAssetIcon, // PEPE
  MEME: MemeAssetIcon, // MEME
  BONK: BonkAssetIcon, // BONK
  MEW: MewAssetIcon, // MEW
  DOGS: DogsAssetIcon, // DOGS
  BRETT: BrettAssetIcon, // BRETT
  GOAT: GoatAssetIcon, // GOAT
  COQ: CoqAssetIcon, // COQ
  TURBO: TurboAssetIcon, // TURBO
  MOODENG: MoodengAssetIcon, // MOODENG
  FARTCOIN: FartcoinAssetIcon, // FARTCOIN
  PENGU: PenguAssetIcon, // PENGU

  // TODO: Change on large icons or remove from assetId's if we don't need them anymore
  APT: AptosAssetIcon, // Aptos
  XLM: StellarAssetIcon, // stellar
  XMR: MoneroAssetIcon, // monero
  DOT: PolkadotAssetIcon, // polkadot
  MATIC: PolygonAssetIcon, // polygon
  TRX: TronAssetIcon, // tron
  ATOM: CosmosAssetIcon, // cosmos
  FIL: FilecoinAssetIcon, // filecoin
  DOGE: DogeAssetIcon, // doge coin
  ADA: AdaAssetIcon, // ada
  AVAX: AvalancheAssetIcon // avalanche
}

export const getAssetIconById = (
  assetId: AssetId | 'XYRO',
  isLarge?: boolean
) => {
  if (assetId === 'XYRO') return XyroToken

  const assetMap = isLarge ? ASSET_ID_TO_LARGE_ICON_MAP : ASSET_ID_TO_ICON_MAP

  const Icon =
    assetMap[assetId] || (isLarge ? FormAssetPlaceholder : UnknownAssetIcon)
  if (!Icon) console.error(`Asset icon for ${assetId} not found`)
  return Icon
}
