import { useCallback, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { BoldArrowRight } from 'shared/icons'
import { GameModeType, OnboardingStep } from 'shared/types'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { XyroDialog } from '../xyro-dialog/xyro-dialog'
import { ModeOnboardingMobileStep } from './mode-onboarding-mobile-step'
import styles from './mode-onboarding.module.scss'
import 'swiper/css'
import 'swiper/css/pagination'

export const PAGINATION_OPTIONS = {
  clickable: true
}

interface Props {
  mode: GameModeType
  steps: OnboardingStep[]
}
export const ModeOnboardingMobileDialog: React.FC<Props> = ({
  steps,
  mode
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleDialogOpenChange = useCallback((newIsOpen: boolean) => {
    setIsDialogOpen(newIsOpen)
  }, [])

  return (
    <XyroDialog
      open={isDialogOpen}
      onOpenChange={handleDialogOpenChange}
      className={styles.dialogContainer}
      isScrollAreaDisabled={true}
      dialogTrigger={
        <Flex
          align={'center'}
          gap={'1'}
        >
          <BoldArrowRight color='var(--white)' />

          <Text
            weight={'bold'}
            size={'4'}
            className='color-white'
          >
            How to Play
          </Text>
        </Flex>
      }
    >
      <Swiper
        modules={[Pagination]}
        pagination={PAGINATION_OPTIONS}
        className={cn(styles.onboadringSlider, styles[mode])}
        spaceBetween={'50'}
        centeredSlides
        loop
      >
        {steps.map(step => {
          return (
            <SwiperSlide key={step.description}>
              <ModeOnboardingMobileStep
                mode={mode}
                step={step}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </XyroDialog>
  )
}
