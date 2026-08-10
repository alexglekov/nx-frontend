import { useCallback, useEffect, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { CHANGE_USER_BIO } from 'api/user-settings/change-user-bio'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { MAX_SYMBOLS_CHANGE_BIO_INPUT_VALUE } from '../constants'

// eslint-disable-next-line max-statements
export const useUserBio = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const [bio, setBio] = useState<string>('')

  const [isBioTextAreaFull, setIsBioTextAreaFull] = useState<boolean>(false)

  const user = useReactiveVar(userVar)

  const [commitChangeBio, { loading }] = useMutation(CHANGE_USER_BIO)

  useEffect(() => {
    setBio(user?.bio || '')
  }, [user])

  const handleBIOChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const changedBio = e.target.value

    if (changedBio.length > MAX_SYMBOLS_CHANGE_BIO_INPUT_VALUE) {
      setIsBioTextAreaFull(true)
      return
    } else {
      isBioTextAreaFull && setIsBioTextAreaFull(false)
    }

    setBio(changedBio)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await commitChangeBio({
      variables: {
        bio
      },
      onCompleted: () => {
        notifyOnChangeSuccess()

        setDialogIsOpen(false)

        location.reload()
      },
      onError: notifyOnChangeError
    })
  }

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setDialogIsOpen(isOpen)
      setBio(user?.bio || '')
    },
    [user, setBio, setDialogIsOpen]
  )

  return {
    bio,
    loading,
    isBioTextAreaFull,
    dialogIsOpen,
    setDialogIsOpen,
    setBio,
    handleBIOChange,
    handleSubmit,
    handleOpenChange
  }
}

const notifyOnChangeSuccess = () =>
  notificationStateVar({
    isOpen: true,
    title: 'BIO successfully saved',
    type: 'success',
    duration: 2000
  })

const notifyOnChangeError = () =>
  notificationStateVar({
    isOpen: true,
    title: 'BIO was not saved. Something went wrong..',
    type: 'error',
    duration: 2000
  })
