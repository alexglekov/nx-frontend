import { Flex } from '@radix-ui/themes'
import { WALLET_PROVIDER_ICONS } from 'features/auth/constants'
import { getWalletConnectorProviders } from 'features/auth/utils/get-connector-providers'
import { notifyOnNotInstalledWeb3Provider } from 'features/auth/utils/notify-on-not-installed-web3-provider'
import { useResponsive } from 'shared/hooks/use-responsive'
import { RadixText, XyroLoading } from 'shared/ui'
import { useConnectWallet } from '../../hooks/use-connect-wallet'
import { isConnectWalletDialogOpenVar } from '../../store/dialogs'
import { ConnectorProvider } from '../../types'
import { AuthButton } from '../auth-buttons'
import { PolicyAgreementTextWithLinks } from './policy-agreement-text-with-links'

// eslint-disable-next-line max-statements
export const AuthWizardStepWalletConnect: React.FC = () => {
  const [isMobile] = useResponsive('xs')

  const connectorProviders = getWalletConnectorProviders(Boolean(isMobile))

  const { handleAuthWallet, loading } = useConnectWallet()

  // eslint-disable-next-line max-statements, complexity
  const handleConnectWalletProvider = async (provider: ConnectorProvider) => {
    if (
      provider.id === 'io.metamask' &&
      typeof window.ethereum === 'undefined' &&
      !isMobile
    ) {
      notifyOnNotInstalledWeb3Provider(provider.id)
      return
    }

    if (
      provider.id === 'okxWallet' &&
      // @ts-expect-error okxwallet does not exist
      typeof window?.okxwallet === 'undefined' &&
      !isMobile
    ) {
      notifyOnNotInstalledWeb3Provider(provider.id)
      return
    }

    if (provider.id === 'binanceWallet') {
      handleAuthWallet(provider)
      isConnectWalletDialogOpenVar(false)
      return
    }

    if (
      provider.id === 'coinbaseWalletSDK' &&
      typeof window.coinbaseWalletExtension === 'undefined' &&
      !isMobile
    ) {
      notifyOnNotInstalledWeb3Provider(provider.id)
      return
    }

    if (provider.id !== 'walletConnect' && !isMobile) {
      handleAuthWallet(provider)
      return
    }

    isConnectWalletDialogOpenVar(false)

    handleAuthWallet(provider)
  }

  return (
    <Flex
      direction='column'
      justify='center'
      align='stretch'
      width={'100%'}
      gap={'4'}
    >
      {connectorProviders.map(provider => {
        const { id, name } = provider

        const connectorLogoIcon =
          WALLET_PROVIDER_ICONS[id as keyof typeof WALLET_PROVIDER_ICONS]

        return (
          <AuthButton
            key={id}
            onClick={() => handleConnectWalletProvider(provider)}
          >
            <XyroLoading loading={loading}>
              {connectorLogoIcon}
              <RadixText>{name}</RadixText>
            </XyroLoading>
          </AuthButton>
        )
      })}

      <PolicyAgreementTextWithLinks />
    </Flex>
  )
}
