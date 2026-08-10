import { FC } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Text } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { useWallet } from 'shared/hooks/use-wallet'
import { getDataTestIdByWalletStateKey } from 'shared/ui/with-wallet/get-data-test-id'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  disabled: boolean
  title: string
}

export const OneVsOneCreateFormSubmit: FC<Props> = ({ disabled, title }) => {
  const { walletStateKey } = useWallet()

  const dataTestId = getDataTestIdByWalletStateKey(walletStateKey, {
    signInToPlayTestId: buttonOneVsOneSignInToPlay,
    connectWalletTestId: buttonOneVsOneConnectWallet,
    switchChainTestId: buttonOneVsOneSwitchChain,
    actionTestId: buttonOneVsOnePlay
  })

  return (
    <RadixForm.Submit asChild>
      <ButtonWithWalletConnection
        className={styles.dialogOpenBtn}
        disabled={disabled}
        type='submit'
        mt='9'
        size='4'
        data-testid={dataTestId}
      >
        <Text
          weight={'bold'}
          size={'2'}
        >
          {title}
        </Text>
      </ButtonWithWalletConnection>
    </RadixForm.Submit>
  )
}

const {
  buttonOneVsOneConnectWallet,
  buttonOneVsOneSignInToPlay,
  buttonOneVsOneSwitchChain,
  buttonOneVsOnePlay
} = DataTestIDs
