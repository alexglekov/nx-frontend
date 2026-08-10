import { FC } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { useWallet } from 'shared/hooks/use-wallet'
import { RadixText, XyroLoading } from 'shared/ui'
import { getDataTestIdByWalletStateKey } from 'shared/ui/with-wallet/get-data-test-id'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import styles from '../../mode-setups.module.scss'

interface Props {
  handleSetupCancelation: () => void
  disabled: boolean
  loading: boolean
}
export const SetupsCreateFormSubmitButtons: FC<Props> = ({
  loading,
  disabled,
  handleSetupCancelation
}) => {
  return (
    <Flex
      direction='column'
      gap='2'
      mt='9'
    >
      <SetupsCreateGameSubmitButton
        disabled={disabled}
        loading={loading}
      />

      <Button
        size='4'
        type='button'
        onClick={handleSetupCancelation}
        className={styles.cancelBtn}
      >
        <RadixText
          size={'2'}
          weight={'bold'}
        >
          CANCEL
        </RadixText>
      </Button>
    </Flex>
  )
}

const SetupsCreateGameSubmitButton = ({
  disabled,
  loading
}: {
  disabled: boolean
  loading: boolean
}) => {
  const { walletStateKey } = useWallet()

  const dataTestId = getDataTestIdByWalletStateKey(walletStateKey, {
    actionTestId: DataTestIDs.buttonCreateSetup
  })

  return (
    <ButtonWithWalletConnection
      className={styles.createSetupsGameBtn}
      disabled={disabled || loading}
      type='submit'
      color='blue'
      size='4'
      highContrast
      data-testid={dataTestId}
    >
      <XyroLoading
        loading={loading}
        iconSize='0'
      >
        <RadixText
          size={'2'}
          weight={'bold'}
        >
          CREATE SETUP
        </RadixText>
      </XyroLoading>
    </ButtonWithWalletConnection>
  )
}
