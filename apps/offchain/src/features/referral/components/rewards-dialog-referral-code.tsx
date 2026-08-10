/* eslint-disable max-lines */
import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Pencil2Icon } from '@radix-ui/react-icons'
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField
} from '@radix-ui/themes'
import { UpdateReferralInput } from '__generated__/graphql'
import { MUTATION_CHANGE_REFFERAL_CODE } from 'api/referrals/mutation-change-referral-code'
import cn from 'classnames'
import {
  errorGlobalNotification,
  successGloalNotification
} from 'features/user-settings/utils/global-notifications'
import { XyroDialog } from 'shared/ui'
import { getFormValues } from 'shared/utils/get-form-values'
import { useReferralData } from '../hooks/use-referral-data'
import styles from '../referral.module.scss'

const VALIDATION_PATTERN_REGEX = /^[a-zA-Z0-9_\-\.]+$/

interface RefferalCodeForm {
  code: string
}

export const ChangeRefferalCodeModal: React.FC = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [isValid, setValid] = useState(false)
  const [value, setValue] = useState('')
  const { refetch: refetchReferralData } = useReferralData()

  const [commitUpdateRefferal, { loading }] = useMutation(
    MUTATION_CHANGE_REFFERAL_CODE
  )

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setDialogIsOpen(isOpen)
    setValue('')
    setValid(false)
  }, [])

  const handleFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const code = event.target.value?.trim()
      const valid =
        VALIDATION_PATTERN_REGEX.test(code) &&
        code.length < 16 &&
        code.length > 2

      setValue(code)
      setValid(valid)
    },
    []
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formValues = getFormValues<
      Pick<UpdateReferralInput, 'code'>,
      RefferalCodeForm
    >(event.target as HTMLFormElement)

    const mutationOptions = {
      variables: { input: { newCode: formValues.code } },
      onError: () => errorGlobalNotification('Refferal code was not updated'),
      onCompleted: () => {
        successGloalNotification('Refferal code was successfully updated')
        refetchReferralData()
      }
    }

    await commitUpdateRefferal(mutationOptions)

    handleOpenChange(false)
  }

  return (
    <XyroDialog
      open={dialogIsOpen}
      onOpenChange={handleOpenChange}
      className={styles.dialogContent}
      dialogTrigger={
        <IconButton
          variant='ghost'
          className={cn(styles.copyIcon, 'cursor-pointer')}
        >
          <Pencil2Icon className={cn('color-white', styles.pencilIcon)} />
        </IconButton>
      }
    >
      <RadixForm.Root onSubmit={handleSubmit}>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          position={'relative'}
        >
          <Heading
            size={'7'}
            weight={'medium'}
            mb={'7'}
            className={'color-white'}
          >
            Change referral code
          </Heading>

          <Flex
            direction={'column'}
            width={'100%'}
            gap={'2'}
          >
            <Text
              size={{ initial: '3', sm: '1' }}
              className={styles.enterBioTitle}
              weight={'regular'}
            >
              Enter new referral code
            </Text>

            <TextField.Root
              onChange={handleFieldChange}
              value={value}
              name={'code'}
              radius={'large'}
              size='3'
              placeholder={'Type new referral code'}
              required
              className={styles.changeRefferalCodeTextField}
            />
          </Flex>
          <Flex
            className={styles.buttonsContainer}
            width={'100%'}
            direction={'column'}
            gap={'1'}
          >
            <RadixForm.Submit asChild>
              <Button
                disabled={!isValid || loading}
                size='3'
                type='submit'
                className={styles.submitBtn}
                color='pink'
              >
                <Text
                  size={'2'}
                  className={styles.submitBtnText}
                  weight={'bold'}
                >
                  CHANGE REFERRAL CODE
                </Text>
              </Button>
            </RadixForm.Submit>

            <Button
              className={styles.cancelBtn}
              size='3'
              type='button'
              onClick={() => setDialogIsOpen(false)}
              color='pink'
            >
              <Text
                weight={'bold'}
                size={'2'}
                color='pink'
              >
                CANCEL
              </Text>
            </Button>
          </Flex>
        </Flex>
      </RadixForm.Root>
    </XyroDialog>
  )
}
