/* eslint-disable max-lines */
// eslint-disable-next-line import/order
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
// eslint-disable-next-line import/order
import * as RadixForm from '@radix-ui/react-form'
import 'cropperjs/dist/cropper.css'
// eslint-disable-next-line import/order
import { useMutation, useReactiveVar } from '@apollo/client'
import {
  DeleteAvatarMutation,
  MeFragment,
  UpdateAvatarMutation
} from '__generated__/graphql'
import { CHANGE_AVATAR } from 'api/user-settings/change-user-avatar'
import { DELETE_USER_AVATAR } from 'api/user-settings/delete-user-avatar'
import cn from 'classnames'
import {
  MAX_AVATAR_SIZE_MB,
  UPLOAD_FILE_TYPES,
  UPLOAD_FILE_TYPES_STRING
} from 'features/user-settings/constants'
import { transformDataURLtoFile } from 'features/user-settings/utils/transform-data-url-to-file'
import { Cropper, ReactCropperElement } from 'react-cropper'
import { FileUploader } from 'react-drag-drop-files'
import { AVATAR_FALLBACK_DEFAULT } from 'shared/constants'
import { CameraIcon, TrashIcon, UserIcon } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import { userVar } from 'shared/store/user'
import { XyroLoadingSpinner, XyroAvatar, XyroDialog } from 'shared/ui'
import { notifyOnUnknownError } from 'shared/utils/notify-on-error'
import {
  errorGlobalNotification,
  successGloalNotification
} from '../../user-settings/utils/global-notifications'
import styles from '../avatar.module.scss'

const DND_STEP = 1
const CROPPER_STEP = 2

// eslint-disable-next-line max-statements, complexity
export const ChangeAvatarModal: React.FC = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(DND_STEP)
  const [file, setFile] = useState<string | null>(null)
  const [image, setImage] = useState<Cropper | null>(null)
  const [cropperPreview, setCropperPreview] = useState<string>('')
  const cropperRef = useRef<ReactCropperElement>(null)
  const user = useReactiveVar(userVar)
  const [commitChangeAvatar, { loading }] = useMutation<UpdateAvatarMutation>(
    CHANGE_AVATAR,
    {
      context: {
        headers: {
          'apollo-require-preflight': true
        }
      }
    }
  )
  const [commitDeleteAvatar, { loading: deleteAvatarLoading }] =
    useMutation<DeleteAvatarMutation>(DELETE_USER_AVATAR)

  const userAvatarPath = user ? user.avatarUris[2] : ''

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setDialogIsOpen(isOpen)
    setStep(DND_STEP)
    setFile(null)
    setImage(null)
  }, [])

  useEffect(() => {
    if (!userAvatarPath) {
      setCropperPreview(file || '')
      return
    }

    setStep(CROPPER_STEP)
    setCropperPreview(userAvatarPath)
  }, [userAvatarPath, dialogIsOpen, file])

  // eslint-disable-next-line max-statements
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) throw new Error('User state is empty')
    const serverFormattedImageURL = image?.getCroppedCanvas()?.toDataURL()
    if (!serverFormattedImageURL) return
    const serverFormattedImage = transformDataURLtoFile(serverFormattedImageURL)

    const mutationOptions = {
      variables: { file: serverFormattedImage },
      onError: () => errorGlobalNotification('Avatar was not updated'),
      onCompleted: () =>
        successGloalNotification('Avatar was successfully updated')
    }

    const changeAvatarRes = await commitChangeAvatar(mutationOptions)

    if (!changeAvatarRes?.data)
      throw new Error('No data returned from the server')

    const updatedUser = {
      ...user,
      avatarKeys: changeAvatarRes.data.updateAvatar.avatarKeys,
      avatarUris: changeAvatarRes.data.updateAvatar.avatarUris
    } as MeFragment

    userVar(updatedUser)
    handleOpenChange(false)
  }

  const handleDeleteAvatar = async () => {
    const mutationOptions = {
      onError: notifyOnUnknownError,
      onCompleted: () => {
        notificationStateVar({
          isOpen: true,
          title: 'Avatar successfully deleted',
          type: 'success'
        })

        handleOpenChange(false)
      }
    }

    const res = await commitDeleteAvatar(mutationOptions)

    const updatedUser = res.data?.deleteAvatar

    if (!updatedUser) return

    // TODO: useFragment instead of type assert
    userVar(updatedUser as MeFragment)
  }

  const handleCrop = () => {
    if (!cropperRef.current?.cropper) return
    setImage(cropperRef.current.cropper)
  }

  const handleCancel = () => {
    if (step === DND_STEP) {
      setDialogIsOpen(false)
      return
    }

    setFile(null)
    setImage(null)
    setStep(DND_STEP)
  }

  const handleChange = (file: File) => {
    const fileURL = URL.createObjectURL(file)
    setFile(fileURL)
    setStep(CROPPER_STEP)
  }

  const handleUploadNewPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.files ||
      !e.target.files[0] ||
      e.target.files[0].size > MAX_AVATAR_SIZE_MB * 1024 * 1024
    )
      return
    setCropperPreview(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <XyroDialog
      open={dialogIsOpen}
      onOpenChange={handleOpenChange}
      className={cn(styles.dialogContent, styles.chnageAvatarContent)}
      dialogTrigger={
        <Button
          radius='full'
          className={styles.addAvatarBtn}
        >
          {userAvatarPath ?
            <XyroAvatar
              displayLevel={false}
              src={userAvatarPath}
              fallback={user?.name[0] || AVATAR_FALLBACK_DEFAULT}
              className={styles.avatar}
            />
          : <UserIcon
              width={'5rem'}
              height={'5rem'}
              color='var(--pink)'
            />
          }
          <Box className={styles.addAvatarChild}>
            <CameraIcon
              color='var(--black)'
              width={'3rem'}
              height={'3rem'}
            />
          </Box>
        </Button>
      }
    >
      <RadixForm.Root
        className={styles.changeAvatarForm}
        onSubmit={handleSubmit}
      >
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          position={'relative'}
        >
          {step === CROPPER_STEP && cropperPreview === userAvatarPath ?
            <IconButton
              type='button'
              className={styles.trashIconContainer}
              onClick={handleDeleteAvatar}
            >
              {!deleteAvatarLoading ?
                <TrashIcon />
              : <XyroLoadingSpinner />}
            </IconButton>
          : null}
          <Heading
            size={'7'}
            weight={'medium'}
            mb={'3'}
            className={'color-white'}
          >
            {userAvatarPath ? 'Edit photo' : 'Upload photo'}
          </Heading>
          <Text
            mb={'7'}
            className={styles.secondaryAvatarModalHeadingText}
            align={'center'}
          >{`Upload picture in .JPG or .PNG format, max ${MAX_AVATAR_SIZE_MB}MB`}</Text>
          {step === DND_STEP && !userAvatarPath ?
            // AS DEFAULT: MIN FILE SIZE - 1mb(prop to change: minSize), MAX FILE SIZE - 2mb(prop to change: maxSize)
            <Flex>
              <FileUploader
                classes={styles.fileUploader}
                handleChange={handleChange}
                name='file'
                types={UPLOAD_FILE_TYPES}
                maxSize={MAX_AVATAR_SIZE_MB}
              />
            </Flex>
          : cropperPreview === userAvatarPath ?
            <Flex
              align={'center'}
              justify={'center'}
            >
              <img
                src={cropperPreview}
                alt='existing avatar'
                className={styles.currentImagePreview}
              />
            </Flex>
          : <Cropper
              src={cropperPreview}
              checkCrossOrigin={false}
              checkOrientation={false}
              className={styles.cropper}
              autoCropArea={0.7}
              initialAspectRatio={1}
              aspectRatio={1}
              viewMode={2}
              center={false}
              guides={false}
              crop={handleCrop}
              ref={cropperRef}
              cropBoxResizable={false}
              minCropBoxHeight={128}
            />
          }
          <Flex
            mt={'7'}
            width={'100%'}
            direction={'column'}
            gap={'1'}
          >
            {cropperPreview !== userAvatarPath ?
              <RadixForm.Submit asChild>
                <Button
                  type='submit'
                  className={styles.submitBtn}
                  disabled={!image || loading}
                >
                  <Text className={styles.submitBtnText}>
                    {userAvatarPath ? 'Save' : 'Upload photo'}
                  </Text>
                </Button>
              </RadixForm.Submit>
            : null}

            {!userAvatarPath ?
              <Button
                className={styles.cancelBtn}
                type='button'
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            : <Button
                className={cn({
                  [styles.cancelBtn]: cropperPreview !== userAvatarPath,
                  [styles.submitBtn]: cropperPreview === userAvatarPath
                })}
                type='button'
                disabled={loading}
              >
                <label
                  className={styles.uploadPhotoLabelContainer}
                  htmlFor='avatar'
                >
                  Upload new photo
                </label>
                <input
                  style={{ display: 'none' }}
                  type='file'
                  id='avatar'
                  name='avatar'
                  accept={UPLOAD_FILE_TYPES_STRING}
                  onChange={handleUploadNewPhoto}
                />
              </Button>
            }
          </Flex>
        </Flex>
      </RadixForm.Root>
    </XyroDialog>
  )
}
