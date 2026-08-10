import { Flex } from '@radix-ui/themes'
import { WALLET_PROVIDER_ICONS } from 'features/auth/constants'
import { getWalletConnectorProviders } from 'features/auth/utils/get-connector-providers'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { RadixText, XyroLoading } from 'shared/ui'
import { useConnectWallet } from '../../hooks/use-connect-wallet'
import { isConnectWalletOpenVar } from '../../store/dialogs'
import { ConnectorProvider } from '../../types'
import { AuthButton } from '../auth-buttons'

export const WalletConnectors: React.FC = () => {
  const [isMobile] = useResponsive('xs')

  const connectorProviders = getWalletConnectorProviders(Boolean(isMobile))

  const { handleConnectWallet, loading } = useConnectWallet()

  const handleConnectWalletProvider = async (provider: ConnectorProvider) => {
    isConnectWalletOpenVar(false)
    handleConnectWallet(provider)
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

        const dataTestID =
          id === 'io.metamask' ? DataTestIDs.buttonConnectViaMM : ''

        return (
          <AuthButton
            key={id}
            onClick={() => handleConnectWalletProvider(provider)}
            dataTestID={dataTestID}
          >
            <XyroLoading loading={loading}>
              {connectorLogoIcon}
              <RadixText>{name}</RadixText>
            </XyroLoading>
          </AuthButton>
        )
      })}
    </Flex>
  )
}
