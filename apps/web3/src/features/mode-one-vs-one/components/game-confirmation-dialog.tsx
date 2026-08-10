import { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { Asset, Maybe } from '__generated__/graphql'
import { CreateExactBetParams, useExactPrice } from 'contracts/exact-price'
import { DataTestIDs } from 'shared/constants'
import { GTM_EVENTS } from 'shared/constants/gtm-events'
import { userVar } from 'shared/store/user'
import { XyroLoading } from 'shared/ui'
import { showNotificationToast } from 'shared/utils/notify'
import { pushGtmEvent } from 'shared/utils/push-gtm-event'
import {
  isConfirm1vs1DialogOpenVar,
  isCreate1vs1DialogOpenVar
} from '../store/dialog'
import { oneVsOneIsXyroTokenSelectedVar } from '../store/selected-token'
import { GameConfirmationDialogContent } from './game-confirmation-dialog-content'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  gameData: Maybe<CreateExactBetParams>
  asset: Asset | null
  clearForm: () => void
}
// eslint-disable-next-line max-statements
export const GameConfirmationDialog: React.FC<Props> = ({
  gameData: data,
  asset,
  clearForm
}) => {
  const user = useReactiveVar(userVar)
  const isUserPlayed = user?.hasPlayed || false

  const [loading, setLoading] = useState(false)
  const exactPrice = useExactPrice()
  const isDialogOpen = useReactiveVar(isConfirm1vs1DialogOpenVar)
  const isXyroToken = useReactiveVar(oneVsOneIsXyroTokenSelectedVar)

  // eslint-disable-next-line max-statements
  const handleGameConfirmation = useCallback(async () => {
    if (exactPrice && data) {
      setLoading(true)
      try {
        const tx = await exactPrice.createNewBet(data)

        if (!isUserPlayed) {
          pushGtmEvent(GTM_EVENTS.firstDepositSuccessful, {
            deposit_currency: isXyroToken ? 'XYRO' : 'USDT',
            deposit_value: data.amount,
            conversion_id: tx,
            userId: user?.id || ''
          })
        } else {
          pushGtmEvent(GTM_EVENTS.depositSuccessful, {
            deposit_currency: isXyroToken ? 'XYRO' : 'USDT',
            deposit_value: data.amount,
            conversion_id: tx,
            userId: user?.id || ''
          })
        }

        clearForm()
      } catch (error) {
        console.error(error)
        showNotificationToast({
          title: 'Error! Game not created',
          description: JSON.stringify(error),
          type: 'error'
        })
      } finally {
        isConfirm1vs1DialogOpenVar(!isDialogOpen)
        isCreate1vs1DialogOpenVar(false)
        setLoading(false)
      }
    }
  }, [isDialogOpen, isXyroToken, clearForm, data, exactPrice, isUserPlayed])

  const handleGameCancelation = useCallback(() => {
    isConfirm1vs1DialogOpenVar(!isDialogOpen)
  }, [isDialogOpen])

  const handleOpenChange = useCallback((isOpen: boolean) => {
    isConfirm1vs1DialogOpenVar(isOpen)
  }, [])

  if (!data) return null

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Content className={styles.confirmationDialog}>
        <Dialog.Title>
          <Text
            size={'7'}
            weight={'medium'}
            className={styles.confirmationDialogTitle}
          >
            Confirm 1vs1 game
          </Text>
        </Dialog.Title>

        <GameConfirmationDialogContent
          startTime={data.startTime}
          asset={asset}
        />

        <Flex
          className={styles.buttonsContainer}
          direction='column'
          gap='2'
        >
          <Button
            onClick={handleGameConfirmation}
            className={styles.confirmGameBtn}
            disabled={loading}
            data-testid={DataTestIDs.buttonOneVsOneConfirmGame}
          >
            <XyroLoading loading={loading}>
              <Text>CONFIRM GAME</Text>
            </XyroLoading>
          </Button>

          <Button
            onClick={handleGameCancelation}
            className={styles.rejectGameBtn}
            data-testid={DataTestIDs.buttonOneVsOneRejectGame}
          >
            <Text>REJECT</Text>
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
