import React, { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as Dialog from '@radix-ui/react-dialog'
import { IconButton, ScrollArea } from '@radix-ui/themes'
import cn from 'classnames'
import { HTMLElementsIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { CrossIcon } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import { isUserAuthLoadingVar } from 'shared/store/user'
import styles from './xyro-dialog.module.scss'

interface Props {
  children?: React.ReactNode
  dialogTrigger?: React.ReactNode
  className?: string
  // NOTE: This prop was added because scroll area doesn't work well with react-swiper lib, possibly remove in future
  scrollAreaSize?: '1' | '2' | '3'
  isCloseButtonEnabled?: boolean
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
  isScrollAreaDisabled?: boolean
}
export const XyroDialog: React.FC<Props> = ({
  onOpenChange = null,
  children = null,
  dialogTrigger = null,
  className = '',
  scrollAreaSize = '2',
  isCloseButtonEnabled = true,
  open = null,
  isScrollAreaDisabled = false
}) => {
  const [isMobile] = useResponsive('xs')
  const isTransactionProcessing = useReactiveVar(isUserAuthLoadingVar)
  const [isUncontrolledDialogOpen, setIsUncontrolledDialoOpen] = useState(false)

  const isDialogOpen = open !== null ? open : isUncontrolledDialogOpen

  const handleOpenChange = useCallback(() => {
    if (isTransactionProcessing && !isMobile) {
      notificationStateVar({
        isOpen: true,
        type: 'warning',
        title: 'Please, finish your transaction first!',
        description: "You can't close dialog with pending transaction"
      })
      return
    }

    if (onOpenChange !== null) {
      onOpenChange(!isDialogOpen)

      return
    }

    setIsUncontrolledDialoOpen(!isDialogOpen)
  }, [isDialogOpen, onOpenChange, isTransactionProcessing])

  const mainLayoutContainer = document.getElementById(
    HTMLElementsIDs.MAIN_LAYOUT
  )

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
    >
      {dialogTrigger ?
        <Dialog.Trigger asChild>{dialogTrigger}</Dialog.Trigger>
      : null}
      <Dialog.Portal container={mainLayoutContainer}>
        <Dialog.Overlay className={styles.dialogOverlay} />

        <Dialog.Content
          className={cn(className, styles.contentContainer, {
            [styles.contentContainerOpenAnimation]: !isDialogOpen,
            [styles.contentContainerClosedAnimation]: isDialogOpen
          })}
        >
          <Dialog.Title asChild />
          <Dialog.Description asChild />

          {isCloseButtonEnabled ?
            <IconButton
              onClick={handleOpenChange}
              className={styles.closeButton}
            >
              <CrossIcon
                width={'3.5rem'}
                height={'3.5rem'}
                className='color-white'
              />
            </IconButton>
          : null}

          {isScrollAreaDisabled ?
            <>{children}</>
          : <ScrollArea
              className={styles.dialogScrollArea}
              size={scrollAreaSize}
              scrollbars='vertical'
              type='auto'
            >
              {children}
            </ScrollArea>
          }
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
