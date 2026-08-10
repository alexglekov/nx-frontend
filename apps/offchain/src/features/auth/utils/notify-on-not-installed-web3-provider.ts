import { MS_IN_SEC } from 'shared/constants'
import { showNotificationToast } from 'shared/utils/notify'
import { Connector } from 'wagmi'

export function notifyOnNotInstalledWeb3Provider(connectorId: Connector['id']) {
  const walletLink = getWalletLink(connectorId)
  if (!walletLink) throw new Error('Wallet link not found')

  showNotificationToast({
    type: 'info',
    title: 'Wallet extension is not installed.',
    description:
      "Please, visit the wallet's website to install it or choose another signing method",
    actionText: 'Visit wallet website',
    linkAddress: walletLink,
    duration: 10 * MS_IN_SEC
  })
}

const WALLET_NAME_TO_ADDRESS_MAP = {
  ['io.metamask']: 'https://metamask.io/',
  ['okxWallet']: 'https://www.okx.com/web3',
  ['binanceWallet']: 'https://www.bnbchain.org/',
  ['walletConnect']: 'https://walletconnect.com/',
  ['coinbaseWalletSDK']: 'https://www.coinbase.com/'
}

function getWalletLink(connectorId: Connector['id']) {
  return (
    WALLET_NAME_TO_ADDRESS_MAP?.[
      connectorId as keyof typeof WALLET_NAME_TO_ADDRESS_MAP
    ] ?? null
  )
}
