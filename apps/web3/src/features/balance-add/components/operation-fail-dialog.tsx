import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { OperationFailIcon } from 'shared/icons'
import { DialogShared } from 'shared/ui'
import styles from '../balance-add.module.scss'
import { isOperationFailDialogOpenvar } from '../store/dialogs-balance-store'

export const OperationFailDialog: React.FC = () => {
  return (
    <DialogShared
      openStore={isOperationFailDialogOpenvar}
      width='42rem'
      border='0.5rem solid var(--yellow-10)'
      radius='5.5rem'
    >
      <Flex
        width={'100%'}
        height={'100%'}
        align={'center'}
        justify={'center'}
        direction={'column'}
        gap={'7'}
      >
        <Flex
          direction={'column'}
          align={'center'}
          gap={'2'}
        >
          <OperationFailIcon />
          <Text
            className={styles.textWhite}
            size={'7'}
          >
            Failed
          </Text>
          <Text className={'color-gray'}>
            Payment failed. Please try again{' '}
          </Text>
        </Flex>
        <Button className={styles.topUpButton}>TRY AGAIN</Button>
      </Flex>
    </DialogShared>
  )
}
