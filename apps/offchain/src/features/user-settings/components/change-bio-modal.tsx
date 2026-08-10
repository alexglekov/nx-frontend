import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { userVar } from 'shared/store/user'
import { XyroDialog } from 'shared/ui'
import { useUserBio } from '../hooks/use-user-bio'
import { ChangeBioModalForm } from './change-bio-modal-form'
import styles from '../user-settings.module.scss'

export const ChangeBioModal: React.FC = () => {
  const user = useReactiveVar(userVar)

  const { dialogIsOpen, loading, handleOpenChange } = useUserBio()

  const modalAimText = user?.bio ? 'Change bio' : 'Add bio'

  return (
    <XyroDialog
      open={dialogIsOpen}
      onOpenChange={handleOpenChange}
      className={cn(styles.dialogContent, styles.changeBioContent)}
      dialogTrigger={
        <Button
          size={'3'}
          variant='outline'
          radius='full'
          color={!user?.bio ? 'yellow' : 'gray'}
          className={styles.modalTriggerBtn}
          data-testid={DataTestIDs.buttonUserSettingsChangeBio}
        >
          <Text
            weight={'bold'}
            size={'2'}
          >
            {modalAimText.toUpperCase()}
          </Text>
        </Button>
      }
    >
      <ChangeBioModalForm />

      <Flex
        width={'100%'}
        align={'center'}
        justify={'center'}
        mt={'2'}
      >
        <Button
          className={styles.cancelBtn}
          type='button'
          onClick={() => handleOpenChange(false)}
          disabled={loading}
        >
          CANCEL
        </Button>
      </Flex>
    </XyroDialog>
  )
}
