import { AssetId } from 'shared/types'

const ASSET_ID_TO_NAME_MAP: Record<AssetId, string> = {
  ADA: 'Ada',
  AVAX: 'Avalanche',
  BNB: 'Binance',
  BTC: 'Bitcoin',
  DOGE: 'Doge',
  ETH: 'Ethereum',
  LTC: 'Litecoin',
  DOT: 'Polkadot',
  MATIC: 'Polygon',
  TRX: 'Tron',
  ATOM: 'Cosmos',
  FIL: 'Filecoin',
  LINK: 'Chainlink',
  SOL: 'Solana',
  UNI: 'Uniswap',
  XLM: 'Stellar',
  XMR: 'Monero',
  XRP: 'Xrp',
  APT: 'Aptos',
  NEAR: 'Near',
  TRUMP: 'Trump',
  SHIB: 'Shiba',
  PEPE: 'Pepe',
  MEME: 'Meme',
  BONK: 'Bonk',
  MEW: 'Mew',
  DOGS: 'Dogs',
  BRETT: 'Brett',
  GOAT: 'Goat',
  COQ: 'Coq',
  TURBO: 'Turbo',
  MOODENG: 'Moodeng',
  FARTCOIN: 'Fartcoin',
  PENGU: 'Pengu'
}

export const getAssetNameById = (assetId: AssetId | 'XYRO') => {
  if (assetId === 'XYRO') return 'XyroToken'

  const name = ASSET_ID_TO_NAME_MAP[assetId] || 'Unknown'
  if (!name) console.error(`Asset name for ${assetId} not found`)
  return name
}
