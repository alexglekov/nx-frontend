/* eslint-disable max-statements */
import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { useWallet } from 'shared/hooks/use-wallet'
import authBgImage from 'shared/images/auth-bg-image.jpg'
import authBgVideo from 'shared/images/auth-bg-video.mp4'
import { userVar } from 'shared/store/user'
import { XyroDialog } from 'shared/ui'
import { isConnectWalletOpenVar } from '../store/dialogs'
import { ConnectWalletDialogHeader } from './connect-wallet/connect-wallet-dialog-header'
import { WalletConnectors } from './connect-wallet/wallet-connectors'
import styles from '../sign-up.module.scss'

// eslint-disable-next-line complexity
export const ConnectWalletDialog: React.FC = () => {
  const isDialogOpen = useReactiveVar(isConnectWalletOpenVar)
  const user = useReactiveVar(userVar)
  const { isReady, isConnected, isChainIdValid, handlePrepareWallet, title } =
    useWallet()

  const [isMobile] = useResponsive(['xs', 'sm'])

  const handleDialogOpenChange = useCallback((newIsOpen: boolean) => {
    isConnectWalletOpenVar(newIsOpen)
  }, [])

  if (isReady || !user) return null

  if (isConnected && !isChainIdValid) {
    return (
      <Button
        className={styles.connectWalletButton}
        onClick={handlePrepareWallet}
        color='yellow'
      >
        {title}
      </Button>
    )
  }

  const dataTestID =
    user && !isConnected ? DataTestIDs.buttonConnectWalletHeader : ''

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleDialogOpenChange}
      className={cn(styles.dialogRoot, styles.dialogRootConnectWallet)}
      dialogTrigger={
        <Button
          className={styles.connectWalletButton}
          color='yellow'
          data-testid={dataTestID}
        >
          {title}
        </Button>
      }
    >
      {!isMobile ?
        <video
          className={styles.authBgVideo}
          src={authBgVideo}
          poster={authBgImage}
          controls={false}
          autoPlay
          muted
          loop
        />
      : null}
      <Flex
        direction={'column'}
        width='auto'
        justify='center'
        align='end'
        px={isMobile ? '0' : '9'}
        pt={isMobile ? '0' : '7'}
        pb={isMobile ? '0' : '7'}
        gap='5'
        data-testid={DataTestIDs.connectWalletModal}
      >
        <Flex
          className={styles.authDialogFormSection}
          direction={'column'}
          width='100%'
          justify='center'
          align='center'
          px='9'
          pt={isMobile ? '7' : '7'}
          pb={isMobile ? '8' : '7'}
          gap='5'
        >
          <>
            <ConnectWalletDialogHeader />

            <Flex
              width={'100%'}
              align={'center'}
              justify={'center'}
              gap={'2'}
            >
              <WalletConnectors />
            </Flex>
          </>
        </Flex>
      </Flex>
    </XyroDialog>
  )
}
