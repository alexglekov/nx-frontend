import { Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { DialogShared } from 'shared/ui'
import { OperationLoader } from 'shared/ui/operation-loader/operation-loader'
import { isConfirmActionDialogOpenVar } from '../store/dialogs-balance-store'
import styles from '../balance-add.module.scss'

export const ConfirmActionDialog: React.FC = () => {
  return (
    <DialogShared
      openStore={isConfirmActionDialogOpenVar}
      width='54.5rem'
      border='0.5rem solid var(--yellow-10)'
      radius='5.5rem'
    >
      <Flex
        width={'100%'}
        height={'100%'}
        align={'center'}
        justify={'center'}
        direction={'column'}
        gap={'3'}
      >
        <Text
          className={styles.confirmOperationText}
          size={'7'}
          align={'center'}
          mb={'4'}
        >
          Perform the action in the connected wallet
        </Text>
        <OperationLoader />
      </Flex>
    </DialogShared>
  )
}
