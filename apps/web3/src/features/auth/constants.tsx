import {
  BinanceWalletIcon,
  CoinbaseLogoIcon,
  MetamaskLogoIcon,
  OKXWalletLogoIcon,
  WalletConnectLogoIcon
} from 'shared/icons'
import { WizardMode, WizardStep } from './types'

const { signIn, signUp, connectWallet } = WizardMode
const { init, referral, done, name, walletSelect, nftCheck } = WizardStep

export { WIZARD_STEPS_BY_MODE_MAP } from './wizard-steps-by-mode-map'

export const WALLET_CONNECT_PROJECT_ID = '5b7264217c096fe9a7430b8609f20871'

export const SOCIALS_RES_CODE = 'code'
export const SOCIALS_RES_STATE = 'state'

export const CONNECTION_UNKWOWN_ERROR = /undefined/

// export const SESSION_STORAGE_WIZARD_FLOW_TYPE_KEY = 'wizardFlowType'
export const SESSION_STORAGE_REFFERAL_CODE = 'authRefferalCode'

/** @deprecated */
export const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://ethereum.publicnode.com'
}

/** @deprecated */
export const metadata = {
  name: 'Xyro',
  description: 'Xyro.io',
  url: 'https://xyro.io', // origin must match your domain & subdomain
  icons: []
}

export const WIZARD_STATE_TO_TITLE_MAP = {
  [signUp]: {
    [init]: 'Welcome!',
    [referral]: 'Enter referral code',
    [name]: 'Enter nickname',
    [walletSelect]: 'Connect your wallet',
    [nftCheck]: 'Connect your wallet',
    [done]: 'Almost Done!'
  },
  [signIn]: {
    [init]: 'Welcome back!',
    [referral]: null,
    [name]: null,
    [walletSelect]: null,
    [nftCheck]: null,
    [done]: 'Almost Done!'
  },
  [connectWallet]: {
    [init]: 'Welcome!',
    [referral]: null,
    [name]: 'Enter nickname',
    [walletSelect]: null,
    [nftCheck]: null,
    [done]: 'Almost Done!'
  }
} as const

export const WIZARD_STATE_TO_SUBTITLE_MAP = {
  [signUp]: {
    [init]: 'Do you have XYRO Whitelist NFT?',
    [referral]: 'Please enter your code for early adopters',
    // [flowSelect]: null,
    [name]:
      'Your nickname will be visible to other users. You can change it later in the settings',
    [walletSelect]: null,
    [nftCheck]: null,
    [done]: null
  },
  [signIn]: {
    [init]: 'Sign in to your account',
    [nftCheck]: null,
    [referral]: null,
    // [flowSelect]: null,
    [name]: null,
    [walletSelect]: null,
    [done]: null
  },
  [connectWallet]: {
    [init]: null,
    [nftCheck]: null,
    [referral]: null,
    // [flowSelect]: null,
    [name]:
      'Your nickname will be visible to other users. You can change it later in the settings',
    [walletSelect]: null,
    [done]: null
  }
}

export const DEEPLINK_METAMASK_MOBILE_APP = `https://metamask.app.link/dapp/xyro.io`

export const WALLET_PROVIDER_ICONS = {
  ['coinbaseWalletSDK']: <CoinbaseLogoIcon />,
  ['walletConnect']: <WalletConnectLogoIcon />,
  ['okxWallet']: (
    <OKXWalletLogoIcon
      width={'7rem'}
      height={'7rem'}
    />
  ),
  ['io.metamask']: <MetamaskLogoIcon />,
  ['binanceWallet']: (
    <BinanceWalletIcon
      width={'4.5rem'}
      height={'4.5rem'}
    />
  )
}
