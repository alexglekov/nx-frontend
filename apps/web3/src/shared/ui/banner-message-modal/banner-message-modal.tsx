/* eslint-disable max-lines */
import React, { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Grid, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { isBannerMessageModalOpenVar } from 'shared/store/dialogs'
import { XyroDialog } from '../xyro-dialog/xyro-dialog'
import styles from './banner-message-modal.module.scss'
import { globalOverlayLoadingVar } from '../../store/global-overlay-state-store'
import { IGAMING_URL } from 'app/constants'

// eslint-disable-next-line max-statements
export const BannerMessageModal: React.FC = () => {
  const isBetaWelcomeDialogOpened = useReactiveVar(isBannerMessageModalOpenVar)
  const isGlobalOverlayLoading = useReactiveVar(globalOverlayLoadingVar)

  const navigate = useNavigate()

  const handleOpenChange = useCallback(
    (newIsOpen: boolean) => {
      if (newIsOpen) return

      navigate(RouterPathes.onboarding)
      isBannerMessageModalOpenVar(false)
    },
    [navigate]
  )

  const handleClose = useCallback(() => {
    isBannerMessageModalOpenVar(false)
  }, [])

  useEffect(() => {
    if (isGlobalOverlayLoading) {
      isBannerMessageModalOpenVar(false)
      return
    }

    isBannerMessageModalOpenVar(true)
  }, [isGlobalOverlayLoading])

  return (
    <XyroDialog
      open={isBetaWelcomeDialogOpened}
      onOpenChange={handleOpenChange}
      className={styles.dialogContainer}
      isCloseButtonEnabled={false}
    >
      <Grid
        columns={{ initial: '1fr', sm: '1fr 1fr' }}
        width={'100%'}
        height={'100%'}
        align={'center'}
        justify={'center'}
        gap={{ initial: '1', sm: '0' }}
      >
        <Flex
          align={'center'}
          justify={'center'}
          gap={'3rem'}
          direction={'column'}
          width={'100%'}
        >
          <Text
            className='color-white'
            size={'8'}
            weight={'medium'}
            align={'center'}
          >
            iTrading [Onchain]
          </Text>

          <Text
            className={cn('color-white', styles.stepDescriptionText)}
            size={'2'}
            weight={'medium'}
            align={'center'}
          >
            Step into the PvP trading arena! Forecast market trends and outsmart
            your rivals. Are you ready to compete?
          </Text>

          <Button
            mt={'4'}
            className={styles.actionButtonGreen}
            onClick={handleClose}
          >
            <Text
              className='color-black'
              size={'2'}
              weight={'bold'}
            >
              STAY HERE
            </Text>
          </Button>
        </Flex>

        <Flex
          align={'center'}
          justify={'center'}
          gap={'3rem'}
          direction={'column'}
          width={'100%'}
        >
          <Text
            className='color-white'
            size={'8'}
            weight={'medium'}
            align={'center'}
          >
            iGaming [Offchain]
          </Text>

          <Text
            className={cn('color-white', styles.stepDescriptionText)}
            size={'2'}
            weight={'medium'}
            align={'center'}
          >
            Battle through countless PvE challenges! Pick your favorite game
            modes and score huge rewards!
          </Text>

          <Link to={IGAMING_URL}>
            <Button
              mt={'4'}
              className={styles.actionButtonBlack}
            >
              <Text
                className='color-white'
                size={'2'}
                weight={'bold'}
              >
                GO TO OFFCHAIN GAMES
              </Text>
            </Button>
          </Link>
        </Flex>
      </Grid>
    </XyroDialog>
  )
}
