import { DataTestIDs } from 'shared/constants'
import { Banner, HeroBannerType } from 'shared/types'
import styles from './banner-slider.module.scss'

export const HERO_BANNERS: Record<HeroBannerType, Banner> = {
  bullsEye: {
    heading: 'Can you hit the Bull’s Eye?',
    callToAction: 'Try and find out!',
    text: 'Trust your market analysis skills – or your good fortune! Guess the exact price of an asset and challenge your rivals. Get ready to enter the arena!',
    path: '/bulls-eye',
    buttonText: 'PLAY NOW',
    buttonColor: 'green',
    isExternal: false,
    cssClass: styles.bullsEye
  },
  upDown: {
    heading: 'Test Your Crypto Instincts.',
    callToAction: 'Will it go Up or Down?',
    text: 'Think you’ve got the best feel for Bitcoin’s moves? Challenge your rivals, and try to win in one of the fastest and the most competitive game modes!',
    path: '/up-down',
    buttonText: 'PLAY NOW',
    buttonColor: 'cyan',
    isExternal: false,
    cssClass: styles.upDown
  },
  setups: {
    heading: 'Create your setup',
    callToAction: 'and take profit!',
    text: 'Gamified Trading Ideas: Make a choice, Compete & Win! Join Setups, forecast asset prices. Turn crypto insights into exciting victories!',
    path: '/setups',
    buttonText: 'CREATE SETUP',
    buttonColor: 'cyan',
    isExternal: false,
    cssClass: styles.setups
  },
  addSetup: {
    heading: 'Create your setup',
    callToAction: 'and take profit!',
    text: 'Gamified Trading Ideas: Make a choice, Compete & Win! Join Setups, forecast asset prices. Turn crypto insights into exciting victories!',
    path: '/setups',
    buttonText: 'CREATE SETUP',
    buttonColor: 'blue',
    isExternal: false,
    cssClass: styles.addSetups,
    buttonDataTestId: DataTestIDs.buttonCreateSetup
  },
  allModes: {
    heading: 'Explore All 4 Game Modes.',
    callToAction: 'And embark on your inaugural\n gaming journey!',
    text: 'We’ve prepared onboarding tips each of the five gaming modes. Check out the Help page and you’re all set to play!',
    path: '/onboarding',
    buttonText: 'GO TO TUTORIALS',
    buttonColor: 'red',
    isExternal: false,
    cssClass: styles.allModes
  },
  help: {
    heading: 'Hello, how can we help?',
    callToAction: '',
    text: 'Need help with something? Here are our most frequently asked questions.',
    path: '/help',
    buttonText: 'GO TO FAQ',
    buttonColor: 'yellow',
    isExternal: false,
    cssClass: styles.help
  },
  twitter: {
    heading: 'Want more helpful tips?',
    callToAction: 'Follow us on Twitter!',
    text: '',
    path: 'https://x.com/xyro_io',
    isExternal: true,
    buttonText: 'GO TO X',
    buttonColor: 'blue',
    cssClass: styles.twitter
  },
  discord: {
    heading: 'Stay tuned for more news.',
    callToAction: 'Join Xyro on Discord!',
    text: 'The go-to place for Xyro announcements, giveaways, contests, and technical updates.',
    path: 'https://discord.gg/xyro', // TODO: update this link when it's ready
    isExternal: true,
    buttonText: 'GO TO DISCORD',
    buttonColor: 'plum',
    cssClass: styles.discord
  },
  web3: {
    heading: "We're Fully Web3!",
    callToAction: 'Dive Into Decentralization!',
    text: 'Everything is on-chain — every game mode operates on smart contracts. Are you ready to play in a whole new way?',
    path: '/bulls-eye',
    buttonText: 'PLAY NOW',
    buttonColor: 'green',
    isExternal: false,
    cssClass: styles.web3
  },
  chainlink: {
    heading: 'Chainlink Integration!',
    callToAction: '',
    text: "We're thrilled to announce that we have integrated Chainlink Data Streams on Arbitrum!",
    path: '/onboarding',
    buttonText: 'TRY NOW',
    buttonColor: 'green',
    isExternal: false,
    cssClass: styles.chainlink
  },
  mainnet: {
    heading: 'Welcome to the Mainnet!',
    callToAction:
      'Step into the future of gamified social trading and make your mark!',
    text: '',
    path: '/onboarding',
    buttonText: 'PLAY NOW',
    buttonColor: 'green',
    isExternal: false,
    cssClass: styles.mainnet
  }
}

export const AUTOPLAY_OPTIONS = {
  delay: 8000,
  disableOnInteraction: true,
  pauseOnMouseEnter: true
}
export const PAGINATION_OPTIONS = {
  clickable: true
}
