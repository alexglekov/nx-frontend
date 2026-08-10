/* eslint-disable max-lines */
import React, { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Grid, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { RouterPathes, WELCOME_QUERY_NAME } from 'shared/constants'
import { useCleanQueryParams } from 'shared/hooks/use-clean-query-params'
import { useQueryParams } from 'shared/hooks/use-query'
import { isBetaWelcomeDialogOpenedVar } from 'shared/store/dialogs'
import { globalOverlayLoadingVar } from 'shared/store/global-overlay-state-store'
import { OFFCHAIN_URL } from '../../../app/constants'
import { XyroDialog } from '../xyro-dialog/xyro-dialog'
import styles from './welcome-message-modal.module.scss'

// eslint-disable-next-line max-statements
export const BetaWelcomeMessageModal: React.FC = () => {
  const isBetaWelcomeDialogOpened = useReactiveVar(isBetaWelcomeDialogOpenedVar)

  const navigate = useNavigate()

  const isGlobalOverlayLoading = useReactiveVar(globalOverlayLoadingVar)

  const query = useQueryParams()
  const { cleanQueryParams } = useCleanQueryParams()
  const isWelcomeQueryValue = query.has(WELCOME_QUERY_NAME)

  useEffect(() => {
    if (isGlobalOverlayLoading) return

    isBetaWelcomeDialogOpenedVar(isWelcomeQueryValue)
  }, [isGlobalOverlayLoading, isWelcomeQueryValue])

  const handleOpenChange = useCallback(
    (newIsOpen: boolean) => {
      if (newIsOpen) return

      navigate(RouterPathes.onboarding)
      isBetaWelcomeDialogOpenedVar(false)
      cleanQueryParams()
    },
    [navigate]
  )

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

          <Link to={OFFCHAIN_URL}>
            <Button
              mt={'4'}
              className={styles.actionButtonGreen}
            >
              <Text
                className='color-black'
                size={'2'}
                weight={'bold'}
              >
                GO TO ONCHAIN
              </Text>
            </Button>
          </Link>
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

          <Button
            mt={'4'}
            className={styles.actionButtonBlack}
            onClick={() => handleOpenChange(false)}
          >
            <Text
              className='color-white'
              size={'2'}
              weight={'bold'}
            >
              STAY HERE
            </Text>
          </Button>
        </Flex>
      </Grid>
    </XyroDialog>
  )
}
