/* eslint-disable max-lines */
import React, { useCallback, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { RouterPathes, WELCOME_QUERY_NAME } from 'shared/constants'
import { WELCOME_WINDOW_STEPS_DATA } from 'shared/constants/welcome-window'
import { useCleanQueryParams } from 'shared/hooks/use-clean-query-params'
import { useQueryParams } from 'shared/hooks/use-query'
import { useResponsive } from 'shared/hooks/use-responsive'
import { ETHRoundedIcon, TetherRoundedIcon } from 'shared/icons'
import { isBetaWelcomeDialogOpenedVar } from 'shared/store/dialogs'
import { globalOverlayLoadingVar } from 'shared/store/global-overlay-state-store'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { XyroDialog } from '../xyro-dialog/xyro-dialog'
import { WelcomeMessageModalStep } from './welcome-message-modal-step'
import styles from './welcome-message-modal.module.scss'
import 'swiper/css'
import 'swiper/css/pagination'

export const PAGINATION_OPTIONS = {
  clickable: true
}

// eslint-disable-next-line max-statements
export const BetaWelcomeMessageModal: React.FC = () => {
  const isBetaWelcomeDialogOpened = useReactiveVar(isBetaWelcomeDialogOpenedVar)

  const navigate = useNavigate()

  const [isMobile] = useResponsive('xs')

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
      isScrollAreaDisabled={Boolean(isMobile)}
    >
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'2'}
        width={'100%'}
      >
        <Text
          className={cn('color-white', styles.title)}
          weight={'bold'}
          align={'center'}
        >
          Welcome to XYRO Mainnet!
        </Text>

        <Flex
          direction={'column'}
          align={'center'}
          gap={'1'}
        >
          <Text
            className={'color-white'}
            weight={'light'}
            align={'center'}
          >
            We are excited to have you with us. To start playing, you will need
          </Text>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <Text
              className={'color-white'}
              weight={'light'}
              align={'center'}
            >
              two types of tokens:
            </Text>

            <TetherRoundedIcon className='color-white' />

            <Text
              className={'color-white'}
              weight={'bold'}
              align={'center'}
            >
              USDT
            </Text>

            <Text
              className={'color-white'}
              weight={'light'}
              align={'center'}
            >
              and
            </Text>

            <ETHRoundedIcon />

            <Text
              className={'color-white'}
              weight={'bold'}
              align={'center'}
            >
              Eth in Arbitrum
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        width={'100%'}
        position={'relative'}
        className={styles.bannerInfoWrapper}
        gap={'4'}
      >
        {!isMobile ?
          <Flex
            align={'stretch'}
            width={'100%'}
            gap={'3'}
          >
            {Object.keys(WELCOME_WINDOW_STEPS_DATA).map(key => {
              return (
                <WelcomeMessageModalStep
                  key={key}
                  step={key as 'step1' | 'step2'}
                />
              )
            })}
          </Flex>
        : null}
      </Flex>

      {isMobile ?
        <Swiper
          modules={[Pagination]}
          pagination={PAGINATION_OPTIONS}
          spaceBetween={50}
          centeredSlides
          className={styles.mobileSlider}
          loop
        >
          {Object.keys(WELCOME_WINDOW_STEPS_DATA).map(key => {
            return (
              <SwiperSlide key={key}>
                <WelcomeMessageModalStep step={key as 'step1' | 'step2'} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      : null}

      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'4'}
      >
        <Text
          className={cn(styles.modalFooterText, 'color-white')}
          weight={'medium'}
          align={'center'}
          mt={'4'}
        >
          Enjoy your time and good luck on the platform!
        </Text>

        <Flex
          direction={'column'}
          gap={'1'}
          align={'center'}
          width={'100%'}
        >
          <Button
            className={styles.submitBtn}
            color='green'
            type='button'
            onClick={() => handleOpenChange(false)}
          >
            <Text
              className='color-black'
              weight={'bold'}
              size={'3'}
            >
              HERE IS OUR GUIDE
            </Text>
          </Button>
        </Flex>
      </Flex>
    </XyroDialog>
  )
}
