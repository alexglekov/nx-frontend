import React, { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Dialog, Text } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { globalOverlayLoadingVar } from 'shared/store/global-overlay-state-store'
import { XyroLoadingSpinner } from '../xyro-loading-spinner'
import styles from './global-loader-overlay.module.scss'

export const GlobalLoaderOverlay: React.FC = () => {
  const [isOverlayOpened, setOverlayOpened] = useState(false)

  const isGlobalOverlayStateLoading = useReactiveVar(globalOverlayLoadingVar)

  useEffect(() => {
    if (isGlobalOverlayStateLoading) return

    setOverlayOpened(false)
  }, [])

  const [isMobile] = useResponsive('sm')

  if (isMobile) return

  return (
    <Dialog.Root open={isOverlayOpened}>
      <Dialog.Content className={styles.dialogContainer}>
        <Flex
          className={styles.loaderContainer}
          align={'center'}
          justify={'center'}
          direction={'column'}
        >
          <XyroLoadingSpinner iconSize='8' />

          <Text
            mt={'3'}
            size={'4'}
            weight={'bold'}
          >
            LOADING...
          </Text>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
