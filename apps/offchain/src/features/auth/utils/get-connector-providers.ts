import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2'
import {
  coinbaseWallet,
  metaMask,
  walletConnect,
  injected
} from 'wagmi/connectors'
import { WALLET_CONNECT_PROJECT_ID } from '../constants'
import { ConnectorProvider } from '../types'

const binanceWalletConnector = getWagmiConnectorV2()

export const getWalletConnectorProviders = (
  isMobile = false
): ConnectorProvider[] => {
  const walletConnectProvider = walletConnect({
    projectId: WALLET_CONNECT_PROJECT_ID
  })

  return [
    {
      id: 'io.metamask',
      name: 'Metamask',
      connector:
        isMobile ? walletConnectProvider : metaMask({ extensionOnly: true })
    },
    {
      id: 'coinbaseWalletSDK',
      name: 'Coinbase',
      connector: isMobile ? walletConnectProvider : coinbaseWallet()
    },
    {
      id: 'okxWallet',
      name: 'OKX Wallet',
      connector:
        isMobile ?
          walletConnectProvider
        : injected({
            target: () => {
              return {
                id: 'okxWallet',
                name: 'OKX Wallet',
                // @ts-expect-error okxwallet does not exist
                provider: window?.okxwallet
              }
            }
          })
    },
    {
      id: 'binanceWallet',
      name: 'Binance Wallet',
      connector: binanceWalletConnector()
    },
    {
      id: 'walletConnect',
      name: 'Wallet Connect',
      connector: walletConnectProvider
    }
  ]
}
