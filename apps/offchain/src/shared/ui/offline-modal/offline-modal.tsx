import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Dialog, Flex, Button, Text } from '@radix-ui/themes'
import { isOfflineDialogOpenVar } from 'shared/store/dialogs'
import { OperationLoader } from 'shared/ui/operation-loader/operation-loader'
import styles from './offline-modal.module.scss'

export const OfflineModal: React.FC = () => {
  const isOfflineDialogOpen = useReactiveVar(isOfflineDialogOpenVar)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => isOfflineDialogOpenVar(isOpen),
    []
  )

  const handleWindowReload = () => {
    location.reload()
  }

  return (
    <Dialog.Root
      open={isOfflineDialogOpen}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Content className={styles.dialogContainer}>
        <Flex
          direction={'column'}
          gap={'3'}
          width={'100%'}
          mb={'6'}
        >
          <Flex
            width={'100%'}
            align={'center'}
            justify={'center'}
          >
            <OperationLoader />
          </Flex>
          <Text
            className='color-white'
            size={'7'}
            weight={'medium'}
            align={'center'}
          >
            Oops! Connection lost.
          </Text>
          <Text
            align={'center'}
            className={styles.checkConnectionText}
          >
            Please check your internet connection and try refreshing the page.
            We apologize for any inconvenience this may cause.
          </Text>
        </Flex>
        <Button
          className={styles.reloadBtn}
          type='button'
          onClick={handleWindowReload}
        >
          TRY AGAIN
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  )
}
