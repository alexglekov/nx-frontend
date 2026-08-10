import React, { useRef } from 'react'
import { Card, Skeleton } from '@radix-ui/themes'
import { Mousewheel, FreeMode } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/grid'

import styles from '../../ui/game-slider/game-slider.module.scss'

export const GamesSliderSkeleton: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null)

  const modules = [Mousewheel, FreeMode]

  return (
    <Card
      variant='ghost'
      className={styles.gameSliderContainer}
    >
      <Swiper
        className={styles.gameSlider}
        modules={modules}
        spaceBetween={16}
        slidesPerView={'auto'}
        mousewheel
        freeMode
        ref={swiperRef}
      >
        {Array.from({ length: 15 })?.map((_, index) => (
          <SwiperSlide
            key={index}
            className={styles.gameSliderSlide}
          >
            <Skeleton
              width={'100%'}
              height={'100%'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  )
}
