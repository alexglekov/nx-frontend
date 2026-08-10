import React from 'react'
import { Card } from '@radix-ui/themes'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AUTOPLAY_OPTIONS, PAGINATION_OPTIONS } from './constants'
import { Slide } from './slide'
import styles from './slider.module.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { SlideType } from './types'

interface Props {
  banners: SlideType[]
  handleClick?: () => void
  withButton?: boolean
  isClosedDefault?: boolean
}
export const Slider: React.FC<Props> = ({
  banners,
  handleClick,
  withButton = true
}) => {
  return (
    <Card
      variant='ghost'
      className={styles.sliderContainer}
    >
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        pagination={PAGINATION_OPTIONS}
        className={styles.bannerSlider}
        effect='fade'
        autoplay={AUTOPLAY_OPTIONS}
        loop
      >
        {banners.map(type => (
          <SwiperSlide key={type}>
            <Slide
              type={type}
              handleClick={handleClick}
              withButton={withButton}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  )
}
